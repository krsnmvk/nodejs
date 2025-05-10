const { Router } = require('express');

const adminRoute = Router();

adminRoute.get('/add-product', (req, res, next) => {
  res.send(
    '<form action="/admin/add-product" method="post"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

adminRoute.post('/add-product', (req, res, next) => {
  console.log(req.body);

  res.redirect('/');
});

module.exports = adminRoute;
