const Product = require("../../../models/project-models/project-01/product");
const Order = require("../../../models/project-models/project-01/order");

exports.getAllProducts = (req, res, next) => {
  let findParams = {};
  if (req.query.tag) findParams = { tags: req.query.tag };
  Product.find(findParams)
    .then((products) => {
      res.render("project-views/project-01/shop", {
        title: "Shop",
        path: "/project/01/shop",
        products: products,
        tag: req.query.tag,
      });
    })
    .catch((err) => next(new Error(err)));
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        let error = new Error("Product Not Found");
        error.httpStatusCode = 404;
        return next(error);
      }

      res.render("project-views/project-01/product-detail", {
        title: product.title,
        path: "/project/01/products",
        product: product,
      });
    })
    .catch((err) => next(new Error(err)));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      let products = user.cart.items;
      res.render("project-views/project-01/cart", {
        title: "Cart",
        path: "/project/01/cart",
        products: products,
      });
    })
    .catch((err) => next(new Error(err)));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/project/01/cart");
    })
    .catch((err) => next(new Error(err)));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/project/01/cart");
    })
    .catch((err) => next(new Error(err)));
};

exports.getAllOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("project-views/project-01/orders", {
        title: "Orders",
        path: "/project/01/orders",
        orders: orders,
      });
    })
    .catch((err) => next(new Error(err)));
};

exports.createOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items
        .filter((i) => {
          return i.productId;
        })
        .map((i) => {
          return { quantity: i.quantity, productData: { ...i.productId._doc } };
        });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      req.user.clearCart();
    })
    .then(() => {
      res.redirect("/project/01/orders");
    })
    .catch((err) => next(new Error(err)));
};
