import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL du backend Laravel

export default {
    async get() {
        try {
            const response = await axios.get(`${API_URL}/guides`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des guides:', error.response ? error.response.data : error);
            throw error;
        }
    },

    async getGuideDetails(id) {
        try {
            const response = await axios.get(`${API_URL}/guides/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching site details:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // /guides/{guideId}/sites
    async getGuideSites(guideId) {
        try {
            const response = await axios.get(`${API_URL}/guides/${guideId}/sites`);
            return response.data;
        } catch (error) {
            console.error('Error fetching site activities:', error.response ? error.response.data : error);
            throw error;
        }
    },

}