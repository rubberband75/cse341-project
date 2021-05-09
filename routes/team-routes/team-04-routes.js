const router = require('express').Router();

const team04Controller = require('../../controllers/team-controllers/team-04-controller')

router.get('/', team04Controller.getIndex);

module.exports = router;