import React from 'react';
import Round from './Round';
import Current from './Current';

import { observer } from 'mobx-react';

export default observer(props => 
	<div className="panel panel-default">
		<table className="ui table">
			<thead>
				<tr>
					<th style={{width: '10rem'}}>Round</th>
					<th>Expression</th>
					<th style={{width: '50%'}}>Your answer</th>
					<th>Result</th>
				</tr>
			</thead>
			<tbody>
				{props.rounds.map(round => 
					<Round key={round.id} {...round} />
				)}
				<Current {...props.current} onAnswer={props.onAnswer}/>
			</tbody>
		</table>
	</div>
)