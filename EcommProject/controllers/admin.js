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

  const product = {
    title,
    imageUrl,
    price,
    description
  }
  //or you can put the associated user id in object and created new Product directly
  //here sequalize automatically create a createProduct for user because me made association create+nameoftable
  req.user.createProduct(product).then(() => {
    res.redirect("/admin/products");
  }).catch(err => {
    console.log(`${err} in postAddProduct`)
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/');
  }
  const { productId: prodId } = req.params;
  req.user.getProducts(
    {
      where: {
        id: prodId
      }
    }).then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    }
    ).catch(err => {
      console.log(`${err} in getEditProduct`)
    })
};

exports.postEditProduct = (req, res, next) => {
  const { productId: prodId } = req.body;
  const { title, price, imageUrl, description } = req.body;
  Product.update({ title, price, imageUrl, description }, {
    where: {
      id: prodId,
    },
  }).then(() => {
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(`${err} in postEditProduct`)
  });
}

exports.deleteproductbyID = (req, res, next) => {
  const { productId: prodId } = req.params;
  Product.destroy({
    where: {
      id: prodId
    }
  }).then(() => {
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(`${err} in deleteproductbyID`)
  });
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(`${err} in getProducts admin`)
  });
};
