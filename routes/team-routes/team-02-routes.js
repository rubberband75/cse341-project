const router = require('express').Router();

const team02Controller = require('../../controllers/team-controllers/team-02-controller')

router.get('/', team02Controller.getIndex);

router.post('/addUser', team02Controller.addUser);

router.post('/removeUser', team02Controller.removeUser);

module.exports = router;