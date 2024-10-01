<template>
    <div>
        <HeaderTouriste />
        <!-- Contenu principal -->
        <div class="container-fluid mt-1">
            <div class="banniere">
          <!-- <img
                src="@/assets/evenement-bg.png"
                alt="Banner Image"
              /> -->
          <div>
            <h1>{{ user.name }}</h1>
          </div>
        </div>
        <div class="main flex">
          <div class="info">
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.telephone }}</p>
            <p>{{ user.adresse }}</p>
            <p>{{ user.date_naissance }}</p>
            <p>{{ user.genre }}</p>
            <router-link
                to="/modification-touriste"
                class="btn"
              >
                Modifier mon profil
              </router-link>
          </div>
          <div class="image" v-if="user.photo_profil">
            <img :src="getMediaUrl(user.photo_profil)" alt="Profile" />
          </div>
          <div v-else class="loading">Chargement des détails...</div>
        </div>
        </div>
        <div class="mt-5">
            <FooterTouriste />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import userService from '@/services/users';
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";

// Déclarer une variable réactive pour stocker les informations de l'utilisateur
const user = ref({});

// Fonction pour sélectionner les informations de l'utilisateur depuis le service
const fetchUser = async () => {
  try {
    const response = await userService.user();
    console.log(response);
    user.value = response;
  } catch (error) {
    console.error('Erreur lors de la sélection des informations de l\'utilisateur:', error);
  }
};

// Appeler la fonction pour sélectionner les informations de l'utilisateur
onMounted(() => {
  fetchUser();
});

const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `https://senegal-en-vue.ndourmouhammad15.simplonfabriques.com/storage/${contenu}`;
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
    width: 400px;
    height: 400px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 5rem;

  }
  
  .info {
    width: 333px;
height: 319px;
flex-shrink: 0;
border-radius: 5px;


/* Thin Shadow 2 -2 - 10 */
box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.10);
border: 1px solid #3498DB;

/* Thin Shadow 2 -2 - 10 */

margin-top:5rem;
padding: 14px 16px;
color: #2C3E50;
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
  }
  .btn {
    display: flex;
width: 183px;
padding: 10px 0px;
justify-content: space-between;
align-items: center;
border-radius: 25px;
border: 1px solid #3498DB;
background: var(--White, #FFF);

/* Choix */
color: #3498DB;

/* Choix */
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
display: flex;
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