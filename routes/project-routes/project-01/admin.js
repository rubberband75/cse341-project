const router = require('express').Router();
var multer = require('multer');

const adminController = require('../../../controllers/project-controllers/project-01/admin')

router.get('/', adminController.getAdminDashboard)

router.get('/add-product', adminController.getAddProduct)
router.post('/add-product', multer().single('image'), adminController.postAddProduct)

router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', multer().single('image'), adminController.postEditProduct)

router.post('/delete-product/:productId', adminController.postDeleteProduct)

module.exports = router;