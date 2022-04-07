const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const express = require('express')
const multer = require('multer')
const bcrypt = require('bcrypt')

const Usuario = require('../api/Usuarios')

const AuthEndpoint = require('../endpoints/AuthEndpoint')
const PublicEndpoint = require('../endpoints/PublicEndpoint')
const MainEndpoint = require('../endpoints/MainEndpoint')
const FileSystemEndpoint = require('../endpoints/FileSystemEndpoint')
const SearchEndpoint = require('../endpoints/SearchEndpoint')

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

    if (data.email && typeof data.email === 'string') data.email = data.email.toLowerCase()

    if (data.email && data.senha) {
      let usuario = await Usuario.findOne({ email: data.email }).catch((err) => {
        res.json({
          token: null,
          error: {
            code: 1000,
            message: 'An error occurred.'
          }
        })
      })

      if (usuario) {
        usuario = usuario.toObject()
        const idUsuario = usuario._id.toString()

        bcrypt.compare(data.senha, usuario.senha, async (err, matches) => {
          if (matches) {
            const payload = {
              _id: idUsuario,
              nome: usuario.nome,
              sobrenome: usuario.sobrenome,
              email: usuario.email,
              foto: usuario.foto
            }

            const token = await jwt.generateToken(null, idUsuario, payload).catch((err) => {
              res.json({
                token: null,
                error: {
                  code: 1000,
                  message: 'An error occurred.'
                }
              })
            })

            res.json({ token: token })
          } else {
            res.json({
              token: null,
              error: {
                code: 1001,
                message: 'Wrong credentials.'
              }
            })
          }
        })
      } else {
        res.json({
          token: null,
          error: {
            code: 1001,
            message: 'Wrong credentials.'
          }
        })
      }
    } else {
      res.json({
        token: null,
        error: {
          code: 1001,
          message: 'Credentials missing.'
        }
      })
    }
  })

  router.post('/v1/token/validate', ...parsers, async (req, res) => {
    const data = req.body

    if (data.token) {
      const tokenIsValid = await jwt.verifyToken(data.token).catch((err) => {
        res.json({
          token: null,
          error: {
            message: 'Invalid token.'
          }
        })
      })

      if (tokenIsValid) res.json({ token: data.token })
    } else {
      res.json({
        token: null,
        error: {
          message: 'Token not provided.'
        }
      })
    }
  })

  router.post('/v1/token/renew', express.urlencoded({ extended: true }), async (req, res) => {
    const data = req.body

    if (data.token) {
      const decodedToken = await jwt.verifyToken(data.token).catch((err) => {
        res.json({
          token: null,
          error: {
            message: 'Invalid token.'
          }
        })
      })

      if (decodedToken) {
        const payload = {
          _id: decodedToken._id,
          nome: decodedToken.nome,
          sobrenome: decodedToken.sobrenome,
          email: decodedToken.email,
          foto: decodedToken.foto
        }

        const token = await jwt.generateToken(null, decodedToken._id, payload).catch((err) => {
          res.json({
            token: null,
            error: {
              message: 'An error occurred.'
            }
          })
        })

        res.json({ token: token })
      } else {
        res.json({
          token: null,
          error: {
            message: 'An error occurred.'
          }
        })
      }
    } else {
      res.json({
        token: null,
        error: {
          message: 'Token not provided.'
        }
      })
    }
  })

  return router
}