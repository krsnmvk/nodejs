export function getLogin(req, res, next) {
  const isLoggedIn = req.get('Cookie').split('=')[1];

  return res.render('auth/login', {
    title: 'Login',
    href: '/login',
    isAuthenticated: isLoggedIn,
  });
}

export function postLogin(req, res, next) {
  const cookie = [
    'isLoggedIn=true',
    'HttpOnly=true',
    'Max-Age=3600',
    'SameSite=Strict',
    'Secure=true',
    'Path="/"',
  ].join(';');

  res.setHeader('Set-Cookie', cookie);
  // console.log(res);
  // console.log(req);

  return res.redirect('/');
}
