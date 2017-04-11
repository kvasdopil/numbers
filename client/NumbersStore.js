import { observable, action } from 'mobx';

// FIXME: decorators only work with legacy plugin until babel 7
// this breaks 'env' preset, and only works with 'es2015' + 'stage-0' presets
// i.e. decorators work only when transpiling to es5

export default class NumbersStore {
	@observable players = 1;
	@observable score = 0;

	@observable rounds = [];

	@observable next = {};

	sock = undefined;

	@action
	updateStat(data)
	{
		this.players = data;
	}

	@action
	end(success) // end round
	{
		if(success)
			this.score++; 

		if(!this.next.id)
			return;

		this.next.success = success;
		this.rounds.push(this.next);

		while(this.rounds.length > 10)
			this.rounds.shift(); // FIXME: add animation here

		this.next = {};
	}

	@action
	start(data) // start new round
	{
		this.next = {
			id: data.id,
			question: data.question,
			answer: undefined,
		};
	}

	@action
	answer(answer) // send answer
	{
		this.next.answer = answer;
		this.sock.send('vote', answer);
	}

  constructor(sock)
  {
  	this.sock = sock;

  	sock.on('stat', data => this.updateStat(data));
  	sock.on('start', data => this.start(data));
  	sock.on('end', win => this.end(win));
  }
}