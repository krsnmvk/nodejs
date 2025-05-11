const products = [];

export function getAddProduct(req, res, next) {
  res.render('add-product', {
    title: 'Add Product',
    href: '/admin/add-product',
  });
}

export function postAddProduct(req, res, next) {
  products.push({ title: req.body.title });

  res.redirect('/');
}

export function getProducts(req, res, next) {
  res.render('shop', { title: 'Shop', href: '/', products: products });
}
