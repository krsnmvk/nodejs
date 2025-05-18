export function get404(req, res, next) {
  res.status(404).render('404', {
    title: 'Page Not Found',
    href: '/404',
    isAuthenticated: req.session.isLoggedIn,
  });
}

export function get500(req, res, next) {
  res.status(500).render('500', {
    title: 'Error!',
    href: '/500',
    isAuthenticated: req.session.isLoggedIn,
  });
}
