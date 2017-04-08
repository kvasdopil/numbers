import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

import { AppContainer } from 'react-hot-loader';

// TODO: production env
// TODO: flow? ts?
// TODO: server diagnostics output
// TODO: client tests
// TODO: server tests

document.title = 'The Numbers Game';

const sock = new WebSocket(`ws://${document.location.host}/numbers`); // FIXME: reconnect on failure

sock.onopen = () => {
	sock.onclose = () => console.log('close');
	sock.onmessage = msg => console.log(msg);

	sock.send('ping');
}

const render = Comp =>
	ReactDom.render(
		<AppContainer>
			<Comp />
		</AppContainer>, 
		document.getElementById('root')
	);

render(App);

if(module.hot)
	module.hot.accept('./App', () => 
    render(require('./App').default)
	)
