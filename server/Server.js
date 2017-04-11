class Server 
{
	constructor()
	{
		this.conns = [];
		this.round = false;
		this.members = [];
		this.id = 1;

		this.ROUND_TIMEOUT = 10 * 1000;
		this.NEW_ROUND_TIMEOUT = 3 * 1000;
	}

	// registers new connection
	add(conn) 
	{
		conn.on('vote', answer => this.vote(answer, conn));

		this.conns.push(conn);

		for(const conn of this.conns)
  		conn.send('stat', this.conns.length);

  	if(this.conns.length == 1)
  		this.start(); // start the game immidiately when 1st client connects
	}

	// removes the connection
	remove(conn)
	{
		this.vote(undefined, conn); // emulate wrong answer 

		this.conns = this.conns.filter(c => c != conn);

		for(const conn of this.conns)
			conn.send('stat', this.conns.length);
	}

	// starts a new round
	start()
	{
		if(this.round.id)
			return; // already started

		const qu = this.buildQuestion();

		this.round = {
			id: this.id++,
			answer: qu.answer, 
			question: qu.question,
			timeout: setTimeout(() => this.timeout(), this.ROUND_TIMEOUT)
		};
		this.members = this.conns;

		for(const conn of this.conns)
			conn.send('start', { id: this.round.id, question: this.round.question });
	}

	// ends the round
	end(winner = false)
	{
		if(!this.round.id)
			return; // not yet started

		clearTimeout(this.round.timeout);

		for(const conn of this.conns)
			conn.send('end', conn == winner);

		this.members = [];
		this.round = {};

  	setTimeout(() => this.start(), this.NEW_ROUND_TIMEOUT); // starts the new game later
	}

	// recieve an answer
	vote(answer, conn)
	{
		if(!this.round.id)
			return; // not yet started

		if(this.members.filter(m => m == conn).length == 0)
			return; // already voted

		if(answer == this.round.answer)
  		return this.end(conn); // correct answer - end the game

		this.members = this.members.filter(m => m != conn); // remove this connection from unvoted members

		if(this.members.length == 0)
			return this.end(); //everyone lost - end the game
	}

	timeout()
	{
		this.end();
	}

	buildQuestion()
	{
		const ops = ['+','-','*','/'];

		while(true)
		{
			const a = Math.floor(Math.random() * 11);
			const b = Math.floor(Math.random() * 10) + 1;
			const o = Math.floor(Math.random() * 4);

			const res = [a+b, a-b, a*b, a/b];
			let result = res[o];
			let answer = true;

			if(Math.round() > .5) // false answer
			{
				const n = (o + Math.round(Math.random() * 3) + 1) % 4;
				result = res[n];
				answer = false;
			}

			if(result % 1 == 0) // anly whole numbers allowed
  			return {question: `${a}${ops[o]}${b}=${result}`, answer};
		}
	}
}

module.exports = Server;
