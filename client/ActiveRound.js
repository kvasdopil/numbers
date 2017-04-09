import React from 'react';
import Round from './Round';

export default props =>
	<div>
		{props.id}: 
		{props.question}:
		{props.success ? "OK" : "FAILED"}
		{props.miss 
			? "MISS" 
			: <div>
					<button>Yes</button>
					<button>No</button>			
				</div>
		}
	</div>

