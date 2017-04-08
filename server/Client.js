const EventEmitter = require('events').EventEmitter;

class Client extends EventEmitter
{
	constructor(sock)
	{
		super();

		this.sock = sock;
		this.onVote = () => {};

		sock.on('message', data => this.parse(data));
	}

	parse(data)
	{
		try {
			data = JSON.parse(data);
			return this.emit(data.event, data.data);
		} catch(e) {}
	}

	send(event, data)
	{
		try {
			this.sock.send(JSON.stringify({event, data}));
		} catch(e) {}
	}
}

module.exports = Client;