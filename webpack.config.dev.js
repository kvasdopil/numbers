const webpack = require('webpack');

module.exports = {
	context: __dirname + "/client",
	entry: [
    'react-hot-loader/patch',
		'./index',
		'webpack-hot-middleware/client',
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
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};