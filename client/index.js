import React from 'react';
import ReactDom from 'react-dom';

import { AppContainer } from 'react-hot-loader';

// TODO: production env
// TODO: flow? ts?
// TODO: server diagnostics output
// TODO: store tests
// TODO: tests for Connection

// TODO: timeout before new game
// TODO: star animation
// TODO: table scroll animation

// TODO: version with input
// TODO: version with cards

// TODO: description

import Game from './components/Game';
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
	module.hot.accept('./components/Game', () => 
    render(require('./components/Game').default)
	)
