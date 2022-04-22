import * as types from '@/actionTypes'

export function setPreferencias(payload) {
  return {
    type: types.SET_PREFERENCIAS,
    payload: payload
  }
}

