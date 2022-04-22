'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID
const Mixed = Schema.Types.Mixed

const schema = new Schema({
  usuario:            { type: ObjectId, ref: 'Usuario' },
  nome:               String,
  valor:              Mixed,
}, {
  collection: 'preferencias-usuarios'
})

module.exports = schema