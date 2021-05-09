const router = require('express').Router();

router.use('/01', require('./project-01'));

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Projects', path: '/project' });
})

module.exports = router;