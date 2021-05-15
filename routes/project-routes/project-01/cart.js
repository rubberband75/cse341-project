const router = require('express').Router();

const cartController = require('../../../controllers/project-controllers/project-01/cart')

router.get('/', cartController.getAllProducts)

router.post('/', cartController.postCart);

router.post('/delete-item', cartController.postCartDeleteProduct);

module.exports = router;