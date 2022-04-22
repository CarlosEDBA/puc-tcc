'use strict'

const mongoose = require('mongoose')

const EmpresaSchema = require('../schema/EmpresaSchema')

const Empresa = mongoose.model('Empresa', EmpresaSchema)

module.exports = Empresa