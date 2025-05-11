import { Router } from 'express';
import { join } from 'node:path';
import { products } from './admin.route.js';
import { getDirname } from '../utils/path.js';

const shopRoute = Router();

shopRoute.get('/', (req, res, next) => {
  console.log(products);

  res.sendFile(join(getDirname(import.meta.url), '..', 'views', 'shop.html'));
});

export default shopRoute;
