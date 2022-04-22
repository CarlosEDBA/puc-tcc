'use strict'

const mongoose = require('mongoose')

const ServicoPacoteSchema = require('../schema/ServicoPacoteSchema')

const ServicoPacote = mongoose.model('ServicoPacote', ServicoPacoteSchema)

module.exports = ServicoPacote