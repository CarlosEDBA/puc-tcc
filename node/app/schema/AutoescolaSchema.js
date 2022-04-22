'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID
const Mixed = Schema.Types.Mixed

const schema = new Schema({
  nome:               String,
}, {
  collection: 'autoescolas'
})

schema.plugin(mongooseFuzzySearching, { fields: ['nome'] })

module.exports = schema