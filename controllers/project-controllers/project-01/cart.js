const Product = require('../../../models/project-models/project-01/product')

exports.getAllProducts = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      let products = user.cart.items;
      res.render('project-views/project-01/cart', {
        title: 'Cart',
        path: '/project/01/cart',
        products: products,
      });
    })
    .catch(err => console.error(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("Adding To Cart: ", prodId)
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/project/01/cart')
    })
    .catch(err => console.error(err))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("Removing From Cart: ", prodId)
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/project/01/cart');
    })
    .catch(err => console.error(err));
};