const axios = require("axios");

const ITEMS_PER_PAGE = 10; // Limit of 10 items per page.

exports.getIndex = async (req, res, next) => {
  const tag = req.query.tag;
  const query = req.query.query;
  const page = +req.query.page || 1;

  // User Axios to load all items
  let items = [];
  try {
    let response = await axios.get(
      "https://byui-cse.github.io/cse341-course/lesson03/items.json"
    );
    const items = response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error loading items.");
  }

  // Create a Set of all tags used across all items
  const tags = items.reduce((tags, item, index) => {
    item.tags.forEach((tag) => {
      tags.add(tag);
    });
    return tags;
  }, new Set());

  // Filter items first by Tag, then by item.name containing the query string.
  const filteredItems = items
    .filter((item) => {
      if (!tag) return true; // If no tag in query params, return all items.
      return item.tags.includes(tag);
    })
    .filter((item) => {
      if (!query) return true; // If no query in query params, return all items.
      return item.name.toLowerCase().includes(query.toLowerCase());
    });

  // Get item and Page Count to help with pagination
  const itemCount = filteredItems.length;
  const pageCount = Math.ceil(itemCount / ITEMS_PER_PAGE);

  // Get array of items for requested page
  const pageItems = filteredItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  res.render("prove-views/prove-08/", {
    title: "Prove 08",
    path: "/prove/08",
    items: pageItems,
    itemCount: itemCount,
    pageCount: pageCount,
    tags: [...tags].sort(),
  });
};
