import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api';
const API_URL = 'https://senegal-en-vue.ndourmouhammad15.simplonfabriques.com/api';

export default {

    // Lister les permissions avec la route suivante (http://127.0.0.1:8000/api/permissions) et connexion requise
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

    // Ajouter une permission (http://127.0.0.1:8000/api/permissions)
    async ajouterPermission(permissionData) {
        try {
            const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.post(`${API_URL}/permissions`, permissionData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating permission:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Supprimer une permission (http://127.0.0.1:8000/api/permissions/{id})
    async supprimerPermission(id) {
        try {
            const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.delete(`${API_URL}/permissions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting permission:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Modifier une permission (http://127.0.0.1:8000/api/permissions/{id})
    async modifierPermission(id, permissionData) {
        try {
            const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.post(`${API_URL}/permissions/${id}`, permissionData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating permission:', error.response ? error.response.data : error);
            throw error;
        }
    }
}