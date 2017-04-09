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

const store = {
	rounds: [
		{
			id: 123,
			question: '10x10=100',
//			answer: true,
			your: true, 
			miss: true,
			success: false,
		},{
			id: 345,
			question: '10+10=10',
//			answer: false,
			your: false, 
			miss: false,
			success: true,
		},{
			id: 678,
			question: '10-10=0',
//			answer: true,
			your: false, 
			miss: false,
			success: false,
		},
	],
	next: {
		id: 999,
		question: '10/10=2',
		answer: false,
		miss: false,
	}
}

describe('Game', () => {
	const wrapper = shallow(<Game {...store} />);
	it('contains the table and score', () => {
		expect(wrapper.find(GameTable)).to.have.length(1);
		expect(wrapper.find(GameStats)).to.have.length(1);
	})
});

describe('GameTable', () => {
	it('contains some rounds', () => {
		const wrapper = shallow(<GameTable rounds={store.rounds} next={store.next} />);
		expect(wrapper.find(Round)).to.have.length(3);
		expect(wrapper.find(ActiveRound)).to.have.length(1);
	})
})

describe('Round', () => {
	const wrapper = mount(<Round {...store.rounds[0]} />);
	it('renders the question', () => 
		expect(wrapper.text()).to.contain(store.rounds[0].question)
	)
	it('renders the id', () =>
		expect(wrapper.text()).to.contain(store.rounds[0].id)
	)
	it('renders the result', () => {
		expect(mount(<Round {...store.rounds[0]} />).text()).to.contain('MISS');
		expect(mount(<Round {...store.rounds[0]} />).text()).to.contain('FAIL');

		expect(mount(<Round {...store.rounds[1]} />).text()).to.not.contain('MISS');
		expect(mount(<Round {...store.rounds[1]} />).text()).to.contain('OK');
	})
})
