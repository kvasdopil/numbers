const express = require('express');
const ws = require('ws');
const http = require('http');

const port = 8088;
const app = express();

// TODO: dev mode

const server = http.createServer();
server.on('request', app);

app.use('/', express.static('static'));

const sock = new ws.Server({server});

sock.on('connection', conn => {
	console.log('new client');

	conn.on('message', data => {
		console.log('new data', data);
		conn.send('pong');
	});

	conn.on('close', () => console.log('close'));
});

server.listen(port, () =>
  console.log(`Server listening on localhost:${port}`)
);