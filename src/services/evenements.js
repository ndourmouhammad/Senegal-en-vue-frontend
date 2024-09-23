import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL du backend Laravel

export default {
    async get() {
        try {
            const response = await axios.get(`${API_URL}/evenements`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des évènements:', error.response ? error.response.data : error);
            throw error;
        }
    },
    async getEvenementDetails(id) {
        try {
            const response = await axios.get(`${API_URL}/evenements/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching site details:', error.response ? error.response.data : error);
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
                `${API_URL}/evenements/${id}/reservation`,
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

    // Nombre d'évènements
    async getNombreEvenements() {
        try {
            const response = await axios.get(`${API_URL}/nombre-evenements`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la sélection du nombre d\'évènements:', error.response ? error.response.data : error);
            throw error;
        }
    } , 

    // add evenement function () 
    async addEvenement(evenementData) {
        try {
            const token = localStorage.getItem('token'); // Récupérer le token d'authentification
            if (!token) {
                throw new Error('Vous devez être connecté pour ajouter un évènement.');
            }

            const response = await axios.post(`${API_URL}/evenements`, evenementData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
                },
            });

            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'évènement:', error.response ? error.response.data : error);
            throw error;
        }
    }
}