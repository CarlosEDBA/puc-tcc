import update from 'immutability-helper'

import * as types from '@/actionTypes'

const INITIAL_STATE = []

function getIndexById(arr, id) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].id === id) return i
	}
}

export default function(state = INITIAL_STATE, action) {
  let index

  switch (action.type) {
		case types.NEW_REQUEST:
			return update(state, {
				$push: [action.payload]
			})

	  case types.UPDATE_REQUEST:
		  index = getIndexById(state, action.id)

		  return update(state, {
			  [index]: { $merge: action.payload }
		  })

	  case types.CHANGE_REQUEST_STATUS:
		  index = getIndexById(state, action.id)

		  return update(state, {
			  [index]: {
				  status: { $set: action.status }
			  }
		  })

	  case types.ADD_RESPONSE_TO_REQUEST:
		  index = getIndexById(state, action.id)

		  return update(state, {
			  [index]: {
				  response: { $set: action.response }
			  }
		  })

		case types.DELETE_REQUEST:
			index = getIndexById(state, action.id)

			return update(state, {
				$splice: [[index, 1]]
			})

		case types.CLEAR_ALL_REQUESTS:
			return update(state, {
				$set: []
			})

		default:
			return state
  }
}

