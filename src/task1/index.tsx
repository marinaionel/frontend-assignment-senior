import { FC, useEffect, useMemo, useState } from "react";
import "./index.scss";
import { GitHubUser, SearchResponse } from "./models/user";
import { useFetch } from "./hooks/useFetch";

// constant out of the FC to unnecessary assignments
const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;
const PER_PAGE_OPTIONS = [10, 25, 50, 100];

const Task1: FC = () => {
  // Use this api endpoint to get a list of users
  // https://api.github.com/users

  const [q, setQ] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(q); // or lodash debounce
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const searchUrl = useMemo(
    () =>
      `${GITHUB_API_URL}/search/users?q=${
        !debouncedQuery.trim().length ? "type:user" : debouncedQuery
      }&page=${page}&per_page=${perPage}`,
    [debouncedQuery, page, perPage]
  );

  const { loading, error, data } = useFetch<SearchResponse>(searchUrl);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(q);
    }, 500);

    return () => clearTimeout(handler);
  }, [q]);

  // reset page when needed
  useEffect(() => {
    setPage(0);
  }, [debouncedQuery, perPage]);

  return (
    <div className="dashboard">
      {
        <input
          disabled={loading}
          type="text"
          placeholder="Search..."
          value={q}
          onChange={(event) => {
            setQ(event.target.value);
          }}
        />
      }

      {error && <span>Error fetching users: {error.message}</span>}

      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : (data?.items?.length ?? 0) > 0 ? (
          data?.items.map((u: GitHubUser) => (
            <li key={u.id}>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <img src={u.avatar_url} height={20} alt={u.login} />
                {u.login}
              </div>
            </li>
          ))
        ) : (
          <li>No users found.</li>
        )}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button
          disabled={loading || page === 0}
          onClick={() => {
            setPage((val) => val - 1);
          }}
        >
          Prev
        </button>
        <select
          id="pages"
          disabled={loading}
          value={perPage}
          onChange={(event) => setPerPage(Number(event.target.value))}
        >
          {PER_PAGE_OPTIONS.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </select>
        {!error && (
          <div>
            Page {page + 1} /{" "}
            {data?.total_count ? Math.ceil(data.total_count / perPage) : 1}
          </div>
        )}
        <button
          disabled={loading || !data?.incomplete_results}
          onClick={() => {
            setPage((val) => val + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Task1;
