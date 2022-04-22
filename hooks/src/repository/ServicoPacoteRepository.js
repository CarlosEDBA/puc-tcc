import api from '@/api'

export default {
  model: 'ServicoPacote',

  find(queryParams = {}) {
    return new Promise((resolve, reject) => {
      api.get('/servicos-pacotes', queryParams)
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
      api.get(`/servicos-pacotes/${id}`)
        .then((response) => {
          const data = response.data
          if (data) resolve(data)
          else reject(response)
        })
        .catch(reject)
    })
  },
}