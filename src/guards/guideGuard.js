// guideGuard.js
export default async function guideGuard (to, from, next) {
    const user = JSON.parse(localStorage.getItem('user')); // Récupérer les données utilisateur depuis localStorage
  
    // Vérifier si l'utilisateur est connecté et possède le rôle de guide
    if (user && user.roles && user.roles.some(role => role.name === 'guide')) {
      next(); // L'utilisateur a le rôle de guide, continue vers la route demandée
    } else {
      next({ name: 'home' }); // Redirige vers la page d'accueil si l'utilisateur n'est pas un guide
    }
  }
  