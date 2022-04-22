const path = require('path')
const webpack = require('webpack')
const MinifyPlugin = require("babel-minify-webpack-plugin")
const CompressionPlugin = require('compression-webpack-plugin')
const merge = require('webpack-merge')

const base = require('./webpack.config.base')

module.exports = function (env) {
	return merge(base(), {
		mode: 'production',

		devtool: false,

		output: {
			filename: '[name].[contenthash].js',
			publicPath: '/'
		},

		optimization: {
			minimize: true,

			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors'
					}
				}
			}
		},

		plugins: [
			new CompressionPlugin()
		]
	})
}

