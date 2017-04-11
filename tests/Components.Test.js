import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import Game        from '../client/components/Game'; // FIXME: find a way to import from project root (webpack?)
import GameTable   from '../client/components/GameTable';
import GameStats   from '../client/components/GameStats';
import Round       from '../client/components/Round';
import ActiveRound from '../client/components/ActiveRound';

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
			answer: undefined,
			success: false,
		},{
			id: 345,
			question: '10+10=10',
			answer: false,
			success: true,
		},{
			id: 678,
			question: '10-10=0',
			answer: false,
			success: false,
		},
	],
	next: {
		id: 999,
		question: '10/10=2',
	},
	players: 0,
	score: 0,
}

describe('Game', () => {
	const wrapper = shallow(<Game store={store} />);
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
	});

	// it('calls the callback on aswer', () => {
	// 	const answerSpy = spy();
	// 	const wrapper = mount(<GameTable rounds={store.rounds} next={store.next} onAnswer={answerSpy} />);
	// 	wrapper.find('button').filterWhere(b => b.text() == "Yes").simulate('click');
		
	// 	expect(answerSpy.calledOnce).to.eql(true);
	// 	expect(answerSpy.calledWith('Yes')).to.eql(true);
	// })
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
	it('renders your reply', () => {
		expect(mount(<Round {...store.rounds[1]} />).text()).to.contain('No');
	})
})

describe('ActiveRound', () => {
	it('renders id and question', () => {
		const wrapper = mount(<ActiveRound {...store.next} />);
		expect(wrapper.text()).to.contain(store.next.question);
		expect(wrapper.text()).to.contain(store.next.id);
	});
	it('renders a pair of buttons', () => {
		const wrapper = mount(<ActiveRound {...store.next} />);
		expect(wrapper.find('button')).to.have.length(2);
	});
	it('wont render buttons if missed already', () => {
		const wrapper = mount(<ActiveRound {...store.next} success={false} />);
		expect(wrapper.find('button')).to.have.length(0);
		expect(wrapper.text()).to.contain('MISS');
	});
	it('will render spinner when waiting for new round', () => {
		const wrapper = mount(<ActiveRound />);
		expect(wrapper.text()).to.contain('aiting');
	});
	it('wont render buttons when answer is sent', () => {
	  const wrapper = mount(<ActiveRound answer={false}/>);
		expect(wrapper.find('button')).to.have.length(0);
	})
})

describe('GameStats', () => {
	it('shows user count and your score', () => {
		const wrapper = shallow(<GameStats score={999} players={888} />);
		expect(wrapper.text()).to.contain("999");
		expect(wrapper.text()).to.contain("888");
	})
})

