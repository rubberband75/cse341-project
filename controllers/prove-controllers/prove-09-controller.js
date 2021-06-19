const axios = require("axios");

exports.getIndex = async (req, res, next) => {
  res.render("prove-views/prove-09/", {
    title: "Prove 09",
    path: "/prove/09",
  });
};

exports.getClientSideRender = async (req, res, next) => {
  res.render("prove-views/prove-09/frontend", {
    title: "Prove 09",
    path: "/prove/09",
  });
};

exports.getServerSideRender = async (req, res, next) => {
  res.render("prove-views/prove-09/backend", {
    title: "Prove 09",
    path: "/prove/09",
  });
};
