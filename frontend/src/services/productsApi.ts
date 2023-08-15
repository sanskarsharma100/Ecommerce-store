import { allProductResp } from "../utils/types";
import { apiSlice } from "./apiSlice";

export const ProductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<allProductResp, void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = ProductsApi;
