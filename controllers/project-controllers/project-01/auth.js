const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const User = require('../../../models/project-models/project-01/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
}));

exports.getLogin = (req, res, next) => {
    //   let message = req.flash('error');
    //   if (message.length > 0) {
    //     message = message[0]
    //   } else {
    //     message = null;
    //   }

    res.render('project-views/project-01/auth/login', {
        title: 'Login',
        path: '/project/01/login',
        // errorMessage: message
    });
};

exports.getSignup = (req, res, next) => {
    //   let message = req.flash('error');
    //   if (message.length > 0) {
    //     message = message[0]
    //   } else {
    //     message = null;
    //   }
    res.render('project-views/project-01/auth/signup', {
        title: 'Sign Up',
        path: '/project/01/signup',
        //     errorMessage: message
    });
};

exports.postLogin = (req, res, next) => {
    //   const email = req.body.email;
    //   const password = req.body.password;
    //   User.findOne({ email: email })
    //     .then(user => {
    //       if (!user) {
    //         req.flash('error', 'Invalid email or password.');
    //         return res.redirect('/login');
    //       }
    //       bcrypt
    //         .compare(password, user.password)
    //         .then(doMatch => {
    //           if (doMatch) {
    //             req.session.isLoggedIn = true;
    //             req.session.user = user;
    //             return req.session.save(err => {
    //               console.log(err);
                  res.redirect('/');
    //             });
    //           } else {
    //             req.flash('error', 'Invalid email or password.');
    //           }
    //           res.redirect('/login');
    //         })
    //         .catch(err => {
    //           console.log(err);
    //           res.redirect('/login');
    //         });
    //     })
    //     .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    //   const email = req.body.email;
    //   const password = req.body.password;
    //   const confirmPassword = req.body.confirmPassword;

    //   if (password !== confirmPassword) {
    //     req.flash('error', 'Passwords do not match.');
    //     return res.redirect('/signup');
    //   }

    //   User.findOne({ email: email })
    //     .then(userDoc => {
    //       if (userDoc) {
    //         req.flash('error', 'E-Mail already in use.');
            return res.redirect('/signup');
    //       }
    //       return bcrypt
    //         .hash(password, 12)
    //         .then(hashedPassword => {
    //           const user = new User({
    //             email: email,
    //             password: hashedPassword,
    //             cart: { items: [] }
    //           });
    //           return user.save();
    //         })
    //         .then(result => {
    //           res.redirect('/login');
    //           return transporter.sendMail({
    //             to: email,
    //             from: 'Chandler Childs <ch@ndlerchilds.net>',
    //             subject: "Signup Succeeded!",
    //             html: `<h1>You successfully signed up!</h1><p>Welcome ${email}!<p><p><a href="http://localhost:3000/">http://localhost:3000/</a></p>`
    //           })
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         })
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
};

exports.postLogout = (req, res, next) => {
    //   req.session.destroy(err => {
    //     console.log(err);
        res.redirect('/');
    //   });
};
