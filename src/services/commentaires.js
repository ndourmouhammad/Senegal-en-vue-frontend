import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api'; 
const API_URL = 'https://senegal-en-vue.ndourmouhammad15.simplonfabriques.com/api';

export default {
    async get(id) {
        try {
            const response = await axios.get(`${API_URL}/articles/${id}/commentaires`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error.response ? error.response.data : error);
            throw error;
        }
    },

    // commenter un article
    async commenter(id, contenu) {
        try {
          const token = localStorage.getItem('token');
          
          if (!token) {
            throw new Error('Jeton non trouvé dans localStorage.');
          }
          
          console.log('Envoi du commentaire:', { contenu });
          
          const response = await axios.post(
            `http://127.0.0.1:8000/api/articles/${id}/commentaires`, 
            { contenu }, // Données du commentaire
            {
              headers: {
                Authorization: `Bearer ${token}`, // Jeton d'authentification
              },
            }
          );
          
          return response.data;
        } catch (error) {
          console.error('Erreur lors de l\'ajout du commentaire:', error.response ? error.response.data : error);
          throw error;
        }
      }
      
      
}