const router = require('express').Router();
const indexController = require('../../../controllers/project-controllers/project-01/index')

const User = require('../../../models/project-models/project-01/user');

router.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

router.use(require('./auth'));
router.use(require('./shop'));

router.use('/admin', require('./admin'));
router.use('/account', require('./account'));

router.get('/', indexController.getIndex);

module.exports = router;