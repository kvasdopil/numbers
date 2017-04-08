import React from 'react';
import ReactDom from 'react-dom';
import sockjs from 'sockjs-client';

// TODO: server, ws, express, statics
// TODO: hmre
// TODO: flow? ts?
// TODO: server diagnostics output
// TODO: client tests
// TODO: server tests

document.title = 'The Numbers Game 22';

const App = props => 
  <div>Hello world</div>

ReactDom.render(
	<App />, 
	document.getElementById('root')
);
