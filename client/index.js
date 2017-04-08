import React from 'react';
import ReactDom from 'react-dom';

// TODO: dev server
// TODO: hmre
// TODO: flow? ts?
// TODO: server diagnostics output
// TODO: client tests
// TODO: server tests

document.title = 'The Numbers Game';

const sock = new WebSocket(`ws://${document.location.host}`); // FIXME: reconnect on failure

sock.onopen = () => {
	sock.onclose = () => console.log('close');
	sock.onmessage = msg => console.log(msg);

	sock.send('ping');
}

const App = props => 
  <div>Hello privet medved</div>

ReactDom.render(
	<App />, 
	document.getElementById('root')
);
