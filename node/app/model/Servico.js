'use strict'

const mongoose = require('mongoose')

const ServicoSchema = require('../schema/ServicoSchema')

const Servico = mongoose.model('Servico', ServicoSchema)

module.exports = Servico