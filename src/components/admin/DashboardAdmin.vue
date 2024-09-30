<template>
  <div>
    <HeaderAdmin />
    <!-- Contenu principal -->
    <div class="container-fluid mt-1">
      <div class="banniere">
        <!-- <img
                src="@/assets/evenement-bg.png"
                alt="Banner Image"
              /> -->
        <div>
          <h1>Bienvenue Mouhammad !</h1>
        </div>
      </div>
      <div class="cartes d-flex justify-content-between mt-5">
        <div class="carte1">
          <p class="chiffre">{{ sites }}</p>
          <p class="text">Sites touristiques</p>
        </div>
        <div class="carte1">
          <p class="chiffre">{{ events }}</p>
          <p class="text">Evènements</p>
        </div>
        <div class="carte1">
          <p class="chiffre">{{ guides }}</p>
          <p class="text">Guides touristiques</p>
        </div>
        <div class="carte1">
          <p class="chiffre">{{ touristes }}</p>
          <p class="text">Touristes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderAdmin from "../communs/HeaderAdmin.vue";
import siteService from "@/services/sites";
import eventService from "@/services/evenements";
import guideService from "@/services/guides";
import { ref, onMounted } from "vue";

const sites = ref([]);
const events = ref([]);
const guides = ref([]);
const touristes = ref([]);

const fetchStats = async () => {
  try {
    const response = await siteService.getNombreSites();
    console.log(response);
    sites.value = response.data; // Stocker les sites récupérés dans la variable réactive

    const event = await eventService.getNombreEvenements();
    console.log(event);
    events.value = event.data
    
  

    const guide = await guideService.getNombreGuides();
    console.log(guide);
    guides.value = guide.data
    

    const touriste = await guideService.getNombreTouristes();
    console.log(touriste);
    touristes.value = touriste.data

  } catch (error) {
    console.error("Erreur lors de la récupération des sites:", error);
  }
};
// Appel de la fonction pour récupérer les sites lorsque le composant est monté
onMounted(fetchStats);
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
.carte1 {
  width: 250px;
  height: 208px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--couleur-primaire, #3498db);
  background: rgba(52, 152, 219, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carte1 .chiffre {
  color: #000;
  font-family: Montserrat;
  font-size: 45px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-top: 27px;
}
.carte1 .text {
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 57px;
}

/* Responsivite mobile */
@media (max-width: 768px) {
  .banniere {
    height: 30vh;
    padding: 10px;
  }

  .banniere h1 {
    font-size: 25px;
  }
  .cartes {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
}
</style>
