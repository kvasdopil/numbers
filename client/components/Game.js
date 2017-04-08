import React from 'react';

import Table from './Table';
import Stats from './Stats';

import { observer } from 'mobx-react';

export default observer(props => 
	<div className="panel">
		<Stats players={props.store.players} score={props.store.score}/>
		<Table 
			rounds={props.store.rounds} 
			current={props.store.current} 
			onAnswer={a => props.store.answer(a)}
		/>
	</div>
)