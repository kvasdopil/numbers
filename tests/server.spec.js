import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import Server from '../server/Server';

describe('server', () => {
	const server = new Server();

	const conn = {
		send: spy(),
	};

	const conn2 = {
		send: spy(),
	};

	it('emits number of connections', () => {
		server.add(conn);

		expect(conn.send.calledOnce).to.be.eql(true);
		expect(conn.send.calledWith('stat', 1)).to.be.eql(true); 
	});

	it('emits stat to all new clients', () => {
		server.add(conn2);
		expect(conn.send.callCount).to.be.eql(2);
		expect(conn.send.calledWith('stat', 2)).to.be.eql(true);
		expect(conn2.send.calledWith('stat', 2)).to.be.eql(true);
	});

	it('emits stat when client disconnecting', () => {
		server.remove(conn);

		expect(conn2.send.callCount).to.be.eql(2);
		expect(conn2.send.calledWith('stat', 1)).to.be.eql(true);
	})
});