import { ProductModel } from '../models/product.model.js';

export function getAddProduct(req, res, next) {
  return res.render('admin/edit-product', {
    title: 'Add Product',
    href: '/admin/add-product',
    edit: false,
    isAuthenticated: req.isLoggedIn,
  });
}

export function postAddProduct(req, res, next) {
  const { title, image, price, description } = req.body;

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
      console.log(products);

      return res.render('admin/products', {
        title: 'admin Products',
        href: '/admin/products',
        products: products,
        isAuthenticated: req.isLoggedIn,
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
        title: 'edit Product',
        href: '/admin/add-product',
        edit: edit,
        product: product,
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
}

export function postEditProduct(req, res, next) {
  const { id, title, image, price, description } = req.body;

  ProductModel.findById(id)
    .then((product) => {
      product.title = title;
      product.image = image;
      product.price = price;
      product.description = description;

      return product.save();
    })
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
}

export function postDeleteProduct(req, res, next) {
  const { id } = req.body;

  ProductModel.findByIdAndDelete(id)
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
}
