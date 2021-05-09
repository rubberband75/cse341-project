const Item = require('../../models/team-models/team-03/Item');

exports.getIndex = (req, res, next) => {
    if (req.query.tag) {
        Item.getItemsByTag(req.query.tag, items => {
            res.render('team-views/team-03', {
                title: 'Team Activity 03',
                path: '/ta03',
                items: items,
                tag: req.query.tag
            });
        })
    } else {
        Item.getAllItems(items => {
            res.render('team-views/team-03', {
                title: 'Team Activity 03',
                path: '/ta03',
                items: items,
                tag: null
            });
        })
    }
}
