const router = require('express').Router();
var multer = require('multer');

const adminController = require('../../../controllers/project-controllers/project-01/admin')

router.get('/', adminController.getAdminDashboard)

router.get('/add-product', adminController.getAddProduct)
router.post('/add-product', adminController.postAddProduct)

router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product/:productId', adminController.postDeleteProduct)

router.get('/upload-image', adminController.getUploadImage)
router.post('/upload-image', multer().single('image'), adminController.postUploadImage)

module.exports = router;