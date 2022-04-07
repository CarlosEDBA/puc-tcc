'use strict';

const Promise = require('bluebird')
const Estado = Promise.promisifyAll(require('../model/Estado'))

class Estados {
  static async findAll(req, res) {
    const pais = req.query.pais
    const search = req.query.search

    let queryParams = {}
    if (pais) queryParams = { ...queryParams, pais: pais }
    if (search) queryParams = { ...queryParams, $text: { $search: search } }

    let projection = {}

    const result = await Estado.findAsync({ ...queryParams }, projection, {
      sort: { nome: 1 }
    }).catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = {}

    const result = await Estado.findByIdAsync(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    const estado = new Estado(data)

    estado.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async update(req, res) {
    const id = req.params.id

    let data = req.body

    const result = await Estado.findByIdAndUpdateAsync(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await Estado.deleteOneAsync({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = Estados

