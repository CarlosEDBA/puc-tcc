const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const globals = require('../app/globals');

const express = require('./express');

function initExpress(options) {
    return express(options);
}

function initHttpServer(app) {
    return http.Server(app);
}

function initSocketIO(httpServer) {
    return socketio(httpServer);
}

function initMongoose(options) {
    let mongooseOptions = { ...options };

    delete mongooseOptions.uri;

    mongoose.connect(options.uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        ...mongooseOptions
    }).catch((err) => console.error);

    const db = mongoose.connection;

    db.on('error', console.error);

    db.once('open', () => {
        console.log('Connected to database.');
    });
}

module.exports = (options) => {
    const defaultOptions = {
        port: 8080,
        express: null,
        mongoose: null,
    };

    options = { ...defaultOptions, ...options };

    const app = initExpress(options.express);
    const httpServer = initHttpServer(app);
    const io = initSocketIO(httpServer);

    initMongoose(options.mongoose);

    httpServer.listen(options.port, () => {
        console.log('Server listening at port %s', httpServer.address().port);
    });
};