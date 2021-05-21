const User = require('../models/project-models/project-01/user');

module.exports = (req, res, next) => {
    if (!req.session.user) {
        res.locals.cartCount = 0;
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if(!user){
                req.session.destroy(err => {
                    if (err) console.log(err);
                    return res.redirect('/project/01/login')
                });
            }

            req.user = user;

            // Find the total number of items in the cart
            res.locals.cartCount = user.cart.items
                .reduce((count, cartItem) => {
                    return count + cartItem.quantity
                }, 0);

            next();
        })
        .catch(err => console.error(err));
}