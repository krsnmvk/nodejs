import { OrderModel } from '../models/order.model.js';
import { ProductModel } from '../models/product.model.js';

export function getIndex(req, res, next) {
  ProductModel.find()
    .then((products) => {
      return res.render('shop/index', {
        title: 'Shop',
        href: '/',
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
}

// export function getProducts(req, res, next) {
//   ProductModel.find()
//     .then((products) => {
//       return res.render('shop/product-list', {
//         title: 'Products',
//         href: '/products',
//         products: products,
//         isAuthenticated: req.session.isLoggedIn,
//       });
//     })
//     .catch((err) => console.log(err));
// }

export function getProductDetail(req, res, next) {
  const { id } = req.params;

  ProductModel.findById(id)
    .then((product) => {
      return res.render('shop/product-detail', {
        product: product,
        title: product.title,
        href: '/products',
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
}

export function getCart(req, res, next) {
  req.user.populate('cart.items.productId').then((user) => {
    const products = user.cart.items;

    return res.render('shop/cart', {
      href: '/cart',
      title: 'Your Cart',
      products: products,
      isAuthenticated: req.session.isLoggedIn,
    });
  });
}

export function postCart(req, res, next) {
  const { id } = req.body;

  ProductModel.findById(id)
    .then((product) => req.user.addToCart(product))
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
}

export function getOrders(req, res, next) {
  OrderModel.find({ 'user.userId': req.user._id })
    .then((orders) => {
      return res.render('shop/orders', {
        href: '/orders',
        title: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
}

export function postOrders(req, res, next) {
  req.user
    .populate('cart.items.productId')
    .then((user) => {
      const products = user.cart.items.map((i) => ({
        product: { ...i.productId._doc },
        quantity: i.quantity,
      }));

      const orders = new OrderModel({
        user: { name: req.user.name, userId: req.user },
        products: products,
      });

      return orders.save();
    })
    .then(() => req.user.clearCart())
    .then(() => res.redirect('/orders'))
    .catch((err) => console.log(err));
}

// export function getCheckout(req, res, next) {
//   return res.render('shop/checkout', { title: 'Checkout', href: '/checkout' });
// }

export function postCartDeleteProduct(req, res, next) {
  const { id } = req.body;

  req.user
    .deleteFromCart(id)
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
}
