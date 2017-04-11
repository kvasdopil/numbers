function start(app)
{		
	console.log('Starting dev mode');

	const webpack = require('webpack');
	const WebpackDevMiddleware = require('webpack-dev-middleware');
	const WebpackHotMiddleware = require('webpack-hot-middleware');

	const config = require('../webpack.config');
	const compiler = webpack(config);

	app.use(WebpackDevMiddleware(compiler));
	app.use(WebpackHotMiddleware(compiler));
}

module.exports = {start};