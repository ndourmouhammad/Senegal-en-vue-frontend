<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderTouriste />
    <div class="container-fluid mt-1">
      <h1 class="titre">Détail de la page du site touristique</h1>
      <!-- Carte de l'événement -->
      <div class="card mb-3 card-no-border mt-4" style="border-radius: 30px">
        <div class="banniere" v-if="siteDetails">
         
          <video
            v-if="isVideo(siteDetails?.contenu)"
            :src="getMediaUrl(siteDetails?.contenu)"
            controls
          ></video>
          <img
            v-else
            :src="getMediaUrl(siteDetails?.contenu)"
            :alt="siteDetails?.libelle"
          />
        </div>
        <div v-else>
          <p>Chargement des informations du guide...</p>
        </div>
      </div>

      <div class="flex">
        <div class="sites-detail">
          <div class="body_detail mt-4">
            <div class="card-body">
              <h1>{{ siteDetails?.libelle }}</h1>
              <p>{{ siteDetails?.description }}</p>

              <div class="info-item">
                <img
                  src="@/assets/event_seat.svg"
                  alt="{{ remainingPlaces }}"
                  class="me-2"
                />
                {{ siteDetails?.places_disponible }} participants
              </div>

              <div class="info-item">
                <img
                  src="@/assets/date.svg"
                  alt="{{ eventStartDate }}"
                  class="me-2"
                />
                {{ siteDetails?.heure_ouverture }} -
                {{ siteDetails?.heure_fermeture }} GMT
              </div>

              <div class="info-item" v-if="regionInfo && regionInfo.data">
                <img
                  src="@/assets/location-outline.svg"
                  alt="Téléphone"
                  class="me-2"
                />
                {{ regionInfo.data.libelle }}
              </div>
              <div v-else>
                <p>Chargement des informations du guide...</p>
              </div>
              <div class="info-item" v-if="guideInfo && guideInfo.data">
                <img
                  src="@/assets/phone-outline.svg"
                  alt="Téléphone"
                  class="me-2"
                />
                {{ guideInfo.data.telephone }}
              </div>
              <div v-else>
                <p>Chargement des informations du guide...</p>
              </div>

              <div class="info-item">
                <img
                  src="@/assets/payments.svg"
                  alt="{{ prix }}"
                  class="me-2"
                />
                {{ siteDetails?.tarif_entree }} FCFA
              </div>
            </div>
          </div>
          <button class="btn btn-primary mb-5" @click="reserver">Reserver</button>
      <p v-if="reservationMessage" class="reservation-message">{{ reservationMessage }}</p>
        </div>

        <div class="guide">
          <!-- <img src="@/assets/guide.svg" alt="Guide Image" /> -->
          <div class="banniere" v-if="siteDetails">
         
         <img
           
           :src="getMediaUrl(guideInfo.data.photo_profil)"
           :alt="siteDetails?.libelle"
         />
       </div>
       <div v-else>
         <p>Chargement des informations du guide...</p>
       </div>
          <div class="guide-info" v-if="guideInfo && guideInfo.data">
            <p class="metier">Guide touristique</p>
            <p class="nom">{{ guideInfo.data.name }}</p>
            <!-- Vérifiez que vous accédez à guideInfo.data -->
            <p class="detail">
              Note : {{ guideInfo.data.note }} / 10 <br />
              <!-- Utilisez la note dynamique -->
              {{ guideInfo.data.adresse }} <br />
              Langues parlées : {{ guideInfo.data.langues }}
            </p>
            <p class="email">
              <a :href="'mailto:' + guideInfo.data.email">{{
                guideInfo.data.email
              }}</a>
              <!-- Utilisation dynamique de l'email -->
            </p>
          </div>
          <div v-else>
            <p>Chargement des informations du guide...</p>
          </div>
        </div>
      </div>

      <div class="my-5 destinations" v-if="validActivities.length">
  <h2 class="text-center mb-5">Les activités pratiquées</h2>
  <div class="row">
    <div
      v-for="activity in validActivities"
      :key="activity.id"
      class="col-md-4 mb-4 d-flex"
    >
      <div class="card shadow-sm d-flex flex-column">
        <template v-if="isVideo(activity.contenu)">
          <video class="card-img-top" controls>
            <source :src="getMediaUrl(activity.contenu)" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </template>
        <template v-else>
          <img class="card-img-top" :src="getMediaUrl(activity.contenu)" alt="Activity Image" />
        </template>
        
        <div class="card-body flex-fill">
          <h5 class="card-title">{{ activity.libelle }}</h5>
          <p class="card-text">{{ activity.description }}</p>
          <a href="#" class="btn btn-success">Voir plus</a>
        </div>
      </div>
    </div>
  </div>
