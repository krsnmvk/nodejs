const http = require('node:http');

const server = http.createServer((req, res) => {
  console.log('hello nedejs');
});

server.listen(8080, () => {
  console.log('Server running on: http://localhost:8080');
});
