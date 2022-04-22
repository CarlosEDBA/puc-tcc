import update from 'immutability-helper'
import * as types from '@/actionTypes'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  let error
  
  switch (action.type) {
    case types.NEW_FORM:
      return update(state, {
        [action.payload.id]: {
          $set: Object.assign({
            meta: {},
            data: {}
          }, action.payload.props)
        }
      })

    case types.UPDATE_FORM:
      return update(state, {
        [action.payload.id]: action.payload.props
      })

    case types.UPADTE_FORM_META_ATTRIBUTE:
      return update(state, {
        [action.payload.id]: {
          meta: {
            [action.payload.name]: action.payload.value
          }
        }
      })

    case types.UPADTE_FORM_DATA_ATTRIBUTE:
      return update(state, {
        [action.payload.id]: {
          data: {
            [action.payload.name]: action.payload.value
          }
        }
      })

    case types.RESET_FORM:
      return update(state, {
        [action.payload.id]: { $set: { meta: {}, data: {} } }
      })

    case types.REMOVE_FORM:
      return update(state, {
        $unset: [action.payload.id]
      })

    default:
      return state
  }
}

