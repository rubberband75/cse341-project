const Order = require('../../../models/project-models/project-01/order')

exports.getAllOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      res.render('project-views/project-01/orders', {
        title: 'Your Orders',
        path: '/project/01/orders',
        orders: orders
      });
    })
    .catch(err => console.error(err));
};


exports.getOrderById = (req, res, next) => {
  const orderId = req.params.orderId;

  Order.findById(orderId)
    .then(order => {
      res.render('project-views/project-01/orders/order-detail', {
        title: 'Order',
        path: '/project/01/products',
        order: order,
      });
    })
    .catch(err => console.error(err));
};

exports.createOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items
      .filter(i => {
        return i.productId
      })
      .map(i => {
        return { quantity: i.quantity, productData: { ...i.productId._doc } }
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      req.user.clearCart();
    })
    .then(() => {
      res.redirect('/project/01/orders');
    })
    .catch(err => console.error(err));
};