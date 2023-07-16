import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface StringObject {
  [key: string]: string;
}

interface signUpTypes {
  name: string;
  email: string;
  password: string;
  avatar: string | ArrayBuffer | null;
}

type resetArg={
  token:string | undefined,
  passwords:StringObject
}

export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:4000/api/v1/' }),
  endpoints: (builder) => ({
    loginAuth: builder.mutation<void,StringObject>({
      query: (credential) => ({
        url:"/login",
        method:"POST",
        body: credential
      }),
    }),
    registerUser: builder.mutation<void,signUpTypes>({
      query:(userData) => ({
        url:"/register",
        method:"POST",
        body: userData,
      })
    }),
    forgotPassword: builder.mutation<void,StringObject>({
      query:(email) => ({
        url:"/password/forgot",
        method:"POST",
        body: email
      })
    }),
    resetPassword: builder.mutation<void,resetArg>({
      query:({token,passwords}) => ({
        url:`/password/reset/${token}`,
        method:"PUT",
        body: passwords,
      })
    })
  }),
})

export const { useLoginAuthMutation, useRegisterUserMutation, useForgotPasswordMutation,useResetPasswordMutation } = userAuthApi