import { apiSlice } from "./apiSlice";

export const userAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<void, void>({
      query: () => "/products",
    }),
  }),
});
