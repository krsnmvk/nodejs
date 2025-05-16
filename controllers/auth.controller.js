export function getLogin(req, res, next) {
  console.log(req.session.isLoggedIn);

  return res.render('auth/login', {
    title: 'Login',
    href: '/login',
    isAuthenticated: false,
  });
}

export function postLogin(req, res, next) {
  req.session.isLoggedIn = true;

  return res.redirect('/');
}

export function postLogout(req, res, next) {
  req.session.destroy((err) => {
    console.log(err);

    return res.redirect('/');
  });
}
