import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL du backend Laravel

export default {

    // Lister les roles avec la route suivante (http://127.0.0.1:8000/api/roles) et connexion requise
    async listerPermissions() {
        try {
            const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.get(`${API_URL}/permissions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching permissions:', error.response ? error.response.data : error);
            throw error;
        }
    },
}