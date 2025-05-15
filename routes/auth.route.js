import { Router } from 'express';
import { getLogin } from '../controllers/auth.controller.js';

const authRoute = Router();

authRoute.get('/login', getLogin);

export default authRoute;
