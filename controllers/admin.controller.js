import { ProductModel } from '../models/product.model.js';
import { validationResult } from 'express-validator';

export function getAddProduct(req, res, next) {
  return res.render('admin/edit-product', {
    title: 'Add Product',
    href: '/admin/add-product',
    edit: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
  });
}

export function postAddProduct(req, res, next) {
  const { title, image, price, description } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      title: 'Add Product',
      href: '/admin/add-product',
      edit: false,
      hasError: true,
      product: {
        title: title,
        image: image,
        price: price,
        description: description,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array9,
    });
  }

  const products = new ProductModel({
    title,
    image,
    price,
    description,
    userId: req.user,
  });

  products
    .save()
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
}

export function getAdminProducts(req, res, next) {
  ProductModel.find()
    // .populate('userId')
    // .select('title price userId')
    .then((products) => {
      return res.render('admin/products', {
        title: 'admin Products',
        href: '/admin/products',
        products: products,
      });
    })
    .catch((err) => console.log(err));
}

export function getEditProduct(req, res, next) {
  const { edit } = req.query;

  if (!edit) return res.redirect('/');

  const { id } = req.params;

  ProductModel.findById(id)
    .then((product) => {
      if (!product) return res.redirect('/');

      return res.render('admin/edit-product', {
        title: 'Edit Product',
        href: '/admin/add-product',
        edit: edit,
        hasError: false,
        product: product,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => console.log(err));
}

export function postEditProduct(req, res, next) {
  const { id, title, image, price, description } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-product', {
      title: 'Edit Product',
      href: '/admin/add-product',
      edit: true,
      hasError: true,
      product: {
        title: title,
        image: image,
        price: price,
        description: description,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }

  ProductModel.findById(id)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }

      product.title = title;
      product.image = image;
      product.price = price;
      product.description = description;

      return product.save().then(() => res.redirect('/admin/products'));
    })
    .catch((err) => console.log(err));
}

export function postDeleteProduct(req, res, next) {
  const { id } = req.body;

  ProductModel.deleteOne({ _id: id, userId: req.user._id })
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
}
