'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID

const schema = new Schema({
    pais:                   { type: ObjectId, ref: 'Pais' },
    estado:                 { type: ObjectId, ref: 'Estado' },
    nome: String,
    slug: String
}, {
    collection: 'cidades'
})

schema.plugin(mongooseFuzzySearching, { fields: ['nome'] })

module.exports = schema