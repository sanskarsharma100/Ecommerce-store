import { assignCurrentUser } from "../features/User/userSlice";
import { StringObject } from "../utils/types";
import { apiSlice } from "./apiSlice";

export const userAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loadUser: builder.query<void, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        try {
          const { data }: { data: any } = await queryFulfilled;
          const res = {
            isAuthenticated: true,
            user: data.user,
          };
          localStorage.setItem(
            "isAuthenticated",
            JSON.stringify(res.isAuthenticated)
          );
          localStorage.setItem("user", JSON.stringify(res.user));
          dispatch(assignCurrentUser(res));
        } catch (err) {
          console.log("error... ", err);
        }
      },
    }),
    updateUserDetails: builder.mutation<void, StringObject>({
      query: (userData) => ({
        url: "/me/update",
        method: "PUT",
        body: userData,
      }),
    }),
    updatePassword: builder.mutation<void, StringObject>({
      query: (passwords) => ({
        url: "/password/update",
        method: "PUT",
        body: passwords,
      }),
    }),
  }),
});

export const {
  useLazyLoadUserQuery,
  useUpdateUserDetailsMutation,
  useUpdatePasswordMutation,
} = userAuthApi;
