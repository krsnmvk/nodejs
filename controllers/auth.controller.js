export function getLogin(req, res, next) {
  const isLoggedIn = req.get('Cookie').split('=')[1];

  return res.render('auth/login', {
    title: 'Login',
    href: '/login',
    isAuthenticated: isLoggedIn,
  });
}

export function postLogin(req, res, next) {
  res.setHeader('Set-Cookie', 'isLoggedIn=true');
  // console.log(res);
  // console.log(req);

  return res.redirect('/');
}
