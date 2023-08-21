import { allProductResp, getProductPara } from "../utils/types";
import { apiSlice } from "./apiSlice";

export const ProductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<allProductResp, getProductPara>({
      query: ({
        keyword = "",
        currentPage = 1,
        price = [0, 25000],
        category,
        ratings = 0,
        sort = "relevance",
      }) => {
        let queryUrl = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&sort=${sort}`;

        if (category) {
          queryUrl = queryUrl + `&category=${category}`;
        }

        return {
          url: queryUrl,
        };
      },
    }),
  }),
});

export const { useGetProductsQuery, useLazyGetProductsQuery } = ProductsApi;
