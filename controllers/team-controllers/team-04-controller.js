exports.getIndex = (req, res, next) => {
    res.render('team-views/team-04', {
        title: 'Team Activity 04',
        path: '/ta04'
    });
}