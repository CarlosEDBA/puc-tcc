'use strict'

const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema

const schema = new Schema({
    nome:                   String,
    sigla:                  String,
    gentilico:              String,
    slug:                   String
}, {
    collection: 'paises'
})

module.exports = schema