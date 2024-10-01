import axios from 'axios';
import API_URL from '@/config';

export default {
    // Récupérer les abonnements reçus
    async abonnements() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }

            const response = await axios.get(`${API_URL}/abonnements/received`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des abonnements:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Accepter un abonnement
    async accepter(subscriptionId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }

            const response = await axios.post(`${API_URL}/abonnements/${subscriptionId}/respond/accepte`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error(`Erreur lors de l'acceptation de l'abonnement ${subscriptionId}:`, error.response ? error.response.data : error);
            throw error;
        }
    },

    // Refuser un abonnement
    async refuser(subscriptionId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }

            const response = await axios.post(`${API_URL}/abonnements/${subscriptionId}/respond/rejete`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error(`Erreur lors du refus de l'abonnement ${subscriptionId}:`, error.response ? error.response.data : error);
            throw error;
        }
    },

    async abonnes(id) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }

            const response = await axios.get(`${API_URL}/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error(`Erreur lors du refus de l'abonnement ${id}:`, error.response ? error.response.data : error);
            throw error;
        }
    }
}
