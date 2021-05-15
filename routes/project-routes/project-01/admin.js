const router = require('express').Router();

const User = require('../../../models/project-models/project-01/user');
const adminController = require('../../../controllers/project-controllers/project-01/admin')

router.use((req, res, next) => {
    User.findOne()
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.error(err));
});

router.get('/', adminController.getAllProducts)

router.get('/add-product', adminController.getAddProduct)
router.post('/add-product', adminController.postAddProduct)

router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product/:productId', adminController.postDeleteProduct)

module.exports = router;