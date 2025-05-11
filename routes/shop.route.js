import { Router } from 'express';
import { products } from './admin.route.js';

const shopRoute = Router();

shopRoute.get('/', (req, res, next) => {
  res.render('shop', { title: 'Shop', href: '/', products: products });
});

export default shopRoute;
