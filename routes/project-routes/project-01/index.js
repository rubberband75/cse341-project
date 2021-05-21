const router = require('express').Router();
const indexController = require('../../../controllers/project-controllers/project-01/index')
const isAuth = require('../../../middlewares/is-auth');

const User = require('../../../models/project-models/project-01/user');

router.use((req, res, next) => {
    if (!req.session.user) {
        res.locals.cartCount = 0;
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            
            // Find the total number of items in the cart
            res.locals.cartCount = user.cart.items.reduce((count, cartItem) => { return count + cartItem.quantity }, 0);
            
            next();
        })
        .catch(err => console.log(err));
});

router.use(require('./auth'));
router.use(require('./shop'));

router.use('/admin', isAuth, require('./admin'));
router.use('/account', isAuth, require('./account'));

router.get('/', indexController.getIndex);

module.exports = router;