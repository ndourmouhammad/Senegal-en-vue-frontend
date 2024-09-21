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
    }
}