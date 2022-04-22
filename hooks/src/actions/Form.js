import * as types from '@/actionTypes'

export function newForm(id, props) {
  return {
    type: types.NEW_FORM,
    payload: {
      id: id,
      props: props
    }
  }
}

export function updateForm(id, props) {
  return {
    type: types.UPDATE_FORM,
    payload: {
      id: id,
      props: props,
    }
  }
}

export function updateFormMetaAttribute(id, name, value) {
  return {
    type: types.UPADTE_FORM_META_ATTRIBUTE,
    payload: {
      id: id,
      name: name,
      value: value,
    }
  }
}

export function updateFormDataAttribute(id, name, value) {
  return {
    type: types.UPADTE_FORM_DATA_ATTRIBUTE,
    payload: {
      id: id,
      name: name,
      value: value,
    }
  }
}

export function resetForm(id) {
  return {
    type: types.RESET_FORM,
    payload: {
      id: id,
    }
  }
}

export function removeForm(id) {
  return {
    type: types.REMOVE_FORM,
    payload: {
      id: id,
    }
  }
}