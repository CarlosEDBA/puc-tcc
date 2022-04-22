import update from 'immutability-helper'
import * as types from '@/actionTypes'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  let modalName, modalParams, modalData, modalHandlers, error

  switch (action.type) {
  case types.ADD_MODAL:
    return {
      ...state,
      [action.payload.name]: {
        isOpen: false,
        params: {},
        data: {}
      }
    }

    case types.OPEN_MODAL:
      modalName = action.payload.name
      modalParams = action.payload.params
      modalData = action.payload.data
      modalHandlers = action.payload.handlers

      return update(state, {
        $merge: {
          [modalName]: {
            isOpen: true,
            params: modalParams,
            data: modalData,
            handlers: modalHandlers,
          }
        }
      })

  case types.CLOSE_MODAL:
    return update(state, {
      [action.payload.name]: { $merge: { isOpen: false } }
    })

  case types.UPDATE_MODAL:
    return update(state, {
      [action.payload.name]: action.payload.props
    })

  case types.RESET_MODAL:
    return update(state, {
      [action.payload.name]: { $set: { isOpen: false } }
    })

  case types.REMOVE_MODAL:
    return update(state, { $unset: [action.payload.name] })

  default:
    return state
  }
}

