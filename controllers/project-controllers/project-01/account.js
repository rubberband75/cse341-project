const Product = require('../../../models/project-models/project-01/product')
const Order = require('../../../models/project-models/project-01/order')

exports.getAccountDetails = (req, res, next) => {
    res.render('project-views/project-01/account', {
        title: 'Account',
        path: '/project/01/account',
        user: req.user,
    });
};