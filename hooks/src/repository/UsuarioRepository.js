import api from '@/api'

export default {
  model: 'Usuario',

  findById(id) {
    return new Promise((resolve, reject) => {
      api.get(`/usuarios/${id}`)
        .then((response) => {
          const data = response.data
          if (data) resolve(data)
          else reject(response)
        })
        .catch(reject)
    })
  },
}