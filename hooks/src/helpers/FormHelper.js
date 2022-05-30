import Ajv from 'ajv'

import { newForm, updateForm, updateFormMetaAttribute, updateFormDataAttribute, resetForm, removeForm } from '@/actions/Form'

import UsuarioSchema from '@/schema/UsuarioSchema'

import NetworkHelper from '@/helpers/NetworkHelper'

import IdGenerator from '@/utils/IdGenerator'

import store from '@/store'

const schemas = {
  Usuario: UsuarioSchema,
}

export default {
  setObjectId(formId, objectId) {
    store.dispatch(updateForm(formId, {
      $merge: {
        meta: {
          _id: objectId
        }
      }
    }))
  },

  getById(formId) {
    let state = store.getState()
    let Forms = state.Forms

    if (Forms[formId]) return Forms[formId]

    return null
  },

  dataAttributeIsUndefined(formId, attribute) {
    let state = store.getState()
    let Forms = state.Forms
    let form = Forms[formId]

    if (form) {
      if (form.data[attribute] !== undefined) return false
    }

    return true
  },

  metaAttributeIsUndefined(formId, attribute) {
    let state = store.getState()
    let Forms = state.Forms
    let form = Forms[formId]

    if (form) {
      if (form.meta[attribute] !== undefined) return false
    }

    return true
  },

  getDataAttribute(formId, attribute) {
    let state = store.getState()
    let Forms = state.Forms
    let form = Forms[formId]

    if (form) {
      return form.data[attribute] || ''
    }

    return ''
  },

  getMetaAttribute(formId, attribute) {
    let state = store.getState()
    let Forms = state.Forms
    let form = Forms[formId]

    if (form) {
      return form.meta[attribute] || ''
    }

    return ''
  },

  setMetaAttribute(formId, attribute, value) {
    if (formId) {
      store.dispatch(updateFormMetaAttribute(formId, attribute, value))
    }
  },

  setDataAttribute(formId, attribute, value) {
    if (formId) {
      store.dispatch(updateFormDataAttribute(formId, attribute, value))
    }
  },

  new({ formId, props } = {}) {
    if (!formId) formId = IdGenerator.default()

    store.dispatch(newForm(formId, props))

    return formId
  },

  update(formId, props) {
    return store.dispatch(updateForm(formId, props))
  },

  remove(formId) {
    return store.dispatch(removeForm(formId))
  },

  reset(formId) {
    store.dispatch(resetForm(formId))
  },

  async submit(props, process, endpoint) {
    let formId = props.id
    let requestId = null

    let payload = {
      //id: id, // problem when the form id stays the same due to same component lifecycle
      formId: formId,
      model: props.model,
      action: props.action,
      dependsOn: props.dependsOn || null,
      status: 'idle',
      type: props.type || 'object',
    }

    let state = store.getState()
    let forms = state.Forms
    let form = forms[formId]

    payload.meta = form.meta || {}
    payload.data = form.data || {}

    /*
    if (!NetworkHelper.requestExists(id)) {
      requestId = NetworkHelper.newRequest(payload)
    } else {
      NetworkHelper.updateRequest(id, payload)
    }*/

    requestId = NetworkHelper.newRequest(payload)

    if (process) {
      return NetworkHelper.process(requestId)
    }
  },

  getSchema(modelName) {
    if (schemas[modelName]) return schemas[modelName]

    return null
  },

  getFormResponse(responses, formId) {
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i]

      if (response.formId === formId) return response
    }

    return null
  },

  validate(formProps) {
    return new Promise((resolve, reject) => {
      const form = this.getById(formProps.id)

      if (form) {
        let schema

        if (formProps.validator) {
          schema = this.getSchema(formProps.validator)
        } else {
          schema = this.getSchema(formProps.model)
        }

        console.log(formProps, schema)

        if (schema) {
          const ajv = new Ajv({
            allErrors: true
          })
          const ajvValidator = ajv.compile(schema)
          const data = {...form.data, ...form.meta}
          const result = ajvValidator(data)

          if (result) resolve()
          else reject(ajvValidator.errors)
        } else {
          reject(new Error('Model schema not found.'))
        }
      }

      resolve()
      //reject(new Error('Form not found.'))
    })
  }
}

