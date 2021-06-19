const axios = require("axios");
const Pokemon = require("../../models/prove-models/prove-09/Pokemon");

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
  const page = +req.query.page || 1;

  // Fetch Names
  const results = await Pokemon.getNames(page);

  // Render Results
  res.render("prove-views/prove-09/backend", {
    title: "Prove 09",
    path: "/prove/09",
    page: page,
    pokemon: results.pokemon,
    pageCount: results.pageCount,
    nextPage: results.nextPage,
    prevPage: results.prevPage,
  });
};
