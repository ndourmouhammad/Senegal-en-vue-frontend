import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // URL du backend Laravel

export default {
  async get() {
    try {
      const response = await axios.get(`${API_URL}/articles`);
      return response;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des articles:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  async getArticlesDetails(id) {
    try {
      const response = await axios.get(`${API_URL}/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching site details:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  // http://127.0.0.1:8000/api/articles/{id}/reactions

  async getReactions(id) {
    try {
        const response = await axios.get(`${API_URL}/articles/${id}/reactions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching site activities:', error.response ? error.response.data : error);
        throw error;
    }
},
};
