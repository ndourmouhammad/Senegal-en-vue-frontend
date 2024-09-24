import userService from '@/services/users';

export default async function authGuard(to, from, next) {
  try {
    // Vérifier s'il y a un token dans le localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Si pas de token, rediriger vers la page de connexion
      console.log("Pas de token, redirection vers login");
      return next({ name: 'connexion' });
    }

    // Vérifier si le token est valide en appelant le service utilisateur
    const user = await userService.user();
    
    if (user) {
      // Si l'utilisateur est authentifié, continuer vers la page demandée
      console.log("Utilisateur authentifié");
      return next();
    } else {
      // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      console.log("Utilisateur non authentifié, redirection vers connexion");
      return next({ name: 'connexion' });
    }
  } catch (error) {
    console.error('Erreur dans le guard d\'authentification:', error);
    // En cas d'erreur, rediriger vers la page de connexion
    return next({ name: 'connexion' });
  }
}
