import { Product } from '../models/product.model.js';

export function getAddProduct(req, res, next) {
  res.render('admin/add-product', {
    title: 'Add Product',
    href: '/admin/add-product',
  });
}

export function postAddProduct(req, res, next) {
  const products = new Product(req.body.title);

  products.save();

  res.redirect('/');
}

export function getProducts(req, res, next) {
  Product.getAll().then((products) => {
    return res.render('shop/product-list', {
      title: 'Shop',
      href: '/',
      products: products,
    });
  });
}
