'use strict';
                                                       
const Promise = require('bluebird')
const Pais = Promise.promisifyAll(require('../model/Pais'))

class Paises {
  static async findAll(req, res) {
    const search = req.query.search

    let queryParams = {}
    if (search) queryParams = { ...queryParams, $text: { $search: search } }

    let projection = {}

    const result = await Pais.findAsync({ ...queryParams }, projection, {
      sort: { nome: 1 }
    }).catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = {}

    const result = await Pais.findByIdAsync(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    const pais = new Pais(data)

    pais.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async update(req, res) {
    const id = req.params.id

    let data = req.body

    const result = await Pais.findByIdAndUpdateAsync(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await Pais.deleteOneAsync({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = Paises
