import { describe, expect, it, vi } from "vitest";
import { SearchResponse } from "./models/user";
import * as useFetchHook from "./hooks/useFetch";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Task1 from ".";

// Mock the useFetch hook

describe("Task1 Component", () => {
  it("renders users and filters them by search term", async () => {
    // declared as any to avoid missing fields
    const alice: any = {
      id: 0,
      login: "alice",
    };
    const bob: any = {
      id: 1,
      login: "bob",
    };

    vi.spyOn(useFetchHook, "useFetch").mockImplementation(() => ({
      data: {
        incomplete_results: false,
        items: [alice, bob],
        total_count: 2,
      },
      loading: false,
      error: null,
    }));

    render(<Task1 />);

    expect(screen.queryByText("alice")).toBeInTheDocument();
    expect(screen.queryByText("bob")).toBeInTheDocument();

    vi.spyOn(useFetchHook, "useFetch").mockImplementationOnce(() => ({
      data: {
        incomplete_results: false,
        items: [alice],
        total_count: 1,
      },
      loading: false,
      error: null,
    }));

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "alice" } });

    await waitFor(() => {
      expect(screen.queryByText("alice")).toBeInTheDocument();
      expect(screen.queryByText("bob")).not.toBeInTheDocument();
    });
  });

  it("shows no users found message when filter returns no results", async () => {
    vi.spyOn(useFetchHook, "useFetch").mockImplementation(() => ({
      data: {
        incomplete_results: false,
        items: [],
        total_count: 0,
      },
      loading: false,
      error: null,
    }));

    render(<Task1 />);

    expect(screen.queryByText("No users found.")).toBeInTheDocument();
  });
});
