import React from 'react';

import { observer } from 'mobx-react';

export default observer(props => 
{
	let className = "";

	return <tr className={className}>
		<td>{props.id}</td>
		<td>{props.question}</td>
		<td>
			{props.answer == undefined ? "MISS" : props.answer}
		</td>
		<td>
			{props.success 
				? <span><i className="ui large green check icon"/>OK</span> 
				: <span><i className="ui large red remove icon"/>FAILED</span>
			}
		</td>
	</tr>
})