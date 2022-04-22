import api from '@/api'

export default {
  model: 'TipoDocumento',

  find(queryParams = {}) {
    return new Promise((resolve, reject) => {
      api.get('/tipos-documentos', queryParams)
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
      api.get(`/tipos-documentos/${id}`)
        .then((response) => {
          const data = response.data
          if (data) resolve(data)
          else reject(response)
        })
        .catch(reject)
    })
  },
}