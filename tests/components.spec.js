import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import Game from '../client/Game'; // FIXME: find a way to import from project root (webpack?)
import GameTable from '../client/GameTable';
import GameStats from '../client/GameStats';
import Round from '../client/Round';
import ActiveRound from '../client/ActiveRound';



describe('the setup', () => {
	it('works', () => {
		expect(true).to.be.true;
	})
});

describe('Game', () => {
	it('contains the table and score', () => {
		expect(shallow(<Game />).containsAllMatchingElements([
			<GameTable />,
			<GameStats />,
		])).to.be.equal(true);
	})
});

const store = {
	rounds: [
		{
			id: 123,
			query: '10x10=100',
			answer: true,
			your: true, 
			miss: true,
			result: false,
		},{
			id: 345,
			query: '10+10=10',
			answer: false,
			your: false, 
			miss: false,
			result: true,
		},{
			id: 678,
			query: '10-10=0',
			answer: true,
			your: false, 
			miss: false,
			result: false,
		},
	],
	next: {
		id: 999,
		query: '10/10=2',
		answer: false,
		miss: false,
	}
}

describe('GameTable', () => {
	it('contains some rounds', () => {
		const wrapper = shallow(<GameTable rounds={store.rounds} next={store.next} />);
		expect(wrapper.find(Round)).to.have.length(3);
		expect(wrapper.find(ActiveRound)).to.have.length(1);
	})
})