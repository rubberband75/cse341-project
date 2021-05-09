const router = require('express').Router();

const cartController = require('../../../controllers/project-controllers/project-01/cart')

router.get('/', cartController.getAllProducts)

module.exports = router;