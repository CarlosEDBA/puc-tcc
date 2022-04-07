const path = require('path')

module.exports = {
    SERVER_PORT: 27300,

    PRIVATE_KEY: path.resolve(__dirname, '../keys/CONCEPTCFC_PEM_RSA_02042022'),
    PUBLIC_KEY: path.resolve(__dirname, '../keys/CONCEPTCFC_PEM_RSA_02042022.pub'),

    PUBLIC_DIR: path.resolve(__dirname, '../public'),
    PUBLIC_TEMP_DIR: path.resolve(__dirname, '../public/temp'),

    DATA_DIR: path.resolve(__dirname, '../data'),
};