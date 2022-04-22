const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const svgoConfig = require('./svgoConfig')

module.exports = function (env) {
	return {
		target: 'web',

		entry: {
			app: './src/index.js'
		},

		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			publicPath: '/',
		},
		
		resolve: {
			extensions: ['.js', '.json'],
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		},

		node: {
			__dirname: true
		},

		module: {
			rules: [
				{
					test: /\.(js|jsx)?$/,
					exclude: [
						path.resolve(__dirname, './node_modules')
					],
					loader: 'babel-loader'
				},
				{
					test: /\.(js)?$/,
					exclude: [
						path.resolve(__dirname, './node_modules')
					],
					include: [
						path.resolve(__dirname, './src/libs')
					],
					loader: 'script-loader'
				},
				{
					test:   /\.css?$/,
					use: [
						'style-loader',
						'css-loader',
					]
				},
				/*
				{
					test:   /\.scss?$/,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					]
				},
				*/
				{
					test: /\.svg$/,
					use: { loader: '@svgr/webpack', options: { svgoConfig } }
				},
				{
					test: /\.(png|jpg|jpeg|gif)?$/,
					use: { loader: 'url-loader', options: { limit: 100000 } }
				},
				{ 
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: { loader: 'url-loader', options: { limit: 100000, mimetype: 'application/font-woff' } }
				},
				{ 
					test: /\.(swoff|woff|woff2|eot|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader'
				}
			]
		},

		plugins: [
			new HtmlWebpackPlugin({
				templateContent: `
					<!DOCTYPE html>
					<html>
						<head>
							<title>conceptcfc</title>
							<link rel="stylesheet" href="https://use.typekit.net/sph0pxc.css">
						</head>
						<body>
							<div id="root"></div>
							<script src="https://unpkg.com/feather-icons"></script>
						</body>
					</html>
				`
			})
		]
	}
}

