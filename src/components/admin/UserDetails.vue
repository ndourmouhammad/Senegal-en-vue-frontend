<template>
  <div>
    <HeaderAdmin />
    <!-- Contenu principal -->
    <div class="container-fluid mt-1" v-if="user">
      <div class="banniere">
        <!-- Bannière, vous pouvez ajouter une image ici -->
        <div>
          <h1>{{ user.name || 'Nom non disponible' }}</h1>
        </div>
      </div>
      
      <div class="main flex">
        <!-- Section info utilisateur -->
        <div class="info">
          <p><strong>Nom :</strong> {{ user.name || 'Nom non disponible' }}</p>
          <p><strong>Email :</strong> {{ user.email || 'Email non disponible' }}</p>
          <p><strong>Téléphone :</strong> {{ user.telephone || 'Téléphone non disponible' }}</p>
          <p><strong>Adresse :</strong> {{ user.adresse || 'Adresse non disponible' }}</p>
          <p><strong>Date de naissance :</strong> {{ user.date_naissance || 'Non disponible' }}</p>
          <p><strong>Genre :</strong> {{ user.genre || 'Non spécifié' }}</p>
          <p><strong>Langues :</strong> {{ user.langues || 'Non disponible' }}</p>
          <p><strong>Note :</strong> {{ user.note || 'Non disponible' }}</p>
          <p><strong>Numero de carte :</strong> {{ user.numero_carte_guide || 'Non disponible' }}</p>
          <button class="btn" @click="banUser(user.id)">Bannir</button>
        </div>
        
        <!-- Section image de profil -->
        <div class="image">
          <img 
            v-if="user.photo_profil" 
            :src="getMediaUrl(user.photo_profil)" 
            alt="Photo de profil de l'utilisateur"
            @error="handleImageError"
          />
          <p v-else>Image non disponible</p>
        </div>
      </div>
    </div>

    <!-- Si l'utilisateur n'est pas trouvé -->
    <div v-else>
      <p>Utilisateur introuvable</p>
    </div>
  </div>
</template>

<script setup>
import HeaderAdmin from '../communs/HeaderAdmin.vue';
import { ref, onMounted } from 'vue';
import userService from '@/services/users';
import { useRouter, useRoute } from 'vue-router';

// Declarations des variables
const user = ref({});
const route = useRoute();
const router = useRouter();
const userId = route.params.id;

// Fonction pour afficher les informations d'un utilisateur
const getUser = async () => {
  try {
    const response = await userService.detailsUser(userId);
    user.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getUser();
});

const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `http://127.0.0.1:8000/storage/${contenu}`;
};

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/150';
};

const banUser = async (userId) => {
  try {
    await userService.supprimerUser(userId);
    router.push('/acces-users');
  } catch (error) {
    console.error(error);
  }
};

</script>

<style scoped>
.container-fluid {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}
.banniere {
    background-image: url("@/assets/evenement-bg.png"); /* Insert the path to your image */
    background-size: cover; /* Ensures the image covers the entire section */
    background-position: center; /* Centers the image */
    background-repeat: no-repeat; /* Prevents the image from repeating */
    border-radius: 20px;
    width: 100%;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .banniere h1 {
    color: var(--White, #fff);
    font-family: Montserrat;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .flex {
    display:flex;
    gap:520px;
    justify-content:center;
    align-items : center
  }
  .image img {
    width: 222px;
height: 216.736px;
flex-shrink: 0;
border-radius: 222px;
background: url(@/assets/user.svg) lightgray 50% / cover no-repeat;
  }
  
  .info {
    width: 333px;
height: auto;
flex-shrink: 0;
border-radius: 5px;
border: 1px solid #3498DB;

/* Thin Shadow 2 -2 - 10 */
box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.10);
margin-top:5rem;
padding: 14px 16px;
  }
  .btn {
    display: flex;
width: 95.564px;
padding: 10px 0px;
justify-content: space-between;
align-items: center;
border-radius: 25px;
background: #FF3D00;
color: var(--cartes-de-presentation, #F8F9FA);

/* Choix */
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
justify-content: center;
  }
  
  /* Responsivite mobile */
  @media (max-width: 768px) {
    .banniere {
      height: 30vh;
    }
  
    .banniere h1 {
      font-size: 25px;
    }
    .flex {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-bottom:1.5rem;
    }
    
  }
</style>