import { PRODUCTION } from '@/globals'

const Log = {
  dev: function () {
    if (!PRODUCTION) console.log(...arguments)
  }
}

export default Log