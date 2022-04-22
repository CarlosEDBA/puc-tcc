'use strict';

const Promise = require('bluebird')
const PreferenciaUsuario = Promise.promisifyAll(require('../model/PreferenciaUsuario'))

class PreferenciaUsuarioApi {
  static async findAll(req, res) {
    const count = req.query.count || 20
    const cursor = req.query.cursor
    const usuario = req.query.usuario

    let queryParams = {}
    if (cursor) queryParams = { ...queryParams, _id: { $gt: cursor } }
    if (usuario) queryParams = { ...queryParams, usuario: usuario }

    let projection = {}

    const result = await PreferenciaUsuario.find(
        { ...queryParams },
        projection,
        {
          limit: count
        }).catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = {}

    const result = await PreferenciaUsuario.findById(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    const preferenciaUsuario = new PreferenciaUsuario(data)

    preferenciaUsuario.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async update(req, res) {
    const id = req.params.id

    let data = req.body

    const result = await PreferenciaUsuario.findByIdAndUpdate(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await PreferenciaUsuario.deleteOne({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = PreferenciaUsuarioApi
