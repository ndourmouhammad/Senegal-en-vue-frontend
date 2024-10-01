import axios from 'axios';
import API_URL from '@/config';

export default {
    // Récupérer toutes les régions
    async getRegions() {
        try {
            const response = await axios.get(`${API_URL}/regions`);
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching regions:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Récupérer une seule region
    async getRegion(id) {
        try {
            const response = await axios.get(`${API_URL}/regions/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching region:', error.response ? error.response.data : error);
            throw error;
        }
    },
}
