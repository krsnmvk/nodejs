import { Router } from 'express';
import {
  getAddProduct,
  // getAdminProducts,
  // getEditProduct,
  postAddProduct,
  // postEditProduct,
  // postDeleteProduct,
} from '../controllers/admin.controller.js';

const adminRoute = Router();

adminRoute.get('/add-product', getAddProduct);
adminRoute.post('/add-product', postAddProduct);

// adminRoute.get('/products', getAdminProducts);

// adminRoute.get('/edit-product/:id', getEditProduct);
// adminRoute.post('/edit-product', postEditProduct);

// adminRoute.post('/delete-product', postDeleteProduct);

export default adminRoute;
