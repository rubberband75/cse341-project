const router = require('express').Router();

const shopController = require('../../../controllers/project-controllers/project-01/shop')
const isAuth = require('../../../middlewares/is-auth');

router.get('/shop', shopController.getAllProducts)
router.get('/product/:productId', shopController.getProductById)

router.get('/cart', isAuth, shopController.getCart)
router.post('/cart', isAuth, shopController.postCart);
router.post('/cart/delete-item', isAuth, shopController.postCartDeleteProduct);

router.get('/orders', isAuth, shopController.getAllOrders)
router.post('/orders/create', isAuth, shopController.createOrder)

module.exports = router;