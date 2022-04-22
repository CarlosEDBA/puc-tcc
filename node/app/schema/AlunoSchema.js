'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID
const Mixed = Schema.Types.Mixed

const schema = new Schema({
  nome:               String,
  sobrenome:          String,
  nomeMae:            String,
  nomePai:            String,
  dataNascimento:     Date,
  sexo:               String,
  cpf:                String,
  tipoDocumento:      { type: ObjectId, ref: 'TipoDocumento' },
  numeroDocumento:    String,
  ufDocumento:        String,
  telefone:           String,
  celular:            String,

  cep:                String,
  rua:                String,
  numero:             String,
  complemento:        String,
  bairro:             String,
  cidade:             String,
  estado:             String,
  pais:               String,

  numeroProcesso:     String,
  inicioProcesso:     Date,
  fimProcesso:        Date,
  statusProcesso:     { type: ObjectId, ref: 'StatusProcesso' },

}, {
  collection: 'alunos'
})

schema.plugin(mongooseFuzzySearching, { fields: ['nome', 'sobrenome', 'cpf', 'numeroDocumento'] })

module.exports = schema