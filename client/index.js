import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

import { AppContainer } from 'react-hot-loader';

// TODO: production env
// TODO: flow? ts?
// TODO: server diagnostics output
// TODO: client tests
// TODO: server tests

// TODO: do we really need ws?

const render = Comp =>
	ReactDom.render(
		<AppContainer>
			<Comp />
		</AppContainer>, 
		document.querySelector('#root')
	);

render(App);

if(module.hot)
	module.hot.accept('./App', () => 
    render(require('./App').default)
	)
