import { Router } from 'express';
import {
  getCart,
  // getCheckout,
  getIndex,
  getOrders,
  // getProducts,
  getProductDetail,
  postCart,
  postCartDeleteProduct,
  postOrders,
} from '../controllers/shop.controller.js';
import { isProtect } from '../middleware/auth.middleware.js';

const shopRoute = Router();

shopRoute.get('/', getIndex);

// shopRoute.get('/products', getProducts);

shopRoute.get('/products/:id', getProductDetail);

shopRoute.get('/cart', isProtect, getCart);
shopRoute.post('/cart', isProtect, postCart);

shopRoute.post('/cart-delete-item', isProtect, postCartDeleteProduct);

shopRoute.get('/orders', isProtect, getOrders);
shopRoute.post('/create-order', isProtect, postOrders);

// shopRoute.get('/checkout', getCheckout);

export default shopRoute;
