'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID

const schema = new Schema({
    pais:                   { type: ObjectId, ref: 'Pais' },
    capital:                { type: ObjectId, ref: 'Cidade' },
    nome:                   String,
    sigla:                  String,
    slug:                   String
}, {
    collection: 'estados'
})

schema.plugin(mongooseFuzzySearching, { fields: ['nome'] })

module.exports = schema