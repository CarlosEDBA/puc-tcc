'use strict';

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectID

const hidden = ['senha']

const schema = new mongoose.Schema({
    nome:               { type: String, required: true },
    sobrenome:          { type: String },
    email:              { type: String, required: true },
    senha:              { type: String, required: true },

    cpf:                String,
    telefone:           String,
    dataNascimento:     Date,
    sexo:               String,

    cep:                String,
    rua:                String,
    numero:             String,
    complemento:        String,
    bairro:             String,
    cidade:             { type: ObjectId, ref: 'Cidade' },
    estado:             { type: ObjectId, ref: 'Estado' },
    pais:               { type: ObjectId, ref: 'Pais' },
}, {
    collection: 'usuarios'
})

schema.plugin(mongooseFuzzySearching, { fields: ['nome', 'sobrenome', 'email'] })

schema.static({
    getHiddenFieldsProjection: function () {
        let obj = {}

        for (const fieldName of hidden) {
            obj[fieldName] = 0
        }

        return obj
    },

    hashPassword: async function (plainText) {
        const saltRounds = 10;
        return await bcrypt.hashAsync(plainText, saltRounds).catch(console.error);
    }
})

module.exports = schema