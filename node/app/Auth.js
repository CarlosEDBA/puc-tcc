const bcrypt = require('bcrypt')

const Usuario = require('./model/Usuario')

function authenticate(jwt, email, senha) {
  return new Promise(async (resolve, reject) => {
    if (email && typeof email === 'string') email = email.toLowerCase()

    if (email && senha) {
      let usuario = await Usuario.findOne({ email: email })
          .catch((err) => {
            reject(new Error('Invalid credentials.'))
          })

      if (usuario) {
        usuario = usuario.toObject()
        const idUsuario = usuario._id.toString()

        console.log('usuario', usuario)
        console.log('email', email)
        console.log('senha', senha)

        bcrypt.compare(senha, usuario.senha, async (err, matches) => {
          console.log('matches', matches)

          if (matches) {
            const payload = {
              _id: idUsuario,
              nome: usuario.nome,
              sobrenome: usuario.sobrenome,
              email: usuario.email,
              funcao: usuario.funcao
            }

            const token = await jwt.generateToken(null, idUsuario, payload)
                .catch((err) => {
                  reject(new Error('Error while generating token.'))
                })

            console.log('auth token', token)

            resolve(token)

            return token
          } else {
            reject(new Error('Invalid credentials.'))
          }
        })
      } else {
        reject(new Error('Invalid credentials.'))
      }
    } else {
      reject(new Error('Missing credentials.'))
    }
  })
}

function validate(jwt, token) {
  return new Promise(async (resolve, reject) => {
    if (token) {
      const tokenIsValid = await jwt.verifyToken(token)
          .catch((err) => {
            reject(new Error('Invalid token.'))
          })

      if (tokenIsValid) resolve(token)
    } else {
      reject(new Error('Token not provided.'))
    }
  })
}

function renew(jwt, token) {
  return new Promise(async (resolve, reject) => {
    if (token) {
      const decodedToken = await jwt.verifyToken(token)
          .catch((err) => {
            reject(new Error('Invalid token.'))
          })

      if (decodedToken) {
        const payload = {
          _id: decodedToken._id,
          nome: decodedToken.nome,
          sobrenome: decodedToken.sobrenome,
          email: decodedToken.email,
          foto: decodedToken.foto
        }

        const token = await jwt.generateToken(null, decodedToken._id, payload)
            .catch((err) => {
              reject(new Error('Error while renewing the token.'))
            })

        resolve(token)
      } else {
        reject(new Error('Error while renewing the token.'))
      }
    } else {
      reject(new Error('Token not provided.'))
    }
    
  })
}

module.exports = {
  authenticate, validate, renew
}