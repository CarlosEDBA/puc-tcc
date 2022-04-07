'use strict';

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const mongoose = require('mongoose')
const mongooseFuzzySearching = require('mongoose-fuzzy-searching')

const hidden = ['senha']

const schema = new mongoose.Schema({
    nome:           { type: String, required: true },
    sobrenome:      { type: String },
    email:          { type: String, required: true },
    senha:          { type: String, required: true },
    telefone:       String,
    funcao:         String,
}, {
    collection: 'usuarios'
})

schema.plugin(mongooseFuzzySearching, { fields: ['nome', 'sobrenome', 'email', 'telefone'] })

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