import axios from 'axios';
import API_URL from '@/config';

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

    // Lister les reservations d'un eveement (evenements/{id}/reservations)
    async getEvenementReservations(evenementId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }

            const response = await axios.get(`${API_URL}/evenements/${evenementId}/reservations`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching site details:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Accepter une reservation (http://127.0.0.1:8000/api/evenements/reservations/{id}/confirmer)
    async confirmReservation(reservationId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }

            const response = await axios.post(`${API_URL}/evenements/reservations/${reservationId}/confirmer`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching site details:', error.response ? error.response.data : error);
            throw error;
        }    
    },

    // Refuser une reservation (http://127.0.0.1:8000/api/evenements/reservations/{id}/refuser)
    async refuseReservation(reservationId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }

            const response = await axios.post(`${API_URL}/evenements/reservations/${reservationId}/refuser`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching site details:', error.response ? error.response.data : error);
            throw error;
        }    
    },

    // lister mes reservations : evenements/mes-reservations
    async getMesReservations() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }

            const response = await axios.get(`${API_URL}/evenements/mes-reservations`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;

        } catch (error) {
            console.error('Error fetching site details:', error.response ? error.response.data : error);
            throw error;
        }
    },

    async getMesCommandes() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }

            const response = await axios.get(`${API_URL}/sites/mes-commandes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;

        } catch (error) {
            console.error('Error fetching site details:', error.response ? error.response.data : error);
            throw error;
        }
    },


};
