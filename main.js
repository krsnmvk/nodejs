const { writeFileSync } = require('node:fs');
const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="post"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (req.url === '/message' && req.method === 'POST') {
    writeFileSync('message.txt', 'dummy');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

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
