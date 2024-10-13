<template>
  <!-- Appel du composant Header -->
  <HeaderTouriste />
  <div class="container-fluid mt-4">
    <div class="card mb-3 card-no-border mt-4" style="border-radius: 30px">
      <div class="banniere">
        <img src="@/assets/detail-guide.png" alt="Banner Image" />
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <div class="guides">
      <div class="profil-guide">
        <h2>Les informations du guide</h2>
        <div v-if="guideDetails" class="infomations">
          <img
            :src="getMediaUrl(guideDetails?.photo_profil)"
            alt="Photo du guide"
          />
          <div class="details">
            <div class="info">
              <h3>{{ guideDetails.name }}</h3>
              <p>{{ guideDetails.adresse }}</p>
              <p>{{ guideDetails.langues }}</p>
              <p>{{ guideDetails.note }} / 10</p>
              <p>{{ guideDetails.telephone }}</p>
              <p class="email">{{ guideDetails.email }}</p>
            </div>
            <div class="abonnement">
    <!-- Afficher le bouton en fonction du statut -->
    <button v-if="status !== 'accepte' && status !== 'en cours'" @click="subscribe(guideId)">
      S'abonner
    </button>
    <button v-else disabled>Déjà abonné</button>
    <p v-if="abonnemntMessage" class="abonnemnt-message">{{ abonnemntMessage }}</p>
  </div>
          </div>
          
        </div>
        <div v-else>
          <p>
            Les informations du guide ne sont pas disponibles pour le moment.
          </p>
        </div>
      </div>
    </div>

    <div class="noter-guide"> 
    
    <label for="note">Note (1 à 10):</label>
    <input type="number" v-model="note" min="1" max="10" id="note" />
    <button @click="noterGuide" >Envoyer la note</button>

    <p v-if="message">{{ message }}</p>
  </div>
    </div>

    <div class="my-5 destinations" v-if="validSites.length">
      <h2 class="text-center mb-5">Les excursions associées</h2>
      <div class="row">
        <div
          v-for="site in validSites"
          :key="site.id"
          class="col-md-4 mb-4 d-flex"
        >
          <div class="card shadow-sm d-flex flex-column">
            <!-- Vérifier si le contenu est une vidéo ou une image -->
            <template v-if="site.contenu.endsWith('.mp4')">
              <video class="card-img-top" controls>
                <source :src="getMediaUrl(site.contenu)" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </template>
            <template v-else>
              <img
                :src="getMediaUrl(site.contenu)"
                class="card-img-top"
                alt="Image du site"
              />
            </template>

            <div class="card-body flex-fill">
              <h5 class="card-title">{{ site.libelle }}</h5>
              <p class="card-text">{{ site.description.substring(0, 100) }}...</p>
              <!-- Lien pour voir plus -->
            <router-link
              :to="'/excursion/' + site.id"
              class="btn-link btn-success mt-auto"
            >
              Voir plus
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Aucun site touristique disponible pour ce guide.</p>
    </div>
  </div>

  <FooterTouriste />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import guideService from "@/services/guides";
import authService from '@/services/auth'; 
import { IMG_URL } from "@/config";

const router = useRouter();
const route = useRoute();
const guideId = route.params.id;

const guideDetails = ref(null);
const guideSites = ref([null]); 
const status = ref(null);
const abonnemntMessage = ref(null);
const note = ref(1); 
const message = ref(""); 


const fetchguideDetails = async (guideId) => {
  try {
    const guide = await guideService.getGuideDetails(guideId);
    console.log("Guide Details:", guide);
    guideDetails.value = guide.data;

    const sites = await guideService. getGuideSites(guideId);
    console.log("Sites récupérés :", sites); 
    guideSites.value = sites;
  } catch (error) {
    console.error("Error fetching site data:", error);
  }
};
const subscribe = async (guideId) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    router.push({ name: 'connexion' });
    return;
  }

  try {
    await guideService.subscribeToGuide(guideId);
    abonnemntMessage.value = 'Abonnement réussi !';
    status.value = 'en cours'; // Mettre à jour le statut après abonnement
  } catch (error) {
    abonnemntMessage.value = 'Erreur lors de l\'abonnement : ' + error.message;
  }
};

// Récupérer le statut d'abonnement lors du chargement
const checkSubscriptionStatus = async (guideId) => {
  try {
    const response = await guideService.getSubscriptionStatus(guideId); // API pour vérifier le statut
    status.value = response.status; // Mettre à jour le statut
  } catch (error) {
    console.error("Erreur lors de la vérification de l'abonnement :", error);
  }
};


