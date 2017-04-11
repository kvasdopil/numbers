const express = require('express');
const ws = require('ws');
const http = require('http');

const Server = require('./Server');
const Client = require('./Client');
const DevMode = require('./DevMode');

const port = 8088;

const app = express();

const server = http.createServer(app);

DevMode.start(app);

app.use('/', express.static('static'));

const game = new Server();
const sock = new ws.Server({server});

sock.on('connection', conn => {

	console.log('new client');

	const cli = new Client(conn);
	game.add(cli);

	conn.on('close', () => game.remove(cli));
});

server.listen(port, () =>
	console.log(`Listening on ${port}`)
);
