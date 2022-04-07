'use strict'

const mongoose = require('mongoose')

const UsuarioSchema = require('../schema/UsuarioSchema')

const Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = Usuario