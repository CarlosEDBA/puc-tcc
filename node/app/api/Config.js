'use strict';

const Promise = require('bluebird')
const Config = Promise.promisifyAll(require('../model/Config'))

class Configs {
  static async findAll(req, res) {
    const count = req.params.count || 20
    const cursor = req.params.cursor

    let queryParams = {}
    if (cursor) queryParams = { ...queryParams, _id: { $gt: cursor } }

    let projection = {}

    const result = await Config.findAsync({ ...queryParams }, projection, {
      limit: count
    }).catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = {}

    const result = await Config.findByIdAsync(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    const config = new Config(data)

    config.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async update(req, res) {
    const id = req.params.id

    let data = req.body

    const result = await Config.findByIdAndUpdateAsync(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await Config.deleteOneAsync({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = Configs
