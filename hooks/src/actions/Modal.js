import axios from 'axios'
import { S7_API_ENDPOINT } from '@/globals'
import * as types from '@/actionTypes'

export function addModal(name) { 
  return {
    type: types.ADD_MODAL,
    payload: {
      name: name,
    }
  }
}

export function openModal({ name, params = {}, data = {}, handlers = {} }) {
  return {
    type: types.OPEN_MODAL,
    payload: {
      name: name,
      params: params,
      data: data,
      handlers: handlers
    }
  }
}

export function closeModal(name) { 
  return {
    type: types.CLOSE_MODAL,
    payload: {
      name: name,
    }
  }
}

export function updateModal(name, props) { 
  return {
    type: types.UPDATE_MODAL,
    payload: {
      name: name,
      props: props,
    }
  }
}

export function resetModal(name) { 
  return {
    type: types.RESET_MODAL,
    payload: {
      name: name,
    }
  }
}

export function removeModal(name) { 
  return {
    type: types.REMOVE_MODAL,
    payload: {
      name: name,
    }
  }
}

