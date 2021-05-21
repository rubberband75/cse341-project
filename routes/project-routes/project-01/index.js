const router = require('express').Router();
const indexController = require('../../../controllers/project-controllers/project-01/index')
const imageController = require('../../../controllers/project-controllers/project-01/images')

const isAuth = require('../../../middlewares/is-auth');
const loadUser = require('../../../middlewares/load-user');

router.use(loadUser);

router.use(require('./auth'));
router.use(require('./shop'));

router.use('/images', require('./images'));

router.use('/admin', isAuth, require('./admin'));
router.use('/account', isAuth, require('./account'));

router.get('/', indexController.getIndex);

module.exports = router;