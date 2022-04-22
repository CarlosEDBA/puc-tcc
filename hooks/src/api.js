import axios from 'axios'
import store from 'store'

import { API_ENDPOINT } from '@/globals'

export default {
  get: function (url, params = {}) {
    return axios({
      method: 'GET',
      url: `${API_ENDPOINT}${url}`,
      params: params,
      headers: {
        'Authorization': `Bearer ${store.get('token')}`
      },
    })
  },

  post: function (url, params = {}, data = {}, options = {}) {
    return axios({
      ...options,
      method: 'POST',
      url: `${API_ENDPOINT}${url}`,
      params: params,
      data: data,
      headers: {
        'Authorization': `Bearer ${store.get('token')}`
      },
    })
  },

  put: function (url, params = {}, data = {}) {
    return axios({
      method: 'PUT',
      url: `${API_ENDPOINT}${url}`,
      params: params,
      data: data,
      headers: {
        'Authorization': `Bearer ${store.get('token')}`
      },
    })
  },

  remove: function (url, params = {}) {
    return axios({
      method: 'DELETE',
      url: `${API_ENDPOINT}${url}`,
      params: params,
      headers: {
        'Authorization': `Bearer ${store.get('token')}`
      },
    })
  }
}