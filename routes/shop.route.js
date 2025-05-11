import { Router } from 'express';
import {
  getCart,
  getCheckout,
  getIndex,
  getOrders,
  getProducts,
} from '../controllers/shop.controller.js';

const shopRoute = Router();

shopRoute.get('/', getIndex);

shopRoute.get('/products', getProducts);

shopRoute.get('/cart', getCart);

shopRoute.get('/orders', getOrders);

shopRoute.get('/checkout', getCheckout);

export default shopRoute;
