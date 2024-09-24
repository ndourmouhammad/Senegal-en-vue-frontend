<template>
  <!-- Header -->
  <nav class="navbar navbar-expand-lg navbar-light container-fluid">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <!-- Logo and title -->
        <img src="@/assets/logo.svg" alt="Sénegal en Vue" class="logo">
      </a>

      <!-- Mobile menu button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu links -->
      <div class="collapse navbar-collapse gap-2" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-3">
            <router-link to="/" class="nav-link active">Accueil</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/sites" class="nav-link">Sites touristiques</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/guides" class="nav-link">Guides touristiques</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/evenements" class="nav-link">Événements</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/blog" class="nav-link">Blog</router-link>
          </li>
          
          <!-- Si l'utilisateur est connecté -->
          <li class="nav-item " v-if="isLoggedIn">
            <a href="#" class="nav-link logout me-3" style="color: white;" @click="logout">Déconnexion</a>
          </li>
          <li class="nav-item " v-if="isLoggedIn">
            <router-link to="/profil-touriste" class="nav-link">
              <img src="@/assets/user-icon.svg" alt="">
            </router-link>
          </li>
          
          <!-- Si l'utilisateur n'est pas connecté -->
          <li class="nav-item mx-3"  v-else>
            <router-link to="/connexion" class="btn btn-primary " style="color: white;">Connexion</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false); // État de la connexion
const user = ref({}); // Stocke les infos de l'utilisateur connecté

// Vérifie si l'utilisateur est connecté
onMounted(() => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  
  if (token && userData) {
    isLoggedIn.value = true;
    user.value = JSON.parse(userData); // Charger les informations de l'utilisateur
  }
});

// Fonction pour déconnecter l'utilisateur
function logout() {
  // Supprimer le token et les données de l'utilisateur du localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Réinitialiser l'état de connexion
  isLoggedIn.value = false;
  user.value = {};

  // Rediriger vers la page de connexion
  router.push('/connexion');
}
</script>

<style scoped>
/* Header logo styling */
.container-fluid {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.logo {
  width: 137px;
  height: auto;
}

.nav-item a {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  color: #2C3E50;
}

.nav-item a.active {
  color: #3498DB;
}

/* Button styling */
.btn-primary {
  width: 152px;
  height: 44px;
  border-radius: 25px;
  background: #3498db;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}



.highlight {
  color: #f0c040; /* Use the yellow color similar to the mockup */
}
.logout {
  width: 152px;
height: 44px;
flex-shrink: 0;
border-radius: 25px;
background: #3498DB;
color: #fff;
font-family: Montserrat;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;
display: flex;
justify-content: center;
}

/* Mobile responsiveness */
@media (max-width: 767px) {
  .brand-title {
    font-size: 1.2rem;
  }
  .container-fluid {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
