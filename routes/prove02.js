const express = require('express');
const router = express.Router();

const books = [{ title: 'Book 1' }, { title: 'Book 2' }, { title: 'Book 3' }, { title: 'Book 4' },]

router.get('/', (req, res, next) => {
    res.render('pages/prove02/', {
        title: 'Prove 02',
        path: '/prove02',
        books: books
    });
});

router.post('/add-book', async (req, res, next) => {
    let { title, summary } = req.body;
    books.push({ title, summary })

    res.redirect('/prove02/')
});

module.exports = router;