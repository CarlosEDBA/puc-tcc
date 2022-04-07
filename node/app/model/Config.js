'use strict'

const mongoose = require('mongoose')

const ConfigSchema = require('../schema/ConfigSchema')

const Config = mongoose.model('Config', ConfigSchema)

module.exports = Config