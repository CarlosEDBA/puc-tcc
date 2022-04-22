'use strict'

const mongoose = require('mongoose')

const PacoteSchema = require('../schema/PacoteSchema')

const Pacote = mongoose.model('Pacote', PacoteSchema)

module.exports = Pacote