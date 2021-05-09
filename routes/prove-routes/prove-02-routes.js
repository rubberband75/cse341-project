const router = require('express').Router();

const prove02Controller = require('../../controllers/prove-controllers/prove-02-controller')

// Render the Prove02 Index Page
router.get('/', prove02Controller.getIndex);

// POST request to save book
router.post('/add-book', prove02Controller.addBook);

// POST request to remove book at given index
router.post('/remove-book', prove02Controller.removeBook);

module.exports = router;