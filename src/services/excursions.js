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

    async nombreExcursions() {
        try {
            // Récupérer le jeton d'authentification stocké, par exemple dans le localStorage
            const token = localStorage.getItem('token'); // Récupérer le token d'authentification
    
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }
    
            // Effectuer la requête avec le jeton d'authentification dans les en-têtes
            const response = await axios.get(`${API_URL}/excursions/nombre-excursions`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le jeton dans les en-têtes
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des sites:', error.response ? error.response.data : error);
            throw error;
        }
    },
    async nombreReservations() {
        try {
            // Récupérer le jeton d'authentification depuis le localStorage (ou autre)
            const token = localStorage.getItem('token');
    
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }
    
            // Effectuer la requête avec le jeton d'authentification
            const response = await axios.get(`${API_URL}/nombre-commandes`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le jeton dans les en-têtes
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error.response ? error.response.data : error);
            throw error;
        }
    },
    async nombreClients() {
        try {
            // Récupérer le jeton d'authentification depuis le localStorage (ou autre)
            const token = localStorage.getItem('token');
    
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }
    
            // Effectuer la requête avec le jeton d'authentification dans les en-têtes
            const response = await axios.get(`${API_URL}/excursions/nombre-termine`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le jeton dans les en-têtes
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des abonnements:', error.response ? error.response.data : error);
            throw error;
        }
    },

    async addExcursion(excursionData) {
        try {
            const token = localStorage.getItem('token');  // Récupérer le token d'authentification
            if (!token) {
                throw new Error('Vous devez être connecté pour ajouter un site.');
            }
    
            const response = await axios.post(`${API_URL}/excursions`, excursionData, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Ajouter le token dans les headers
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du site:', error.response ? error.response.data : error);
            throw error;
        }
    },
    async deleteExcursion(id) {
        try {
            const token = localStorage.getItem('token');  // Récupérer le token d'authentification
            if (!token) {
                throw new Error('Vous devez être connecté pour supprimer un site.');
            }
    
            const response = await axios.delete(`${API_URL}/excursions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Ajouter le token dans les headers
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la suppression du site:', error.response ? error.response.data : error);
            throw error;
        }
    }, 
    async updateExcursion(excursionId, excursionData) {
        try {
            const token = localStorage.getItem('token');  // Récupérer le token d'authentification
            if (!token) {
                throw new Error('Vous devez être connecté pour modifier un excursion.');
            }
    
            const response = await axios.post(`${API_URL}/excursions/${excursionId}`, excursionData, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Ajouter le token dans les headers
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la modification du excursion:', error.response ? error.response.data : error);
            throw error;
        }
    },
    
}