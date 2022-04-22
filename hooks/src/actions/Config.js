import axios from 'axios'
import { API_ENDPOINT } from '@/globals'
import * as types from '@/actionTypes'

const data = [
  { name: 'site_url', value: 'http://localhost/rise/server/public_html/', autoload: true },
  { name: 'site_home', value: 'http://localhost/rise/server/public_html/', autoload: true },
  { name: 'site_name', value: 'Basic', autoload: true },
  { name: 'site_description', value: '', autoload: true },
  { name: 'theme', value: 'basic', autoload: true },
  { name: 'admin_email', value: 'carlosedba@outlook.com', autoload: true },
  { name: 'timezone_string', value: 'America/Sao_Paulo', autoload: true },
]

export function searchConfigs(params) {
  return {
    type: types.SEARCH_CONFIGS,
    payload: new Promise(function (resolve, reject) {
      resolve({
        data: {}
      })
    })
  }
}

export function fetchConfigs() {
  return {
    type: types.FETCH_CONFIGS,
    payload: new Promise(function (resolve, reject) {
      resolve({
        data: data
      })
    })
  }
}

export function fetchConfig(params) {
  return {
    type: types.FETCH_CONFIG,
    payload: new Promise(function (resolve, reject) {
      resolve({
        data: data
      })
    })
  }
}

export function createConfig(props) {
  return {
    type: types.CREATE_CONFIG,
    payload: request
  }
}

export function updateConfig(user, props) {
  return {
    type: types.UPDATE_CONFIG,
    payload: request
  }
}

export function deleteConfig(user) {
  return {
    type: types.DELETE_CONFIG,
    payload: request
  }
}