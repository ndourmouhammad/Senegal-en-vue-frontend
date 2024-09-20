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
        <!-- Formulaire d'ajout des rôles -->
        <!-- <div class="search-bar">
          <form @submit.prevent="onRoleSubmit">
            <input v-model="newRole.name" type="text" class="form-control" placeholder="Ajouter un rôle" required />
            <button type="submit" class="btn btn-ajout" :disabled="!newRole.name">Ajouter</button>
          </form>
        </div> -->
        <div class="search-bar mb-5">
        <div class="alert alert-success" style="display: none">
          Status message goes here
        </div>
        <input
          type="text"
          class="form-control d-inline-block me-2"
          placeholder="Ajouter un rôle"
        />
        <button class="btn btn-ajout d-inline-block">Ajouter</button>
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
    <img src="@/assets/edit.svg" alt="">
    <span class="button-text">Modifier</span>
  </button>
  
  <button @click="openPermissionModal(role)" class="btn-permission">
    <img src="@/assets/key.svg" alt="">
    <span class="button-text">Permissions</span>
  </button>
  
  <button @click="deleteRole(role.id)" class="btn-supprimer">
    <img src="@/assets/delete.svg" alt="">
    <span class="button-text">Supprimer</span>
  </button>
</td>

            </tr>
          </tbody>
        </table>
  
        <!-- Modal pour modifier un rôle -->
        <Modal v-if="isEditModalOpen" :isOpen="isEditModalOpen" @close="closeEditModal">
          <template #header>
            <h5>Modifier le rôle</h5>
          </template>
          <template #body>
            <form @submit.prevent="onUpdateRole">
              <div class="form-group">
                <label for="roleName">Nom du rôle</label>
                <input v-model="selectedRole.name" type="text" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">Sauvegarder</button>
            </form>
          </template>
        </Modal>
  
        <!-- Modal pour octroyer des permissions -->
        <Modal v-if="isPermissionModalOpen" :isOpen="isPermissionModalOpen" @close="closePermissionModal">
          <template #header>
            <h5>Octroyer des permissions</h5>
          </template>
          <template #body>
            <form @submit.prevent="onAssignPermission">
              <div class="form-group">
                <label for="permissionSelect">Sélectionner la permission</label>
                <select v-model="selectedPermissionId" class="form-control" required>
                  <option v-for="permission in permissions" :key="permission.id" :value="permission.id">
                    {{ permission.name }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Octroyer</button>
            </form>
          </template>
        </Modal>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import HeaderAdmin from '../communs/HeaderAdmin.vue';
  import Modal from './Modal.vue';
  
  const roles = ref([
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Guide' },
    { id: 3, name: 'Touriste'}
  ]);
  
  const permissions = ref([
    { id: 1, name: 'Read' },
    { id: 2, name: 'Write' }
  ]);
  
  const newRole = ref({ name: '' });
  const selectedRole = ref(null);
  const selectedPermissionId = ref(null);
  
  const isEditModalOpen = ref(false);
  const isPermissionModalOpen = ref(false);
  
  function onRoleSubmit() {
    // Logique d'ajout de rôle
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
  }
  
  function deleteRole(id) {
    // Logique pour supprimer le rôle
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
  border:none;
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
background: #3498DB;
color: var(--base-white, var(--White, #FFF));
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
background: #FF2424;
color: var(--base-white, var(--White, #FFF));
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
background: #2C3E50;
color: var(--base-white, var(--White, #FFF));
text-align: center;

/* Bold/16px */
font-family: Montserrat;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 28px; /* 175% */
letter-spacing: -0.2px;
}
thead th{
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
