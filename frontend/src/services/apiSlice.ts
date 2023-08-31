import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SHOPEEFAST_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Products", "Cart"],
  endpoints: () => ({}),
});
