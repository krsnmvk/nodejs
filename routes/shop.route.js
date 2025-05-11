import { Router } from 'express';
import {
  getCart,
  getCheckout,
  getIndex,
  getOrders,
  getProducts,
  getProductDetail,
  postCart,
  postCartDeleteProduct,
} from '../controllers/shop.controller.js';

const shopRoute = Router();

shopRoute.get('/', getIndex);

shopRoute.get('/products', getProducts);

shopRoute.get('/products/:id', getProductDetail);

shopRoute.get('/cart', getCart);
shopRoute.post('/cart', postCart);

shopRoute.post('/cart-delete-item', postCartDeleteProduct);

shopRoute.get('/orders', getOrders);

shopRoute.get('/checkout', getCheckout);

export default shopRoute;
