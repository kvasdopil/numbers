import React from 'react';
import ReactDom from 'react-dom';

const App = props => 
  <div>Hello world</div>

ReactDom.render(
	<App />, 
	document.getElementById('root')
);