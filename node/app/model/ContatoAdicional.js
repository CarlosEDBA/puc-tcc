'use strict'

const mongoose = require('mongoose')

const ContatoAdicionalSchema = require('../schema/ContatoAdicionalSchema')

const ContatoAdicional = mongoose.model('ContatoAdicional', ContatoAdicionalSchema)

module.exports = ContatoAdicional