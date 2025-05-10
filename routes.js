const { writeFile } = require('node:fs/promises');

function requestHandler(req, res) {
  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="post"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (req.url === '/message' && req.method === 'POST') {
    const body = [];

    req.on('data', (chunk) => body.push(chunk));

    req.on('end', async () => {
      try {
        const parseBody = Buffer.concat(body).toString();
        const message = decodeURIComponent(
          parseBody.split('=')[1].replace(/\+/, ' ')
        );

        await writeFile('message.txt', message);

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      } catch (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    return;
  }

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.write('<html>');
  res.write('<head><title>First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js server</h1></body>');
  res.write('</html>');
  res.end();
}

module.exports = requestHandler;
