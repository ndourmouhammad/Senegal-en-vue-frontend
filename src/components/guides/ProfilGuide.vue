<template>
    <div>
        <HeaderGuide />

        <div class="container-fluid mt-1">
           <!-- Profil Header -->
    <div class="profile-header d-flex align-items-center ">
      <h2>Mon profil</h2>
      <img src="@/assets/portrait.jpg" alt="Profile" class="profile-image" />
    </div>

    <!-- Profil Info Section -->
    <div class="mt-5">
      <div class="row info">
        <!-- User Info -->
        <div class="col-md-3 user-info">
          <div class="card p-3">
            <p><strong>Mamadou Ngom</strong></p>
            <p>mamaduongom@gmail.com</p>
            <p>+221 78 103 35 01</p>
            <p>Dakar plateau / Dakar</p>
            <p>15/05/2000</p>
            <p>Homme</p>
            <button class="btn btn-outline-primary">Modifier mon profil</button>
          </div>
        </div>

        <!-- Abonné List -->
        <div class="col-md-8">
          <h3>Mes abonnés</h3>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th class="name">Nom complet</th>
                <th>Adresse email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(abonne, index) in abonnes" :key="index">
                <td>{{ abonne.id }}</td>
                <td class="name">{{ abonne.nom }}</td>
                <td>{{ abonne.email }}</td>
                <td class="d-flex justify-content-evenly">
                  <img src="@/assets/cancel24.svg" alt="">
                  
                    <img src="@/assets/view24.svg" alt="">
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </div>
    </div>
</template>

<script setup>
import HeaderGuide from "../communs/HeaderGuide.vue";
import { reactive } from 'vue'

const abonnes = reactive([
  { id: 1, nom: 'Fatoumata Dansoko', email: 'fatoumatadansoko@gmail.com' },
  { id: 2, nom: 'Fatoumata Dansoko', email: 'fatoumatadansoko@gmail.com' },
  { id: 3, nom: 'Fatoumata Dansoko', email: 'fatoumatadansoko@gmail.com' },
  { id: 4, nom: 'Fatoumata Dansoko', email: 'fatoumatadansoko@gmail.com' },
  { id: 5, nom: 'Fatoumata Dansoko', email: 'fatoumatadansoko@gmail.com' },
  { id: 6, nom: 'Fatoumata Dansoko', email: 'fatoumatadansoko@gmail.com' },
])
</script>

<style scoped>
.container-fluid {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    overflow-x:hidden;
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
    gap:550px;
}
.profile-header h2 {
    color: var(--White, #FFF);
font-family: Montserrat;
font-size: 45px;
font-style: normal;
font-weight: 800;
line-height: normal;
}

.profile-image {
    border-radius: 222px;
width: 222px;
height: 216.736px;
flex-shrink: 0;
}

/* User Info */
.info {
  display: flex;
 justify-content: space-between;
}
.user-info {
    width: 333px;
height: 319px;
flex-shrink: 0;
border-radius: 5px;
border: 1px solid #3498DB;

/* Thin Shadow 2 -2 - 10 */
box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.10);
}

.user-info .card {
  border: none;
}
.user-info p {
    color: #2C3E50;
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

.user-info button {
    display: flex;
width: 183px;
padding: 10px 0px;
justify-content: space-between;
align-items: center;
border-radius: 25px;
border: 1px solid #3498DB;
background: var(--White, #FFF);
color: var(--couleur-primaire, #3498DB);

/* Choix */
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
display: flex;
justify-content: center;
}

/* Table */
h3{
    color: #3498DB;

/* Sous titres */
font-family: Montserrat;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom:1.5rem;
margin-top:1rem;
}
table {
  width: 100%;
  background-color: white;
  
}

table thead th , table thead tr{
    color: #2C3E50;

/* police navbar */
font-family: "Nunito Sans";
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

/* Responsive mobile */
@media screen and (max-width: 768px) {
  .profile-header {
    height: 25vh;
    background: #3498DB;
    width:100%;
  }
  .profile-image {
    display:none;
  }
  table thead th , table thead tr{
    font-size: 12px;
  }
  td {
    font-size: 12px;
  }
}
tbody .name, thead .name {
    display: none;
  }

</style>