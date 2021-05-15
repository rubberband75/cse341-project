const router = require('express').Router();

const ordersController = require('../../../controllers/project-controllers/project-01/orders')

router.get('/', ordersController.getAllOrders)

router.post('/create', ordersController.createOrder)

router.get('/:orderId', ordersController.getOrderById)

module.exports = router;