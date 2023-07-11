import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/Login/LoginAuthSlice'
import { loginAuthApi } from './../services/loginAuthApi';

export const store = configureStore({
  reducer: {
    loginAuth: loginReducer,
    [loginAuthApi.reducerPath]: loginAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginAuthApi.middleware),

})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch