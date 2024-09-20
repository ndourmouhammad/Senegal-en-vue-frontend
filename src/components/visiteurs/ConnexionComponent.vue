<template>
  <div class="bg-image">
    <div class="container">
      <div class="row justify-content-center align-items-center vh-100">
        <div class="col-lg-4 col-md-6 col-sm-8 col-10">
          <div class="form-container">
            <div class="logo text-center mb-4">
              <img src="@/assets/logosev.png" alt="Sénégal en Vue">
            </div>
            <h1 class="text-center">CONNEXION</h1>
      
            <!-- Formulaire de connexion -->
            <form class="mt-4" @submit.prevent="submitForm">
              <div class="mb-3">
                <input 
                  type="email" 
                  class="form-control custom-input" 
                  id="email" 
                  placeholder="Adresse email" 
                  v-model="email" 
                  required
                />
              </div>
              <div class="mb-3">
                <input 
                  type="password" 
                  class="form-control custom-input" 
                  id="password" 
                  placeholder="Mot de passe" 
                  v-model="password" 
                  required
                />
              </div>
              <button type="submit" class="custom-button">Se connecter</button>
            </form>

            <div class="text-center mt-3">
              <router-link to="/inscription" class="text-decoration-none link-custom">Pas de compte ? <span>cliquer ici</span></router-link> <br/>  
              <router-link to="/" class="text-decoration-none link-custom">Retour à l'accueil</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import userService from '@/services/users';

const router = useRouter();

const email = ref('');
const password = ref('');

async function submitForm() {
  try {
    const userData = {
      email: email.value,
      password: password.value,
    };

    // Appel à l'API pour se connecter
    const response = await userService.connecter(userData);

    // Récupérer le token d'authentification
    const token = response.access_token;
    const tokenType = response.token_type; // "Bearer" dans ce cas
    const user = response.user;

    // Stocker le token et les informations utilisateur dans le localStorage
    localStorage.setItem('token', token);  // Stocke uniquement le token
    localStorage.setItem('tokenType', tokenType);  // Type du token (ex: Bearer)
    localStorage.setItem('user', JSON.stringify(user));  // Stocke les informations utilisateur

    // Vérification du rôle de l'utilisateur et redirection
    const userRoles = user.roles;
    if (userRoles.length > 0) {
      const role = userRoles[0].name; // Prendre le premier rôle

      if (role === 'admin') {
        router.push({ name: 'dashboard-admin' });
      } else if (role === 'guide') {
        router.push({ name: 'dashboard-guide' });
      } else if (role === 'touriste') {
        router.push({ name: 'home' });
      }
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    // Affichez un message d'erreur pour l'utilisateur
  }
}
</script>

<style scoped>
.bg-image {
  background-image: url('@/assets/background-image.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  background: transparent;
  padding: 2rem;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.logo img {
  width: 100px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  font-family: "Montserrat", sans-serif;
}

.custom-input {
  width: 531px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #fff;
  border-radius: 0;
  color: #fff;
  font-size: 1.2rem;
  
}

.custom-input::placeholder {
  color: #aaa;
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
}

.custom-button {
  background-color: #F1C40F;
  color: #3498DB;
  border: none;
  font-size: 16px;
  font-weight: 500px;
  height: 44px;
  border-radius: 25px;
  transition: background-color 0.3s ease;
  padding: 10px;
  width: 152px;
}

.link-custom {
  color: #fff;
  font-family: "Nunito Sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
}

.link-custom span {
  font-weight: bold;
  color: #F1C40F;
}

/* Responsive styles */
@media (max-width: 768px) {
  .custom-input {
    width: 100%;
  }
  .link-custom {
    font-size: 16px;
  }
  h1 {
    font-size: 2rem;
  }
}
</style>
