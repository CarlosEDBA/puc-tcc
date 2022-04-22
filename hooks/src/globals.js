export const PRODUCTION = false
export const BASEPATH = (PRODUCTION) ? '' : ''

export const SERVER_PORT = location.port
export const SERVER_ADDRESS = (PRODUCTION) ? 'http://carlosalmeida.co:27300' : `http://192.168.1.5:27300`
export const API_ENDPOINT = `${SERVER_ADDRESS}/api/v1`

