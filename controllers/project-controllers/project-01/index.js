exports.getIndex = (req, res, next) => {
    res.render('project-views/project-01', { title: 'Project 01', path: '/project/01' });
};