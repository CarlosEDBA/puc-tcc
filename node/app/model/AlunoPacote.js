'use strict'

const mongoose = require('mongoose')

const AlunoPacoteSchema = require('../schema/AlunoPacoteSchema')

const AlunoPacote = mongoose.model('AlunoPacote', AlunoPacoteSchema)

module.exports = AlunoPacote