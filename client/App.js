import React from 'react';
import Game from './Game';

import NumbersStore from './NumbersStore';

// App is our smart component containing the store

const store = {
	rounds: [
		{
			id: 123,
			question: '10x10=100',
			your: true, 
			miss: true,
			success: false,
		},{
			id: 345,
			question: '10+10=10',
			your: false, 
			miss: false,
			success: true,
		},{
			id: 678,
			question: '10-10=0',
			your: false, 
			miss: false,
			success: false,
		},
	],
	next: {
		id: 999,
		question: '10/10=2',
		miss: false,
	}
};

export default props => 
  <Game {...store} />
