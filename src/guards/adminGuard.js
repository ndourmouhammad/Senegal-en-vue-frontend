  
  // adminGuard.js
  export default async function adminGuard (to, from, next)  {
    const user = JSON.parse(localStorage.getItem('user')); // Or however you fetch user data
    if (user && user.role === 'admin') {
      next();
    } else {
      next({ name: 'home' }); // Redirect if not an admin
    }
  };
  