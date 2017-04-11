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
			{/*props.success === undefined 
				? (props.answer
				  	? "MISS" 
				  	: <Buttons onAnswer={props.onAnswer} />
				  )
				: <Answer answer={props.answer} />
			*/}

			{props.answer === undefined
				? (props.success === false ? "MISS" : <Buttons onAnswer={props.onAnswer} />)
				: (props.answer === false ? "No" : "Yes")
			}
		</td>
		<td>
			{props.success === undefined
				? null
				: (props.success ? "OK" : "FAILED")
			}
		</td>
	</tr>
})

const Buttons = props => 
	<div>
		<button className="ui green button" onClick={() => props.onAnswer(true)}>
			Yes
		</button>
		&nbsp;
		<button className="ui red button" onClick={() => props.onAnswer(false)}>
			No
		</button>			
	</div>

  

