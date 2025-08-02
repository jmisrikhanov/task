import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SearchUsersResponse, UserDetail } from "./types";

/**
 * Creates a base query function for RTK Query using GitHub's API as the base URL.
 *
 * This configuration sets the `Authorization` header with a Bearer token retrieved
 * from environment variables (VITE_GITHUB_TOKEN), if available.
 *
 * @constant
 * @type {ReturnType<typeof fetchBaseQuery>}
 * @returns A configured `fetchBaseQuery` instance for communicating with the GitHub API.
 *
 * @example
 * const api = createApi({
 *   baseQuery: baseQuery,
 *   endpoints: (builder) => ({
 *     getUser: builder.query({ query: (username) => `users/${username}` }),
 *   }),
 * });
 */

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.github.com/",
  prepareHeaders: (headers) => {
    const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery,
  keepUnusedDataFor: 300, // cache for 5 minutes
  refetchOnFocus: false,
  endpoints: (builder) => ({
    searchUsers: builder.query<
      SearchUsersResponse,
      { q: string; page?: number; perPage?: number }
    >({
      query: ({ q, page = 1, perPage = 20 }) =>
        `search/users?q=${encodeURIComponent(
          q
        )}&per_page=${perPage}&page=${page}`,
    }),
    getUser: builder.query<UserDetail, string>({
      query: (login) => `users/${login}`,
      // narrow updates so detail consumers re-render only when their user changes
      // (not required, but good demo for perf)
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItem) => Object.assign(currentCache, newItem),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useSearchUsersQuery, useGetUserQuery } = githubApi;
