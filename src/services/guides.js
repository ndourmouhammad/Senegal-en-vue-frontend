import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL du backend Laravel

export default {
    async get() {
        try {
            const response = await axios.get(`${API_URL}/guides`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des guides:', error.response ? error.response.data : error);
            throw error;
        }
    },

    async getGuideDetails(id) {
        try {
            const response = await axios.get(`${API_URL}/guides/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching site details:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // /guides/{guideId}/sites
    async getGuideSites(guideId) {
        try {
            const response = await axios.get(`${API_URL}/guides/${guideId}/sites`);
            return response.data;
        } catch (error) {
            console.error('Error fetching site activities:', error.response ? error.response.data : error);
            throw error;
        }
    },

    async subscribeToGuide(guideId) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User is not authenticated');
        }

        try {
            const response = await axios.post(`${API_URL}/abonnements/${guideId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'abonnement au guide:', error.response ? error.response.data : error);
            throw error;
        }
    },
    // Nouvelle méthode pour récupérer le statut d'abonnement
    async getSubscriptionStatus(guideId) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User is not authenticated');
        }

        try {
            const response = await axios.get(`${API_URL}/abonnements/${guideId}/status`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            return response.data; // On suppose que 'response.data' contient le statut d'abonnement
        } catch (error) {
            console.error('Erreur lors de la récupération du statut d\'abonnement:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Nombre de guide
    async getNombreGuides() {
        try {
            const response = await axios.get(`${API_URL}/nombre-guide`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la sélection du nombre de guides:', error.response ? error.response.data : error);
            throw error;
        }
    },

    async getNombreTouristes() {
        try {
            const response = await axios.get(`${API_URL}/nombre-touriste`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la sélection du nombre de guides:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Noter un guide
    noterGuide(guideId, note) {
        const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage ou un autre mécanisme
    
        return axios.post(
          `${API_URL}/guides/${guideId}/noter`,
          { note: note },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ajouter le token d'authentification
            },
          }
        )
        .then(response => {
          return response.data; // Retourne la réponse de l'API
        })
        .catch(error => {
          console.error('Erreur lors de la notation du guide:', error);
          throw error; // Propager l'erreur pour la gestion ultérieure
        })
      },

}