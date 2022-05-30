'use strict'

const mongoose = require('mongoose')

const AlunoServicoSchema = require('../schema/AlunoServicoSchema')

const AlunoServico = mongoose.model('AlunoServico', AlunoServicoSchema)

module.exports = AlunoServico