const express = require('express');

const port = 8088;
const app = express();

// TODO: dev mode

app.use('/', express.static('static'));

app.listen(port, () =>
  console.log(`Server listening on localhost:${port}`)
);
