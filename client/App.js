import React from 'react';
import Game from './Game';

// App is our smart component containing the store

const store = {
	rounds: [
		{
			id: 123,
			question: '10x10=100',
			answer: true,
			your: true, 
			miss: true,
			result: false,
		},{
			id: 345,
			question: '10+10=10',
			answer: false,
			your: false, 
			miss: false,
			result: true,
		},{
			id: 678,
			question: '10-10=0',
			answer: true,
			your: false, 
			miss: false,
			result: false,
		},
	],
	next: {
		id: 999,
		question: '10/10=2',
		answer: false,
		miss: false,
	}
};

export default props => 
  <Game {...store} />
