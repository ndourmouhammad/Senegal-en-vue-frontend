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
                />
                <!-- Message d'erreur pour l'email -->
                <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
              </div>
              <div class="mb-3">
                <input 
                  type="password" 
                  class="form-control custom-input" 
                  id="password" 
                  placeholder="Mot de passe" 
                  v-model="password" 
                />
                <!-- Message d'erreur pour le mot de passe -->
                <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
              </div>
              <button type="submit" class="custom-button">Se connecter</button>
            </form>

            <!-- Message d'erreur de connexion -->
            <div v-if="loginError" class="error">
              {{ loginError }}
            </div>

            <div class="text-center mt-3">
              <router-link to="/inscription" class="text-decoration-none link-custom">
                Pas de compte ? <span>cliquer ici</span>
              </router-link> <br/>  
              <router-link to="/" class="text-decoration-none link-custom">Retour à l'accueil</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import userService from '@/services/users';
import { ValidatorCore } from "@/validators"; // Importation du ValidatorCore

const router = useRouter();

const email = ref(''); // Champs email
const password = ref(''); // Champs mot de passe
const errors = reactive({}); // Pour stocker les messages d'erreur

// Message d'erreur de connexion (mot de passe incorrect par exemple)
const loginError = ref('');

// Fonction pour valider le formulaire
function validateForm() {
  errors.email = ValidatorCore.validateEmail(email.value) || ''; // Validation de l'email
  errors.password = ValidatorCore.validPassword(password.value) || ''; // Validation du mot de passe?
}

async function submitForm() {
  // Valider les champs avant de soumettre
  validateForm();

  // Vérifier s'il y a des erreurs
  const hasErrors = Object.values(errors).some(error => error !== '');

  if (hasErrors) {
    console.error("Erreur de validation :", errors);
    return; // Ne pas soumettre le formulaire si des erreurs existent
  }

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
    const userId = response.user.id;

    // Stocker le token et les informations utilisateur dans le localStorage
    localStorage.setItem('token', token);  // Stocke uniquement le token
    localStorage.setItem('tokenType', tokenType);  // Type du token (ex: Bearer)
    localStorage.setItem('user', JSON.stringify(user));  // Stocke les informations utilisateur
    localStorage.setItem('userId', userId); // Stocker l'ID de l'utilisateur

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
    loginError.value = "Email ou mot de passe incorrect"; // Affiche un message d'erreur si la connexion échoue
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

.error-message {
  color: red;
  font-size: 0.9rem;
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
