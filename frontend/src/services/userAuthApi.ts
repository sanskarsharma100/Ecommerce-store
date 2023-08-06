import {
  assignCurrentUser,
  removeCurrentUser,
} from "../features/User/userSlice";
import { StringObject, signUpTypes } from "../utils/types";
import { apiSlice } from "./apiSlice";

type resetArg = {
  token: string | undefined;
  passwords: StringObject;
};

export const userAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAuth: builder.mutation<void, StringObject>({
      query: (credential) => ({
        url: "/login",
        method: "POST",
        body: credential,
      }),
      async onQueryStarted(_credential, { dispatch, queryFulfilled }) {
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
    logoutUser: builder.query<void, void>({
      query: () => "/logout",
      async onQueryStarted(_body, { dispatch }) {
        try {
          localStorage.clear();
          dispatch(removeCurrentUser());
        } catch (err) {
          console.log("error... ", err);
        }
      },
    }),
    registerUser: builder.mutation<void, signUpTypes>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation<void, StringObject>({
      query: (email) => ({
        url: "/password/forgot",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation<void, resetArg>({
      query: ({ token, passwords }) => ({
        url: `/password/reset/${token}`,
        method: "PUT",
        body: passwords,
      }),
    }),
  }),
});

export const {
  useLoginAuthMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLazyLogoutUserQuery,
} = userAuthApi;
