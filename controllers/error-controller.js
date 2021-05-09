exports.get404 = (req, res, next) => {
    res.render('errors/404', { title: '404 - Page Not Found', path: req.url })
};
