import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import store from 'store'

import { validateToken, renewToken } from '@/actions/Auth'

import LoadingOverlay from '@/components/LoadingOverlay'

export default function AuthorizedRoute(props) {
  const Component = props.component

  const pending = useSelector(state => state.Auth.pending)
  const authenticated = useSelector(state => state.Auth.authenticated)

  const [ready, setReady] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    //console.log('log > AuthorizedRoute > useEffect called!', props)

    renewTokenIfExists()
  }, [])

  function renewTokenIfExists() {
    //console.log('log > AuthorizedRoute > renewTokenIfExists called!', Component.name)

    let token = store.get('token')

    if (!ready && token) {
      dispatch(validateToken(token))
        .then(() => {
          setReady(true)
        })
        .catch((err) => {
          console.error(err)
          setReady(true)
        })
    } else {
      setReady(true)
    }
  }

  return (<Route
    {...props}
    component={null}
    render={(routeProps) => {
      if (pending || !ready) {
        return (<LoadingOverlay visible={true}/>)
      } else {
        if (authenticated) {
          return (<Component/>)
        } else {
          return (<Redirect to="/login"/>)
        }
      }
    }}
  />)
}

