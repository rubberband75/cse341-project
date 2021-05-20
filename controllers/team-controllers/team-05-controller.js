exports.getIndex = (req, res, next) => {

    req.session.counter = (req.session.counter || 0) + 1;

    res.render('team-views/team-05', {
        title: 'Team Activity 05',
        path: '/team/05',
        style: req.session.style,
        counter: req.session.counter
    });
}


exports.postStyle = (req, res, next) => {
    req.session.style = req.body.style;
    res.redirect('/team/05')
}


