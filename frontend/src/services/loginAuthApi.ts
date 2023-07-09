import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Credentials{
  "email": string,
  "password":string
}

export const loginAuthApi = createApi({
  reducerPath: 'loginAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:4000/api/v1/' }),
  endpoints: (builder) => ({
    loginAuth: builder.mutation<void,Credentials>({
      query: (credential) => ({
        url:"/login",
        method:"POST",
        body: credential
      }),
    }),
  }),
})

export const { useLoginAuthMutation } = loginAuthApi