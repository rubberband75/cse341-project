const router = require('express').Router();

const prove09Controller = require('../../controllers/prove-controllers/prove-09-controller')

// Render the Prove09 Index Page
router.get('/', prove09Controller.getIndex);

// Frontend Solution
router.get('/frontend', prove09Controller.getClientSideRender);

// Backend Solution
router.get('/backend', prove09Controller.getServerSideRender);

module.exports = router;