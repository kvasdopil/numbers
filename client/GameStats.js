import React from 'react';

export default props =>
	<div style={{margin: '.5rem 1rem 1rem 1rem'}}>
		Your score: <span className="glyphicon glyphicon-star" /> {props.score}

		<div style={{float:'right'}} >
		  <span className="glyphicon glyphicon-user" />
		  &nbsp;
		  {props.users == 1
		  	? `${props.users} user ` 
		  	: `${props.users} users `
		  } 
		  playing right now
		</div>
	</div>