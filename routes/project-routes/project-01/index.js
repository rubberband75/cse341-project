const router = require('express').Router();

const indexController = require('../../../controllers/project-controllers/project-01/index')

router.use('/products', require('./products'));
router.use('/admin', require('./admin'));
router.use('/cart', require('./cart'));

router.get('/', indexController.getIndex);

module.exports = router;