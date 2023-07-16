import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { loggedIn, loggedOut } from './LoginAuthSlice'

export function CheckIsAuth() {
  const isAuth = useAppSelector((state) => state.isAuth.value)
  const dispatch = useAppDispatch()
  
}