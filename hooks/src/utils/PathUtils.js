import * as StrUtils from '@/utils/StrUtils'

export function toSlash(str) {
  return StrUtils.replaceAll(str, '\\', '/')
}

export function toBackslash(str) {
  return StrUtils.replaceAll(str, '/', '\\')
}