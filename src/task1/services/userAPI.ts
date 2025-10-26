// not sure if I understood this correctly but since it mentions implementing a mock API I added this implementation using faker js

import { faker } from "@faker-js/faker";
import { GitHubUser, SearchResponse } from "../models/user";

const generateMockUsers = (count: number = 100): GitHubUser[] => {
  return Array.from({ length: count }, (_, i) => {
    const login = faker.internet.username().toLowerCase();
    return {
      login,
      id: i + 1,
      node_id: faker.string.uuid(),
      avatar_url: faker.image.avatar(),
      gravatar_id: faker.string.alphanumeric(5),
      url: faker.internet.url(),
      html_url: faker.internet.url(),
      followers_url: faker.internet.url(),
      following_url: faker.internet.url(),
      gists_url: faker.internet.url(),
      starred_url: faker.internet.url(),
      subscriptions_url: faker.internet.url(),
      organizations_url: faker.internet.url(),
      repos_url: faker.internet.url(),
      events_url: faker.internet.url(),
      received_events_url: faker.internet.url(),
      type: "User",
      user_view_type: "public",
      site_admin: faker.datatype.boolean(),
      score: faker.number.int(),
    };
  });
};

export const mockUsers = generateMockUsers(200);

// TODO: Implement API service calls (mock API) to fetch users and handle different scenarios
export const fetchMockUsers = async (
  searchQuery: string = "",
  perPage: number = 10,
  page: number = 0
): Promise<SearchResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockUsers.filter((user) =>
        user.login.toLowerCase().includes(searchQuery.trim().toLowerCase())
      );

      const start = page * perPage;
      const end = start + perPage;
      const paginated = filtered.slice(start, end);

      console.log(paginated.length);

      resolve({
        total_count: filtered.length,
        incomplete_results: false,
        items: paginated,
      });
    }, 500);
  });
};
