const router = require('express').Router();

const accountController = require('../../../controllers/project-controllers/project-01/account')

router.get('/', accountController.getAccountDetails)

module.exports = router;