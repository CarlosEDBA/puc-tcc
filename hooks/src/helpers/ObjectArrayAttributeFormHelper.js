import store from '@/store'

export default {
  getRawValue(parentFormId, attribute, index, subAttribute) {
    let state = store.getState()
    let forms = state.Forms
    let parentForm = forms[parentFormId]

    if (parentForm) {
      let value = ''
      let arr = parentForm['raw'][attribute]

      if (Array.isArray(arr)) {
        if (arr[index]) {
          value = arr[index][subAttribute]
        }
      }

      return value
    }
  },

  getComputedValue(parentFormId, attribute, index, subAttribute) {
    let state = store.getState()
    let forms = state.Forms
    let parentForm = forms[parentFormId]

    if (parentForm) {
      let value = ''
      let arr = parentForm['computed'][attribute]

      if (Array.isArray(arr)) {
        if (arr[index]) {
          value = arr[index][subAttribute]
        }
      }

      return value
    }
  }
}