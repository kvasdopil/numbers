import React from 'react';
import Round from './Round';
import ActiveRound from './ActiveRound';

import { observer } from 'mobx-react';

export default observer(props => 
	<div className="panel panel-default">
		<table className="ui table">
			<thead>
				<tr>
					<th style={{width: '10rem'}}>Round</th>
					<th>Expression</th>
					<th>Your answer</th>
					<th>Result</th>
				</tr>
			</thead>
			<tbody>
				{props.rounds.map(round => 
					<Round key={round.id} {...round} />
				)}
				<ActiveRound key={props.next.id} {...props.next} />
			</tbody>
		</table>
	</div>
)