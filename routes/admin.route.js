import { Router } from 'express';
import { join } from 'node:path';
import { getDirname } from '../utils/path.js';

export const products = [];

const adminRoute = Router();

adminRoute.get('/add-product', (req, res, next) => {
  res.sendFile(
    join(getDirname(import.meta.url), '..', 'views', 'add-product.html')
  );
});

adminRoute.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });

  res.redirect('/');
});

export default adminRoute;
