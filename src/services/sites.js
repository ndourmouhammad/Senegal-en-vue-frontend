import axios from 'axios';
import API_URL from '@/config';

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
    },

    

    async nombreSites() {
        try {
            // Récupérer le jeton d'authentification stocké, par exemple dans le localStorage
            const token = localStorage.getItem('token'); // Récupérer le token d'authentification
    
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }
    
            // Effectuer la requête avec le jeton d'authentification dans les en-têtes
            const response = await axios.get(`${API_URL}/sites/nombre-sites`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le jeton dans les en-têtes
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des sites:', error.response ? error.response.data : error);
            throw error;
        }
    },
    

    async nombreReservations() {
        try {
            // Récupérer le jeton d'authentification depuis le localStorage (ou autre)
            const token = localStorage.getItem('token');
    
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }
    
            // Effectuer la requête avec le jeton d'authentification
            const response = await axios.get(`${API_URL}/nombre-commandes`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le jeton dans les en-têtes
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error.response ? error.response.data : error);
            throw error;
        }
    },
    
    async nombreAbonnements() {
        try {
            // Récupérer le jeton d'authentification depuis le localStorage (ou autre)
            const token = localStorage.getItem('token');
    
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }
    
            // Effectuer la requête avec le jeton d'authentification dans les en-têtes
            const response = await axios.get(`${API_URL}/abonnements/abonnes`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le jeton dans les en-têtes
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des abonnements:', error.response ? error.response.data : error);
            throw error;
        }
    },
    async nombreClients() {
        try {
            // Récupérer le jeton d'authentification depuis le localStorage (ou autre)
            const token = localStorage.getItem('token');
    
            if (!token) {
                throw new Error('Utilisateur non connecté');
            }
    
            // Effectuer la requête avec le jeton d'authentification dans les en-têtes
            const response = await axios.get(`${API_URL}/sites/nombre-termine`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajouter le jeton dans les en-têtes
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des abonnements:', error.response ? error.response.data : error);
            throw error;
        }
    },
    async addSite(siteData) {
        try {
            const token = localStorage.getItem('token');  // Récupérer le token d'authentification
            if (!token) {
                throw new Error('Vous devez être connecté pour ajouter un site.');
            }
    
            const response = await axios.post(`${API_URL}/sites`, siteData, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Ajouter le token dans les headers
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du site:', error.response ? error.response.data : error);
            throw error;
        }
    },
    async updateSite(siteId, siteData) {
        try {
            const token = localStorage.getItem('token');  // Récupérer le token d'authentification
            if (!token) {
                throw new Error('Vous devez être connecté pour modifier un site.');
            }
    
            const response = await axios.post(`${API_URL}/sites/${siteId}`, siteData, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Ajouter le token dans les headers
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la modification du site:', error.response ? error.response.data : error);
            throw error;
        }
    },
    async getRegions() {
        try {
            const response = await axios.get(`${API_URL}/regions`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des régions:', error.response ? error.response.data : error);
            throw error;
        }
    },
    
    // supprimer un site
    async deleteSite(id) {
        try {
            const token = localStorage.getItem('token');  // Récupérer le token d'authentification
            if (!token) {
                throw new Error('Vous devez être connecté pour supprimer un site.');
            }
    
            const response = await axios.delete(`${API_URL}/sites/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Ajouter le token dans les headers
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la suppression du site:', error.response ? error.response.data : error);
            throw error;
        }
    }, 
    
    // Nombre de sites
    async getNombreSites() {
        try {
            const response = await axios.get(`${API_URL}/nbre-sites`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la sélection du nombre de sites:', error.response ? error.response.data : error);
            throw error;
        }
    },  

    // Excursion par site (/sites/{id}/excursions)
    async getExcursionsParSite(siteId) {
        try {
            const response = await axios.get(`${API_URL}/sites/${siteId}/excursions`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la[violation du nombre de sites:', error.response ? error.response.data : error);
            throw error;
        }
    }
    
}