// Method to submit a rating for the guide
const noterGuide = async () => {
  try {
    if (!authService.isAuthenticated()) {
      router.push({ name: 'connexion' });
      return;
    }

    const response = await guideService.noterGuide(guideId, note.value);
    message.value = 'Merci pour votre note!';
    await fetchguideDetails(guideId);
  } catch (error) {
    message.value = 'Erreur lors de l\'envoi de la note : ' + error.message;
  }
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

// Propriété calculée pour filtrer les activités
const validSites = computed(() => {
  return guideSites.value.filter((site) => site != null);
});

// On component mount, fetch the guide details
onMounted(() => {
  fetchguideDetails(guideId);
  checkSubscriptionStatus(guideId);
});
</script>

<style scoped>
.container-fluid {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.abonnemnt-message {
  margin-top: 20px;
  color: green; /* Ou une autre couleur pour le message */
}

.banniere img {
  border-radius: 30px;
  width: 100%;
  height: 40vh;
}

.guides {
  display: flex;
  flex-direction: column;
}

.profil-guide {
  display: flex;
  flex-direction: column;
}
.profil-guide h2, .destinations h2 {
  color: #000;

  /* Sous titres */
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 40px;
  margin-bottom: 40px;
}
.profil-guide .infomations {
  width: 719px;
  height: auto;
  flex-shrink: 0;
  border-radius: 15.396px;
  border: 1.54px solid rgba(0, 0, 0, 0.1);
  background: var(--White, #fff);
  margin-bottom: 60px;
  display: flex;
  padding: 32px 14px 29px 24px;
  gap: 40px;
}
.infomations img {
  width: 232px;
  height: 282px;
  flex-shrink: 0;
}
.info {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
.info h3 {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 30.792px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.info p {
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.info .email {
  display: flex;
  width: 250px;
  padding: 7.698px 20.015px;
  justify-content: space-between;
  align-items: center;
  border-radius: 15.396px;
  background: rgba(255, 130, 0, 0.1);
  color: #6e6666;
  font-family: Montserrat;
  font-size: 12.317px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  /* margin-top: -20px; */
}
.abonnement button {
  display: flex;
  width: 152px;
  padding: 10px 0px;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  background: #3498db;
  border: none;
  color: var(--White, var(--White, #fff));

  /* Choix */
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-sites {
  display: flex;
  flex-direction: column;
}
.info-sites h2 {
  color: var(--black, #051d30);

  /* Sous titres */
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 40px;
  margin-bottom: 40px;
}
.info-sites .site {
  width: 307px;
  height: 233px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--stroke_card, rgba(0, 0, 0, 0.1));
  background: var(--White, #fff);
}
.info-sites .site .image {
  width: 301px;
  height: 177px;
  flex-shrink: 0;
  border-radius: 10px 10px 0px 0px;
  background: url(https://picsum.photos/300) lightgray 50% / cover no-repeat;
}
.info-sites .site .site-nom {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 19px 211px, 9px 21px;
}
.info-sites .carte {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
/* Styles pour la section de notation du guide */
.noter-guide {
  
  display: flex;
  
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin-right :20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 200px;
  width:20%
 
}

.d-flex {
  flex-direction: column;
}
.noter-guide label {
  font-family: Nunito Sans, sans-serif;
  font-size: 16px;
  color: #051d30;
}

.noter-guide input {
  width: 60px;
  padding: 5px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
}

.noter-guide button {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  background-color: #3498db;
  color: #fff;
  font-family: "Nunito Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.noter-guide button:hover {
  background-color: #2879b9;
}

.noter-guide p {
  font-family: Nunito Sans, sans-serif;
  font-size: 14px;
  color: #051d30;
  margin-top: 10px;
}

/* Style pour les messages de succès ou d'erreur */
.noter-guide p.success {
  color: green;
}

.noter-guide p.error {
  color: red;
}
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.card-img-top {
  height: 250px;
  object-fit: cover;
}
.card-title {
    color: #27AE60;
font-family: Montserrat;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: 120%; /* 26.439px */
letter-spacing: 0.11px;
}
.card-text {
    color: #000;
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
  flex-grow: 1;
}
.btn-link svg {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }
  .btn-success {
    width: 8rem;
  height: auto;
flex-shrink: 0;
border-radius: 22.95px;
background: #27AE60;
color: #F8F9FA;
font-family: Montserrat;
font-size: 14.688px;
font-style: normal;
font-weight: 600;
line-height: normal;
display: flex;
justify-content: center;
align-items: center;
padding: 15px;
}
  /* General button styles */
  .btn-link {
    font-weight: bold;
    color: white;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: color 0.3s ease;
  }

@media (max-width: 767px) {
  .guides {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .d-flex {
    flex-direction: column;
  }

  .infomations {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
  }

  .info h3,
  .info p {
    text-align: center;
  }

  .info .email {
    width: 80%;
    text-align: center;
  }

  .profil-guide .abonnement button {
    width: 100%;
  }

  .info-sites {
    width: 100%;
    padding: 0;
  }

  .info-sites .carte {
    flex-direction: column;
    align-items: center;
  }

  .info-sites .site {
    width: 100%;
  }
  .profil-guide .infomations {
    width: 100%;
  }
  .noter-guide {
    width: 100%;
  }

  .noter-guide input {
    width: 100%;
  }

  .noter-guide button {
    width: 100%;
  }
}


</style>
