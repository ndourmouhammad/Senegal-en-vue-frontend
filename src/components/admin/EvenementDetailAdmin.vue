<template>
  <!-- Appel du composant Header -->
  <HeaderAdmin />
  <div class="container-fluid mt-4">
    <!-- Carte de l'événement -->
    <div v-if="eventDetails">
      <!-- Carte de l'événement -->
      <div class="card mb-3 card-no-border mt-4" style="border-radius: 30px">
        <div class="banniere">
          <img :src="getMediaUrl(eventDetails.image)" alt="Banner Image" />
        </div>
      </div>
      <div class="flex">
        <div class="body_detail mt-4">
          <div class="card-body">
            <h1>{{ eventDetails.nom }}</h1>
            <p>{{ eventDetails.description }}</p>

            <div class="info-item">
              <img
                src="@/assets/event_seat.svg"
                alt="{{ remainingPlaces }}"
                class="me-2"
              />
              {{ eventDetails.nombre_participant }} places
            </div>

            <div class="info-item">
              <img
                src="@/assets/date.svg"
                alt="{{ eventStartDate }}"
                class="me-2"
              />
              Du {{ eventDetails.date_debut }} au {{ eventDetails.date_fin }}
            </div>

            <div class="info-item">
              <img
                src="@/assets/location-outline.svg"
                alt="{{ eventLocation }}"
                class="me-2"
              />
              {{ getSiteName(eventDetails.site_touristique_id) }}
            </div>

            <div class="info-item">
              <img src="@/assets/payments.svg" alt="{{ prix }}" class="me-2" />
              {{ eventDetails.prix }} FCFA
            </div>
            <!-- <button class="btn btn-primary mb-5" @click="reserver">Modifier</button> -->
            <div class="d-flex justify-content-between mb-5 gap-3">
              <button class="btn btn-primary" @click="redirectToEdit">
                Modifier
              </button>
              <button
                class="btn btn-primary btn-supprimer"
                @click="deleteEvent(eventDetails.id)"
              >
                Supprimer
              </button>
            </div>

            <p v-if="reservationMessage" class="reservation-message">
              {{ reservationMessage }}
            </p>
          </div>
        </div>

        <div class="reservations">
          <h1>Liste des réservations</h1>
          <div
            class="col-md-12 participants-table"
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
                <tr
                  v-for="reservation in reservations.slice(0, 6)"
                  :key="reservation.id"
                >
                  <td>{{ reservation.user.name }}</td>
                  <td class="table-actions">
                    <template v-if="reservation.statut === 'en cours'">
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
            <p>Aucune réservation disponible.</p>
          </div>
        </div>
      </div>

      <!-- Si les détails de l'événement ne sont pas disponibles -->
    </div>
    <div v-else>
      <p>Chargement des détails de l'événement...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HeaderAdmin from "../communs/HeaderAdmin.vue";
import { useRoute, useRouter } from "vue-router";
import evenementService from "@/services/evenements";
import siteService from "@/services/sites";
import reservationService from "@/services/reservations";
import { IMG_URL } from "@/config";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const eventId = route.params.id;

const eventDetails = ref(null);
const sites = ref([]);
const reservationMessage = ref("");
const reservations = ref(null);

const fetchEvenementDetails = async (eventId) => {
  try {
    const event = await evenementService.getEvenementDetails(eventId);
    eventDetails.value = event.data;

    const reservation = await reservationService.getEvenementReservations(
      eventId
    );
    console.log("Reservations:", reservation);
    reservations.value = reservation;
  } catch (error) {
    console.error("Error fetching event data:", error);
  }
};

const getSites = async () => {
  try {
    const response = await siteService.get();
    sites.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des sites:", error);
  }
};

const getSiteName = (siteId) => {
  const site = sites.value.find((c) => c.id === siteId);
  return site ? site.libelle : "Unknown";
};

// Méthode pour approuver une réservation
const approveReservation = async (reservationId) => {
  try {
    const response = await reservationService.confirmReservation(reservationId);
    Swal.fire({
      icon: "success",
      title: "Réservation approuvée!",
      text: "Cette réservation est approuvée avec succès.",
    })
    fetchEvenementDetails(eventId);
  } catch (error) {
    console.error("Erreur lors de l'approuvion de la réservation:", error);
    Swal.fire({
      icon: "error",
      title: "Erreur lors de l'approuvion",
      text: error.message,
    })
  }
};

// Méthode pour refuser une réservation
const rejectReservation = async (reservationId) => {
  try {
    const response = await reservationService.refuseReservation(reservationId);
    Swal.fire({
      icon: "success",
      title: "Réservation refusée!",
      text: "Cette réservation est refusée avec succès.",
    })
    fetchEvenementDetails(eventId);
  } catch (error) {
    console.error("Erreur lors de la refus de la réservation:", error);
    Swal.fire({
      icon: "error",
      title: "Erreur lors du refus",
      text: error.message,
    })
  }
};

// Methode pour supprimer  evenment ensuite rediriger vers /evenements-admin
const deleteEvent = async () => {
  if (confirm("Voulez-vous supprimer cet evenement ?")) {
    try {
      await evenementService.deleteEvenement(eventId);
      router.push({ name: "evenements-admin" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement:", error);
    }
  }
};

const redirectToEdit = () => {
  // Remplacez `edit` par le nom de votre route ou le chemin si vous ne l'avez pas nommée
  router.push({ name: "edit-events", params: { id: eventId } });
};

const redirectToAllReservations = () => {
  router.push({ name: "all-reservations", params: { eventId: eventId } });
};

const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `${IMG_URL}/${contenu}`;
};

onMounted(async () => {
  await getSites();
  await fetchEvenementDetails(eventId);
});
</script>

<style scoped>
h1 {
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
  object-fit: cover;
}
.flex {
  display: flex;
  justify-content: space-between;
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
.btn-supprimer {
  background: red;
  border: none;
}
.reservatios h1 {
  color: #000;
  font-family: Montserrat;
  font-size: 45px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 1.5rem;
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
  .flex {
    flex-direction: column;
  }
  .reservatios h1 {
    color: #000;
    font-family: Montserrat;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 1.5rem;
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
