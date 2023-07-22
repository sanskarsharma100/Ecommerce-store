import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  assignCurrentUser,
  removeCurrentUser,
} from "../features/User/userSlice";

interface StringObject {
  [key: string]: string;
}

interface signUpTypes {
  name: string;
  email: string;
  password: string;
  avatar: string | ArrayBuffer | null;
}

type resetArg = {
  token: string | undefined;
  passwords: StringObject;
};

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:4000/api/v1/" }),
  endpoints: (builder) => ({
    loginAuth: builder.mutation<void, StringObject>({
      query: (credential) => ({
        url: "/login",
        method: "POST",
        body: credential,
      }),
      async onQueryStarted(credential, { dispatch, queryFulfilled }) {
        try {
          const { data }: { data: any } = await queryFulfilled;
          const res = {
            isAuthenticated: true,
            user: data.user,
          };
          dispatch(assignCurrentUser(res));
        } catch (err) {
          console.log("error... ", err);
        }
      },
    }),
    logoutUser: builder.query<void, void>({
      query: () => "/logout",
      async onQueryStarted(_body, { dispatch, queryFulfilled }) {
        try {
          // const { data }: {data:any}= await queryFulfilled;
          console.log("logout working");
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
