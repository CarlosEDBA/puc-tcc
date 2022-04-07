const bcrypt = require('bcrypt')

const Usuario = require('../api/Usuarios')

async function generate(req, res) {
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
}

async function validate(req, res) {
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
}

async function renew(req, res) {
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
}

module.exports = {
    generate, validate, renew
}