import { customAlphabet } from 'nanoid'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export default class IdGenerator {
  static default() {
    const nanoid = customAlphabet(alphabet, 12)
    return nanoid()
  }
}