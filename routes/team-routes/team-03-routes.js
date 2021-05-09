const router = require('express').Router();

const team03Controller = require('../../controllers/team-controllers/team-03-controller')

router.get('/', team03Controller.getIndex);

module.exports = router;