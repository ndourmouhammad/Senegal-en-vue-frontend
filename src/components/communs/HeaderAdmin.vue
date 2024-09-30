<template>
  <!-- Header -->
  <nav class="navbar navbar-expand-lg navbar-light container-fluid">
    <div class="container-fluid">
      <!-- Logo and title -->
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.svg" alt="Sénégal en Vue" class="logo" />
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-3">
            <router-link
              to="/dashboard-admin"
              class="nav-link"
              exact-active-class="active"
              exact
            >
              Tableau de bord
            </router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link
              to="/acces-et-identite"
              class="nav-link"
              exact-active-class="active"
              exact
            >
              Accès et identité
            </router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link
              to="/evenements-admin"
              class="nav-link"
              exact-active-class="active"
              exact
            >
              Evènements
            </router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link
              to="/blog-admin"
              class="nav-link"
              exact-active-class="active"
              exact
            >
              Blog
            </router-link>
          </li>
        </ul>
        <div class="d-flex align-items-center ms-auto">
          <button @click="handleDeconnexion" class="btn btn-primary me-3">
            Déconnexion
          </button>
          <router-link to="/profil-admin">
            <img
              src="@/assets/user-icon.svg"
              alt="User Icon"
              class="user-icon"
            />
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import userService from "@/services/users"; // Assurez-vous que le chemin est correct

const router = useRouter();

async function handleDeconnexion() {
  try {
    await userService.deconnecter();
    // Rediriger vers la page de connexion
    router.push({ name: "connexion" });
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    // Affiche éventuellement un message d'erreur pour l'utilisateur
  }
}
</script>

<style scoped>
/* Header styling */
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
  font-weight: 600;
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
}

/* User icon styling */
.user-icon {
  width: 32px;
  height: 32px;
}

/* Adjusting spacing */
.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ms-auto {
  margin-left: auto;
}

/* Mobile responsiveness */
@media (max-width: 767px) {
  .container-fluid {
    width: 100%;
  }

  .nav-item a {
    font-size: 16px;
  }

  .user-icon {
    width: 28px;
    height: 28px;
  }
}
</style>