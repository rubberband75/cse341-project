const axios = require("axios");

module.exports = class Pokemon {
  constructor() {}

  static async getNames(offset, limit) {
    try {
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );

      const pokemon = response.data.results;
      const nextParams = response.data.next ? response.data.next.split('?')[1] : null;
      const prevParams = response.data.previous ? response.data.previous.split('?')[1] : null;

      return {
        pokemon: [...pokemon],
        nextParams: nextParams,
        prevParams: prevParams,
      };

    } catch (error) {
      console.error(error);
      throw new Error("Error loading items.");
    }
  }
};
