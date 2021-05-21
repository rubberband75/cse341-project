const bcrypt = require('bcryptjs');

const User = require('../../../models/project-models/project-01/user')
const Image = require('../../../models/project-models/project-01/image')


exports.getAccountDetails = (req, res, next) => {
    res.render('project-views/project-01/account', {
        title: 'Account',
        path: '/project/01/account',
        user: req.user,
        errorMessages: req.flash('error')
    });
};

exports.postAccountDetails = async (req, res, next) => {

    // Check if email already in use
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
        req.flash('error', 'Email already in use');
        return res.redirect('/project/01/account');
    }

    let user = req.user
    user.name = req.body.name;
    user.email = req.body.email;

    if (req.file) {
        const image = new Image({ ...req.file })
        await image.save();
        user.profilePicture = image;
    }

    await user.save();

    return res.redirect('/project/01/account')
}


exports.postUpdatePassword = async (req, res, next) => {

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    const validPassword = await bcrypt.compare(oldPassword, req.user.password)
    console.log({ validPassword })
    if (!validPassword) {
        req.flash('error', 'Invalid Password');
        return res.redirect('/project/01/account');
    }

    if (newPassword !== confirmPassword) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/project/01/account');
    }

    let hashedPassword = await bcrypt.hash(newPassword, 12);
    req.user.password = hashedPassword;
    await req.user.save();

    return res.redirect('/project/01/account')

}