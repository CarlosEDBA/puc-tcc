const Promise = require('bluebird')
const nanoid = require('nanoid')

const Usuario = Promise.promisifyAll(require('../model/Usuario'))

const Auth = require('../Auth')

const models = {
    Usuario,
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
    console.log('log > PublicEndpoint > mergeObjects called!')

    let mergedData = {}

    let data = payload.data
    let meta = payload.meta

    for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
            console.log('log > PublicEndpoint > array found at ' + key)

            for (let i = 0; i < data[key].length; i++) {
                let currentItem = data[key][i]

                for (const subKey of Object.keys(currentItem)) {
                    if (meta[key] && meta[key][i]) {
                        if (!meta[key][i][subKey]) {
                            meta[key][i][subKey] = data[key][i][subKey]
                        }
                    }
                }

                if (meta[key] && !meta[key][i]) {
                    meta[key].push(data[key][i])
                }
            }
        }
    }

    mergedData = Object.assign({}, data, meta)

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
    console.log('log > PublicEndpoint > arrayLabelValueFilter called!', key, obj[key])

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

function register(payload, data) {
    return new Promise(async (resolve, reject) => {
        let model = models[payload.model]
        let result

        console.log('data', data)

        let user = {
            ...data,
            senha: await model.hashPassword(data.senha),
            funcao: 'fornecedor'
        }

        console.log('user', user)

        result = await model.create(user).catch(catchHandler.bind(null, payload))
        console.log('result', result)

        if (result) {
            const token = await Auth.authenticate(jwt, data.email, data.senha)
                .catch(reject)

            resolve(token)
        } else {
            reject(new Error('Error while registering the user.'))
        }
    })
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
            result = await model.deleteOne({ _id: data._id })
                .catch(catchHandler.bind(null, payload))
            break

        case 'register':
            result = await register(payload, data)
            break
    }

    return result
}

async function process(req, res) {
    console.log('log > PublicEndpoint > process called!')

    cache = initializeCache()

    const payloads = req.body

    if (payloads) {
        let result

        for (let payload of payloads) {
            console.log('log > PublicEndpoint > payload:', payload)
            console.log('log > PublicEndpoint > payload dependsOn:', payload.id, payload.dependsOn)

            if (payload.status !== 'success') {

                if (['create', 'update', 'register'].includes(payload.action)) {
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

module.exports = {
    process
}
