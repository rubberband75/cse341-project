const axios = require("axios");
const { restart } = require("nodemon");

module.exports = class Item {
  constructor() {}

  static async fetchAll(options = {}) {
    //   Read Options
    const tag = options.tag;
    const searchQuery = options.searchQuery;
    const limit = +options.limit;
    const offset = +options.offset;

    // Load JSON file using axios
    let items = [];
    try {
      let response = await axios.get(
        "https://byui-cse.github.io/cse341-course/lesson03/items.json"
      );
      items = response.data;
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

    // // Filter items first by Tag, then by item.name containing the searchQuery string.
    const filteredItems = items
      .filter((item) => {
        if (!tag) return true; // If no tag in query params, return all items.
        return item.tags.includes(tag);
      })
      .filter((item) => {
        if (!searchQuery) return true; // If no searchQuery in query params, return all items.
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      });

    // Get total item count
    const itemCount = filteredItems.length;

    // Get array of items for requested limit and offset
    let resultSet = [];
    if (limit) {
      resultSet = filteredItems.slice(offset, offset + limit);
    } else {
      resultSet = filteredItems;
    }

    return {
      resultSet,
      itemCount,
      tags,
    };
  }
};
