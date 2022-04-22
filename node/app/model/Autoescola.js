'use strict'

const mongoose = require('mongoose')

const AutoescolaSchema = require('../schema/AutoescolaSchema')

const Autoescola = mongoose.model('Autoescola', AutoescolaSchema)

module.exports = Autoescola