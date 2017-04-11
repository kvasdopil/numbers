import React from 'react';

import { observer } from 'mobx-react';

export default observer(props => 
	<tr>
		<td>{props.id}</td>
		<td>{props.question}</td>
		<td>
			{props.answer == undefined 
				? "MISS" 
				: props.answer ? "Yes" : "No"
			}
		</td>
		<td>
			{props.success ? "OK" : "FAILED"}
		</td>
	</tr>
)