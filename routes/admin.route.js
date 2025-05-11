import { Router } from 'express';
import {
  getAddProduct,
  getAdminProducts,
  getEditProduct,
  postAddProduct,
} from '../controllers/admin.controller.js';

const adminRoute = Router();

adminRoute.get('/add-product', getAddProduct);
adminRoute.post('/add-product', postAddProduct);

adminRoute.get('/products', getAdminProducts);

adminRoute.get('/edit-product/:id', getEditProduct);

export default adminRoute;
