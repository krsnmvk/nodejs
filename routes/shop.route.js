const { Router } = require('express');
const { join } = require('node:path');

const shopRoute = Router();

shopRoute.get('/', (req, res, next) => {
  res.sendFile(join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = shopRoute;
