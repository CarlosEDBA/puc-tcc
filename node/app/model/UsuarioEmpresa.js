'use strict'

const mongoose = require('mongoose')

const UsuarioEmpresaSchema = require('../schema/UsuarioEmpresaSchema')

const UsuarioEmpresa = mongoose.model('UsuarioEmpresa', UsuarioEmpresaSchema)

module.exports = UsuarioEmpresa