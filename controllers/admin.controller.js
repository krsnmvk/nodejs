import { Product } from '../models/product.model.js';

export function getAddProduct(req, res, next) {
  res.render('admin/edit-product', {
    title: 'Add Product',
    href: '/admin/add-product',
    edit: false,
  });
}

export function postAddProduct(req, res, next) {
  const { title, image, price, description } = req.body;

  const products = new Product(null, title, image, price, description);

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

  const { id } = req.params;

  Product.getById(id, (product) => {
    if (!product) return res.redirect('/');

    return res.render('admin/edit-product', {
      title: 'edit Product',
      href: '/admin/add-product',
      edit: edit,
      product: product,
    });
  });
}

export function postEditProduct(req, res, next) {
  const { id, title, image, price, description } = req.body;

  const updatedProduct = new Product(id, title, image, price, description);

  updatedProduct.save();

  return res.redirect('/admin/products');
}

export function postDeleteProduct(req, res, next) {
  const { id } = req.body;

  Product.deleteById(id);

  return res.redirect('/admin/products');
}
