const router = require('express').Router();

const authController = require('../../../controllers/project-controllers/project-01/auth')

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.post('/logout', authController.postLogout);

module.exports = router;