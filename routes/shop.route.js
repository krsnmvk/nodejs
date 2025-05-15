import { Router } from 'express';
import {
  getCart,
  // getCheckout,
  getIndex,
  // getOrders,
  getProducts,
  getProductDetail,
  postCart,
  postCartDeleteProduct,
  postOrders,
} from '../controllers/shop.controller.js';

const shopRoute = Router();

shopRoute.get('/', getIndex);

shopRoute.get('/products', getProducts);

shopRoute.get('/products/:id', getProductDetail);

shopRoute.get('/cart', getCart);
shopRoute.post('/cart', postCart);

shopRoute.post('/cart-delete-item', postCartDeleteProduct);

// shopRoute.get('/orders', getOrders);
shopRoute.post('/create-order', postOrders);

// shopRoute.get('/checkout', getCheckout);

export default shopRoute;
