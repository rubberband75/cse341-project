//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

let users = ['user1', 'user2', 'user3'];

router.get('/', (req, res, next) => {
    res.render('pages/ta02', {
        title: 'Team Activity 02',
        path: '/ta02', // For pug, EJS 
        users: users,
        error: null
    });
});

router.post('/addUser', (req, res, next) => {
    const username = req.body.username;

    errorMessage = null;
    let userExists = (users.indexOf(username) != -1);

    if(userExists) {
        errorMessage = "User Already Exists"
    } else {
        users.push(username)
    }

    res.render('pages/ta02', {
        title: 'Team Activity 02',
        path: '/ta02', // For pug, EJS 
        users: users,
        error: errorMessage
    });
})

router.post('/removeUser', (req, res, next) => {
    const username = req.body.username;
    errorMessage = null;
    
    errorMessage = null;
    let userExists = (users.indexOf(username) != -1);

    if(userExists) {
        users = users.filter(e => e !== username);
    } else {
        errorMessage = "User Not Found"
    }

    res.render('pages/ta02', {
        title: 'Team Activity 02',
        path: '/ta02', // For pug, EJS  
        users: users,
        error: errorMessage
    });
})

module.exports = router;