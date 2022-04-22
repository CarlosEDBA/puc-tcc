const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')

module.exports = function (env) {
	return merge(base(), {
		mode: 'development',

		devtool: 'cheap-module-eval-source-map',

		entry: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://0.0.0.0:4000',
			'webpack/hot/only-dev-server',
			'./src/index.js'
		],

		devServer: {
			hot: true,
			contentBase: path.join(__dirname, 'dist'),
			publicPath: '/',
			compress: true,
			port: 4000,
			host: '0.0.0.0',
			historyApiFallback: true
		},

		optimization: {
			minimize: false,
		},

		plugins: [
			new webpack.HotModuleReplacementPlugin(),

			new webpack.NamedModulesPlugin(),
		]
	})
}

