const webpack = require('webpack');

module.exports = {
	context: __dirname + "/client",
	entry: [
		'./index',
	],
	output: {
		path: __dirname + '/static',
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /.js$/,
			loader: 'babel-loader',
		}]
	},
};