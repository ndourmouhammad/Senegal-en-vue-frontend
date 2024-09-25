import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL du backend Laravel

export default {

    // Lister les roles avec la route suivante (http://127.0.0.1:8000/api/roles) et connexion requise
    async listerRoles() {
        try {
            const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.get(`${API_URL}/roles`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching roles:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Ajouter un role (http://127.0.0.1:8000/api/roles)
    async ajouterRole(roleData) {
        try {
            const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.post(`${API_URL}/roles`, roleData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating role:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Modifier un role (http://127.0.0.1:8000/api/roles/{id})
    async modifierRole(id, roleData) {
        try {
            const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.post(`${API_URL}/roles/${id}`, roleData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating role:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Supprimer un role (http://127.0.0.1:8000/api/roles/{id})
    async supprimerRole(id) {
        try {
            const token = localStorage.getItem('token'); // Assure-toi que le jeton est bien stocké
            if (!token) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.delete(`${API_URL}/roles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting role:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // Donner permission a un role (http://127.0.0.1:8000/api/roles/{id}/permission)
    async octroyerPermission(roleId, permissionId) {
        try {
          const token = localStorage.getItem('token'); // Récupérer le jeton d'authentification
          if (!token) {
            throw new Error('Utilisateur non authentifié');
          }
    
          // Envoi de la requête POST pour octroyer une permission à un rôle
          const response = await axios.post(
            `${API_URL}/roles/${roleId}/permission`,
            { permissionId }, // Envoyer permissionId dans le corps de la requête
            {
              headers: {
                Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
              },
            }
          );
    
          return response.data; // Retourner les données de la réponse
        } catch (error) {
          console.error("Erreur lors de l'octroi de la permission au rôle :", error.response ? error.response.data : error);
          throw error; // Lancer l'erreur pour gestion ultérieure
        }
      },
}