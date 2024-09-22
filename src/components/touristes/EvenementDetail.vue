<template>
  <!-- Appel du composant Header -->
  <HeaderTouriste />
  <div class="container-fluid mt-4">
    <h1 class="titre">Détail de la page de l’événement</h1>
    
    <!-- Vérifie si les détails de l'événement sont chargés -->
    <div v-if="eventDetails">
      <!-- Carte de l'événement -->
      <div class="card mb-3 card-no-border mt-4" style="border-radius: 30px">
        <div class="banniere">
          <img :src="getMediaUrl(eventDetails.image)" alt="Banner Image" />
        </div>
      </div>

      <div class="body_detail mt-4">
        <div class="card-body">
          <h1>{{ eventDetails.nom }}</h1>
          <p>{{ eventDetails.description }}</p>

          <div class="info-item">
            <img src="@/assets/event_seat.svg" alt="{{ remainingPlaces }}" class="me-2" />
            {{ eventDetails.nombre_participant }} places
          </div>

          <div class="info-item">
            <img src="@/assets/date.svg" alt="{{ eventStartDate }}" class="me-2" />
            Du {{ eventDetails.date_debut }} au {{ eventDetails.date_fin }}
          </div>

          <div class="info-item">
            <img src="@/assets/location-outline.svg" alt="{{ eventLocation }}" class="me-2" />
            {{ getSiteName(eventDetails.site_touristique_id) }}
          </div>

          <div class="info-item">
            <img src="@/assets/payments.svg" alt="{{ prix }}" class="me-2" />
            {{ eventDetails.prix }} FCFA
          </div>
        </div>
      </div>
      
      <button class="btn btn-primary mb-5" @click="reserver">Reserver</button>
      <p v-if="reservationMessage" class="reservation-message">{{ reservationMessage }}</p>
    </div>
    
    <!-- Si les détails de l'événement ne sont pas disponibles -->
    <div v-else>
      <p>Chargement des détails de l'événement...</p>
    </div>
  </div>

  <FooterTouriste />
</template>

<script setup>
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import evenementService from '@/services/evenements';
import siteService from '@/services/sites';

const route = useRoute();
const eventId = route.params.id;

const eventDetails = ref(null);
const sites = ref([]);
const reservationMessage = ref('');

const fetchEvenementDetails = async (eventId) => {
  try {
    const event = await evenementService.getEvenementDetails(eventId);
    eventDetails.value = event.data;
  } catch (error) {
    console.error("Error fetching event data:", error);
  }
};

const getSites = async () => {
  try {
    const response = await siteService.get();
    sites.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des sites:', error);
  }
};

const getSiteName = (siteId) => {
  const site = sites.value.find(c => c.id === siteId);
  return site ? site.libelle : "Unknown";
};

const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `http://127.0.0.1:8000/storage/${contenu}`;
};

const reserver = async () => {
  const reservationData = {
    // Ajoutez les données nécessaires pour la réservation
    // Par exemple : nom, email, nombre de participants, etc.
  };

  try {
    await evenementService.reserver(eventId, reservationData);
    reservationMessage.value = 'Réservation réussie !';
  } catch (error) {
    reservationMessage.value = 'Erreur lors de la réservation : ' + error.message;
  }
};

onMounted(async () => {
  await getSites();
  await fetchEvenementDetails(eventId);
});
</script>
<style scoped>
.titre {
  color: #000;

  /* Sous titres */
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.container-fluid {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}
/* Adaptation du style fourni */

.banniere img {
  border-radius: 30px;
  width: 100%;
  height: 40vh;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-body h1 {
  color: var(--black, #051d30);

  /* Titre */
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.card-body p {
  width: 602px;
 
  flex-shrink: 0;
  color: var(--black, #051d30);

  /* Paragraphes */
  font-family: "Nunito Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.info-item {
  color: var(--black, #051d30);

  /* Paragraphes */
  font-family: "Nunito Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 30px;
  margin-left: 45px;
}
.reservation-message {
  margin-top: 20px;
  color: green; /* Ou une autre couleur pour le message */
}

.btn-primary {
  display: flex;
  width: 152px;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: #3498db;
  color: var(--White, var(--White, #fff));

  /* Choix */
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}
@media (max-width: 767px) {
  .card-body {
    padding: 15px;
  }

  .card-body p {
    width: 100%; /* Ensure full width of container */
    color: var(--black, #051d30);
    font-family: "Nunito Sans", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6; /* Increased line-height for readability */
    word-wrap: break-word; /* Force long words to break */
  }

  .info-item {
    display: flex; /* Align icon and text horizontally */
    align-items: center;
    margin-bottom: 10px; /* Adjust bottom margin */
    margin-left: 0; /* Align to the left */
    word-wrap: break-word; /* Ensure content breaks if it's too long */
  }

  .info-item img {
    margin-right: 10px; /* Add some space between icon and text */
  }

  .reservation-button {
    margin-top: 20px;
  }
}

@media (min-width: 768px) {
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card-body p {
    width: 100%;
    max-width: 600px; /* Max width for larger screens */
    color: var(--black, #051d30);
    font-family: "Nunito Sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6; /* Increased line-height */
    word-wrap: break-word; /* Break long words */
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-left: 20px;
    word-wrap: break-word; /* Ensure content breaks if it's too long */
  }

  .info-item img {
    margin-right: 10px;
  }

  .reservation-button {
    margin-top: 30px;
  }
}
</style>
