const path = require('path')
const express = require('express')

module.exports = () => {
    const router = express.Router()

    router.get('/', (req, res) => {
        res.sendFile(path.resolve(global.publicDir + '/index.html'))
    })

    return router
}