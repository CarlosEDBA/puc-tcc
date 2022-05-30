'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID
const Mixed = Schema.Types.Mixed

const schema = new Schema({
  aluno:                { type: ObjectId, ref: 'Aluno' },
  servico:              { type: ObjectId, ref: 'Servico' },
  quantidade:           Number,
  data:                 { type: Date, default: Date.now },
}, {
  collection: 'alunos-servicos'
})

module.exports = schema