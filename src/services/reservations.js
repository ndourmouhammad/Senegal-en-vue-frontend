import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL du backend Laravel

export default {
    // Récupérer les commandes d'un site spécifique
    async getSiteCommandes(siteId) {
        try {
            const token = localStorage.getItem('token'); // Récupérer le token d'authentification

            if (!token) {
                throw new Error('Vous devez être connecté pour accéder aux commandes.');
            }

            const response = await axios.get(`${API_URL}/sites/${siteId}/commandes`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le token dans les en-têtes
                },
            });

            return response.data; // Retourner les données des commandes
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error.response ? error.response.data : error);
            throw error; // Relancer l'erreur pour une gestion ultérieure
        }
    },

    // Confirmer une commande
    async confirmCommande(commandeId) {
        try {
            const token = localStorage.getItem('token'); // Récupérer le token d'authentification

            if (!token) {
                throw new Error('Vous devez être connecté pour confirmer une commande.');
            }

            const response = await axios.post(`${API_URL}/sites/commandes/${commandeId}/confirmer`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le token dans les en-têtes
                },
            });

            return response.data; // Retourner les données de la commande confirmée
        } catch (error) {
            console.error('Erreur lors de la confirmation de la commande:', error.response ? error.response.data : error);
            throw error; // Relancer l'erreur pour une gestion ultérieure
        }
    },

    // Refuser une commande
    async refuseCommande(commandeId) {
        try {
            const token = localStorage.getItem('token'); // Récupérer le token d'authentification

            if (!token) {
                throw new Error('Vous devez être connecté pour refuser une commande.');
            }

            const response = await axios.post(`${API_URL}/sites/commandes/${commandeId}/refuser`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le token dans les en-têtes
                },
            });

            return response.data; // Retourner les données de la commande refusée
        } catch (error) {
            console.error('Erreur lors du refus de la commande:', error.response ? error.response.data : error);
            throw error; // Relancer l'erreur pour une gestion ultérieure
        }
    },
};
