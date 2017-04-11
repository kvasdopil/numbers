/*
* Handy class to use with connections, so ws interface is the same on both client and server
*/
export class EventEmitter
{
	constructor() {
		this.handlers = [];
	}

	on(event, handler)
	{
		this.handlers.push({event, handler});
	}

	emit(event, data)
	{
		this.handlers.filter(h => h.event == event).map(h => h.handler(data));	
	}
}

export default class Connection extends EventEmitter
{
	constructor(sock)
	{
		super();
		this.sock = sock;
		sock.onmessage = data => this.parse(data.data);
	}

	parse(data)
	{
		try {
	  	data = JSON.parse(data);
	  	console.log(data.event, data.data);
	  	this.emit(data.event, data.data);
  	} catch(e) {}
	}

  send(event, data)
  {
  	try {
  		this.sock.send(JSON.stringify({event, data}));
  	} catch(e) {}
  }
}
