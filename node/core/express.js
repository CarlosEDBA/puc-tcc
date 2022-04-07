const path = require('path')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const multer = require('multer')

function init(options) {
    options.publicDir = path.resolve(__dirname, '../public')

    const app = express()

    app.use(morgan(options.morgan))

    app.use(helmet())

    app.use(cors({
        origin: function (origin, callback) {
            if (options.corsWhitelist.indexOf(origin) !== -1 || origin === undefined) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }))

    app.use(express.static(options.publicDir))

    for (const middleware of options.middlewares) {
        app.use(middleware)
    }

    for (const router of options.routers) {
        if (!router.arguments) router.arguments = []
        if (router.baseRoute && router.router) app.use(router.baseRoute, router.router(...router.arguments))
        else app.use(router)
    }

    return app
}

module.exports = (options) => {
    let defaultOptions = {
        publicDir: path.resolve(__dirname, '../public'),
        morgan: 'combined',
        corsWhitelist: [],
        middlewares: [],
        routers: []
    }

    options = {...defaultOptions, ...options}

    return init(options)
}