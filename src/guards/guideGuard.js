
  export default async function guideGuard (to, from, next)  {
    const user = JSON.parse(localStorage.getItem('user')); // Or however you fetch user data
    if (user && user.role === 'guide') {
      next();
    } else {
      next({ name: 'home' }); // Redirect if not an admin
    }
  };
  