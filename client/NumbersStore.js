import { observable } from 'mobx';

// FIXME: decorators only work with legacy plugin until babel 7
// this breaks 'env' preset, and only works with 'es2015' + 'stage-0' presets
// i.e. docorators work only when transpiling to es5

export default class NumbersStore {
	@observable players = 1;
	@observable score = 0;

	@observable rounds = [];

	@observable next = {};

	updateStat(data)
	{
		this.players = data;
	}

	endRound(round)
	{
		console.log('end', round);
		this.rounds.push(round);
		while(this.rounds.length > 10)
			this.rounds.shift(); // FIXME: add animation here

		this.next = {};
	}

	startNextRound(data)
	{
  	//this.endRound();
		this.next = {
			id: data.id,
			question: data.question,
			answer: undefined,
		};
	}

	onAnswer(answer)
	{
		this.next.answer = answer;
		this.send('answer', answer);
	}

	handlers = [];

	on(event, handler)
	{
		this.handlers.push({event, handler});
	}

	emit(event, data)
	{
		this.handlers.filter(h => h.event == event).map(h => h.handler(data));	
	}

  constructor(sock)
  {
  	this.sock = sock;
		this.sock.onmessage = data => {
  		data = JSON.parse(data.data);
  		console.log('message', data);
  		this.emit(data.event, data.data);
  	}
 
  	this.on('stat', data => this.updateStat(data));
  	this.on('next', data => this.startNextRound(data));
  	this.on('end', data => this.endRound(data));
  }

  send(event, data)
  {
  	try {
  		this.sock.send(JSON.stringify({event, data}));
  	} catch(e) {}
  }
}