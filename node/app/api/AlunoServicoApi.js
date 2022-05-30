'use strict';

const Promise = require('bluebird')
const AlunoServico = Promise.promisifyAll(require('../model/AlunoServico'))

class AlunoServicoApi {
  static async findAll(req, res) {
    const aluno = req.query.pacote

    let queryParams = {}
    if (aluno) queryParams = { ...queryParams, aluno: aluno }

    let projection = {}

    const result = await AlunoServico.find(
        { ...queryParams },
        projection,
        {
          sort: { nome: 1 }
        })
        .populate('aluno')
        .populate('servico')
        .catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = {}

    const result = await AlunoServico.findById(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    const alunoServico = new AlunoServico(data)

    alunoServico.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async update(req, res) {
    const id = req.params.id

    let data = req.body

    const result = await AlunoServico.findByIdAndUpdate(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await AlunoServico.deleteOne({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = AlunoServicoApi