</div>
<div v-else>
  <p>Aucune activité disponible pour ce site.</p>
</div>

    </div>

    <FooterTouriste />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import siteService from "@/services/sites";
import authService from '@/services/auth'; // Remplace par ton service d'authentification
import { IMG_URL } from "@/config";

const router = useRouter();

const route = useRoute();
const siteId = route.params.id;

// State variables
const siteDetails = ref(null);
const siteActivities = ref([null]);
const guideInfo = ref(null);
const regionInfo = ref(null);

const reservationMessage = ref('');

const fetchSiteData = async (siteId) => {
  try {
    // Fetch site details
    const site = await siteService.getSiteDetails(siteId);
    console.log("Site Details:", site);
    siteDetails.value = site.data;

    // Fetch site activities
    const activities = await siteService.getSiteActivities(siteId);
    siteActivities.value = activities;

    // Fetch guide information (assuming guideId is present in site details)
    if (site.data.user_id) {
      const guide = await siteService.getSiteGuide(site.data.user_id);
      console.log("Guide Info:", guide); // Vérifiez ici
      guideInfo.value = guide;
    }

    // Fetch region information (assuming regionId is present in site details)
    if (site.data.region_id) {
      const region = await siteService.getSiteRegion(site.data.region_id);
      console.log("Region Info:", region); // Vérifiez ici
      regionInfo.value = region;
    }
  } catch (error) {
    console.error("Error fetching site data:", error);
  }
};

const reserver = async () => {
  // Vérification si l'utilisateur est authentifié
  const isAuthenticated = authService.isAuthenticated(); // Méthode personnalisée pour vérifier l'authentification

  if (!isAuthenticated) {
    // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
    router.push({ name: 'connexion' });
    return;
  }

  // Si l'utilisateur est connecté, continuer avec la logique de réservation
  const reservationData = {
    // Ajoutez les données nécessaires pour la réservation
    // Par exemple : nom, email, nombre de participants, etc.
  };

  try {
    await siteService.reserver(siteId, reservationData);
    reservationMessage.value = 'Réservation réussie !';
  } catch (error) {
    reservationMessage.value = 'Erreur lors de la réservation : ' + error.message;
  }
};

// Propriété calculée pour filtrer les activités
const validActivities = computed(() => {
  return siteActivities.value.filter((activity) => activity != null);
});


// Méthode pour construire l'URL du média (vidéo ou image)
const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `${IMG_URL}/${contenu}`;
};

// Méthode pour vérifier si le contenu est une vidéo
const isVideo = (contenu) => {
  return (
    contenu.endsWith(".mp4") ||
    contenu.endsWith(".mov") ||
    contenu.endsWith(".avi")
  );
};

// Fetch data on component mount
onMounted(() => {
  fetchSiteData(siteId);
});
</script>

