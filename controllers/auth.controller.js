import { UserModel } from '../models/user.model.js';

export function getLogin(req, res, next) {
  console.log(req.session.isLoggedIn);

  return res.render('auth/login', {
    title: 'Login',
    href: '/login',
    isAuthenticated: false,
  });
}

export function postLogin(req, res, next) {
  UserModel.findById('682746a74d827d1cedfc07e5')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;

      return res.redirect('/');
    })
    .catch((err) => console.log(err));
}

export function postLogout(req, res, next) {
  req.session.destroy((err) => {
    console.log(err);

    return res.redirect('/');
  });
}
