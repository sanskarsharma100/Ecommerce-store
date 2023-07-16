import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/Login/LoginAuthSlice'
import { userAuthApi } from './../services/userAuthApi';

export const store = configureStore({
  reducer: {
    isAuth: loginReducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),

})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch