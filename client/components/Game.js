import React from 'react';

import GameTable from './GameTable';
import GameStats from './GameStats';

import { observer } from 'mobx-react';

export default observer(props => 
	<div className="panel">
		<GameStats players={props.store.players} score={props.store.score}/>
		<GameTable 
			rounds={props.store.rounds} 
			next={props.store.next} 
			onAnswer={a => props.store.answer(a)}
		/>
	</div>
)