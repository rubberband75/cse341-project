const router = require('express').Router();
var multer = require('multer');

const accountController = require('../../../controllers/project-controllers/project-01/account')

router.get('/', accountController.getAccountDetails)
router.post('/', multer().single('image'), accountController.postAccountDetails)

router.post('/update-password', accountController.postUpdatePassword)

module.exports = router;