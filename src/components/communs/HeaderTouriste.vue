<template>
  <!-- Header -->
  <nav class="navbar navbar-expand-lg navbar-light container-fluid">
    <div class="container-fluid">
      <!-- Logo on the left -->
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.svg" alt="Sénégal en Vue" class="logo" />
      </a>

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

      <!-- Menu centered -->
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item mx-3">
            <router-link
              to="/"
              class="nav-link"
              exact-active-class="active"
              exact
            >Accueil</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link
              to="/sites"
              class="nav-link"
              exact-active-class="active"
              exact
            >Sites</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link
              to="/guides"
              class="nav-link"
              exact-active-class="active"
              exact
            >Guides</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link
              to="/evenements"
              class="nav-link"
              exact-active-class="active"
              exact
            >Événements</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link
              to="/blog"
              class="nav-link"
              exact-active-class="active"
              exact
            >Blog</router-link>
          </li>
        </ul>

        <!-- Right-aligned login/logout buttons -->
        <div class="d-flex align-items-center ms-auto">
          <div class="nav-item" v-if="isLoggedIn">
            <button @click="logout" class="btn btn-primary me-3">
              Déconnexion
            </button>
          </div>
          <div class="nav-item" v-if="isLoggedIn">
            <router-link to="/profil-touriste" class="nav-link">
              <img class="user-icon" src="@/assets/user-icon.svg" alt="" />
            </router-link>
          </div>

          <div class="nav-item" v-else>
            <router-link
              to="/connexion"
              class="btn btn-primary"
              style="color: white"
            >Connexion</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

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
  color: #2c3e50;
}

.nav-item a.active {
  color: #3498db;
}

.btn-primary {
  width: 152px;
  height: 44px;
  border-radius: 25px;
  background: #3498db;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.d-flex {
  display: flex;
  align-items: center;
}

.user-icon {
  width: 32px;
  height: 32px;
}

/* Centering the navbar content */
.navbar-nav {
  flex: 1;
  justify-content: center;
}

.ms-auto {
  margin-left: auto;
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


<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false); // État de la connexion
const user = ref({}); // Stocke les infos de l'utilisateur connecté

// Vérifie si l'utilisateur est connecté
onMounted(() => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  console.log("Token: ", token );
  console.log(userData);

  if (token && userData) {
    isLoggedIn.value = true;
    user.value = JSON.parse(userData); // Charger les informations de l'utilisateur
  } 
});

// Fonction pour déconnecter l'utilisateur
function logout() {
  // Supprimer le token et les données de l'utilisateur du localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Réinitialiser l'état de connexion
  isLoggedIn.value = false;
  user.value = {};

  // Rediriger vers la page de connexion
  router.push("/connexion");
}
</script>
