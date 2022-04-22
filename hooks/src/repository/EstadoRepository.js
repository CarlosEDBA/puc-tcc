import api from '@/api'

export default {
  model: 'Estado',

  find(queryParams = {}) {
    return new Promise((resolve, reject) => {
      api.get('/estados', queryParams)
        .then((response) => {
          const data = response.data
          if (data) resolve(data)
          else reject(response)
        })
        .catch(reject)
    })
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      api.get(`/estados/${id}`)
        .then((response) => {
          const data = response.data
          if (data) resolve(data)
          else reject(response)
        })
        .catch(reject)
    })
  },
}