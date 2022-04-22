import Promise from 'bluebird'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import store from '@/store'
import * as types from '@/actionTypes'
import { API_ENDPOINT } from '@/globals'

function extractUserData(token) {
  const tokenData = jwtDecode(token)

  return {
    _id: tokenData._id,
    nome: tokenData.nome,
    sobrenome: tokenData.sobrenome,
  }
}

export default {
  fetchToken(data) {
    return new Promise((resolve, reject) => {
      store.dispatch({ type: types.AUTH_FETCH_TOKEN })

      axios({
        method: 'post',
        data: data,
        url: `${API_ENDPOINT}/token`,
      })
        .then((response) => {
          const data = response.data

          if (data.error) {
            store.dispatch({
              type: types.AUTH_FETCH_TOKEN_ERROR,
              error: data.error
            })

            reject({error: data.error})

          } else if (data.token) {
            store.dispatch({
              type: types.AUTH_FETCH_TOKEN_SUCCESS,
              token: data.token,
              user: extractUserData(data.token)
            })

            resolve({token: data.token})
          }
        })
        .catch((err) => {
          store.dispatch({
            type: types.AUTH_FETCH_TOKEN_ERROR,
            error: err
          })

          reject({ error: err })
        })
    })
  },

  validateToken(token) {
    return new Promise((resolve, reject) => {
      store.dispatch({ type: types.AUTH_VALIDATE_TOKEN })

      axios({
        method: 'post',
        data: {token: token},
        url: `${API_ENDPOINT}/token/validate`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => {
          const data = response.data

          if (data.error) {
            store.dispatch({
              type: types.AUTH_VALIDATE_TOKEN_ERROR,
              error: data.error
            })

            reject({ error: data.error })

          } else if (data.token) {
            store.dispatch({
              type: types.AUTH_VALIDATE_TOKEN_SUCCESS,
              token: data.token,
              user: extractUserData(data.token)
            })

            resolve({ token: data.token })
          }
        })
        .catch((err) => {
          store.dispatch({
            type: types.AUTH_VALIDATE_TOKEN_ERROR,
            error: err
          })

          reject({ error: err })
        })
    })
  },

  renewToken(token) {
    return new Promise((resolve, reject) => {
      store.dispatch({ type: types.AUTH_RENEW_TOKEN })

      axios({
        method: 'post',
        data: {token: token},
        url: `${API_ENDPOINT}/token/renew`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => {
          const data = response.data

          if (data.error) {
            store.dispatch({
              type: types.AUTH_RENEW_TOKEN_ERROR,
              error: data.error
            })

            reject({ error: data.error })

          } else if (data.token) {
            store.dispatch({
              type: types.AUTH_RENEW_TOKEN_SUCCESS,
              token: data.token,
              user: extractUserData(data.token)
            })

            resolve({ token: data.token })
          }
        })
        .catch((err) => {
          store.dispatch({
            type: types.AUTH_RENEW_TOKEN_ERROR,
            error: err
          })

          reject({ error: err })
        })
    })
  }
}