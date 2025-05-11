const { Router } = require('express');
const { join } = require('node:path');

const adminRoute = Router();

adminRoute.get('/add-product', (req, res, next) => {
  res.sendFile(join(__dirname, '..', 'views', 'add-product.html'));
});

adminRoute.post('/add-product', (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

module.exports = adminRoute;
