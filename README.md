# The Numbers Game

A multiplayer game of solving simple mathematical puzzles. Every round all users presented with a mathematical equation. The first one who answers properly recieves a score point.

# Assumptions

During game implementation following assumptions were made:

- The game must be asyncronious i.e. not relying on user actions to start new round or calculate the result
- Each round must be time limited so stalled clients wont block other users if all of them has provided wrong answers
- New round must not start immidiately after the previous one to let new users catch up
- New users cannot participate until the new round starts

# Considerations

So, since the game is realtime the best option is use websockets for all communication. This is implemented natively for frontend and with 'ws' module on server. Alteratively we can use 'sockjs' library since it is more portable (and has basically the same API) but I'm not sure if the compatibility is an issue currently.

The frontend uses React and hot module reload is nice thing to have since it saves tons of time. The game server has --devmode command-line options that loads webpack/babel/hmr/etc and rebuilds the bundle dynamically. Without that the server runs as a static http server/websocket server.

State management on the client is done with mobx library. I consider that the best option for given task since it produces very clean and compact code that is also pretty straightforward and self-explaining. 

The UI uses Semantic-UI library, I prefer that over bootstrap since it's more powerful and uses more sensible class naming convention that is easy to use and remember.

Tests were made for all parts of the game - ui components, ui store, libs and server.

# Not done (since i was limited on time)

- Integration tests weren't made. 
- The ui part can be polished further, animations added etc.
- The game would benefit of the ui layout would be redesigned completely.
- Websock connection on a client need to have means to restart connection on failure.
- Clients need to store their score somewhere (server/local storage)
- Server code is not perfect and may produce races in some cases, I believe that can be rewritten in more compact and clean way but not sure how exactly (with asyncs maybe?)

# Usage

- npm start - start in production mode
- npm run start-dev - start in dev mode
- npm run build - just build the bundle
- npm test - run the tests
- npm run watch - run the tests in watch mode