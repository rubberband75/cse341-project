const router = require('express').Router();

const shopController = require('../../../controllers/project-controllers/project-01/shop')

router.get('/shop', shopController.getAllProducts)
router.get('/product/:productId', shopController.getProductById)

router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart);
router.post('/cart/delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getAllOrders)
router.post('/orders/create', shopController.createOrder)

module.exports = router;