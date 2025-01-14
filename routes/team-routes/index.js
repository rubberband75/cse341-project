const router = require('express').Router();

router.use('/01', require('./team-01-routes'));
router.use('/02', require('./team-02-routes'));
router.use('/03', require('./team-03-routes'));
router.use('/04', require('./team-04-routes'));
router.use('/05', require('./team-05-routes'));

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Team Assignments', path: '/team' });
})

module.exports = router;