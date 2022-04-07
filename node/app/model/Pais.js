'use strict'

const mongoose = require('mongoose')

const PaisSchema = require('../schema/PaisSchema')

const Pais = mongoose.model('Pais', PaisSchema)

module.exports = Pais