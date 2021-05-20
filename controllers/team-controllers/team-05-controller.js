exports.getIndex = (req, res, next) => {
    res.render('team-views/team-05', {
        title: 'Team Activity 05',
        path: '/team/05'
    });
}