<style scoped>
.titre {
  color: #000;
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

.banniere img,
.banniere video {
  border-radius: 30px;
  width: 100%;
  height: 40vh;
  object-fit: cover;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.reservation-message {
  margin-top: 20px;
  color: green; /* Ou une autre couleur pour le message */
}

.guide {
  width: 600px;
  height: 308px;
  padding: 21px 14px 24px 24px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 25px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--White, #fff);
  display: flex;
  gap: 25px;
}

.guide-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  width: 253px;
  height: 139px;
}

.guide-info .metier {
  display: flex;
  height: 25px;
  padding: 10px 18px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #f0f0f0;
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 8px;
  font-weight: 500;
  line-height: normal;
}

.guide-info .nom {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.guide-info .detail {
  width: 253px;
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.guide-info .email {
  display: flex;
  width: 170px;
  padding: 5px 13px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background: rgba(255, 130, 0, 0.1);
}

.guide-info .email a {
  text-decoration: none;
  color: #6e6666;
  font-family: Montserrat;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.guide img {
  width: 275px;
  height: 263px;
}

.destinations {
  margin-top: 120px;
}

.destinations h2 {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.destinations .card-title {
  color: #27ae60;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 28.8px */
  letter-spacing: 0.12px;
}

.destinations .card-text {
  color: #000;
  font-family: "Nunito Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.btn-success {
  width: 152px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #27ae60;
  border: none;
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  padding: 10px;
  margin-top: auto;
}

.card {
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1; /* Permet à la carte de s'étendre pour remplir l'espace */
}

.card-img-top {
  max-height: 300px; /* Ajustez cette valeur selon vos besoins */
  object-fit: cover; /* Pour maintenir le ratio de l'image */
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-body h1 {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
}

.card-body p {
  width: 602px;
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
}

.info-item {
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 30px;
  margin-left: 45px;
}

.btn-primary {
  display: flex;
  width: 152px;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: #3498db;
  color: var(--White, #fff);
  font-family: "Nunito Sans";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

@media (max-width: 767px) {
  .card-body {
    padding: 15px;
  }

  .card-body p {
    width: 100%;
    font-family: "Nunito Sans", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    word-wrap: break-word;
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 0;
    word-wrap: break-word;
  }

  .info-item img {
    margin-right: 10px;
  }

  .reservation-button {
    margin-top: 20px;
  }
  .flex {
    flex-direction: column;
  }
  .guide {
    width: 100%;
    height: auto;
    display: inline-flex;
    padding: 21px 14px 24px 24px;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 25px;
    flex-direction: column;
    
  }

  .guide-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    width: 150px;
    height: 139px;
    margin-bottom: 1px;
  }

  .guide-info .metier {
    display: flex;
    height: 20px;
    padding: 5px 13px;
    align-items: center;
    gap: 10px;
  }

  .guide-info .nom {
    color: var(--black, #051d30);

    /* Sous-titre */
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .guide-info .detail {
    color: var(--black, #051d30);
    font-family: "Nunito Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 160px;
  }

  .guide-info .email {
    display: flex;
    width: 127px;
    padding: 5px 13px;
    justify-content: space-between;
    align-items: center;
  }

  .guide-info .email a {
    text-decoration: none;
    color: #6e6666;
    font-family: Montserrat;
    font-size: 7px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .guide img {
    width: 100%;
    height: auto;
    object-fit: cover;
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
    max-width: 600px;
    font-family: "Nunito Sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    word-wrap: break-word;
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-left: 20px;
    word-wrap: break-word;
  }

  .info-item img {
    margin-right: 10px;
  }

  .reservation-button {
    margin-top: 30px;
  }
  .main-image-container {
    border-radius: 30px;
    background: rgba(52, 152, 219, 0.8);
    height: auto; /* Permet à la hauteur de s'adapter au contenu */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .reactions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .main-image-container .main-img img {
    display: none; /* Cacher l'image en version mobile */
  }

  .blue-overlay {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%; /* Assurez-vous que le texte prend toute la largeur */
    color: white;
    background: none; /* Pas de fond nécessaire en mobile */
    padding: 10px;
  }

  .blue-overlay .title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .overlay-info {
    font-size: 12px;
  }
  .comments-section h2 {
    font-size: 20px;
  }
  
}
</style>
