exports.get404 = (req, res, next) => {
    res.statusCode = 404;
    res.render('project-views/project-01/errors/404', {
        title: 'Account',
        user: req.user,
        path: req.originalUrl
    });
};