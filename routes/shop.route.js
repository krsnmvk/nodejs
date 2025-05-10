const { Router } = require('express');

const shopRoute = Router();

shopRoute.get('/', (req, res, next) => {
  res.send('<h1>hello from express</h1>');
});

module.exports = shopRoute;
