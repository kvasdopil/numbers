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

	conn.on('message', data => {
		data = JSON.parse(data);
		if(data.event == 'answer')
  		onAnswer(data.data, conn)
	});

	if(conns.length) // 1st client
		nextRound();
});

server.listen(port, () =>
  console.log(`Server listening on localhost:${port}`)
);

var bcast = (event, data) => {
	for(const conn of conns)
		try {
  	  conn.send(JSON.stringify({event, data}));
  	} catch(e) {}
}

var onNewClient = () => 
	bcast('stat', conns.length);

let next = undefined;

let id = 0;

var onAnswer = (answer, src) =>
{
	console.log('got answer', answer);

	if(!next)
		return;

	// FIXME: check round id
	// FIXME: check answer is right
	// FIXME: check everyone has answered
	// FIXME: need timeout for all answers or timeout since 1st answer

	// FIXME: skip ones who already voted

	for(let conn of conns)
		try {
			conn.send(JSON.stringify({event: 'end', data: {
				question: next.question,
				id,
				miss: (conn == src) ? false : true,
				success: (conn == src && answer == next.answer) ? false : true,
			}}));
		} catch(e) {}

	this.next = undefined;

	setTimeout(() => nextRound(), 3000); // avoid multiple answers?
}

var nextRound = () => {

	const ops = ['+','-','/','*'];

	const a = Math.round(Math.random()*10);
	const b = Math.round(Math.random()*9) + 1; // can not be 0
	const op = Math.round(Math.random()*3);

	next = {
		id: id++,
		question: `${a}${ops[op]}${b} = 10`,
		answer: true,
	};

  bcast('next', {question: next.question, id});
}

