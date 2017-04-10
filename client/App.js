import React from 'react';
import Game from './Game';

import NumbersStore from './NumbersStore';

// App is our smart component containing the store

document.title = 'The Numbers Game';

const sock = new WebSocket(`ws://${document.location.host}/numbers`); // FIXME: reconnect on failure
const store = new NumbersStore(sock);

export default props => 
  <Game store={store} />
