const router = require('express').Router();

const productsController = require('../../../controllers/project-controllers/project-01/products')

router.get('/', productsController.getAllProducts)
router.get('/:productId', productsController.getProduct)

module.exports = router;