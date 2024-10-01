import axios from "axios";
import API_URL from '@/config';

export default {
  async get() {
    try {
      const response = await axios.get(`${API_URL}/activites`);
      return response;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des activités:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
  async addActivite(activiteData) {
    try {
      const token = localStorage.getItem("token"); // Récupérer le token d'authentification
      if (!token) {
        throw new Error("Vous devez être connecté pour ajouter un site.");
      }

      const response = await axios.post(`${API_URL}/activites`, activiteData, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout du site:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },

  async deleteActivite(id) {
    try {
      const token = localStorage.getItem("token"); // Récupérer le token d'authentification
      if (!token) {
        throw new Error("Vous devez être connecté pour supprimer un site.");
      }

      const response = await axios.delete(`${API_URL}/activites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du site:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
  async getActiviteDetails(id) {
    try {
        const token = localStorage.getItem("token"); // Récupérer le token d'authentification
      if (!token) {
        throw new Error("Vous devez être connecté pour supprimer un site.");
      }

     const response = await axios.get(`${API_URL}/activites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching site details:",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
  async updateActivite(activiteId, activiteData) {
    try {
        const token = localStorage.getItem('token');  // Récupérer le token d'authentification
        if (!token) {
            throw new Error('Vous devez être connecté pour modifier un activite.');
        }

        const response = await axios.post(`${API_URL}/activites/${activiteId}`, activiteData, {
            headers: {
                Authorization: `Bearer ${token}`,  // Ajouter le token dans les headers
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la modification du activite:', error.response ? error.response.data : error);
        throw error;
    }
},
// Fonction pour ajouter une activité à un site touristique
async lierActiviteASite(activityId, siteId) {
    try {
      const token = localStorage.getItem("token"); // Récupérer le token d'authentification
      if (!token) {
        throw new Error("Vous devez être connecté pour effectuer cette action.");
      }

      const response = await axios.post(
        `${API_URL}/sites/${siteId}/activities/${activityId}`, 
        {}, // Il n'y a pas de body à envoyer, donc on envoie un objet vide
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // Retourner les données de la réponse
    } catch (error) {
      console.error(
        "Erreur lors de la liaison de l'activité au site:",
        error.response ? error.response.data : error
      );
      throw error; // Propager l'erreur pour la gestion dans le composant appelant
    }
  },
};
