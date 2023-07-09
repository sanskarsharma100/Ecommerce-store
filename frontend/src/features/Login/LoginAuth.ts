import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { loggedIn, loggedOut } from './LoginAuthSlice'

export function CheckLoginAuth() {
  const loginAuth = useAppSelector((state) => state.loginAuth.value)
  const dispatch = useAppDispatch()
  
}