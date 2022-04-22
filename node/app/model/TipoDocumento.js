'use strict'

const mongoose = require('mongoose')

const TipoDocumentoSchema = require('../schema/TipoDocumentoSchema')

const TipoDocumento = mongoose.model('TipoDocumento', TipoDocumentoSchema)

module.exports = TipoDocumento