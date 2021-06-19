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
  // Read Query Parameters
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;

  // Fetch Names
  const results = await Pokemon.getNames(offset, limit);

  // Render Results
  res.render("prove-views/prove-09/backend", {
    title: "Prove 09",
    path: "/prove/09",
    pokemon: results.pokemon,
    prevParams: results.prevParams,
    nextParams: results.nextParams,
  });
};
