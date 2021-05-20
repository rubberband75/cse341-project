let users = ['user1', 'user2', 'user3'];

exports.getIndex = (req, res, next) => {
    res.render('team-views/team-02', {
        title: 'Team Activity 02',
        path: '/ta02', // For pug, EJS 
        users: users,
        error: null
    });
}

exports.addUser = (req, res, next) => {
    const username = req.body.username;

    errorMessage = null;
    let userExists = (users.indexOf(username) != -1);

    if (userExists) {
        errorMessage = "User Already Exists"
    } else {
        users.push(username)
    }

    res.render('team-views/team-02', {
        title: 'Team Activity 02',
        path: '/ta02', // For pug, EJS 
        users: users,
        error: errorMessage
    });
}

exports.removeUser = (req, res, next) => {
    const username = req.body.username;

    errorMessage = null;
    let userExists = (users.indexOf(username) != -1);

    if (userExists) {
        users = users.filter(e => e !== username);
    } else {
        errorMessage = "User Not Found"
    }

    res.render('team-views/team-02', {
        title: 'Team Activity 02',
        path: '/ta02', // For pug, EJS  
        users: users,
        error: errorMessage
    });
}