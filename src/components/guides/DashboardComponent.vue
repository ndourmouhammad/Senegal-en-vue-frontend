<template>
  <div>
    <HeaderGuide />
    <!-- Contenu principal -->
    <div class="container-fluid mt-1">
      <div class="banniere">
        <div>
          <!-- Afficher le nom de l'utilisateur connecté -->
          <h1>Bienvenue {{ userName }} !</h1>
        </div>
      </div>
      <div class="cartes d-flex justify-content-between mt-5">
        <div class="carte1">
            <p class="chiffre">{{sites}}</p>
            <p class="text">Sites touristiques</p>
        </div>
        <div class="carte1">
            <p class="chiffre">{{reservations}}</p>
            <p class="text">Reservations</p>
        </div>
        <div class="carte1">
            <p class="chiffre">{{abonnements}}</p>
            <p class="text">Abonnés</p>
        </div>
        <div class="carte1">
            <p class="chiffre">{{ clients }}</p>
            <p class="text">Clients</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderGuide from "../communs/HeaderGuide.vue";
import siteService from "@/services/sites";
import { ref, onMounted } from 'vue';

// Récupérer les informations utilisateur depuis le localStorage
const user = JSON.parse(localStorage.getItem('user'));
const userName = user ? user.name : 'Utilisateur';

// Données pour les statistiques
const sites = ref([]);
const reservations = ref([]);
const abonnements = ref([]);
const clients = ref([]);

const fetchStats = async () => {
  try {
    const response = await siteService.nombreSites();
    console.log(response);
    sites.value = response.data; // Stocker les sites récupérés dans la variable réactive

    const reservation = await siteService.nombreReservations();
    console.log(reservation);
    reservations.value = reservation.data

    const abonnement = await siteService.nombreAbonnements();
    console.log(abonnement);
    abonnements.value = abonnement.count

    const client = await siteService.nombreClients();
    console.log(client);
    clients.value = client.data

  } catch (error) {
    console.error('Erreur lors de la récupération des sites:', error);
  }
};
// Appel de la fonction pour récupérer les stats lorsque le composant est monté
onMounted(fetchStats);
</script>

<style scoped>
.container-fluid {
  width: 85%;
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
