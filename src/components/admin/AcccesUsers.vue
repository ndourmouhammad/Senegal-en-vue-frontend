<template>
  <div>
    <HeaderAdmin />
    <div class="container-fluid users">
      <div class="d-flex mb-3">
        <router-link to="/acces-et-identite">
          <img src="@/assets/retour.svg" alt="" />
        </router-link>
        <h2 class="mt-3">Gestion des utilisateurs</h2>
      </div>

      <div class="search-bar mb-5">
        <div class="alert alert-success" style="display: none">
          Status message goes here
        </div>
        <input
          type="text"
          class="form-control d-inline-block me-2"
          placeholder="Rechercher par mail"
        />
        <button class="btn btn-ajout d-inline-block">Rechercher</button>
      </div>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th class="responsive-mobile">Id</th>
            <th class="responsive-mobile">Nom complet</th>
            <th>Adresse email</th>
            <th>Rôles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="responsive-mobile">{{ user.id }}</td>
            <td class="responsive-mobile">{{ user.name }}</td>
            <td>
              {{ user.email }}
            </td>
            <td>
              <span v-if="user.roles && user.roles.length > 0">
    <label v-for="role in user.roles" :key="role.id" class="badge mx-1 text-white">
      {{ role.name }}
    </label>
  </span>
  <span v-else>No roles</span>
            </td>
            <td class="action">
              <!-- View Button -->
              <router-link
                :to="`/access-users-details/${user.id}`"
                style="text-decoration: none"
              >
                <button class="btn btn-custom btn-logout">
                  <span class="btn-text">Voir</span>
                  <span class="btn-icon">
                    <img src="@/assets/view.svg" alt="view icon" />
                  </span>
                </button>
              </router-link>

              <!-- Delete Button -->
              <button
                v-if="user.id"
                @click="deleteUser(user.id)"
                class="btn btn-custom btn-supprimer"
              >
                <span class="btn-text">Bannir</span>
                <span class="btn-icon"
                  ><img src="@/assets/delete.svg" alt="delete icon"
                /></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import HeaderAdmin from "../communs/HeaderAdmin.vue";
import { ref, onMounted } from "vue";
import userService from "@/services/users.js";

// Declarations des variables
const users = ref([]);
const errorMessage = ref("");
const successMessage = ref("");
const userId = ref(null);

// Fonction de recuperation des utilisateurs
const getUsers = async () => {
  try {
    const data = await userService.listerUsers();
    users.value = data.data;

    console.log(users.value);
    
  } catch (error) {
    errorMessage.value = "Erreur lors de la recuperation des utilisateurs";
  }
};

onMounted(() => {
  getUsers();
});


// Fonction de suppression d'un utilisateur
const deleteUser = async (id) => {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    try {
      await userService.supprimerUser(id); // Appel à votre service de suppression
      successMessage.value = "Utilisateur supprimé avec succès.";
      errorMessage.value = "";

      // Mettre à jour la liste localement en supprimant l'utilisateur de la liste
      users.value = users.value.filter((user) => user.id !== id);
    } catch (error) {
      errorMessage.value = "Erreur lors de la suppression de l'utilisateur";
    }
  }
};

</script>

<style scoped>
.container-fluid {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
.users h2 {
  color: #000;

  /* Titre */
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.d-flex {
  display: flex;
  gap: 20px;
  align-items: center;
}
.badge {
  width: 135px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #3498db;
  color: #f5f5f5;

  /* Choix */
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}
.btn-custom {
  display: flex;
  width: 116px;
  height: 41px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 25px;
}
.btn-modifier {
  background-color: #3498db;

  color: white;
}
.btn-supprimer {
  background-color: red;
  color: white;
}

.search-bar {
  margin-bottom: 20px;
}
.search-bar input {
  width: calc(100% - 200px);
  display: inline-block;
  border-radius: 25px;
  border: 1px solid var(--black, #051d30);
  background: var(--White, #fff);
}
.search-bar button {
  width: 152px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #3498db;
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.btn-ajout {
  background-color: #3498db;
  color: white;
  font-weight: 500px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  width: 169px;
  height: 49px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
th,
td {
  text-align: center;
}
.action {
  display: flex;
  justify-content: space-around;
}
.profile-header {
  background-color: #3498db;
  color: white;
  padding: 2rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-header img {
  border-radius: 15px;
  width: 100%;
  max-width: 100%;
}
.profile-info {
  text-align: center;
  margin-top: 2rem;
}
.profile-info h3 {
  font-weight: bold;
  text-align: start;
}
.profile-info {
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
  gap: 20px;
}
.contact-info {
  display: flex;

  margin: 1rem 0;
  gap: 20px;
}
.btn-custom {
  color: white;
  font-weight: 500px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  width: 116px;
  height: 41px;
}
.btn-logout {
  background-color: #3498db;
}

.boites {
  margin-top: 6rem;
}
.stat-card {
  background-color: #fff7ef;
  border: 1px solid #3498db;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1rem;
}
.stat-card h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.stat-card p {
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
}

.status-button {
  border-radius: 25px;
}
.success {
  border: 1px solid green;
  background: green;
  color: white;
}

.failed {
  border: 1px solid red;
  background: red;
  color: white;
}

.boutons {
  display: flex;
  gap: 3rem;
}
.navbar-size li a,
.navbar-size {
  font-size: 16px;
}

@media (max-width: 576px) {
  .btn-text {
    display: none;
  }
  .btn-icon {
    display: inline-block;
  }
  .btn-modifier,
  .btn-supprimer,
  .btn-autoriser,
  .btn-custom,
  .btn-logout {
    background: white;
  }
  .btn-autoriser {
    border: 1px solid white;
  }
  .responsive-mobile {
    display: none;
  }
  th,
  td {
    font-size: 10px;
  }
  .profile-header img {
    display: none;
  }
  .profile-header {
    padding: 6rem;
    text-align: center;
  }
  .contact-info {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    text-align: start;
    gap: 10px;
  }
  .profile-info {
    gap: 10px;
  }
  .btn-custom {
    width: 50%;
  }

  .titre-edit {
    font-size: 14px;
  }

  .detail-container h4 {
    font-size: 14px;
  }
  .responsive-img {
    max-width: 100%;
    height: auto;
    width: 9rem;
    height: 5rem;
    object-fit: contain; /* or use 'cover' if you want to cover the entire area */
  }
  .users h2 {
    color: #2c3e50;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .search-bar input {
    width: 100%;
    color: var(--Gray, #b3b3b3);

    /* Texte */
    font-family: "Nunito Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px; /* 214.286% */
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .badge {
    width: 50px;
    height: 22px;
    flex-shrink: 0;
    color: var(--White, #fff);
    font-family: "Nunito Sans";
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .action {
    justify-content: center;
    gap: 0px;
    align-items: center;
  }
}

@media (min-width: 768px) {
  .btn-icon {
    display: none;
  }
}
</style>
