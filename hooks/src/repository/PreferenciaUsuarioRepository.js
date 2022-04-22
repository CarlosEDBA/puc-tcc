import api from '@/api'

export default {
  model: 'PreferenciaUsuario',

  find(queryParams = {}) {
    return new Promise((resolve, reject) => {
      api.get('/preferencias-usuarios', queryParams)
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
      api.get(`/preferencias-usuarios/${id}`)
        .then((response) => {
          const data = response.data
          if (data) resolve(data)
          else reject(response)
        })
        .catch(reject)
    })
  },
}