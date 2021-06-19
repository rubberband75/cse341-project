const axios = require("axios");

module.exports = class Pokemon {
  constructor() {}

  static async getNames(page = 1) {
    try {
      const LIMIT = 10;
      const offset = (page - 1) * LIMIT;

      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT}`
      );

      const pokemon = [...response.data.results];

      const pageCount = Math.ceil(response.data.count / LIMIT);
      const nextPage = response.data.next ? page + 1 : null;
      const prevPage = response.data.previous ? page - 1 : null;

      return {
        pokemon,
        pageCount,
        nextPage,
        prevPage,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error loading items.");
    }
  }
};
