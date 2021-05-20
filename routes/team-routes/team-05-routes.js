const router = require('express').Router();

const team05Controller = require('../../controllers/team-controllers/team-05-controller')

router.get('/', team05Controller.getIndex);
router.post('/change-style', team05Controller.postStyle);

module.exports = router;