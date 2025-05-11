import { Router } from 'express';

export const products = [];

const adminRoute = Router();

adminRoute.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    title: 'Add Product',
    href: '/admin/add-product',
  });
});

adminRoute.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });

  res.redirect('/');
});

export default adminRoute;
