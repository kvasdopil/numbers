import React from 'react';
import Round from './Round';
import ActiveRound from './ActiveRound';

export default props => 
	<div>
		{props.rounds.map(round =>
			<Round key={round.id} {...round} />
		)}
		<ActiveRound key={props.next.id} {...props.next} />
	</div>