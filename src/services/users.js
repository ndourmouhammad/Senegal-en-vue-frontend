// services/users.js
import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api';
const API_URL = 'https://senegal-en-vue.ndourmouhammad15.simplonfabriques.com/api';

export default {
    // Inscription d'un visiteur
    async inscrire(userData) {
    try {
      const formData = new FormData();

      // Ajout des données utilisateur dans formData
      for (const key in userData) {
        formData.append(key, userData[key]);
      }

      const response = await axios.post(`${API_URL}/inscrire`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Connexion d'un visiteur
  async connecter(userData) {
    try {
      const response = await axios.post(`${API_URL}/connecter`, userData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Déconnexion d'un visiteur
  async deconnecter() {
    try {
      const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
      const response = await axios.post(`${API_URL}/deconnecter`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la deconnexion:', error.response ? error.response.data : error);
      throw error;
    }
  },

  /// User connecte

  async user() {
    try {
      const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
      const response = await axios.get(`${API_URL}/utilisateurConnecte`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Modifier mes informations de profil (http://127.0.0.1:8000/api/modifierInformations)
  async modifierInformations(userData) {
    try {
      const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.post(`${API_URL}/modifierInformations`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Lister les users avec la route suivante (http://127.0.0.1:8000/api/users) et connexion requise
  async listerUsers() {
    try {
      const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Supprimer un user (http://127.0.0.1:8000/api/users/{id})
  async supprimerUser(id) {
    try {
      const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error);
      throw error;
    }
  },

  // Afficher les details d'un user (http://127.0.0.1:8000/api/users/{id})
  async detailsUser(id) {
    try {
      const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.get(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error.response ? error.response.data : error);
      throw error;
    }
  },

};
