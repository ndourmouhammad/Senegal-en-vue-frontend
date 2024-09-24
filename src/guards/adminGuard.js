// adminGuard.js
export default async function adminGuard (to, from, next) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User:', user); // Ajout de la console pour vérifier les données de l'utilisateur
  
    if (user && user.roles && user.roles.some(role => role.name === 'admin')) {
      next();
    } else {
      next({ name: 'home' });
    }
  }
  