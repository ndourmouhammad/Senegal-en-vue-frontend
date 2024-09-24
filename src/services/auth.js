// services/auth.js
export default {
    isAuthenticated() {
      // Exemple : Vérifie si un token est présent dans le local storage
      const token = localStorage.getItem('token');
      return !!token; // Renvoie true si le token est présent, false sinon
    },
  };
  