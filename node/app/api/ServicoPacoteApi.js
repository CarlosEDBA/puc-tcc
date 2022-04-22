'use strict';

const Promise = require('bluebird')
const ServicoPacote = Promise.promisifyAll(require('../model/ServicoPacote'))

class ServicoPacoteApi {
  static async findAll(req, res) {
    let queryParams = {}

    let projection = {}

    const result = await ServicoPacote.find(
        { ...queryParams },
        projection,
        {
          sort: { nome: 1 }
        })
        .populate('pacote')
        .populate('servico')
        .catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = {}

    const result = await ServicoPacote.findById(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    const servicoPacote = new ServicoPacote(data)

    servicoPacote.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async update(req, res) {
    const id = req.params.id

    let data = req.body

    const result = await ServicoPacote.findByIdAndUpdate(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await ServicoPacote.deleteOne({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = ServicoPacoteApi