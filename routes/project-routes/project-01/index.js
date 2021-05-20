const router = require('express').Router();

const User = require('../../../models/project-models/project-01/user');

const indexController = require('../../../controllers/project-controllers/project-01/index')

router.use((req, res, next) => {
    User.findOne()
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.error(err));
});

router.use('/shop', require('./products'));

router.use('/products', require('./products'));
router.use('/admin', require('./admin'));
router.use('/cart', require('./cart'));
router.use('/orders', require('./orders'));

router.get('/', indexController.getIndex);
router.get('/legacy', indexController.getLegacy);

module.exports = router;