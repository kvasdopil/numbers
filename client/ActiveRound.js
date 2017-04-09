import React from 'react';
import Round from './Round';

export default props =>
	<tr>
		<td>{props.id}</td>
		<td>{props.question}</td>
		<td>
			{props.miss 
				? "MISS" 
				: <div>
						<button className="btn btn-success">Yes</button>
						&nbsp;
						<button className="btn btn-danger">No</button>			
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

