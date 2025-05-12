import { ProductModel } from '../models/product.model.js';

export function getIndex(req, res, next) {
  ProductModel.find()
    .then((products) => {
      return res.render('shop/index', {
        title: 'Shop',
        href: '/',
        products: products,
      });
    })
    .catch((err) => console.log(err));
}

export function getProducts(req, res, next) {
  ProductModel.find()
    .then((products) => {
      return res.render('shop/product-list', {
        title: 'Products',
        href: '/products',
        products: products,
      });
    })
    .catch((err) => console.log(err));
}

export function getProductDetail(req, res, next) {
  const { id } = req.params;

  ProductModel.findById(id)
    .then((product) => {
      return res.render('shop/product-detail', {
        product: product,
        title: product.title,
        href: '/products',
      });
    })
    .catch((err) => console.log(err));
}

// export function getCart(req, res, next) {
//   Cart.getCart((cart) => {
//     Product.getAll((products) => {
//       const cartProducts = [];

//       for (let product of products) {
//         const cartProductData = cart.products.find(
//           (prod) => prod.id === product.id
//         );

//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty });
//         }
//       }
//       return res.render('shop/cart', {
//         href: '/cart',
//         title: 'Your Cart',
//         products: cartProducts,
//       });
//     });
//   });
// }

export function postCart(req, res, next) {
  const { id } = req.body;

  ProductModel.findById(id)
    .then((product) => req.user.addToCart(product))
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
}

// export function getOrders(req, res, next) {
//   return res.render('shop/orders', { title: 'Your Orders', href: '/orders' });
// }

// export function getCheckout(req, res, next) {
//   return res.render('shop/checkout', { title: 'Checkout', href: '/checkout' });
// }

// export function postCartDeleteProduct(req, res, next) {
//   const { id } = req.body;

//   Product.getById(id, (product) => {
//     Cart.deleteProduct(id, product.price);

//     return res.redirect('/cart');
//   });
// }
