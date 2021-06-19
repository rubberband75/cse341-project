const router = require('express').Router();

router.use('/01', require('./prove-01-routes'));
router.use('/02', require('./prove-02-routes'));
router.use('/08', require('./prove-08-routes'));
router.use('/09', require('./prove-09-routes'));

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Prove Assignments', path: '/prove' });
})

module.exports = router;