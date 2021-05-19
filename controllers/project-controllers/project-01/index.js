exports.getIndex = (req, res, next) => {
    res.render('project-views/project-01', { title: 'Project 01', path: '/project/01' });
};

exports.getHome = (req, res, next) => {
    res.render('project-views/project-01/home', { title: 'Project 01', path: '/project/01/home' });
};