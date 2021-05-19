const router = require('express').Router();

router.use('/01', require('./prove-01-routes'));
router.use('/02', require('./prove-02-routes'));

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Prove Assignments', path: '/prove' });
})

module.exports = router;