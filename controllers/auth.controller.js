export function getLogin(req, res, next) {
  return res.render('auth/login', { title: 'Login', href: '/login' });
}
