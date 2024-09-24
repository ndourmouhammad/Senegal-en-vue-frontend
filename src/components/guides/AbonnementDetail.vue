<template>
  <div>
    <HeaderGuide />
    <div class="container-fluid mt-1">
      <div class="banniere">
        <div>
          <h1 v-if="userDetails">{{ userDetails.name }}</h1>
          <h1 v-else>Chargement...</h1> <!-- Message pendant le chargement -->
        </div>
      </div>
      <div class="main flex" v-if="userDetails">
        <div class="info">
          <p>{{ userDetails.name }}</p>
          <p>{{ userDetails.email }}</p>
          <p>{{ userDetails.telephone }}</p>
          <p>{{ userDetails.adresse }}</p>
          <p>{{ userDetails.date_naissance }}</p>
          <p>{{ userDetails.genre }}</p>
          <!-- <button class="btn">Bannir</button> -->
        </div>
        <div class="image">
          <img
                :src="getMediaUrl(userDetails.photo_profil)"
                class="card-img-top"
                alt="Image du site"
              />
        </div>
      </div>
      <div v-else class="loading">Chargement des détails...</div> <!-- Message de chargement -->
    </div>
  </div>
</template>


<script setup>
import HeaderGuide from "../communs/HeaderGuide.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import abonnementService from "@/services/abonnements";

const route = useRoute();
const userId = route.params.id;

const userDetails = ref(null);

const fetchAbonnementDetails = async (userId) => {
  try {
    const user = await abonnementService.abonnes(userId);
    console.log("User Details:", user);
    userDetails.value = user.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `http://127.0.0.1:8000/storage/${contenu}`;
};
// On component mount, fetch the guide details
onMounted(() => {
  fetchAbonnementDetails(userId);
});
</script>

<style scoped>
.container-fluid {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;
}
.banniere {
  background-image: url("@/assets/evenement-bg.png");
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
  display: flex;
  gap: 520px;
  justify-content: center;
  align-items: center;
}
.image img {
  width: 222px;
  height: 216.736px;
  flex-shrink: 0;
  border-radius: 222px;
  /* background: url(@/assets/profil-abonne.svg) lightgray 50% / cover no-repeat; */
}

.info {
  width: 333px;
  height: 250px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #3498db;

  /* Thin Shadow 2 -2 - 10 */
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  margin-top: 5rem;
  padding: 14px 16px;
}
.btn {
  display: flex;
  width: 95.564px;
  padding: 10px 0px;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  background: #ff3d00;
  color: var(--cartes-de-presentation, #f8f9fa);

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
    margin-bottom: 1.5rem;
  }
}
</style>
