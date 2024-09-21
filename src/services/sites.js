import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL du backend Laravel

export default {

    // Lister les sites historiques
    async get() {
        try {
            const response = await axios.get(`${API_URL}/sites`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des sites:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Afficher les details d'un site
    
    async getSiteDetails(id) {
        try {
            const response = await axios.get(`${API_URL}/sites/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching site details:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Fetch activities linked to a site
    async getSiteActivities(siteId) {
        try {
            const response = await axios.get(`${API_URL}/sites/${siteId}/activities`);
            return response.data;
        } catch (error) {
            console.error('Error fetching site activities:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Fetch guide information for the site (assuming you already have the guide service)
    async getSiteGuide(id) {
        try {
            const response = await axios.get(`${API_URL}/guides/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching guide information:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Fetch information for the site ( region  )
    async getSiteRegion(id) {
        try {
            const response = await axios.get(`${API_URL}/regions/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching guide information:', error.response ? error.response.data : error);
            throw error;
        }
    }

}