const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const nanoid = require('nanoid')

const JWT = function (options) {
    this.defaultOptions = {
        privateKey: '',
        publicKey: '',
        algorithm: 'RS256',
        expiresIn: '5d',
        notBefore: '120ms',
        audience: '',
        issuer: ''
    }

    this.options = { ...this.defaultOptions, ...options }
}

JWT.prototype.loadKeys = function () {
    return new Promise((resolve, reject) => {
        Promise.all([
            fs.statAsync(this.options.privateKey),
            fs.statAsync(this.options.publicKey),
            fs.readFileAsync(this.options.privateKey),
            fs.readFileAsync(this.options.publicKey)
        ])
          .then((result) => {
              if (!result[0].isFile())
                  reject(new Error('The private key provided is not a file'))

              if (!result[1].isFile())
                  reject(new Error('The public key provided is not a file'))

              this.options.privateKey = result[2]

              this.options.publicKey = result[3]

              resolve()
          })
          .catch(reject)
    })
}

JWT.prototype.generateToken = function (jwtid, subject, payload) {
    if (!jwtid) jwtid = nanoid(12)

    return new Promise((resolve, reject) => {
        jwt.sign(payload, this.options.privateKey, {
            algorithm: this.options.algorithm,
            expiresIn: this.options.expiresIn,
            notBefore: this.options.notBefore,
            audience: this.options.audience,
            issuer: this.options.issuer,
            jwtid: jwtid,
            subject: subject
        }, (err, token) => {
            if (err) reject(err)
            else resolve(token)
        })
    })
}

JWT.prototype.verifyToken = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, this.options.publicKey, {
            algorithms: [this.options.algorithm],
            audience: this.options.audience,
            issuer: this.options.issuer,
        }, (err, decoded) => {
            if (err) reject(err)
            else resolve(decoded)
        })
    })
}

JWT.prototype.getMiddleware = function (options = {}, unlessOptions = {}) {
    return expressJwt({
        algorithms: [this.options.algorithm],
        audience: this.options.audience,
        issuer: this.options.issuer,
        secret: this.options.publicKey,
        ...options
    }).unless(unlessOptions)
}

module.exports = JWT