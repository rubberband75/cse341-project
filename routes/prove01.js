const express = require('express');
const router = express.Router();

let user = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    marketingEmails: null
}

router.get('/', (req, res, next) => {
    res.render('pages/prove01/input', {
        title: 'Prove 01',
        path: '/prove01'
    });
});

router.post('/new-user', async (req, res, next) => {
    user = { ...req.body }

    res.writeHead(302, { 'Location': 'new-user' });
    res.end();
});

router.get('/new-user', (req, res, next) => {
    res.render('pages/prove01/new-user', {
        title: 'Prove 01',
        path: '/prove01/new-user',
        user: user
    });
});

module.exports = router;