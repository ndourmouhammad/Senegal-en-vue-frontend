import axios from 'axios';
import API_URL from '@/config';

export default {
    async get() {
        try {
            const response = await axios.get(`${API_URL}/excursions`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des excursions:', error.response ? error.response.data : error);
            throw error;
        }
    },

    async getExcursion(id) {
        try {
            const response = await axios.get(`${API_URL}/excursions/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'excursion:', error.response ? error.response.data : error);
            throw error;
        }
    },
    async getSiteGuide(id) {
        try {
            const response = await axios.get(`${API_URL}/guides/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching guide information:', error.response ? error.response.data : error);
            throw error;
        }
    },

    async getSite(id) {
        try {
            const response = await axios.get(`${API_URL}/sites/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching guide information:', error.response ? error.response.data : error);
            throw error;
        }
    },
    
     // Fetch activities linked to a site
     
     async getExcursionActivites(excursion_id) {
        try {
            const response = await axios.get(`${API_URL}/excursions/${excursion_id}/activities`);
            return response.data;
        } catch (error) {
            console.error('Error fetching site activities:', error.response ? error.response.data : error);
            throw error;
        }
    },

    async reserver(id, reservationData) {
        try {
            const token = localStorage.getItem('token'); // Récupérer le token d'authentification

            if (!token) {
                throw new Error('Vous devez être connecté pour faire une réservation.');
            }

            const response = await axios.post(
                `${API_URL}/excursions/${id}/commande`,
                reservationData, // Données de réservation (par exemple, nom, email, etc.)
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Ajout du token dans les headers
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réservation:', error.response ? error.response.data : error);
            throw error;
        }
    },
    
}