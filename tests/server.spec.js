import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon, { spy } from 'sinon';

import Server from '../server/Server';
import Client from '../server/Client';

import { EventEmitter } from 'events';

describe('client', () => {
  it('can wrap an object and send messages', () => {
  	const sock = new EventEmitter();
  	sock.send = spy();

  	const cli = new Client(sock);

  	cli.send('hello', {1:[2,3]});

  	expect(sock.send.calledWith('{"event":"hello","data":{"1":[2,3]}}')).to.be.eql(true);
  });

  it('can process incoming messages', () => {
  	const sock = new EventEmitter();
  	const cli = new Client(sock);
  	const handler = spy();

  	cli.on('vote', handler);

  	sock.emit('message', '{"event":"vote","data":["somedata",2,3]}');
  	expect(handler.calledWith(['somedata', 2, 3])).to.be.eql(true);
  });
});

describe('server and conns', () => {
	const server = new Server();

	const conn = new EventEmitter();
	const conn2 = new EventEmitter();

	conn.send = spy();
	conn2.send = spy();

	it('emits number of connections', () => {
		server.add(conn);

		expect(conn.send.calledWith('stat', 1)).to.be.eql(true); 
	});

	it('emits stat to all new clients', () => {
		server.add(conn2);
		expect(conn.send.calledWith('stat', 2)).to.be.eql(true);
		expect(conn2.send.calledWith('stat', 2)).to.be.eql(true);
	});

	it('emits stat when client disconnecting', () => {
		server.remove(conn);

		expect(conn2.send.calledWith('stat', 1)).to.be.eql(true);
	});
});

describe('server and the game', () => {
	const server = new Server();

	const gamer1 = new EventEmitter();
	const newguy = new EventEmitter();

	gamer1.send = spy();
	newguy.send = spy();

	it('starts the new game when first client appear', () => {
		server.add(gamer1);

		expect(gamer1.send.calledWith('start')).to.be.eql(true);

		const lastCall = gamer1.send.getCall(gamer1.send.callCount - 1);
		expect(lastCall.args[1].id).to.eql(1);
	});

	it('sends the question in correct format', () => {
		const lastCall = gamer1.send.getCall(gamer1.send.callCount - 1);

		expect(lastCall.args[1].question).to.match(/^[0-9]+[/*+-][0-9]+=[0-9-]+/);
	})

	it('doesnt show new game to newcomers', () => {
		server.add(newguy);

		expect(newguy.send.calledWith('start')).to.be.eql(false);
	});

	it('ends the game when correct answer recieved', () => {
		gamer1.emit('vote', server.round.answer);

		expect(newguy.send.calledWith('end')).to.be.eql(true); // new clients also recieve the notification
		expect(gamer1.send.calledWith('end')).to.be.eql(true);
	});

	it('starts the new game after previous have finished', () => {
		expect(newguy.send.calledWith('start')).to.be.eql(true); 
		expect(gamer1.send.calledWith('start')).to.be.eql(true); // FIXME: should have recieved 2 'start' events by this time

		const lastCall = gamer1.send.getCall(gamer1.send.callCount - 1);
		expect(lastCall.args[1].id).to.eql(2);
	});

	it('doesnt end the game when incorrect answer recieved', () => {
		newguy.send.reset();
		gamer1.send.reset();

		newguy.emit('vote', undefined);
		expect(newguy.send.calledWith('end')).to.be.eql(false);
	});

	it('doesnt allow vote twice', () => {
		newguy.emit('vote', server.round.answer);
		expect(newguy.send.calledWith('end')).to.be.eql(false);
	});

	it('ends the round when everyone has voted', () => {
		gamer1.emit('vote', undefined);

		expect(gamer1.send.calledWith('end')).to.be.eql(true);
	});

	it('end the round when someone has voted correctly', () => {
		newguy.send.reset();
		gamer1.send.reset();

		newguy.emit('vote', server.round.answer);
		expect(newguy.send.calledWith('end')).to.be.eql(true);
	});

	it('ends the game when everyone alse have logged out', () => {
		newguy.send.reset();
		gamer1.send.reset();

		newguy.emit('vote', undefined);
		server.remove(gamer1);

		expect(newguy.send.calledWith('end')).to.be.eql(true);
	});


	it('ends the game when timeout happens', () => {
		// FIXME: unimplemented
		const clock = sinon.useFakeTimers();

		newguy.emit('vote', server.round.answer);
		newguy.send.reset();

		clock.tick(5 * 1000);
		expect(newguy.send.calledWith('end')).to.be.eql(false);

		clock.tick(15 * 1000);
		expect(newguy.send.calledWith('end')).to.be.eql(true);

		clock.restore();
	});
});

// FIXME: check round id when voting
