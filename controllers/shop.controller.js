import { Product } from '../models/product.model.js';

export function getIndex(req, res, next) {
  Product.getAll((products) => {
    return res.render('shop/index', {
      title: 'Shop',
      href: '/',
      products: products,
    });
  });
}

export function getProducts(req, res, next) {
  Product.getAll((products) => {
    return res.render('shop/product-list', {
      title: 'Products',
      href: '/products',
      products: products,
    });
  });
}

export function getProductDetail(req, res, next) {
  const { id } = req.params;

  Product.getById(id, (product) => {
    return res.render('shop/product-detail', {
      product: product,
      title: product.title,
      href: '/products',
    });
  });
}

export function getCart(req, res, next) {
  return res.render('shop/cart', { title: 'Your Cart', href: '/cart' });
}

export function getOrders(req, res, next) {
  return res.render('shop/orders', { title: 'Your Orders', href: '/orders' });
}

export function getCheckout(req, res, next) {
  return res.render('shop/checkout', { title: 'Checkout', href: '/checkout' });
}
