import * as types from '@/actionTypes'

export function open(focusedElement) {
  return {
    type: types.OPEN_CONTEXT_MENU,
    payload: {
      focusedElement: focusedElement,
    }
  }
}
export function close() {
  return {
    type: types.CLOSE_CONTEXT_MENU,
    payload: null
  }
}