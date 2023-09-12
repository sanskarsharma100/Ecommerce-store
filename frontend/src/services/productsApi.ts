import {
  allProductResp,
  getCategoryResp,
  getProductPara,
  productDetailsResp,
} from "../utils/types";
import { apiSlice } from "./apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<allProductResp, getProductPara>({
      query: ({
        keyword = "",
        currentPage = 1,
        price = [0, 1000000],
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
      providesTags: ["Products"],
    }),
    getProductDetails: builder.query<productDetailsResp, string>({
      query: (id) => `/product/${id}`,
    }),
    getCategories: builder.query<getCategoryResp, void>({
      query: () => "/categories",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductDetailsQuery,
} = productsApi;
