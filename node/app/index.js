const core = require('../core')
const globals = require('./globals')
const setup = require('./setup')
const WebRouter = require('./router/WebRouter')
const ApiRouter = require('./router/ApiRouter')

const JWT = require('../core/auth/jwt')
const JWTUnauthorizedMiddleware = require('../core/middleware/JWTUnauthorizedMiddleware')

const jwt = new JWT({
    privateKey: globals.PRIVATE_KEY,
    publicKey: globals.PUBLIC_KEY,
    audience: 'conceptcfc',
    issuer: 'conceptcfc'
})

jwt.loadKeys()
  .then(() => {
      const JWTMiddleware = jwt.getMiddleware(undefined, {
          path: [
              '/',
              '/login',
              '/api/v1/token'
          ]
      })

      core({
          port: globals.SERVER_PORT,

          express: {
              corsWhitelist: [
                  'http://localhost:4000',
              ],

              middlewares: [
                  JWTMiddleware,
                  JWTUnauthorizedMiddleware
              ],

              routers: [
                  { baseRoute: '/api', router: ApiRouter, arguments: [jwt] },
                  { baseRoute: '/', router: WebRouter },
              ]
          },

          mongoose: {
              uri: 'mongodb://root:AquelaSenhaMarota@127.0.0.1:27017',
              dbName: 'conceptcfc'
          }
      })

      setup()
  })
  .catch(console.error)
