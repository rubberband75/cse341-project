const router = require('express').Router();

const prove08Controller = require('../../controllers/prove-controllers/prove-08-controller')

// Render the Prove08 Index Page
router.get('/', prove08Controller.getIndex);

module.exports = router;