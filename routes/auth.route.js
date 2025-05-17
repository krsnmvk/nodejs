import { Router } from 'express';
import {
  getLogin,
  getSignup,
  postLogin,
  postLogout,
} from '../controllers/auth.controller.js';

const authRoute = Router();

authRoute.get('/login', getLogin);
authRoute.post('/login', postLogin);

authRoute.get('/signup', getSignup);

authRoute.post('/logout', postLogout);

export default authRoute;
