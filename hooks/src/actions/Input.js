import axios from 'axios'
import store from 'store'
import { S7_API_ENDPOINT } from '@/globals'
import * as types from '@/actionTypes'

export function findSuggestions(collection, str) {  
  const request = axios({
    method: 'get',
    url: `${S7_API_ENDPOINT}/${collection}/suggestions`,
    headers: {
      'Authorization': `Bearer ${store.get('token')}`
    },
    params: {
      str: str
    }
  })

  return {
    type: types.INPUT_FIND_SUGGESTIONS,
    payload: request
  }
}

export function clearSuggestions() {
  return {
    type: types.INPUT_CLEAR_SUGGESTIONS,
    payload: null
  }
}