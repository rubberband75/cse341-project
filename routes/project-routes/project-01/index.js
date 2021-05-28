const router = require("express").Router();
const indexController = require("../../../controllers/project-controllers/project-01/index");
const errorController = require("../../../controllers/project-controllers/project-01/errors");

const isAuth = require("../../../middlewares/is-auth");
const loadUser = require("../../../middlewares/load-user");

router.use(loadUser);

router.use(require("./auth"));
router.use(require("./shop"));

router.use("/images", require("./images"));

router.use("/admin", isAuth, require("./admin"));
router.use("/account", isAuth, require("./account"));

router.use("/error/:errorCode", (req, res, next) => {
  const errorCode = req.params.errorCode;
  let error = new Error(`Error Code Test: ${errorCode}`);
  error.httpStatusCode = errorCode;
  next(error);
});

router.get("/", indexController.getIndex);

router.use(errorController.get404);

router.use((error, req, res, next) => {
  console.error(error);
  res
    .status(error.httpStatusCode ?? 500)
    .render("project-views/project-01/errors/500", {
      title: "Account",
      user: req.user,
      path: req.originalUrl,
      errorCode: error.httpStatusCode ?? 500,
    });
});

module.exports = router;
