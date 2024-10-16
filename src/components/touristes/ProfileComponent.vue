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
          <router-link to="/modification-touriste" class="btn">
            Modifier mon profil
          </router-link>
        </div>
        <div class="image" v-if="user.photo_profil">
          <img :src="getMediaUrl(user.photo_profil)" alt="Profile" />
        </div>
        <div v-else class="loading">Chargement des détails...</div>
      </div>
      <div class="reservations">
        <h2>Historique de mes réservations pour les evenements</h2>
        <table class="table table-bordered text-center">
          <thead>
            <tr >
              <th>ID</th>
              <th>Date de réservation</th>
              <th>Nom de l'evenement</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservations" :key="reservation.id">
              <td>{{ reservation.id }}</td>
              <td>{{ reservation.date_reservation }}</td>
              <td>{{ getEventName(reservation.evenement_id) }}</td>
              <td class="table-actions">
                <template v-if="reservation.statut === 'en cours'">
                  <img
                    
                    src="@/assets/encours.svg"
                    class="me-3"
                    alt="Reject"
                  />
                  <span class="hover-text">En cours</span>
                </template>
                <template v-else-if="reservation.statut === 'termine'">
                  <img
                    src="@/assets/check.svg"
                    class="me-3"
                    alt="Approve"
                  />
                  <span class="hover-text">Approuvé</span>
                </template>
                <template v-else>
                  <img
                    src="@/assets/cancel.svg"
                    class="me-3"
                    alt="Approve"
                  />
                  <span class="hover-text">Rejeté</span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Historique de mes réservations pour les excursions</h2>
        <table class="table table-bordered text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date de réservation</th>
              <th>Libelle</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservationSites" :key="reservation.id">
              <td>{{ reservation.id }}</td>
              <td>{{ reservation.date_commande }}</td>
              <td>{{ getSiteName(reservation.id_excursion) }}</td>
              <td class="table-actions">
                <template v-if="reservation.statut === 'en cours'">
                  <img
                    src="@/assets/encours.svg"
                    class="me-3"
                    alt="Reject"
                  />
                  <span class="hover-text">En cours</span>
                </template>
                <template v-else-if="reservation.statut === 'termine'">
                  <img
                    src="@/assets/check.svg"
                    class="me-3"
                    alt="Approve"
                  />
                  <span class="hover-text">Approuvé</span>
                </template>
                <template v-else>
                  <img
                    src="@/assets/cancel.svg"
                    class="me-3"
                    alt="Approve"
                  />
                  <span class="hover-text">Rejeté</span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-5">
      <FooterTouriste />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import userService from "@/services/users";
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import { IMG_URL } from "@/config";
import reservationService from "@/services/reservations";
import evenementService from "@/services/evenements";
import excursionService from "@/services/excursions";

// Déclarer une variable réactive pour stocker les informations de l'utilisateur
const user = ref({});
const reservations = ref([]);
const evenements = ref([]);
const excursions = ref([]);
const reservationSites = ref([]);

// Fonction pour sélectionner les informations de l'utilisateur depuis le service
const fetchUser = async () => {
  try {
    const response = await userService.user();
    console.log(response);
    user.value = response;
  } catch (error) {
    console.error(
      "Erreur lors de la sélection des informations de l'utilisateur:",
      error
    );
  }
};

// Récupérer les événements
const evenementSites = async () => {
  try {
    const response = await evenementService.get();
    evenements.value = response.data;
    console.log(evenements.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des evenements:", error);
  }
};

// Recuperer les sites
const fetchExcursions = async () => {
  try {
    const response = await excursionService.get();
    excursions.value = response.data;
    console.log(excursions.value);
  } catch (error) {
    console.error("Erreur lors de la sélection des excursions:", error);
  }
};

// Lister mes réservations pour les evenements
const fetchReservations = async () => {
  try {
    const reservation = await reservationService.getMesReservations();
    reservations.value = reservation.data;
    console.log(reservations.value);
  } catch (error) {
    console.error("Erreur lors de la sélection des reservations:", error);
  }
};

/// Lister mes reservations pour les sites
const fetchReservationsSites = async () => {
  try {
    const reservationSite = await reservationService.getMesCommandes();
    reservationSites.value = reservationSite.data;
    console.log(reservationSites.value);
  } catch (error) {
    console.error("Erreur lors de la création des reservations:", error);
  }
};

// Trouver le nom de l'événement par son ID
const getEventName = (evenement_id) => {
  const event = evenements.value.find((e) => e.id === evenement_id);
  return event ? event.nom : "Événement inconnu";
};

// Trouver le nom du site par son ID
const getSiteName = (id_excursion) => {
  const excursion = excursions.value.find((s) => s.id === id_excursion);
  return excursion ? excursion.libelle : "excursion inconnu";
};

// Appeler les fonctions au montage du composant
onMounted(() => {
  fetchUser();
  fetchReservations();
  evenementSites();
  fetchExcursions();
  fetchReservationsSites();
});

// Générer l'URL de l'image
const getMediaUrl = (contenu) => {
  return contenu.startsWith("http") ? contenu : `${IMG_URL}/${contenu}`;
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
  display: flex;
  gap: 520px;
  justify-content: center;
  align-items: center;
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
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #3498db;

  /* Thin Shadow 2 -2 - 10 */

  margin-top: 5rem;
  padding: 14px 16px;
  color: #2c3e50;
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
  border: 1px solid #3498db;
  background: var(--White, #fff);

  /* Choix */
  color: #3498db;

  /* Choix */
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  display: flex;
  justify-content: center;
}
h2 {
  color: #3498db;

  /* Sous titres */
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  margin: 2rem 0;
}

img {
  display: none;
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
  img {
  width: 20px;
  display: block;
}
.hover-text {
  display: none;
}
.image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 5rem;
  margin-bottom: 1rem;
}
h2 {
  font-size: medium;
}
th {
  font-size: small;
}
}
</style>
