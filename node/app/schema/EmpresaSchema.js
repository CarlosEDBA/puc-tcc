'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID
const Mixed = Schema.Types.Mixed

const schema = new Schema({
  autoescola:               { type: ObjectId, ref: 'Autoescola' },
  nome:                     String,
  cnpj:                     { type: String, required: true },

  nomeFantasia:             String,
  razaoSocial:              String,
  telefone:                 String,
  rua:                      String,
  numero:                   String,
  complemento:              String,
  bairro:                   String,
  cidade:                   { type: ObjectId, ref: 'Cidade' },
  estado:                   { type: ObjectId, ref: 'Estado' },
  pais:                     { type: ObjectId, ref: 'Pais' },
}, {
  collection: 'empresas'
})

schema.plugin(mongooseFuzzySearching, { fields: ['nome'] })

module.exports = schema