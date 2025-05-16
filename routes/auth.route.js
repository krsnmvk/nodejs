import { Router } from 'express';
import { getLogin, postLogin } from '../controllers/auth.controller.js';

const authRoute = Router();

authRoute.get('/login', getLogin);
authRoute.post('/login', postLogin);

export default authRoute;
