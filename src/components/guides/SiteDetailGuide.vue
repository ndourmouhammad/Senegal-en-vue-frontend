<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderGuide />
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
          <button class="btn btn-primary mb-5" @click="redirectToEdit">
            Modifier
          </button>
        </div>
        <div class="reservatios">
          <h1>Liste des reservations</h1>
          <div class="col-md-12 participants-table"
          v-if="reservations && reservations.length > 0"
          >
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Nom complet</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <!-- Itérer sur les réservations pour afficher les données dynamiquement -->
                <tr
                  v-for="reservation in reservations.slice(0, 6)"
                  :key="reservation.id"
                >
                  <td>{{ reservation.user.name }}</td>
                  <td class="table-actions">
                    <!-- Vérifier le statut de la réservation -->
                    <template v-if="reservation.statut === 'en cours'">
                      <!-- Afficher les icônes si le statut est "en cours" -->
                      <img
                        src="@/assets/check.svg"
                        class="me-3"
                        alt="Approve"
                        style="cursor: pointer"
                        @click="approveReservation(reservation.id)"
                      />
                      <img
                        src="@/assets/cancel.svg"
                        class="me-3"
                        alt="Reject"
                        style="cursor: pointer"
                        @click="rejectReservation(reservation.id)"
                      />
                    </template>

                    <!-- Afficher "Accepté" si le statut est "terminé" -->
                    <template v-else-if="reservation.statut === 'termine'">
                      <span>Accepté</span>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="voir-tous">
             <a @click.prevent="redirectToAllReservations">Voir tous</a>
            </div>
          </div>
          <div v-else>
            <p>Aucune reservation disponible</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderGuide from "../communs/HeaderGuide.vue";
import siteService from "@/services/sites";
import reservationService from "@/services/reservations";
import { IMG_URL } from "@/config";

// Simulate fetching event details based on the event ID
const route = useRoute();
const router = useRouter();
const siteId = route.params.id;

const siteDetails = ref(null);
const guideInfo = ref(null);
const regionInfo = ref(null);
const reservations = ref(null);

const fetchSiteData = async (siteId) => {
  try {
    // Fetch site details
    const site = await siteService.getSiteDetails(siteId);
    console.log("Site Details:", site);
    siteDetails.value = site.data;

    // Fetch site activities
    // const activities = await siteService.getSiteActivities(siteId);
    // siteActivities.value = activities;

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
    // Fetch reservations
    const reservation = await reservationService.getSiteCommandes(siteId);
    console.log("Reservations:", reservation);
    reservations.value = reservation;
  } catch (error) {
    console.error("Error fetching site data:", error);
  }
};

// Méthode pour approuver une réservation
const approveReservation = async (reservationId) => {
  try {
    await reservationService.confirmCommande(reservationId);
    console.log("Réservation approuvée avec succès !");
    // Mettre à jour la liste des réservations après confirmation
    fetchSiteData(siteId);
  } catch (error) {
    console.error("Erreur lors de l'approbation de la réservation:", error);
  }
};

// Méthode pour refuser une réservation
const rejectReservation = async (reservationId) => {
  try {
    await reservationService.refuseCommande(reservationId);
    console.log("Réservation refusée avec succès !");
    // Mettre à jour la liste des réservations après refus
    fetchSiteData(siteId);
  } catch (error) {
    console.error("Erreur lors du refus de la réservation:", error);
  }
};

const redirectToEdit = () => {
  // Remplacez `edit` par le nom de votre route ou le chemin si vous ne l'avez pas nommée
  router.push({ name: "edit", params: { id: siteId } });
};

const redirectToAllReservations = () => {
  router.push({ name: "all-reservations-guide", params: { siteId: siteId } });
};

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

// On component mount, fetch the event details
onMounted(() => {
  fetchSiteData(siteId);
});
</script>

<style scoped>
h1 {
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

.participants-table {
  margin-top: 20px;
  padding: 20px;
}

.participants-table .table {
  width: 100%;
  border-collapse: collapse;
  padding: 20px;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-actions img {
  width: 20px;
  cursor: pointer;
}

.table-actions span {
  font-family: Montserrat;
  font-size: 14px;
}

.voir-tous a {
  color: #007bff !important;
  cursor: pointer;
  text-decoration: none;
}

.voir-tous a:hover {
  text-decoration: underline !important;
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
    width: 360px;
    height: 200px;
    display: inline-flex;
    padding: 21px 14px 24px 24px;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 25px;
  }

  .guide-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    width: 150px;
    height: 139px;
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
    width: 151px;
    height: 149px;
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
  .card-body h1 {
    color: var(--black, #051d30);

    /* Titre */
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
