import { Router } from 'express';
import { getProducts } from '../controllers/product.controller.js';

const shopRoute = Router();

shopRoute.get('/', getProducts);

export default shopRoute;
