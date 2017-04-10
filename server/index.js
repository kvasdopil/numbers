const express = require('express');
const ws = require('ws');
const http = require('http');

const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../webpack.config');

const port = 8088;
const app = express();

const compiler = webpack(config);

// TODO: dev mode

const server = http.createServer();
server.on('request', app);

app.use(WebpackDevMiddleware(compiler));
app.use(WebpackHotMiddleware(compiler));

app.use('/', express.static('static'));


const sock = new ws.Server({server});

let conns = [];

sock.on('connection', conn => {
	conns.push(conn);

	console.log('new client');

	onNewClient();

	conn.on('close', () => {
		conns = conns.filter(c => c != conn);
		console.log('close');
		onNewClient();
	});
});

server.listen(port, () =>
  console.log(`Server listening on localhost:${port}`)
);

const bcast = (event, data) => {
	for(const conn of conns)
		try {
  	  conn.send(JSON.stringify({event, data}));
  	} catch(e) {}
}

const onNewClient = () => 
	bcast('stat', conns.length);

let next = undefined;

let id = 1;

setInterval(() => {
	next = {
		id: id++,
		question: '10+10=10',
		answer: true,
	};

	bcast('next', {question: next.question, id});
}, 10000);
