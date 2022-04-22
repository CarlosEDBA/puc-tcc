const Promise = require('bluebird')
const nanoid = require('nanoid')
const moment = require('moment')

const Aluno = Promise.promisifyAll(require('../model/Aluno'))

const models = {
  Aluno,
}

let cache = {}

function initializeCache() {
  return {
    processed: [],
    responses: [],
    errors: []
  }
}

function addToCache(item, result) {
  cache.processed.push([item.id, result])
}

function addResponseToCache(payload) {
  cache.responses.push({
    id: payload.id,
    status: 'success'
  })
}

function addErrorToCache(payload, err) {
  console.error(err)

  cache.errors.push({
    id: payload.id,
    status: 'error',
    error: {
      name: err.name,
      message: err.message,
    }
  })
}

function wasProcessedSuccessfully(id) {
  for (let i = 0; i < cache.processed.length; i++) {
    const payload = cache.processed[i]

    if (payload[0] === id) return i
  }

  return false
}

function getReferenceIdByIndex(index) {
  return cache.processed[index][1].id
}

function catchHandler(item, err) {
  addErrorToCache(item, err)
}

function mergeObjects(payload) {
  console.log('log > netqueue > mergeObjects called!')

  let mergedData = {}

  let formData = payload.data
  let formMeta = payload.meta

  for (const key of Object.keys(formData)) {
    if (Array.isArray(formData[key])) {
      console.log('log > netqueue > array found at ' + key)

      for (let i = 0; i < formData[key].length; i++) {
        let currentItem = formData[key][i]

        for (const subKey of Object.keys(currentItem)) {
          if (formMeta[key] && formMeta[key][i]) {
            if (!formMeta[key][i][subKey]) {
              formMeta[key][i][subKey] = formData[key][i][subKey]
            }
          }
        }

        if (formMeta[key] && !formMeta[key][i]) {
          formMeta[key].push(formData[key][i])
        }
      }
    }
  }

  mergedData = Object.assign({}, formData, formMeta)

  return mergedData
}

function generateId(item) {
  if (item.id === null || item.id === undefined) {
    return Object.assign({}, item, { id: nanoid(12) })
  }
}

function associate(payload, data) {
  if (payload.dependsOn) {
    payload.dependsOn.forEach((dep) => {
      const index = wasProcessedSuccessfully(dep.id)

      if (index !== false) {
        data[dep.key] = getReferenceIdByIndex(index)
      }
    })
  }
}

function arrayFilter(obj, key) {
  if (Array.isArray(obj[key])) {
    obj[key] = JSON.stringify(obj[key])
  }
}

function arrayLabelValueFilter(obj, key) {
  console.log('log > arrayLabelValueFilter called!', key, obj[key])
  if (Array.isArray(obj[key]) && obj[key].length > 0) {
    if (obj[key][0]['label'] && obj[key][0]['value']) {
      let newArr = []

      for (const item of obj[key]) {
        if (item.label) {
          newArr.push(item.value)
        }
      }

      obj[key] = newArr
    }
  }
}

function labelValueFilter(obj, key) {
  if (typeof obj[key] === 'object') {
    if (obj[key].label) {
      obj[key] = obj[key].value
    }
  }
}

function dateFilter(obj, key) {
  if (typeof obj[key] === 'object') {
    if (obj[key].type === 'date') {
      obj[key] = obj[key].value
    }
  }
}

function currencyFilter(obj, key) {
  if (typeof obj[key] === 'object') {
    if (obj[key].currency) {
      obj[key] = JSON.stringify(obj[key])
    }
  }
}

async function executeAction(payload, data) {
  let model = models[payload.model]
  let result

  switch (payload.action) {
    case 'create':
      result = await model.create(data)
        .catch(catchHandler.bind(null, payload))
      break

    case 'update':
      result = await model.findOneAndUpdate({ _id: data._id }, data)
        .catch(catchHandler.bind(null, payload))
      break
      
    case 'delete':
      result = await model.deleteOne({ _id: payload.data._id })
        .catch(catchHandler.bind(null, payload))
      break
  }

  return result
}

async function process(req, res) {
  cache = initializeCache()

  const payloads = req.body.data

  if (payloads) {
    let result

    for (let payload of payloads) {
      console.log('log > payload:', payload)
      console.log('log > payload dependsOn:', payload.id, payload.dependsOn)

      if (payload.status !== 'success') {

        if (['create', 'update'].includes(payload.action)) {
          if (!payload.dependsOn) {
            let data = generateId(mergeObjects(payload))

            for (let key of Object.keys(data)) {
              //arrayFilter(data, key)
              arrayLabelValueFilter(data, key)
              labelValueFilter(data, key)
              dateFilter(data, key)
              //currencyFilter(data, key)
            }

            result = await executeAction(payload, data)
            if (result) {
              addToCache(payload, result)
              addResponseToCache(payload)
            }
          }
        }

      }
    }

    for (let payload of payloads) {
      if (payload.status !== 'success') {

        if (['create', 'update'].includes(payload.action)) {
          if (payload.dependsOn) {
            let data = generateId(mergeObjects(payload))

            for (let key of Object.keys(data)) {
              //arrayFilter(data, key)
              arrayLabelValueFilter(data, key)
              labelValueFilter(data, key)
              dateFilter(data, key)
              //currencyFilter(data, key)
            }

            associate(payload, data)

            result = await executeAction(payload, data)
            if (result) {
              addToCache(payload, result)
              addResponseToCache(payload)
            }
          }
        }

      }
    }

    for (let payload of payloads) {
      if (payload.status !== 'success') {

        if (payload.action === 'delete') {
          result = await executeAction(payload)
          if (result) {
            addToCache(payload, result)
            addResponseToCache(payload)
          }
        }

      }
    }

    res.send(cache.responses.concat(cache.errors))
  } else {
    res.sendStatus(204)
  }
}

async function search(req, res) {
  const params = req.body.params

  let model = models[params.model]
  let result

  if (model && params.str) {
    result = await model.fuzzySearch(params.str).catch(console.error)

    res.send(result)
  }
}

module.exports = {
  process, search
}
