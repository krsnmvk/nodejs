import { Router } from 'express';
import { check } from 'express-validator';
import {
  getLogin,
  getNewPassword,
  getResetPassword,
  getSignup,
  postLogin,
  postLogout,
  postNewPassword,
  postResetPassword,
  postSignup,
} from '../controllers/auth.controller.js';

const authRoute = Router();

authRoute.get('/login', getLogin);
authRoute.post('/login', postLogin);

authRoute.get('/signup', getSignup);
authRoute.post(
  '/signup',
  check('email').isEmail().withMessage('Please enter a valid email'),
  postSignup
);

authRoute.post('/logout', postLogout);

authRoute.get('/reset', getResetPassword);
authRoute.post('/reset', postResetPassword);

authRoute.get('/reset/:token', getNewPassword);
authRoute.post('/new', postNewPassword);

export default authRoute;
