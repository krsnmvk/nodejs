import { Router } from 'express';
import {
  getAddProduct,
  postAddProduct,
} from '../controllers/product.controller.js';

const adminRoute = Router();

adminRoute.get('/add-product', getAddProduct);

adminRoute.post('/add-product', postAddProduct);

export default adminRoute;
