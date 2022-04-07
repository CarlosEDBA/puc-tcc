'use strict'

const mongoose = require('mongoose')

const EstadoSchema = require('../schema/EstadoSchema')

const Estado = mongoose.model('Estado', EstadoSchema)

module.exports = Estado