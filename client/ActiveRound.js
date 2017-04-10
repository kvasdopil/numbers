import React from 'react';
import Round from './Round';

export default props => {
	if(props.question == undefined)
		return <tr>
			<td colSpan={4} style={{textAlign: 'center', padding: '2rem'}}>
				<div style={{width: "100%"}} className="ui active centered inline loader">
				</div>
				Waiting for the next round...
			</td>
		</tr>

	return <tr>
		<td>{props.id}</td>
		<td>{props.question}</td>
		<td>
			{props.miss 
				? "MISS" 
				: <div>
						<button className="ui green button">Yes</button>
						&nbsp;
						<button className="ui red button">No</button>			
					</div>
			}
		</td>
		<td>
			{props.miss
				? (props.success ? "OK" : "FAILED")
				: null
			}
		</td>
	</tr>
}

