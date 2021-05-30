const router = require("express").Router();
const { check, body } = require("express-validator/check");

const validationMessageInjector = require("../../../middlewares/validation-message-injector");
const authController = require("../../../controllers/project-controllers/project-01/auth");

router.get("/login", validationMessageInjector, authController.getLogin);
router.post(
  "/login",
  [
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a valid email address."),
    body("password", "Password must be at least 8 characters.")
      .trim()
      .isLength({ min: 8 })
      .isAlphanumeric(),
  ],
  validationMessageInjector,
  authController.postLogin
);

router.get("/signup", validationMessageInjector, authController.getSignup);
router.post(
  "/signup",
  [
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a valid email address."),
    body("password", "Password must be at least 8 characters.")
      .trim()
      .isLength({ min: 8 })
      .isAlphanumeric(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  validationMessageInjector,
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", validationMessageInjector, authController.getReset);
router.post(
  "/reset",
  [
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a valid email address."),
  ],
  validationMessageInjector,
  authController.postReset
);

router.get(
  "/reset/:token",
  validationMessageInjector,
  authController.getNewPassword
);
router.post(
  "/new-password",
  [
    body("password", "Password must be at least 8 characters.")
      .trim()
      .isLength({ min: 8 })
      .isAlphanumeric(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  validationMessageInjector,
  authController.postNewPassword
);

module.exports = router;
