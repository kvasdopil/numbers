import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import Game    from '../client/components/Game'; // FIXME: find a way to import from project root (webpack?)
import Table   from '../client/components/Table';
import Stats   from '../client/components/Stats';
import Round   from '../client/components/Round';
import Current from '../client/components/Current';

describe('the setup', () => {
	it('works', () => {
		expect(true).to.be.true;
	})
});

const store = {
	rounds: [
		{
			id: 123,
			question: '10x10 = ?',
			answer: undefined,
			success: false,
		},{
			id: 345,
			question: '10+10 = ?',
			answer: 33,
			success: true,
		},{
			id: 678,
			question: '10-10 = ?',
			answer: 22,
			success: false,
		},
	],
	current: {
		id: 999,
		question: '10/10=2',
	},
	players: 0,
	score: 0,
}

describe('Game', () => {
	const wrapper = shallow(<Game store={store} />);
	it('contains the table and score', () => {
		expect(wrapper.find(Table)).to.have.length(1);
		expect(wrapper.find(Stats)).to.have.length(1);
	})
});

describe('Table', () => {
	it('contains some rounds', () => {
		const wrapper = shallow(<Table rounds={store.rounds} current={store.current} />);
		expect(wrapper.find(Round)).to.have.length(3);
		expect(wrapper.find(Current)).to.have.length(1);
	});
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
		expect(mount(<Round {...store.rounds[1]} />).text()).to.contain('33');
	})
})

describe('Current', () => {
	it('renders id and question', () => {
		const wrapper = mount(<Current {...store.current} />);
		expect(wrapper.text()).to.contain(store.current.question);
		expect(wrapper.text()).to.contain(store.current.id);
	});
	it('renders a button and an input field', () => {
		const wrapper = mount(<Current {...store.current} />);
		expect(wrapper.find('button')).to.have.length(1);
		expect(wrapper.find('input')).to.have.length(1);
	});
	it('wont render buttons if missed already', () => {
		const wrapper = mount(<Current {...store.current} success={false} />);
		expect(wrapper.find('button')).to.have.length(0);
		expect(wrapper.text()).to.contain('MISS');
	});
	it('will render spinner when waiting for new round', () => {
		const wrapper = mount(<Current />);
		expect(wrapper.text()).to.contain('aiting');
	});
	it('wont render buttons when answer is sent', () => {
	  const wrapper = mount(<Current answer={false}/>);
		expect(wrapper.find('button')).to.have.length(0);
	})
})

describe('Stats', () => {
	it('shows user count and your score', () => {
		const wrapper = shallow(<Stats score={999} players={888} />);
		expect(wrapper.text()).to.contain("999");
		expect(wrapper.text()).to.contain("888");
	})
})

