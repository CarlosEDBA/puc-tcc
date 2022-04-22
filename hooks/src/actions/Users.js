import axios from 'axios'
import { S7_API_ENDPOINT } from '@/globals'
import * as types from '@/actionTypes'

export function findAll() {
  const request = axios({
    method: 'get',
    url: `${S7_API_ENDPOINT}/users`,
    headers: {
      'Authorization': `Bearer ${store.get('token')}`
    },
  })

  return {
    type: types.FIND_ALL_USERS,
    payload: request
  }
}

export function findOneById(id) {
  const request = axios({
    method: 'get',
    url: `${S7_API_ENDPOINT}/users/${id}`,
    headers: {
      'Authorization': `Bearer ${store.get('token')}`
    },
  })

  return {
    type: types.FIND_ONE_USER,
    payload: request
  }
}

export function create(props) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${S7_API_ENDPOINT}/users`,
    headers: {
      'Authorization': `Bearer ${store.get('token')}`
    },
  })

  return {
    type: types.CREATE_USER,
    payload: request
  }
}

export function update(id, props) {
  const request = axios({
    method: 'put',
    data: props,
    url: `${S7_API_ENDPOINT}/users/${id}`,
    headers: {
      'Authorization': `Bearer ${store.get('token')}`
    },
  })

  return {
    type: types.UPDATE_USER,
    payload: request
  }
}

export function remove(id) {
  const request = axios({
    method: 'delete',
    url: `${S7_API_ENDPOINT}/users/${id}`,
    headers: {
      'Authorization': `Bearer ${store.get('token')}`
    },
  })

  return {
    type: types.DELETE_USER,
    payload: request
  }
}