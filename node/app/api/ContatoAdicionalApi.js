'use strict';

const Promise = require('bluebird')
const ContatoAdicional = Promise.promisifyAll(require('../model/ContatoAdicional'))

class ContatoAdicionalApi {
  static async findAll(req, res) {
    let queryParams = {}

    let projection = {}

    const result = await ContatoAdicional.find({ ...queryParams }, projection, {
      sort: { nome: 1 }
    }).catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = {}

    const result = await ContatoAdicional.findById(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    const contatoAdicional = new ContatoAdicional(data)

    contatoAdicional.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async update(req, res) {
    const id = req.params.id

    let data = req.body

    const result = await ContatoAdicional.findByIdAndUpdate(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await ContatoAdicional.deleteOne({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = ContatoAdicionalApi