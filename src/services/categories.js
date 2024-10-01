import axios from 'axios';
import API_URL from '@/config';

export default {
    async get() {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error.response ? error.response.data : error);
            throw error;
        }
    }
}