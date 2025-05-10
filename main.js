const http = require('node:http');
const requestHandler = require('./routes');

const server = http.createServer(requestHandler);

server.listen(8080, () => {
  console.log('Server running on: http://localhost:8080');
});
