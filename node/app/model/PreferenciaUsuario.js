'use strict'

const mongoose = require('mongoose')

const PreferenciaUsuarioSchema = require('../schema/PreferenciaUsuarioSchema')

const PreferenciaUsuario = mongoose.model('PreferenciaUsuario', PreferenciaUsuarioSchema)

module.exports = PreferenciaUsuario