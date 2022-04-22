import update from 'immutability-helper'

import * as types from '@/actionTypes'

const INITIAL_STATE = {
  pending: false,
  authenticated: false,
  token: null,
  user: null,
  error: null
}

export default function(state = INITIAL_STATE, action) {
  let error

  switch (action.type) {
    case types.AUTH_RENEW_TOKEN:
      return {
        ...state,
        pending: true,
        authenticated: false,
        token: null,
        user: null,
        error: null
      }

    case types.AUTH_RENEW_TOKEN_SUCCESS:
      return {
        ...state,
        pending: false,
        authenticated: (action.token) ? true : false,
        token: action.token,
        user: action.user,
        error: null
      }

    case types.AUTH_RENEW_TOKEN_ERROR:
      error = action.error

      return {
        ...state,
        pending: false,
        authenticated: false,
        token: null,
        user: null,
        error: error
      }


    case types.AUTH_VALIDATE_TOKEN:
      return {
        ...state,
        pending: true,
        authenticated: false,
        token: null,
        user: null,
        error: null
      }

    case types.AUTH_VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        pending: false,
        authenticated: (action.token) ? true : false,
        token: action.token,
        user: action.user,
        error: null
      }

    case types.AUTH_VALIDATE_TOKEN_ERROR:
      error = action.error

      return {
        ...state,
        pending: false,
        authenticated: false,
        token: null,
        user: null,
        error: error
      }


    case types.AUTH_FETCH_TOKEN:
      return {
        ...state,
        pending: true,
        authenticated: false,
        token: null,
        user: null,
        error: null
      }

    case types.AUTH_FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        pending: false,
        authenticated: (action.token) ? true : false,
        token: action.token,
        user: action.user,
        error: null
      }

    case types.AUTH_FETCH_TOKEN_ERROR:
      error = action.error

      return {
        ...state,
        pending: false,
        authenticated: false,
        token: null,
        user: null,
        error: error
      }


    case types.AUTH_LOGOUT:
      return {
        ...state,
        pending: false,
        authenticated: false,
        token: null,
        user: null,
        error: null
      }

    default:
      return state
  }
}