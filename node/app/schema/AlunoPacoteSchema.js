'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID
const Mixed = Schema.Types.Mixed

const schema = new Schema({
  aluno:                { type: ObjectId, ref: 'Aluno' },
  pacote:               { type: ObjectId, ref: 'Pacote' },
  data:                 { type: Date, default: Date.now },
}, {
  collection: 'alunos-pacotes'
})

module.exports = schema