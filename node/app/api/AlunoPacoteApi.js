'use strict';

const Promise = require('bluebird')
const AlunoPacote = Promise.promisifyAll(require('../model/AlunoPacote'))

class AlunoPacoteApi {
  static async findAll(req, res) {
    const aluno = req.query.pacote

    let queryParams = {}
    if (aluno) queryParams = { ...queryParams, aluno: aluno }

    let projection = {}

    const result = await AlunoPacote.find(
        { ...queryParams },
        projection,
        {
          sort: { nome: 1 }
        })
        .populate('aluno')
        .populate('pacote')
        .catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = {}

    const result = await AlunoPacote.findById(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    const alunoPacote = new AlunoPacote(data)

    alunoPacote.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async update(req, res) {
    const id = req.params.id

    let data = req.body

    const result = await AlunoPacote.findByIdAndUpdate(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await AlunoPacote.deleteOne({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = AlunoPacoteApi