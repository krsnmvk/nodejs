const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('this always runs');

  next();
});

app.use('/add-product', (req, res, next) => {
  res.send('<h1>the "add product" page</h1>');
});

app.use('/', (req, res, next) => {
  res.send('<h1>hello from express</h1>');
});

app.listen(8080, () => {
  console.log('Server running on: http://localhost:8080');
});
