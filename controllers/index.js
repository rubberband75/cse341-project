exports.getIndex = (req, res, next) => {
    res.render('index', { title: 'Welcome to my CSE341 repo', path: '/' });
};
