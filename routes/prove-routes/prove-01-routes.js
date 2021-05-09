const router = require('express').Router();

const prove01Controller = require('../../controllers/prove-controllers/prove-01-controller')

router.get('/', prove01Controller.getIndex);

router.get('/new-user', prove01Controller.getNewUser);

router.post('/new-user', prove01Controller.postNewUser);

module.exports = router;