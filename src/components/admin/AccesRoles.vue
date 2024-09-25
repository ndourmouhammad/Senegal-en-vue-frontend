<template>
  <div>
    <HeaderAdmin />

    <div class="container-fluid mt-4 users">
      <div class="d-flex mb-3">
        <router-link to="/acces-et-identite">
          <img src="@/assets/retour.svg" alt="" />
        </router-link>
        <h2 class="mt-3">Gestion des rôles</h2>
      </div>
      <div class="search-bar mb-5">
        <div class="alert alert-success" style="display: none">
          Status message goes here
        </div>
        <form @submit.prevent="onRoleSubmit">
          <input
            v-model="newRole.name"
            type="text"
            class="form-control d-inline-block me-2"
            placeholder="Ajouter un rôle"
          />
          <button
            type="submit"
            class="btn btn-ajout d-inline-block"
            :disabled="!newRole.name"
          >
            Ajouter
          </button>
        </form>
      </div>

      <!-- Tableau des rôles -->
      <table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.id }}</td>
            <td>{{ role.name }}</td>
            <td class="action-buttons">
              <button @click="openEditModal(role)" class="btn-custom">
                <img src="@/assets/edit.svg" alt="" />
                <span class="button-text">Modifier</span>
              </button>

              <button @click="openPermissionModal(role)" class="btn-permission">
                <img src="@/assets/key.svg" alt="" />
                <span class="button-text">Permissions</span>
              </button>

              <button @click="deleteRole(role.id)" class="btn-supprimer">
                <img src="@/assets/delete.svg" alt="" />
                <span class="button-text">Supprimer</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal pour modifier un rôle -->
      <Modal
        v-if="isEditModalOpen"
        :isOpen="isEditModalOpen"
        @close="closeEditModal"
      >
        <template #header>
          <h5>Modifier le rôle</h5>
        </template>
        <template #body>
          <form @submit.prevent="onUpdateRole">
            <div class="form-group">
              <label for="roleName">Nom du rôle</label>
              <input
                v-model="selectedRole.name"
                type="text"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary mt-3">Sauvegarder</button>
          </form>
        </template>
      </Modal>

      <!-- Modal pour octroyer des permissions -->
      <Modal
        v-if="isPermissionModalOpen"
        :isOpen="isPermissionModalOpen"
        @close="closePermissionModal"
      >
        <template #header>
          <h5>Octroyer des permissions</h5>
        </template>
        <template #body>
          <form @submit.prevent="onAssignPermission">
            <div class="form-group">
              <label for="permissionSelect">Sélectionner la permission</label>
              <select
                v-model="selectedPermissionId"
                class="form-control"
                required
              >
                <option
                  v-for="permission in permissions"
                  :key="permission.id"
                  :value="permission.id"
                >
                  {{ permission.name }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Octroyer</button>
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
import roleService from "@/services/roles";
import permissionService from "@/services/permissions";

// Declarations

const roles = ref([]);
const permissions = ref([]);
const errorMessage = ref("");
const successMessage = ref("");
const roleId = ref(null);
const newRole = ref({ name: "" });
const selectedRole = ref(null);
const selectedPermissionId = ref(null);
const isEditModalOpen = ref(false);
const isPermissionModalOpen = ref(false);

// Fonctions
const fetchRoles = async () => {
  try {
    const response = await roleService.listerRoles();
    roles.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchPermissions = async () => {
  try {
    const response = await permissionService.listerPermissions();
    permissions.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchRoles();
  fetchPermissions();
});

function onRoleSubmit() {
  // Logique pour ajouter un rôle
  errorMessage.value = "";
  successMessage.value = "";

  if (newRole.value.name.trim() === "") {
    errorMessage.value = "Le nom du rôle ne doit pas être vide.";
    return;
  }

  roleService
    .ajouterRole(newRole.value)
    .then(() => {
      newRole.value = { name: "" };
      fetchRoles();
      successMessage.value = "Le rôle a été ajouté avec succès.";
      errorMessage.value = "";
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
      successMessage.value = "";
    });
}

function openEditModal(role) {
  selectedRole.value = { ...role }; // Copie du rôle sélectionné
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
}

function onUpdateRole() {
  // Logique de mise à jour du rôle
  closeEditModal();
  errorMessage.value = "";
  successMessage.value = "";

  if (selectedRole.value.name.trim() === "") {
    errorMessage.value = "Le nom du rôle ne doit pas être vide.";
    return;
  }

  roleService
    .modifierRole(selectedRole.value.id, selectedRole.value)
    .then(() => {
      fetchRoles();
      successMessage.value = "Le rôle a été mis à jour avec succès.";
      errorMessage.value = "";
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
      successMessage.value = "";
    });
}

function openPermissionModal(role) {
  selectedRole.value = role;
  isPermissionModalOpen.value = true;
}

function closePermissionModal() {
  isPermissionModalOpen.value = false;
}

function onAssignPermission() {
  // Logique pour octroyer une permission
  closePermissionModal();
  errorMessage.value = "";
  successMessage.value = "";

  if (selectedPermissionId.value === null) {
    errorMessage.value = "Veuillez sélectionner une permission.";
    return;
  }

  roleService
    .octroyerPermission(selectedRole.value.id, selectedPermissionId.value)
    .then(() => {
      fetchRoles();
      successMessage.value = "La permission a été octroyée avec succès.";
      errorMessage.value = "";
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
      successMessage.value = "";
    });
}

function deleteRole(id) {
  // Demande de confirmation
  const confirmation = confirm("Voulez-vous vraiment supprimer ce rôle ?");

  // Si l'utilisateur confirme, on procède à la suppression
  if (confirmation) {
    roleService
      .supprimerRole(id)
      .then(() => {
        fetchRoles(); // Rafraîchir la liste des rôles après suppression
        successMessage.value = "Le rôle a été supprimé avec succès.";
        errorMessage.value = "";
      })
      .catch((error) => {
        errorMessage.value =
          error.response?.data?.message ||
          "Une erreur est survenue lors de la suppression du rôle.";
        successMessage.value = "";
      });
  } else {
    console.log("Suppression annulée");
  }
}
</script>

<style scoped>
.container-fluid {
  width: 90%;
  margin: 0 auto;
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
.btn-primary {
  background: #3498db;
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 25px;
  border: none;
}

.table {
  margin-top: 20px;
}

.action-buttons {
  display: flex;
  justify-content: space-evenly;
}

.btn-custom,
.btn-supprimer,
.btn-permission {
  width: 116px;
  height: 41px;
  font-size: 16px;
  border: none;
}

.btn-custom {
  display: flex;
  width: 116px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 25px;
  background: #3498db;
  color: var(--base-white, var(--White, #fff));
  text-align: center;

  /* Bold/16px */
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 175% */
  letter-spacing: -0.2px;
}

.btn-supprimer {
  display: flex;
  width: 116px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 25px;
  background: #ff2424;
  color: var(--base-white, var(--White, #fff));
  text-align: center;

  /* Bold/16px */
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 175% */
  letter-spacing: -0.2px;
}

.btn-permission {
  display: flex;
  width: 227px;
  height: 42px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #2c3e50;
  color: var(--base-white, var(--White, #fff));
  text-align: center;

  /* Bold/16px */
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 175% */
  letter-spacing: -0.2px;
}
thead th {
  text-align: center;
  font-family: Montserrat;
}
tbody td {
  text-align: center;
}

.action-buttons img {
  display: none;
}

/* Pour les petits écrans */
@media (max-width: 768px) {
  .action-buttons img {
    display: block;
    width: 20px; /* Fixer la largeur de l'icône */
    height: 20px; /* Fixer la hauteur de l'icône */
    margin: 0 auto; /* Centrer l'image dans le bouton */
  }

  .action-buttons .button-text {
    display: none; /* Cacher le texte */
  }

  .action-buttons button {
    padding: 0; /* Enlever le padding pour éviter que le bouton prenne trop de place */
    background: none; /* Enlever la couleur de fond du bouton */
    border: none; /* Supprimer les bordures */
    width: auto; /* Ajuster la largeur à la taille de l'image */
    height: auto; /* Ajuster la hauteur à la taille de l'image */
  }

  th,
  td {
    font-size: 10px;
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
}
</style>
