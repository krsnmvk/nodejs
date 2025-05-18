import { Router } from 'express';
import { check, body } from 'express-validator';
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
import { UserModel } from '../models/user.model.js';

const authRoute = Router();

authRoute.get('/login', getLogin);
authRoute.post('/login', postLogin);

authRoute.get('/signup', getSignup);
authRoute.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (value, { req }) => {
        return UserModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject('User already exists');
          }
        });
      }),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .isAlphanumeric(),
    body('confirmPasswrd').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password have to match');
      }

      return true;
    }),
  ],
  postSignup
);

authRoute.post('/logout', postLogout);

authRoute.get('/reset', getResetPassword);
authRoute.post('/reset', postResetPassword);

authRoute.get('/reset/:token', getNewPassword);
authRoute.post('/new', postNewPassword);

export default authRoute;
