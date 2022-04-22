import update from 'immutability-helper'

import * as types from '@/actionTypes'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  let error

  switch (action.type) {
    case types.SET_PREFERENCIAS:
      return action.payload

    default:
      return state
  }
}

