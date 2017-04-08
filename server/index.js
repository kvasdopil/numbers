const http = require('http');

const port = 8088;

const server = http.createServer((req, res) => {
  res.end('It works');
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port);

console.log(`Server listening on localhost:${port}`);

