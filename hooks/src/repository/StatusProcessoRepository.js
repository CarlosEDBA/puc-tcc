import api from '@/api'

export default {
  model: 'StatusProcesso',

  find(queryParams = {}) {
    return new Promise((resolve, reject) => {
      api.get('/status-processos', queryParams)
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
      api.get(`/status-processos/${id}`)
        .then((response) => {
          const data = response.data
          if (data) resolve(data)
          else reject(response)
        })
        .catch(reject)
    })
  },
}