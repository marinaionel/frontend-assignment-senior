import React, { useEffect, useState } from "react";

const token = import.meta.env.VITE_GITHUB_TOKEN;

// TODO: Complete the useFetch hook to handle API calls and return data, loading, and error states
export const useFetch = <T>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!url?.trim()) return;
    const c = new AbortController();
    const signal = c.signal;

    // reset state in case url changes
    setLoading(true);
    setError(null);
    setData(null);

    fetch(url, {
      signal,
      // obviously headers need to be configurable in a real env, just added it here quickly to avoid the API limit
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

    return () => c.abort();
  }, [url]);

  return { loading, error, data };
};
