export default class Server 
{
	constructor()
	{
		this.conns = [];
		this.round = false;
		this.members = [];
		this.id = 1;

		this.ROUND_TIMEOUT = 10 * 1000;
	}

	// registers new connection
	add(conn) 
	{
		conn.on('vote', answer => this.vote(answer, conn));

		this.conns.push(conn);

		for(const conn of this.conns)
  		conn.send('stat', this.conns.length);

  	if(this.round === false)
  		this.start();
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
	end()
	{
		clearTimeout(this.round.timeout);

		for(const conn of this.conns)
			conn.send('end');

		this.start(); // starts the new game immidiately
	}

	// recieve an answer
	vote(answer, conn)
	{
		if(this.members.filter(m => m == conn).length == 0)
			return;

		this.members = this.members.filter(m => m != conn); // remove this connection from unvoted members

		if(this.members.length == 0)
			return this.end(); // everybody lost

		if(answer == this.round.answer)
  		this.end();
	}

	// emulate failed answer for all players
	timeout()
	{
		for(const conn of this.members)
			this.vote(undefined, conn);
	}

	buildQuestion()
	{
		const ops = ['+','-','*','/'];

		while(true)
		{
			const a = Math.round(Math.random() * 11);
			const b = Math.round(Math.random() * 10) + 1;
			const o = Math.round(Math.random() * 3);

			const res = [a+b, a-b, a*b, a/b];
			let result = res[o];
			let answer = true;

			if(Math.round() > .5) // false answer
			{
				const n = (o + Math.round(Math.random() * 2) + 1) % 4;
				result = res[n];
			}

			if(result % 1 == 0) // anly whole numbers allowed
  			return {question: `${a}${ops[o]}${b}=${result}`, answer};
		}
	}
}
