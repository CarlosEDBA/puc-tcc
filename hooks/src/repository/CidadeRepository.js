import api from '@/api'

export default {
  model: 'Cidade',

  find(queryParams = {}) {
    return new Promise((resolve, reject) => {
      api.get('/cidades', queryParams)
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
      api.get(`/cidades/${id}`)
        .then((response) => {
          const data = response.data
          if (data) resolve(data)
          else reject(response)
        })
        .catch(reject)
    })
  },
}