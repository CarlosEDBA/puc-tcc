import FileSaver from 'file-saver'

import api from '@/api'

export default {
  readDir(path) {
    return new Promise((resolve, reject) => {
      api.post(
        `/filesystem`,
        {},
        {
          action: 'readDir',
          params: {
            path: path
          }
        })
        .then((response) => {
          const data = response.data

          if (data.error) reject(data.error)
          if (data.data) resolve(data.data)
        })
        .catch(reject)
    })
  },

  retrieveFile(path, fileName) {
    return new Promise((resolve, reject) => {
      api.post(
        `/filesystem`,
        {},
        {
          action: 'retrieveFile',
          params: {
            path: path
          },
        },
        {
          responseType: 'blob'
        })
        .then((response) => {
          const data = response.data

          if (data.error) {
            reject(data.error)
          } else {
            FileSaver.saveAs(response.data, fileName)
          }
        })
        .catch(reject)
    })
  },

  deleteFile(path) {
    return new Promise((resolve, reject) => {
      api.post(
        `/filesystem`,
        {},
        {
          action: 'deleteFile',
          params: {
            path: path
          },
        })
        .then((response) => {
          const data = response.data

          if (data.error) {
            reject(data.error)
          } else {
            resolve()
          }
        })
        .catch(reject)
    })
  },

  writeFiles(files, path) {
    return new Promise((resolve, reject) => {
      let formData = new FormData()

      formData.append('action', 'writeFiles')
      formData.append('path', path)

      for (const file of files) {
        formData.append('file[]', file)
      }

      api.post(
        `/filesystem`,
        {},
        formData
      )
        .then((response) => {
          resolve(response)
        })
        .catch(reject)
    })
  },
}