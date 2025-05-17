import { Router } from 'express';
import {
  getAddProduct,
  getAdminProducts,
  getEditProduct,
  postAddProduct,
  postEditProduct,
  postDeleteProduct,
} from '../controllers/admin.controller.js';
import { isProtect } from '../middleware/auth.middleware.js';

const adminRoute = Router();

adminRoute.get('/add-product', isProtect, getAddProduct);
adminRoute.post('/add-product', isProtect, postAddProduct);

adminRoute.get('/products', isProtect, getAdminProducts);

adminRoute.get('/edit-product/:id', isProtect, getEditProduct);
adminRoute.post('/edit-product', isProtect, postEditProduct);

adminRoute.post('/delete-product', isProtect, postDeleteProduct);

export default adminRoute;
