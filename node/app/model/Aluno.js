'use strict'

const mongoose = require('mongoose')

const AlunoSchema = require('../schema/AlunoSchema')

const Aluno = mongoose.model('Aluno', AlunoSchema)

module.exports = Aluno