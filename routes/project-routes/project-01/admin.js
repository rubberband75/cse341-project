const router = require('express').Router();

const adminController = require('../../../controllers/project-controllers/project-01/admin')

router.get('/', adminController.getAdminDashboard)

router.get('/add-product', adminController.getAddProduct)
router.post('/add-product', adminController.postAddProduct)

router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product/:productId', adminController.postDeleteProduct)

module.exports = router;