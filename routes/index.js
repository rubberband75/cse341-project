const router = require('express').Router();

const indexController = require('../controllers');
const errorController = require('../controllers/error-controller');

router.use('/project', require('./project-routes')); // Project Routes
router.use('/prove', require('./prove-routes')); // Prove Routes
router.use('/team', require('./team-routes')) // Teach Routes

router.get('/', indexController.getIndex) // Home Page
router.use(errorController.get404) // 404 page

module.exports = router;