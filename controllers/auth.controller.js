import { UserModel } from '../models/user.model.js';

export function getLogin(req, res, next) {
  return res.render('auth/login', {
    title: 'Login',
    href: '/login',
    isAuthenticated: false,
  });
}

export function postLogin(req, res, next) {
  UserModel.findById('68281bffb07b467b40255e4f')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;

      req.session.save((err) => {
        console.log(err);
        return res.redirect('/');
      });
    })
    .catch((err) => console.log(err));
}

export function postLogout(req, res, next) {
  req.session.destroy((err) => {
    console.log(err);

    return res.redirect('/');
  });
}

export function getSignup(req, res, next) {
  return res.render('auth/signup', {
    title: 'Signup',
    href: '/signup',
    isAuthenticated: false,
  });
}

export function postSignup(req, res, next) {
  const { email, password, confirmPassword } = req.body;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) return res.redirect('/signup');

      const newUser = new UserModel({
        email: email,
        password: password,
        cart: { items: [] },
      });

      return newUser.save();
    })
    .then(() => res.redirect('/login'))
    .catch((err) => console.log(err));
}
