'use strict';

const Promise = require('bluebird')
const Cidade = Promise.promisifyAll(require('../model/Cidade'))

class CidadeApi {
  static async findAll(req, res) {
    const pais = req.query.pais
    const estado = req.query.estado
    const search = req.query.search

    let queryParams = {}
    if (pais) queryParams = { ...queryParams, pais: pais }
    if (estado) queryParams = { ...queryParams, estado: estado }
    if (search) queryParams = { ...queryParams, $text: { $search: search } }

    let projection = {}

    const result = await Cidade.findAsync({ ...queryParams }, projection, {
      sort: { nome: 1 }
    }).catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = {}

    const result = await Cidade.findByIdAsync(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    const cidade = new Cidade(data)

    cidade.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async update(req, res) {
    const id = req.params.id

    let data = req.body

    const result = await Cidade.findByIdAndUpdateAsync(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await Cidade.deleteOneAsync({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = CidadeApi

