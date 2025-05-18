import { Router } from 'express';
import {
  getLogin,
  getResetPassword,
  getSignup,
  postLogin,
  postLogout,
  postSignup,
} from '../controllers/auth.controller.js';

const authRoute = Router();

authRoute.get('/login', getLogin);
authRoute.post('/login', postLogin);

authRoute.get('/signup', getSignup);
authRoute.post('/signup', postSignup);

authRoute.post('/logout', postLogout);

authRoute.get('/reset', getResetPassword);

export default authRoute;
