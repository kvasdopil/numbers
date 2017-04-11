import React from 'react';
import Round from './Round';

import { observer } from 'mobx-react';

export default observer(props => {
	if(props.question == undefined)
		return <tr>
			<td> </td>
			<td> </td>
			<td>
				<div style={{marginRight: '1rem'}} className="ui active small inline loader">
				</div>
				Waiting for the next round...
			</td>
			<td> </td>
		</tr>

	return <tr>
		<td>{props.id}</td>
		<td>{props.question}</td>
		<td>
			{props.answer === undefined
				? (props.success === false ? "MISS" : <Edit onAnswer={props.onAnswer} />)
				: props.answer
			}
		</td>
		<td>
			{props.success === undefined
				? null
				: (props.success ? OK : FAILED)
			}
		</td>
	</tr>
})

class Edit extends React.Component
{
	componentDidMount()
	{
		this.edit.focus();
	}

	render()
	{
		const send = () => this.props.onAnswer(parseInt(this.edit.value));

		return <div className="ui action input focus">
			<input type="text" ref={i => this.edit = i} onKeyPress={e => (e.key == 'Enter') && send()}/>
			<button className="ui green button" onClick={() => send()}>
				Submit
			</button>
		</div>
	}
}