const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const { validationResult } = require("express-validator/check");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../../../models/project-models/project-01/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

exports.getLogin = (req, res, next) => {
  res.render("project-views/project-01/auth/login", {
    title: "Login",
    path: "/project/01/login",
    errorMessages: req.flash("error"),
    validationErrors: [],
  });
};

exports.getSignup = (req, res, next) => {
  res.render("project-views/project-01/auth/signup", {
    title: "Sign Up",
    path: "/project/01/signup",
    errorMessages: req.flash("error"),
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (res.locals.hasValidationErrors) {
    return res.status(422).render("project-views/project-01/auth/login", {
      title: "Login",
      path: "/project/01/login",
      errorMessages: req.flash("error"),
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/project/01/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              if (err) console.log(err);
              res.redirect("/project/01/");
            });
          } else {
            req.flash("error", "Invalid email or password");
          }
          res.redirect("/project/01/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/project/01/login");
        });
    })
    .catch((err) => next(new Error(err)));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (res.locals.hasValidationErrors) {
    return res.status(422).render("project-views/project-01/auth/signup", {
      title: "Sign Up",
      path: "/project/01/signup",
      errorMessages: req.flash("error"),
    });
  }

  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match");
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "E-Mail already in use");
        return res.redirect("/project/01/signup");
      }
      if (password !== confirmPassword) {
        return res.redirect("/project/01/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/project/01/login");
          const url =
            req.hostname == "localhost"
              ? `http://${req.hostname}:${process.env.PORT}/project/01/login`
              : `https://${req.hostname}/project/01/login`;
          return transporter.sendMail({
            to: email,
            from: "PrintShop³ <ch@ndlerchilds.net>",
            subject: "Welcome to PrintShop³",
            html: `<h1>You successfully signed up!</h1><p>Welcome ${email}!</p><p>Log In Here: <a href="${url}">${url}</a></p>`,
          });
        })
        .catch((err) => next(new Error(err)));
    })
    .catch((err) => next(new Error(err)));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(new Error(err));
    res.redirect("/project/01/");
  });
};

exports.getReset = (req, res, next) => {
  res.render("project-views/project-01/auth/reset", {
    title: "Reset Password",
    path: "/reset",
    errorMessages: req.flash("error"),
  });
};

exports.postReset = (req, res, next) => {
  if (res.locals.hasValidationErrors) {
    return res.status(422).render("project-views/project-01/auth/reset", {
      title: "Reset Password",
      path: "/reset",
      errorMessages: req.flash("error"),
    });
  }

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/project/01/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found.");
          return res.redirect("/project/01/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/project/01/");
        const url =
          req.hostname == "localhost"
            ? `http://localhost:${process.env.PORT}/project/01/reset`
            : `https://${req.hostname}/project/01/reset`;

        console.log(url);
        transporter.sendMail({
          to: req.body.email,
          from: "PrintShop³ <ch@ndlerchilds.net>",
          subject: "PrintShop³ Password Reset",
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="${url}/${token}">link</a> to set a new password.</p>
          `,
        });
      })
      .catch((err) => next(new Error(err)));
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        let error = new Error("Unauthorized Password Reset Attempt");
        error.httpStatusCode = 403;
        return next(error);
      }

      res.render("project-views/project-01/auth/new-password", {
        title: "New Password",
        path: "/new-password",
        errorMessages: req.flash("error"),
        userId: user._id.toString(),
        resetToken: token,
      });
    })
    .catch((err) => next(new Error(err)));
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const userId = req.body.userId;
  const resetToken = req.body.resetToken;
  let resetUser;

  if (res.locals.hasValidationErrors) {
    return res
      .status(422)
      .render("project-views/project-01/auth/new-password", {
        title: "New Password",
        path: "/new-password",
        errorMessages: req.flash("error"),
        userId: userId,
        resetToken: resetToken,
      });
  }

  if (newPassword !== confirmPassword) {
    req.flash("error", "Passwords do not match");
    return res.redirect(`/project/01/reset/${resetToken}`);
  }

  User.findOne({
    resetToken: resetToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      if (!user) {
        let error = new Error("Unauthorized Password Reset Attempt");
        error.httpStatusCode = 403;
        return next(error);
      }

      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect("/project/01/login");
    })
    .catch((err) => next(new Error(err)));
};
