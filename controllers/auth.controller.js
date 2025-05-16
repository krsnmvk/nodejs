export function getLogin(req, res, next) {
  return res.render('auth/login', {
    title: 'Login',
    href: '/login',
    isAuthenticated: req.isLoggedIn,
  });
}

export function postLogin(req, res, next) {
  req.isLoggedIn = true;

  return res.redirect('/');
}
