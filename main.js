const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('this always runs');

  next();
});

app.use('/add-product', (req, res, next) => {
  res.send(
    '<form action="/product" method="post"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.post('/product', (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send('<h1>hello from express</h1>');
});

app.listen(8080, () => {
  console.log('Server running on: http://localhost:8080');
});
