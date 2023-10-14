const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // console.log(price);
  const product = new Product(null, title, imageUrl, description, price);
  product.save().then(() => {
    res.redirect('/');
  }).catch(err => console.log(`${err} err in postAddProduct`));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/');
  }
  const { productId: prodId } = req.params;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })

};

exports.postEditProduct = (req, res, next) => {
  const { productId: prodId } = req.body;
  const { title, price, imageUrl, description } = req.body;
  const UpdatedProduct = new Product(prodId, title, imageUrl, description, price);
  UpdatedProduct.save();
  res.redirect('/admin/products');
}

exports.deleteproductbyID = (req, res, next) => {
  const { productId: prodId } = req.params;
  Product.deleteById(prodId).then(() => {
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(`${err} in deleteproductbyID`)
  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render('admin/products', {
      prods: products[0],
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(`${err} in getProducts admin`)
  });
};
