<template>
  <header-admin />
  <div class="container-fluid mt-4">
    <h1 class="text-center mb-4">La liste des réservations</h1>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom complet</th>
          <th>Adresse email</th>
          <th>Telephone</th>

          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" :key="reservation.id">
          <td>{{ reservation.id }}</td>
          <td>{{ reservation.user.name }}</td>
          <td>{{ reservation.user.email }}</td>
          <td>{{ reservation.user.telephone }}</td>

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
            <template v-else>
              <span>Statut inconnu</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import reservationService from "@/services/reservations";
import HeaderAdmin from "../communs/HeaderAdmin.vue";

const route = useRoute();
const router = useRouter();
const siteId = router.currentRoute.value.params.id;
const reservations = ref([]);
const reservationMessage = ref("");

const fetchReservations = async () => {
  try {
    const reservation = await reservationService.getSiteCommandes(siteId);
    reservations.value = reservation;
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
  }
};

// Méthode pour approuver une réservation
const approveReservation = async (reservationId) => {
  try {
    const response = await reservationService.confirmCommande(reservationId);
    reservationMessage.value = response.data.message;
    fetchReservations();
  } catch (error) {
    console.error("Erreur lors de l'approuvion de la réservation:", error);
  }
};

// Méthode pour refuser une réservation
const rejectReservation = async (reservationId) => {
  try {
    const response = await reservationService.refuseCommande(reservationId);
    reservationMessage.value = response.data.message;
    fetchReservations();
  } catch (error) {
    console.error("Erreur lors de la refus de la réservation:", error);
  }
};

onMounted(fetchReservations);
</script>

<style scoped>
.container-fluid {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  color: #000;

  /* Titre */
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.table-actions img {
  width: 20px;
  cursor: pointer;
}
.table-actions img {
  width: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.table-actions img:hover {
  transform: scale(1.1); /* Agrandit légèrement au survol */
  filter: brightness(1.2); /* Augmente la luminosité de l'icône */
}
</style>
