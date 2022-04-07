'use strict'

const mongoose = require('mongoose')

const CidadeSchema = require('../schema/CidadeSchema')

const Cidade = mongoose.model('Cidade', CidadeSchema)

module.exports = Cidade