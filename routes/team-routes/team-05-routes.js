const router = require('express').Router();

const team05Controller = require('../../controllers/team-controllers/team-05-controller')

router.get('/', team05Controller.getIndex);

module.exports = router;