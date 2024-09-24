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

async reactToArticle(id, is_like) {
  const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké
  if (!token) {
      throw new Error('User is not authenticated');
  }

  try {
      const response = await axios.post(`${API_URL}/articles/${id}/react`, { is_like: is_like }, { // Changer 'like' en 'is_like'
          headers: {
              'Authorization': `Bearer ${token}`,
          }
      });
      return response.data;
  } catch (error) {
      console.error('Erreur lors de la réaction à l\'article:', error.response ? error.response.data : error);
      throw error;
  }
},
async addArticle(articleData) {
  try {
      const token = localStorage.getItem('token'); // Récupérer le token d'authentification
      if (!token) {
          throw new Error('Vous devez être connecté pour ajouter un évènement.');
      }

      const response = await axios.post(`${API_URL}/articles`, articleData, {
          headers: {
              Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
          },
      });

      return response.data;
  } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'évènement:', error.response ? error.response.data : error);
      throw error;
  }
},
async updateArticle(articleId, articleData) {
  try {
      const token = localStorage.getItem('token');  // Récupérer le token d'authentification
      if (!token) {
          throw new Error('Vous devez être connecté pour modifier un article.');
      }

      const response = await axios.post(`${API_URL}/articles/${articleId}`, articleData, {
          headers: {
              Authorization: `Bearer ${token}`,  // Ajouter le token dans les headers
              'Content-Type': 'multipart/form-data',
          },
      });

      return response.data;
  } catch (error) {
      console.error('Erreur lors de la modification du site:', error.response ? error.response.data : error);
      throw error;
  }
},

async deleteArticle(id) {
  try {
      const token = localStorage.getItem('token');  // Récupérer le token d'authentification
      if (!token) {
          throw new Error('Vous devez être connecté pour supprimer un article.');
      }

      const response = await axios.delete(`${API_URL}/articles/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`,  // Ajouter le token dans les headers
          },
      });

      return response.data;
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'évènement:', error.response ? error.response.data : error);
      throw error;
  }
}

};
