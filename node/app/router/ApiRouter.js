const fs = require('fs')
const path = require('path')
const express = require('express')
const multer = require('multer')

const PaisApi = require('../api/PaisApi')
const EstadoApi = require('../api/EstadoApi')
const CidadeApi = require('../api/CidadeApi')
const PacoteApi = require('../api/PacoteApi')
const ServicoApi = require('../api/ServicoApi')
const ServicoPacoteApi = require('../api/ServicoPacoteApi')
const TipoDocumentoApi = require('../api/TipoDocumentoApi')
const StatusProcessoApi = require('../api/StatusProcessoApi')
const PreferenciaUsuarioApi = require('../api/PreferenciaUsuarioApi')

const MainEndpoint = require('../endpoints/MainEndpoint')
const PublicEndpoint = require('../endpoints/PublicEndpoint')
const FileSystemEndpoint = require('../endpoints/FileSystemEndpoint')

const Auth = require('../Auth')

const globals = require('../globals')

module.exports = (jwt) => {
  const router = express.Router()

  const parsers = [
    express.urlencoded({ extended: true }),
    express.json()
  ]

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const safePath = req.body.path

      if (safePath) {
        const fullPath = path.resolve(globals.DATA_DIR, safePath)

        fs.access(fullPath, (err) => {
          if (err) {
            fs.mkdir(fullPath, (err) => {
              if (!err) cb(null, path.resolve(globals.DATA_DIR, fullPath))
              else cb(null, null)
            })
          } else {
            cb(null, path.resolve(globals.DATA_DIR, fullPath))
          }
        })
      }
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  const upload = multer({ storage: storage })

  router.get('/v1/paises/:id', PaisApi.findOneById)
  router.get('/v1/paises', PaisApi.findAll)

  router.get('/v1/estados/:id', EstadoApi.findOneById)
  router.get('/v1/estados', EstadoApi.findAll)

  router.get('/v1/cidades/:id', CidadeApi.findOneById)
  router.get('/v1/cidades', CidadeApi.findAll)

  router.get('/v1/pacotes/:id', PacoteApi.findOneById)
  router.get('/v1/pacotes', PacoteApi.findAll)

  router.get('/v1/servicos/:id', ServicoApi.findOneById)
  router.get('/v1/servicos', ServicoApi.findAll)

  router.get('/v1/servicos-pacotes/:id', ServicoPacoteApi.findOneById)
  router.get('/v1/servicos-pacotes', ServicoPacoteApi.findAll)

  router.get('/v1/tipos-documentos/:id', TipoDocumentoApi.findOneById)
  router.get('/v1/tipos-documentos', TipoDocumentoApi.findAll)

  router.get('/v1/status-processos/:id', StatusProcessoApi.findOneById)
  router.get('/v1/status-processos', StatusProcessoApi.findAll)

  router.get('/v1/preferencias-usuarios/:id', PreferenciaUsuarioApi.findOneById)
  router.get('/v1/preferencias-usuarios', PreferenciaUsuarioApi.findAll)

  router.post(
      '/v1/public',
      ...parsers,
      PublicEndpoint.process
  )

  router.post(
      '/v1/main',
      ...parsers,
      MainEndpoint.process
  )

  router.post(
      '/v1/filesystem',
      ...parsers,
      upload.array('file[]', 10),
      FileSystemEndpoint.process
  )

  router.post(
      '/v1/search',
      ...parsers,
      MainEndpoint.search
  )

  router.post('/v1/token', ...parsers, async (req, res) => {
    const data = req.body

    // todo: transform jwt to singleton

    const token = await Auth.authenticate(jwt, data.email, data.senha)
        .catch((err) => {
          res.json({
            error: err.message
          })
        })

    if (token) res.json({ token: token })
  })

  router.post('/v1/token/validate', ...parsers, async (req, res) => {
    const data = req.body

    const token = await Auth.validate(jwt, data.token)
        .catch((err) => {
          res.json({
            error: err.message
          })
        })

    if (token) res.json({ token: token })
  })

  router.post('/v1/token/renew', express.urlencoded({ extended: true }), async (req, res) => {
    const data = req.body

    const token = await Auth.renew(jwt, data.token)
        .catch((err) => {
          res.json({
            error: err.message
          })
        })

    if (token) res.json({ token: token })
  })

  return router
}