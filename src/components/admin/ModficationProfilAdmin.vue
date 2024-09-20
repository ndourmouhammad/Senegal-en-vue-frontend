<template>
    <div>
        <HeaderAdmin />

        <div class="container-fluid mt-1">
           <!-- Profil Header -->
    <div class="profile-header d-flex align-items-center ">
      <h2>Modification de mon profil</h2>
      
    </div>
    <div class="profile-container mt-5 ">
    <div class="profile-form">
      <form @submit.prevent="submitForm" class="d-flex flex-column  gap-3">
        <div class="form-row gap-3">
          <!-- Nom -->
          <div class="form-group">
            <input type="text" id="name" v-model="form.name" placeholder="Mamadou Ngom" class="input-field">
          </div>

          <!-- Email -->
          <div class="form-group">
            <input type="email" id="email" v-model="form.email" placeholder="mamadoungom@gmail.com" class="input-field">
          </div>
        </div>

        <div class="form-row">
          <!-- Date de naissance -->
          <div class="form-group">
            <input type="text" id="birthdate" v-model="form.birthdate" placeholder="15/05/2002" class="input-field">
          </div>

          <!-- Sexe -->
          <div class="form-group">
            <input type="text" id="gender" v-model="form.gender" placeholder="masculin" class="input-field">
          </div>
        </div>

        <div class="form-row">
          <!-- Téléphone -->
          <div class="form-group">
            <input type="text" id="phone" v-model="form.phone" placeholder="781033501" class="input-field">
          </div>

          <!-- Localisation -->
          <div class="form-group">
            <input type="text" id="location" v-model="form.location" placeholder="Dakar plateau" class="input-field">
          </div>
        </div>

        <div class="form-row single-column">
          <!-- Image de profil -->
          <div class="form-group">
            <input type="text" id="profileImage" v-model="form.profileImage" placeholder="mon_profil.jpg" class="input-field">
          </div>
        </div>

        <!-- Bouton Enregistrer -->
        <div class="button-container">
          <button type="submit" class="save-btn">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</div>

    
        </div>
   
</template>

<script setup>
import HeaderAdmin from "../communs/HeaderAdmin.vue";
import { reactive } from 'vue';

// Déclarer les données du formulaire en utilisant reactive
const form = reactive({
  name: "Mouhammad Ndour",
  email: "ndourmouhammad15@gmail.com",
  birthdate: "15/05/2002",
  gender: "masculin",
  phone: "781033501",
  location: "Dakar plateau",
  profileImage: "mon_profil.jpg"
});

// Méthode pour soumettre le formulaire
const submitForm = () => {
  console.log("Formulaire soumis :", form);
  // Ajoutez votre logique pour envoyer les données à une API ou une autre action ici
};
</script>


<style scoped>
.container-fluid {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    overflow-x: hidden;
}

/* Profile Header */
.profile-header {
  background: url(@/assets/bienvenue.svg) no-repeat center center;
  background-size: cover; /* Ensures the image covers the entire section */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  border-radius: 20px;
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  gap: 550px;
}

.profile-header h2 {
  color: var(--White, #FFF);
  font-family: Montserrat;
  font-size: 45px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

.profile-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.profile-form {
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.form-group {
  flex: 1;
}

.single-column {
  flex-direction: column;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #2C3E50;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-bottom: 1px solid #3498DB;
}

.button-container {
  text-align: left;
}

.save-btn {
  display: flex;
  width: 183px;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  border: 1px solid #3498DB;
  background: var(--White, #FFF);
  color: var(--couleur-primaire, #3498DB);

  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.save-btn:hover {
  background-color: #3498DB;
  color: white;
}

input::placeholder {
  color: var(--graye, #999);
  font-family: "Nunito Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* Responsive mobile */
@media screen and (max-width: 768px) {
  .profile-header {
    height: 25vh;
    background: #3498DB;
    width: 100%;
  }

  .profile-header h2 {
    font-size: 20px;
  }

  .form-row {
    flex-direction: column; /* Make the form rows stack vertically */
  }

  .form-group {
    width: 100%; /* Ensure form groups take full width */
  }

  .input-field {
    width: 100%; /* Inputs take full width */
  }
}
</style>
