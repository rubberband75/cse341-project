const router = require('express').Router();

const shopController = require('../../../controllers/project-controllers/project-01/shop')

router.get('/', shopController.getAllProducts)
router.get('/:productId', shopController.getProduct)

module.exports = router;