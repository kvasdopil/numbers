import { observable, action } from 'mobx';

// FIXME: decorators only work with legacy plugin until babel 7
// this breaks 'env' preset, and only works with 'es2015' + 'stage-0' presets
// i.e. decorators work only when transpiling to es5

export default class Store {
	@observable players = 1;
	@observable score = 0;

	@observable rounds = [];

	@observable current = {};

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

		if(!this.current.id)
			return;

		this.current.success = success;
		this.rounds.push(this.current);

		while(this.rounds.length > 10)
			this.rounds.shift(); // FIXME: add animation here

		this.current = {};
	}

	@action
	start(data) // start new round
	{
		this.current = {
			id: data.id,
			question: data.question,
			answer: undefined,
		};
	}

	@action
	answer(answer) // send answer
	{
		if(answer !== answer)
			answer = undefined;

		this.current.answer = answer;
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