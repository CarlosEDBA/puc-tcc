import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createSelector } from 'reselect'
import store from 'store'

import { logout } from '@/actions/Auth'

export default function Logout(props) {
  const authenticated = useSelector(state => state.Auth.authenticated)

  const dispatch = useDispatch()

  useEffect(() => {
    if (authenticated) dispatch(logout())
  }, [])
  
  if (!authenticated) {
    return (<Redirect to="/login"/>)
  }

  return null
}

