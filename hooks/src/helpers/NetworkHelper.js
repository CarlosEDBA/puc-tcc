import { newRequest, updateRequest, changeRequestStatus, addResponseToRequest, deleteRequest, clearAllRequests } from '@/actions/Network'

import IdGenerator from '@/utils/IdGenerator'

import store from '@/store'
import api from '@/api'

const DONT_SEND = false

function request(payloads) {
  console.log('request called!', payloads)

  const dispatch = store.dispatch

  return new Promise(async (resolve, reject) => {

    if (!DONT_SEND) {
      try {
        const response = await api.post('/main', {}, {
          data: payloads
        })
        const data = response.data

        if (data && Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            const response = data[i]

            if (response.status) {
              if (response.status === 'success') {
                dispatch(updateRequest(response.id, {
                  status: 'success',
                  data: null,
                  meta: null,
                }))

                if (response.data) dispatch(logResponse(response))
              }

              if (response.status === 'error') {
                dispatch(updateRequest(response.id, {
                  status: 'error'
                }))

                dispatch(logResponse(response))
              }
            }
          }
        }

        resolve()

      } catch (err) {
        console.error(err)
        reject(err)
      }
    } else {
      for (let i = 0; i < payloads.length; i++) {
        const payload = payloads[i]

        console.log('payload', payload)

        const response = {
          id: payload.id,
          status: 'success'
        }

        console.log(response)

        if (response.status === 'success') {
          dispatch(updateRequest(response.id, {
            status: 'success',
            data: null,
            meta: null,
          }))
        }

        if (response.status === 'error') {
          dispatch(updateRequest(response.id, {
            status: 'error'
          }))
        }

        dispatch(addResponseToRequest(response.id, response))
      }
    }
  })
}

export default {
  requestExists(id) {
    let state = store.getState()
    let requests = state.Network

    for (let i = 0; i < requests.length; i++) {
      const request = requests[i]

      if (request.id === id) return true
    }

    return false
  },

  newRequest(payload) {
    console.log('newRequest payload', payload)

    const dispatch = store.dispatch

    const id = payload.id || IdGenerator.default()

    if (!payload.id) {
      payload.id = id
    }

    dispatch(newRequest(payload))

    return id
  },

  updateRequest(id, payload) {
    const dispatch = store.dispatch

    dispatch(updateRequest(id, payload))
  },

  deleteRequest(id) {
    const dispatch = store.dispatch

    dispatch(deleteRequest(id))
  },

  process(id) {
    let state = store.getState()
    let requests = state.Network
    let payloads = []

    console.log('id', id)
    console.log('requests', requests)

    for (let i = 0; i < requests.length; i++) {
      let request = requests[i]

      if (request.id === id) {
        console.log('matching ids')

        if (request.status === 'idle') {
          console.log('status idle, update called')

          payloads.push(request)

          store.dispatch(updateRequest(request.id, { status: 'sent' }))
        }
      }

      console.log('request', request)
    }

      return request(payloads)
  },

  processAllRequests() {
    const dispatch = store.dispatch
    let state = store.getState()
    let requests = state.Network
    let idleRequests = []

    for (let i = 0; i < requests.length; i++) {
      let request = requests[i]

      console.log('request', request)

      if (request.status === 'idle') {
        idleRequests.push(request)

        dispatch(updateRequest(request.id, { status: 'sent' }))
      }
    }

    return request(idleRequests)
  }
}