import * as types from '@/actionTypes'

export function newRequest(payload) {
  return {
    type: types.NEW_REQUEST,
    payload: payload
  }
}

export function updateRequest(id, payload) {
  return {
    type: types.UPDATE_REQUEST,
    id: id,
    payload: payload,
  }
}

export function changeRequestStatus(id, status) {
  return {
    type: types.CHANGE_REQUEST_STATUS,
    id: id,
    status: status,
  }
}

export function addResponseToRequest(id, response) {
  return {
    type: types.ADD_RESPONSE_TO_REQUEST,
    id: id,
    response: response,
  }
}

export function deleteRequest(id) {
  return {
    type: types.DELETE_REQUEST,
    id: id,
  }
}

export function clearAllRequests() {
  return {
    type: types.CLEAR_ALL_REQUESTS,
  }
}

