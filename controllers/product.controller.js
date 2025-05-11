import { Product } from '../models/product.model.js';

export function getAddProduct(req, res, next) {
  res.render('add-product', {
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
  const products = Product.getAll();

  res.render('shop', { title: 'Shop', href: '/', products: products });
}
