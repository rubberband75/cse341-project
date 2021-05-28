const Product = require("../../../models/project-models/project-01/product");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("project-views/project-01", {
        title: "Project 01",
        path: "/project/01",
        products: products,
      });
    })
    .catch((err) => next(new Error(err)));
};
