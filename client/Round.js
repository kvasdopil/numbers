import React from 'react';

export default props => 
	<tr>
		<td>{props.id}</td>
		<td>{props.question}</td>
		<td>
			{props.miss 
				? "MISS" 
				: props.your ? "Yes" : "No"
			}
		</td>
		<td>
			{props.miss 
				? "FAILED"
				: (props.success ? "OK" : "FAILED")
			}
		</td>
	</tr>