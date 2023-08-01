import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4000/api/v1/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
