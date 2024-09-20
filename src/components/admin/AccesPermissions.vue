<template>
    <div>
      <HeaderAdmin />
  
      <div class="container-fluid mt-4 users">
        <div class="d-flex mb-3">
          <router-link to="/acces-et-identite">
            <img src="@/assets/retour.svg" alt="" />
          </router-link>
          <h2 class="mt-3">Gestion des permissions</h2>
        </div>
  
        <!-- Formulaire d'ajout des permissions -->
        <div class="search-bar mb-5">
          <div class="alert alert-success" style="display: none">
            Status message goes here
          </div>
          <input
            v-model="newPermission.name"
            type="text"
            class="form-control d-inline-block me-2"
            placeholder="Ajouter une permission"
          />
          <button @click="onPermissionSubmit" class="btn btn-ajout d-inline-block" :disabled="!newPermission.name">Ajouter</button>
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
            <tr v-for="permission in permissions" :key="permission.id">
              <td>{{ permission.id }}</td>
              <td>{{ permission.name }}</td>
              <td class="action-buttons">
                <button @click="openEditModal(permission)" class="btn-custom">
                  <img src="@/assets/edit.svg" alt="" />
                  <span class="button-text">Modifier</span>
                </button>
  
                <button @click="deletePermission(permission.id)" class="btn-supprimer">
                  <img src="@/assets/delete.svg" alt="" />
                  <span class="button-text">Supprimer</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Modal pour modifier une permission -->
        <Modal v-if="isEditModalOpen" :isOpen="isEditModalOpen" @close="closeEditModal">
          <template #header>
            <h5>Modifier la permission</h5>
          </template>
          <template #body>
            <form @submit.prevent="onUpdatePermission">
              <div class="form-group">
                <label for="permissionName">Nom de la permission</label>
                <input v-model="selectedPermission.name" type="text" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">Sauvegarder</button>
            </form>
          </template>
        </Modal>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import HeaderAdmin from "../communs/HeaderAdmin.vue";
  import Modal from "./Modal.vue";
  
  const permissions = ref([
    { id: 1, name: "Read" },
    { id: 2, name: "Write" },
  ]);
  
  const newPermission = ref({ name: "" });
  const selectedPermission = ref(null);
  
  const isEditModalOpen = ref(false);
  
  function onPermissionSubmit() {
    if (newPermission.value.name) {
      permissions.value.push({
        id: permissions.value.length + 1,
        name: newPermission.value.name,
      });
      newPermission.value.name = "";
    }
  }
  
  function openEditModal(permission) {
    selectedPermission.value = { ...permission }; // Copie de la permission sélectionnée
    isEditModalOpen.value = true;
  }
  
  function closeEditModal() {
    isEditModalOpen.value = false;
  }
  
  function onUpdatePermission() {
    const permissionIndex = permissions.value.findIndex(p => p.id === selectedPermission.value.id);
    if (permissionIndex !== -1) {
      permissions.value[permissionIndex].name = selectedPermission.value.name;
    }
    closeEditModal();
  }
  
  function deletePermission(id) {
    permissions.value = permissions.value.filter(permission => permission.id !== id);
  }
  </script>
  
  <style scoped>
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
  
  .d-flex {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  .search-bar input {
    width: calc(100% - 200px);
    display: inline-block;
    border-radius: 25px;
    border: 1px solid var(--black, #051d30);
    background: var(--White, #fff);
  }
  .action-buttons img {
    display: none;
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
    color: var(--White, #fff);
    border-radius: 25px;
  }
  
  .btn-supprimer {
    background: #ff2424;
    color: var(--White, #fff);
    border-radius: 25px;
  }
  
  thead th, tbody td {
    text-align: center;
    font-family: Montserrat;
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

  th, td {
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
  