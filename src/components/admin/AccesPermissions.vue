<template>
  <div>
    <HeaderAdmin />

    <div class="container-fluid mt-4 users">
      <div class="d-flex mb-3">
        <router-link to="/acces-et-identite">
          <img src="@/assets/retour.svg" alt="Retour" />
        </router-link>
        <h2 class="mt-2 ms-5 ">Gestion des permissions</h2>
      </div>

      <!-- Formulaire d'ajout des permissions -->
      <div class="search-bar mb-5">
        <div class="alert alert-success" style="display: none">
          Status message goes here
        </div>
        <form @submit.prevent="onPermissionSubmit">
          <input
            v-model="newPermission.name"
            type="text"
            class="form-control d-inline-block me-2"
            placeholder="Ajouter une permission"
          />
          <button
            @click="onPermissionSubmit"
            class="btn btn-ajout d-inline-block"
            :disabled="!newPermission.name"
          >
            Ajouter
          </button>
        </form>
      </div>

      <!-- Tableau des permissions -->
      <table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="permission in paginatedPermissions" :key="permission.id">
            <td>{{ permission.id }}</td>
            <td>{{ permission.name }}</td>
            <td class="action-buttons">
              <button @click="openEditModal(permission)" class="btn-custom">
                <img src="@/assets/edit.svg" alt="Modifier" />
                <span class="button-text">Modifier</span>
              </button>

              <button
                @click="deletePermission(permission.id)"
                class="btn-supprimer"
              >
                <img src="@/assets/delete.svg" alt="Supprimer" />
                <span class="button-text">Supprimer</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="pagination-controls mt-4">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="btn btn-outline-primary"
        >
          Précédent
        </button>

        <span>Page {{ currentPage }} sur {{ totalPages }}</span>

        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="btn btn-outline-primary"
        >
          Suivant
        </button>
      </div>

      <!-- Modal pour modifier une permission -->
      <Modal
        v-if="isEditModalOpen"
        :isOpen="isEditModalOpen"
        @close="closeEditModal"
      >
        <template #header>
          <h5>Modifier la permission</h5>
        </template>
        <template #body>
          <form @submit.prevent="onUpdatePermission">
            <div class="form-group">
              <label for="permissionName">Nom de la permission</label>
              <input
                v-model="selectedPermission.name"
                type="text"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Sauvegarder</button>
          </form>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HeaderAdmin from "../communs/HeaderAdmin.vue";
import Modal from "./Modal.vue";
import permissionService from "@/services/permissions";

// Variables et références
const allPermissions = ref([]);
const paginatedPermissions = ref([]); 
const currentPage = ref(1);
const perPage = 10; 
const totalPages = ref(0);
const newPermission = ref({ name: "" });
const selectedPermission = ref(null);
const isEditModalOpen = ref(false);
const successMessage = ref("");

// Charger les permissions
const fetchPermissions = async () => {
  try {
    const response = await permissionService.listerPermissions();
    allPermissions.value = response.data;
    totalPages.value = Math.ceil(allPermissions.value.length / perPage);
    paginatePermissions();
  } catch (error) {
    console.error(error);
  }
};

// Pagination
function paginatePermissions() {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  paginatedPermissions.value = allPermissions.value.slice(start, end);
}

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    paginatePermissions();
  }
}

onMounted(() => {
  fetchPermissions();
});

// Ajouter une permission
function onPermissionSubmit() {
  if (newPermission.value.name.trim()) {
    permissionService
      .ajouterPermission(newPermission.value)
      .then(() => {
        newPermission.value = { name: "" };
        fetchPermissions();
        successMessage.value = "La permission a été ajoutée avec succès.";
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

// Ouvrir le modal pour modifier une permission
function openEditModal(permission) {
  selectedPermission.value = { ...permission };
  isEditModalOpen.value = true;
}

// Fermer le modal
function closeEditModal() {
  isEditModalOpen.value = false;
}

// Mettre à jour une permission
function onUpdatePermission() {
  if (selectedPermission.value.name.trim()) {
    permissionService
      .modifierPermission(selectedPermission.value.id, selectedPermission.value)
      .then(() => {
        fetchPermissions();
        successMessage.value = "La permission a été mise à jour avec succès.";
        closeEditModal();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

// Supprimer une permission
function deletePermission(id) {
  permissionService
    .supprimerPermission(id)
    .then(() => {
      fetchPermissions();
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<style scoped>
/* Styles généraux */
.container-fluid {
  width: 90%;
  margin: 0 auto;
}

.users h2 {
  color: #000;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 700;
}

.search-bar input {
  width: calc(100% - 200px);
  border-radius: 25px;
  border: 1px solid #051d30;
  background: #fff;
}

.search-bar button {
  width: 152px;
  height: 44px;
  border-radius: 25px;
  background: #3498db;
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
}

.table {
  margin-top: 20px;
}

.action-buttons {
  display: flex;
  justify-content: space-evenly;
}

.btn-custom,
.btn-supprimer {
  width: 116px;
  height: 41px;
  font-size: 16px;
  border: none;
}

.btn-custom {
  background: #3498db;
  color: #fff;
  border-radius: 25px;
}

.btn-supprimer {
  background: #ff2424;
  color: #fff;
  border-radius: 25px;
}

thead th,
tbody td {
  text-align: center;
  font-family: Montserrat;
}
/* Par défaut (desktop), cacher les icônes */
.action-buttons img {
  display: none; /* Les icônes sont masquées */
}

/* Par défaut (desktop), montrer les boutons */
.action-buttons button {
  display: inline-block; /* Les boutons sont affichés */
}

/* Styles pour la pagination */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-controls button {
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 25px;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  background-color: #3498db;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;
}

.pagination-controls button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.pagination-controls button:hover:not(:disabled) {
  background-color: #2980b9;
}

.pagination-controls span {
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  margin: 0 15px;
}

/* Responsive */
@media (max-width: 768px) {
  .pagination-controls {
    flex-direction: column;
    gap: 10px;
  }

  .pagination-controls button {
    width: 100%;
    padding: 8px;
    font-size: 14px;
  }

  .pagination-controls span {
    margin: 10px 0;
  }

  th,
  td {
    font-size: 10px;
  }

  .users h2 {
    font-size: 20px;
    font-weight: 600;
  }

  .search-bar input {
    width: 100%;
    margin-bottom: 20px;
    margin-top: 30px;
  }
  .action-buttons img {
    display: block; /* Afficher les icônes */
    width: 20px; /* Fixer la largeur de l'icône */
    height: 20px; /* Fixer la hauteur de l'icône */
    margin: 0 auto; /* Centrer l'image dans le bouton */
  }

  .action-buttons .button-text {
    display: none; /* Cacher le texte des boutons */
  }

  .action-buttons button {
    padding: 0; /* Enlever le padding pour éviter que le bouton prenne trop de place */
    background: none; /* Enlever la couleur de fond du bouton */
    border: none; /* Supprimer les bordures */
    width: auto; /* Ajuster la largeur à la taille de l'image */
    height: auto; /* Ajuster la hauteur à la taille de l'image */
  }
}
</style>
