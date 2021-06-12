const axios = require("axios");
const Item = require("../../models/prove-models/prove-08/Item");

const ITEMS_PER_PAGE = 10; // Limit of 10 items per page.

exports.getIndex = async (req, res, next) => {
  // Read Query Parameters
  const tag = req.query.tag;
  const searchQuery = req.query.searchQuery;
  const page = +req.query.page || 1;

  // Fetch Items
  let fetchResults = await Item.fetchAll({
    tag: tag,
    searchQuery: searchQuery,
    limit: ITEMS_PER_PAGE,
    offset: (page - 1) * ITEMS_PER_PAGE,
  });

  const allTags = [...fetchResults.tags].sort();
  const resultSet = fetchResults.resultSet;
  const itemCount = fetchResults.itemCount;
  const pageCount = Math.ceil(itemCount / ITEMS_PER_PAGE);

  res.render("prove-views/prove-08/", {
    title: "Prove 08",
    path: "/prove/08",
    tags: allTags,
    items: resultSet,
    itemCount: itemCount,
    pageCount: pageCount,
    currentTag: tag,
    currentSearchQuery: searchQuery,
    currentPage: page,
    filterParams:
      (tag ? "&tag=" + tag : "") +
      (searchQuery ? "&searchQuery=" + searchQuery : ""),
  });
};
