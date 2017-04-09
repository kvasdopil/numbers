import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Game from '../client/Game'; // FIXME: find a way to import from project root (webpack?)
import GameTable from '../client/GameTable';
import GameStats from '../client/GameStats';

describe('the setup', () => {
	it('works', () => {
		expect(true).to.be.true;
	})
})

describe('Game', () => {
	it('contains the table and score', () => {
		expect(shallow(<Game />).containsAllMatchingElements([
			<GameTable />,
			<GameStats />,
		])).to.be.equal(true);
	})
})