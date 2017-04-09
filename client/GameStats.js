import React from 'react';

export default props =>
	<div style={{margin: '.5rem 1rem 1rem 1rem'}}>
		Your score: <span className="glyphicon glyphicon-star" /> 5

		<div style={{float:'right'}} >
		  <span className="glyphicon glyphicon-user" /> 10 users playing right now
		</div>
	</div>