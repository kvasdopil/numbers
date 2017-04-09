import React from 'react';

import GameTable from './GameTable';
import GameStats from './GameStats';

export default (props) => 
	<div className="container">
		<GameStats />
		<GameTable rounds={props.rounds} next={props.next}/>
	</div>