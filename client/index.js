import React from 'react';
import ReactDom from 'react-dom';

// TODO: hmre
// TODO: flow? ts?
// TODO: server diagnostics output
// TODO: client tests
// TODO: server tests

const App = props => 
  <div>Hello world</div>

ReactDom.render(
	<App />, 
	document.getElementById('root')
);