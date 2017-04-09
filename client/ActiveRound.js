import React from 'react';
import Round from './Round';

export default props =>
	<div>
		{props.id}: {props.question}: 
		{props.miss ? "MISS" : ""}
		{props.success ? "OK" : "FAILED"}
	</div>

