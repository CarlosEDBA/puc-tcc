import axios from 'axios'

import FormHelper from '@/helpers/FormHelper'

import { trocarNomeSiglaEstado } from '@/utils/BrasilUtils'

export function preencherEnderecoPorCep(formId, cep) {
    console.log(formId, cep)
    if (cep.charAt(9) !== '' && cep.charAt(9) !== '_') {
        const cepNumber = parseInt(cep.replace('.', '').replace('-', ''))

        if (cepNumber) {
            axios({
                method: 'get',
                url: `https://viacep.com.br/ws/${cepNumber}/json/`
            }).then((response) => {
                console.log(response)
                if (!response.data.erro) {
                    FormHelper.setDataAttribute(formId, 'rua', { $set: response.data.logradouro })
                    FormHelper.setDataAttribute(formId, 'numero', { $set: response.data.complemento })
                    FormHelper.setDataAttribute(formId, 'bairro', { $set: response.data.bairro })
                    FormHelper.setDataAttribute(formId, 'cidade', { $set: response.data.localidade })
                    FormHelper.setDataAttribute(formId, 'estado', { $set: trocarNomeSiglaEstado(response.data.uf) })
                    FormHelper.setDataAttribute(formId, 'pais', { $set: 'Brasil' })
                }
            }).catch(console.error)
        }
    }
}