'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

module.exports = new Schema({
    name: String,
    value: Mixed,
    autoload: Boolean,
}, {
    collection: 'config'
})