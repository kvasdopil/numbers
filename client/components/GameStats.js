import React from 'react';
import { observer } from 'mobx-react';


export default observer(props =>
	<div className="ui panel" style={{padding: '1rem'}}>
		Your score:
		<i className="ui orange star icon" />
		{props.score}
	
		<div style={{float:'right'}} >
		  <i className="ui blue user icon" />
		  {/* FIXME: thats not localizable */}
		  {props.players == 1
		  	? `${props.players} player ` 
		  	: `${props.players} players `
		  } 
		  playing right now
		</div>
	</div>
)