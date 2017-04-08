import { spy } from 'sinon';
import { expect } from 'chai';

import Connection, { EventEmitter } from '../client/Connection';

import Store from '../client/Store';

describe('EventEmitter', () => {
	it('can emit', () => {
		const e = new EventEmitter();
		const callback = spy();

		e.on('test', callback);

		e.emit('test', 'Hello world');
		e.emit('something_else', 'with arguments');

		expect(callback.calledOnce).to.be.true;
		expect(callback.calledWith('Hello world')).to.be.true;

		e.emit('test', 'Another try');
		expect(callback.calledWith('Another try')).to.be.true;
	});
});

describe('Connection', () => {
  it('can wrap an object and send messages', () => {
  	const sock = new EventEmitter();
  	sock.send = spy();

  	const cli = new Connection(sock);

  	cli.send('hello', {1:[2,3]});

  	expect(sock.send.calledWith('{"event":"hello","data":{"1":[2,3]}}')).to.be.eql(true);
  });

  it('can process incoming messages', () => {
  	const sock = new EventEmitter();
  	const cli = new Connection(sock);
  	const handler = spy();

  	cli.on('vote', handler);

  	sock.onmessage({data:'{"event":"vote","data":["somedata",2,3]}'});
  	expect(handler.calledWith(['somedata', 2, 3])).to.be.eql(true);
  });
});

describe('Store', () => {
	const conn = new EventEmitter();
	conn.send = spy();

	const store = new Store(conn);

	it('keeps the stat', () => {
		expect(store.players).to.be.eql(1);
		expect(store.score).to.be.eql(0);
	});

	it('updates the stat', () => {
		conn.emit('stat', 5);

		expect(store.players).to.be.eql(5);
	});

	it('shows no current round', () => {
		expect(store.current.id).to.be.eql(undefined);
	});

	it('shows no old rounds', () => {
		expect(store.rounds.length).to.be.eql(0);
	})

	it('starts the new round', () => {
		conn.emit('start', {question: 'Wazzup', id: 123});

		expect(store.current.id).to.be.eql(123);
		expect(store.current.question).to.be.eql('Wazzup');
	});

	it('ends the new round', () => {
		conn.emit('end', false);

		expect(store.current.id).to.be.eql(undefined);
		expect(store.rounds.length).to.be.eql(1);
	});

	it('adds score on successful answer', () => {
		conn.emit('start', {question: 'Shalalala', id: 555});
		conn.emit('end', true);

		expect(store.score).to.be.eql(1);
	});

	it('stores no more 10 old rounds', () => {
		for(let i = 0; i<15; i++)
		{
			conn.emit('start', {question: 'How you doin?', id: i});
			conn.emit('end', true);
		}

		expect(store.rounds.length).to.be.eql(10);		
	});

	it('emits event when voting', () => {
		conn.emit('start', {question: 'Hey meatbag', id: 111});
		store.answer('Something');

		expect(conn.send.calledWith('vote','Something')).to.be.true;
		expect(store.current.answer).to.be.eql('Something');
	});
});
