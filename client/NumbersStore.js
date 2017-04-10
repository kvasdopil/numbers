import { observable } from 'mobx';

// FIXME: decorators only work with legacy plugin until babel 7
// this breaks 'env' preset, and only works with 'es2015' + 'stage-0' presets
// i.e. docorators work only when transpiling to es5

export default class NumbersStore {
	@observable players = 1;
	@observable score = 0;

	@observable rounds = [];

	@observable next = {};
/*
	rounds: [
		{
			id: 123,
			question: '10x10=100',
			your: true, 
			miss: true,
			success: false,
		},{
			id: 345,
			question: '10+10=10',
			your: false, 
			miss: false,
			success: true,
		},{
			id: 678,
			question: '10-10=0',
			your: false, 
			miss: false,
			success: false,
		},
	]

	const next = {
		id: 999,
		question: '10/10=2',
		miss: false,
	}
*/
	updateStat(data)
	{
		this.players = data;
	}

	endRound(answer = undefined)
	{
		if(!this.next.id)
			return;

		this.rounds.push({
			id: this.next.id,
			question: this.next.question,
			answer: false,
			miss: true,
		});

		this.next = {};
	}

	startNextRound(data)
	{
  	this.endRound();

		this.next = {
			id: data.id,
			question: data.question,
		};
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
  	//sock.onopen = conn => {
  		sock.onmessage = data => {
	  		data = JSON.parse(data.data);
	  		console.log('message', data);
	  		this.emit(data.event, data.data);
	  	}
	  //}

  	this.on('stat', data => this.updateStat(data));
  	this.on('next', data => this.startNextRound(data));
  }
}