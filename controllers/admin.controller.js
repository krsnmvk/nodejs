import { Product } from '../models/product.model.js';

export function getAddProduct(req, res, next) {
  res.render('admin/edit-product', {
    title: 'Add Product',
    href: '/admin/add-product',
  });
}

export function postAddProduct(req, res, next) {
  const { title, image, price, description } = req.body;

  const products = new Product(title, image, price, description);

  products.save();

  return res.redirect('/');
}

export function getAdminProducts(req, res, next) {
  Product.getAll((products) => {
    return res.render('admin/products', {
      title: 'admin Products',
      href: '/admin/products',
      products: products,
    });
  });
}

export function getEditProduct(req, res, next) {
  const { edit } = req.query;

  if (!edit) return res.redirect('/');

  return res.render('admin/edit-product', {
    title: 'Add Product',
    href: '/admin/add-product',
    edit: edit,
  });
}
