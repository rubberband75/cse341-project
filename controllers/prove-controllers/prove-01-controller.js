let user = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    marketingEmails: null
}

exports.getIndex = (req, res, next) => {
    res.render('prove-views/prove-01/input', {
        title: 'Prove 01',
        path: '/prove01'
    });
}

exports.postNewUser = async (req, res, next) => {
    user = { ...req.body }
    res.writeHead(302, { 'Location': 'new-user' });
    res.end();
}

exports.getNewUser = (req, res, next) => {
    res.render('prove-views/prove-01/new-user', {
        title: 'Prove 01',
        path: '/prove01/new-user',
        user: user
    });
}