const http = require('node:http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>First Page</title></head>');
  res.write('<body><h1>hello from my nodejs server</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(8080, () => {
  console.log('Server running on: http://localhost:8080');
});
