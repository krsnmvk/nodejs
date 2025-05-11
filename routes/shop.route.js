import { Router } from 'express';
import {
  getCart,
  getCheckout,
  getIndex,
  getProducts,
} from '../controllers/shop.controller.js';

const shopRoute = Router();

shopRoute.get('/', getIndex);

shopRoute.get('/products', getProducts);

shopRoute.get('/cart', getCart);

shopRoute.get('/checkout', getCheckout);

export default shopRoute;
