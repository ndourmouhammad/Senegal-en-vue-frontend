import axios from 'axios';

const API_URL = 'https://senegal-en-vue.ndourmouhammad15.simplonfabriques.com/api'; // URL du backend Laravel

export default {
  async get() {
    try {
      const response = await axios.get(`${API_URL}/articles`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error.response ? error.response.data : error);
      throw error;
    }
  }
};
