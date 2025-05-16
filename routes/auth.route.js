import { Router } from 'express';
import {
  getLogin,
  postLogin,
  postLogout,
} from '../controllers/auth.controller.js';

const authRoute = Router();

authRoute.get('/login', getLogin);
authRoute.post('/login', postLogin);

authRoute.post('/logout', postLogout);

export default authRoute;
