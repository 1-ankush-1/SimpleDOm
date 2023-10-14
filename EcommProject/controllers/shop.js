const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render('shop/product-list', {
      prods: products[0],
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => {
    console.log(`${err} in getProducts`)
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(product => {
    res.render('shop/product-detail', { product: product[0][0], pageTitle: product[0][0].title, path: "/products" })
  }).catch(err => console.log(`${err} in getProduct shop`));
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render('shop/index', {
      prods: products[0],
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => {
    console.log(`${err} in getIndex`)
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const { productId: prodId } = req.body

  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, parseFloat(product.price));
  })
  res.redirect('/cart')
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
