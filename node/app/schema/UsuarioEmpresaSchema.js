'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID
const Mixed = Schema.Types.Mixed

const schema = new Schema({
  usuario:              { type: ObjectId, ref: 'Usuario' },
  empresa:              { type: ObjectId, ref: 'Empresa' },
  funcao:               String,
}, {
  collection: 'usuario-empresa'
})

module.exports = schema