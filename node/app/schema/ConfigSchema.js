'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
    name: String,
    value: String,
    autoload: Boolean,
}, {
    collection: 'config'
})