import { Router } from 'express';
import {
  getAddProduct,
  getAdminProducts,
  postAddProduct,
} from '../controllers/product.controller.js';

const adminRoute = Router();

adminRoute.get('/add-product', getAddProduct);
adminRoute.post('/add-product', postAddProduct);

adminRoute.get('/products', getAdminProducts);

export default adminRoute;
