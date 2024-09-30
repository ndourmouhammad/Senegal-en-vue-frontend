<template>
  <div>
      <HeaderGuide />
      <!-- Contenu principal -->
      <div class="container-fluid mt-1">
          <div class="banniere">
        <!-- <img
              src="@/assets/evenement-bg.png"
              alt="Banner Image"
            /> -->
        <div>
          <h1>Mon profil</h1>
        </div>
      </div>
      <div class="main flex">
        <div class="info">
          <p>Nom complet : {{ user.name }}</p>
          <p>Adresse email : {{ user.email }}</p>
          <p>Numero telephone : {{ user.telephone }}</p>
          <p>Adresse : {{ user.adresse }}</p>
          <p>Date de naissance : {{ user.date_naissance }}</p>
          <p>Genre : {{ user.genre }}</p>
          <p>Langues parlées : {{ user.langues }}</p>
          <p>Note : {{ user.note }}</p>
          <p>Numero de carte : {{ user.numero_carte_guide }}</p>
          <router-link
              to="/modification-guide"
              class="btn"
            >
              Modifier mon profil
            </router-link>
        </div>
        <div class="image">
          <div class="row">
        <div class="mt-5">
          <h1>Mes Abonnés</h1>
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th class="name">Nom complet</th>
                <th>Adresse email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Afficher les abonnements dynamiquement -->
              <tr v-for="abonnement in abonnements" :key="abonnement.id">
                <td>{{ abonnement.id }}</td>
                <td class="name">{{ abonnement.touriste.name }}</td>
                <td>
                  <router-link :to="'/abonnement/' + abonnement.touriste.id">
                    {{ abonnement.touriste.email }}
                  </router-link>
                </td>
                <td class="d-flex justify-content-between">
                  <!-- <button
                    v-if="abonnement.status === 'en cours'"
                    class="btn-tableau btn-primary btn-sm me-2 action-btn"
                    @click="accepterAbonnement(abonnement.id)"
                  >
                    <span class="d-none d-md-inline">Accepter</span>
                  </button> -->
                  <p
                    v-if="abonnement.status === 'accepte'"
                    
                    @click="refuserAbonnement(abonnement.id)"
                  >
                    <img src="@/assets/cancel.svg" alt="" style="width: 32px; height: 32px">
                  </p>
                  <!-- <span
                    v-if="abonnement.status === 'accepte'"
                    class="btn-tableau btn-success bg-success"
                  >
                    <span class="d-none d-md-inline">Abonné(e)</span>
                  </span> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HeaderGuide from '../communs/HeaderGuide.vue';
import userService from '@/services/users';
import abonnementService from '@/services/abonnements';

// Déclarer une variable réactive pour stocker les informations de l'utilisateur
const user = ref({});
const abonnements = ref([]);

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

const abonnementSites = async () => {
  try {
    const response = await abonnementService.abonnements();
    console.log(response);
    abonnements.value = response; // Charger les abonnements récupérés
  } catch (error) {
    console.error('Erreur lors de la récupération des abonnements:', error);
  }
};

// Appeler la fonction pour sélectionner les informations de l'utilisateur
onMounted(() => {
fetchUser();
abonnementSites();
});
// Fonction pour refuser un abonnement
const refuserAbonnement = async (id) => {
  try {
    await abonnementService.refuser(id);
    // Mettre à jour la liste des abonnements après avoir refusé
    abonnementSites();
  } catch (error) {
    console.error('Erreur lors du refus de l\'abonnement:', error);
  }
};

const getMediaUrl = (contenu) => {
return contenu.startsWith("http")
  ? contenu
  : `http://127.0.0.1:8000/storage/${contenu}`;
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
.banniere h1, h1 {
  color: var(--White, #fff);
  font-family: Montserrat;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.image h1 {
  color:#3498DB;
  margin-bottom: 3rem;
}
.flex {
  display:flex;
  gap:20px;
  display: flex;
  justify-content: space-between;
}
.image img {
  width: 222px;
height: 216.736px;
flex-shrink: 0;
border-radius: 222px;

}
.table th,
.table td {
  vertical-align: middle;
  font-family: Montserrat;
}

.info {
  width: 380px;
height: auto;
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
font-size: 14px;
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
  .info {
    width: 100%;
  }
  .image h1 {
    font-size: 24px;
    text-align: center;
  }
  td {
    font-size: 14px;
  }
  thead .name {
    display: none;
  }
  tbody .name {
    display: none;
  }
}
</style>