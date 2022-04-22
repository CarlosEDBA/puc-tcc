'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID
const Mixed = Schema.Types.Mixed

const schema = new Schema({
  pacote:               { type: ObjectId, ref: 'Pacote' },
  servico:              { type: ObjectId, ref: 'Servico' },
  quantidade:           Number,
}, {
  collection: 'servicos-pacotes'
})

module.exports = schema