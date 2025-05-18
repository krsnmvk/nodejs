import { Router } from 'express';
import { body } from 'express-validator';
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
adminRoute.post(
  '/add-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('image').isString(),
    body('price').isFloat(),
    body('description').isLength({ min: 3, max: 1000 }).trim(),
  ],
  isProtect,
  postAddProduct
);

adminRoute.get('/products', isProtect, getAdminProducts);

adminRoute.get('/edit-product/:id', isProtect, getEditProduct);
adminRoute.post(
  '/edit-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('image').isString(),
    body('price').isFloat(),
    body('description').isLength({ min: 3, max: 1000 }).trim(),
  ],
  isProtect,
  postEditProduct
);

adminRoute.post('/delete-product', isProtect, postDeleteProduct);

export default adminRoute;
