import React from 'react';

export default props =>
	<div>
		{props.id}: {props.question}: 
		{props.miss ? "MISS" : ""}
		{props.success ? "OK" : "FAILED"}
	</div>