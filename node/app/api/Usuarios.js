const Promise = require('bluebird')

const Usuario = Promise.promisifyAll(require('../model/Usuario'))

function attrToMongoSyntax(attributes) {
  let arr = []

  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i]

    arr.push(`$${attribute}`)

    if (i !== attributes.length - 1) arr.push(' ')
  }

  return arr
}

class Usuarios {
  static async suggestions(req, res) {
    let data = req.body
    let str = data.str
    let attributes = data.attributes

    let projection = Usuario.getHiddenFieldsProjection()

    let pipeline = []

    if (attributes) {
      pipeline.push({
        $project: {
          label: { $concat: attrToMongoSyntax(attributes) }
        },
      })

      pipeline.push({
        $project: {
          ...projection
        },
      })

      pipeline.push({
        $match: {
          label: { $regex: new RegExp(`${str}`, 'i') }
        }
      })
    }

    const result = await Usuario.aggregate(pipeline).catch(console.error)

    res.send(result)
  }

  static async findAll(req, res) {
    let queryParams = {}

    let projection = Usuario.getHiddenFieldsProjection()

    const result = await Usuario.findAsync({ ...queryParams }, projection).catch(console.error)

    res.send(result)
  }

  static async findOneById(req, res) {
    const id = req.params.id

    let projection = Usuario.getHiddenFieldsProjection()

    const result = await Usuario.findByIdAsync(id, projection).catch(console.error)

    res.send(result)
  }

  static async create(req, res) {
    let data = req.body

    if (data['senha']) {
      data = { ...data, password: await Usuario.hashPassword(data['senha']) }
    }

    const usuario = new Usuario(data)

    usuario.save().then((document) => {
      res.sendStatus(201)
    }).catch((err) => {
      res.sendStatus(400)
    })
  }

  static async updateOneById(req, res) {
    const id = req.params.id
    let data = req.body

    if (data['senha']) {
      data = { ...data, password: await Usuario.hashPassword(data['senha']) }
    }

    const result = await Usuario.findByIdAndUpdateAsyncs(id, data).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }

  static async delete(req, res) {
    const id = req.params.id

    const result = await Usuario.deleteOneAsync({ _id: id }).catch(console.error)

    if (result) res.sendStatus(200)
    else res.sendStatus(400)
  }
}

module.exports = Usuarios