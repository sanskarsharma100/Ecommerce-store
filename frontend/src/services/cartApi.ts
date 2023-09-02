import { addToCartResp, getCartResp } from "../utils/types";
import { apiSlice } from "./apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProductToCart: builder.mutation<
      addToCartResp,
      { productId: string | undefined }
    >({
      query: (product) => ({
        url: "/cart/product/add",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Cart"],
    }),
    increaseQuantity: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/cart/product/${productId}/quantity/increase`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),

    decreaseQuantity: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/cart/product/${productId}/quantity/decrease`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),

    removeProductFromCart: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/cart/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    getCartProducts: builder.query<getCartResp, void>({
      query: () => `/cart`,
      providesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
  useGetCartProductsQuery,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
} = cartApi;
