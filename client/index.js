import React from 'react';
import ReactDom from 'react-dom';

import { AppContainer } from 'react-hot-loader';

// TODO: production env
// TODO: flow? ts?
// TODO: server diagnostics output
// TODO: client tests

import Game from './Game';
import Connection from './Connection';

import NumbersStore from './NumbersStore';

document.title = 'The Numbers Game';

const sock = new WebSocket(`ws://${document.location.host}/numbers`); // FIXME: reconnect on failure

const store = new NumbersStore(new Connection(sock));

const render = Comp =>
	ReactDom.render(
		<AppContainer>
			<Comp store={store}/>
		</AppContainer>, 
		document.querySelector('#root')
	);

render(Game);

if(module.hot)
	module.hot.accept('./Game', () => 
    render(require('./Game').default)
	)
