'use strict'

const mongoose = require('mongoose')

const StatusProcessoSchema = require('../schema/StatusProcessoSchema')

const StatusProcesso = mongoose.model('StatusProcesso', StatusProcessoSchema)

module.exports = StatusProcesso