import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { UserModel } from '../models/user.model.js';

export function getLogin(req, res, next) {
  let messages = req.flash('error');

  if (messages.length > 0) {
    messages = messages[0];
  } else {
    messages = null;
  }

  return res.render('auth/login', {
    title: 'Login',
    href: '/login',
    errorMessage: messages,
  });
}

export function postLogin(req, res, next) {
  const { email, password } = req.body;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email');
        return res.redirect('/login');
      }

      const isValidPassword = compareSync(password, user.password);

      if (!isValidPassword) {
        req.flash('error', 'Invalid password');
        return res.redirect('/login');
      }

      req.session.isLoggedIn = true;
      req.session.user = user;

      req.session.save((err) => {
        if (err) {
          console.log(err);
        }

        return res.redirect('/');
      });
    })
    .catch((err) => console.log(err));
}

export function postLogout(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }

    return res.redirect('/');
  });
}

export function getSignup(req, res, next) {
  return res.render('auth/signup', {
    title: 'Signup',
    href: '/signup',
  });
}

export function postSignup(req, res, next) {
  const { email, password, confirmPassword } = req.body;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) return res.redirect('/signup');

      const salt = genSaltSync(10);
      const hashedPassword = hashSync(password, salt);

      const newUser = new UserModel({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });

      return newUser.save();
    })
    .then(() => res.redirect('/login'))
    .catch((err) => console.log(err));
}
