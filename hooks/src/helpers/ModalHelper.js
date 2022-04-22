import update from 'immutability-helper'

import { openModal, closeModal } from '@/actions/Modal'

import FormHelper from '@/helpers/FormHelper'

import store from '@/store'

export default {
  getModal(modalName) {
    let state = store.getState()
    let modal = state.Modal[modalName]

    if (modal) return modal
  },

  getParam(modalName, paramName) {
    let state = store.getState()
    let modal = state.Modal[modalName]

    if (modal) {
      let modalParams = modal.params

      if (modalParams) {
        return modalParams[paramName]
      }
    }
  },

  setParam(modalName, paramName, paramValue) {
    let state = store.getState()
    let modal = state.Modal[modalName]

    if (!modal.params) modal.params = {}

    modal.params[paramName] = paramValue
  },

  getHandler(modalName, eventName) {
    let state = store.getState()
    let modal = state.Modal[modalName]

    if (modal) {
      let modalHandlers = modal.handlers

      if (modalHandlers) {
        return modalHandlers[eventName]
      }
    }
  },

  setHandler(modalName, eventName, eventHandler) {
    let state = store.getState()
    let modal = state.Modal[modalName]

    if (!modal.handlers) modal.handlers = {}

    modal.handlers[eventName] = eventHandler
  },

  getData(modalName) {
    let state = store.getState()
    let modal = state.Modal[modalName]

    if (modal) {
      if (modal.data) return modal.data
    }
  },

  setData(modalName, data) {
    let state = store.getState()
    let modal = state.Modal[modalName]

    state.Modal[modalName] = update(modal, {
      data: data
    })
  },

  getRawValue(modalName, formId, attribute) {
    let state = store.getState()
    let modal = state.Modal[modalName]

    let value = FormHelper.getDataAttribute(formId, attribute)

    if (modal && value === '') {
      value = modal.data[attribute] || ''
    }

    return value
  },

  getComputedValue(modalName, formId, attribute) {
    let state = store.getState()
    let modal = state.Modal[modalName]

    let value = FormHelper.getMetaAttribute(formId, attribute)

    if (modal && value === '') {
      value = modal.data[attribute] || ''
    }

    return value
  },

  open(modalProps) {
    return store.dispatch(openModal(modalProps))
  },

  close(modalName) {
    return store.dispatch(closeModal(modalName))
  },
}