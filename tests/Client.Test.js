import { spy } from 'sinon';
import { expect } from 'chai';

import NumbersStore, { EventEmitter } from '../client/Connection';

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
