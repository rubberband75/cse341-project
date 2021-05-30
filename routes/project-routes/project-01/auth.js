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

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
