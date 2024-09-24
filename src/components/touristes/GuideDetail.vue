<template>
  <!-- Appel du composant Header -->
  <HeaderTouriste />
  <div class="container-fluid mt-4">
    <div class="card mb-3 card-no-border mt-4" style="border-radius: 30px">
      <div class="banniere">
        <img src="@/assets/detail-guide.png" alt="Banner Image" />
      </div>
    </div>

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
              <button @click="subscribe(guideId)">S'abonner</button>
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

    <div class="my-5 destinations" v-if="validSites.length">
      <h2 class="text-center mb-5">Les sites touristiques associés</h2>
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
              <p class="card-text">{{ site.description }}</p>
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
import authService from '@/services/auth'; // Assurez-vous d'avoir un service d'authentification

const router = useRouter();

// Simulate fetching event details based on the event ID
const route = useRoute();
const guideId = route.params.id;

const guideDetails = ref(null);
const guideSites = ref([null]); // Change ici pour un tableau vide

const abonnemntMessage = ref(null);

const fetchguideDetails = async (guideId) => {
  try {
    const guide = await guideService.getGuideDetails(guideId);
    console.log("Guide Details:", guide);
    guideDetails.value = guide.data;

    const sites = await guideService. getGuideSites(guideId);
    console.log("Sites récupérés :", sites); // Vérifie si ça retourne un tableau vide
    guideSites.value = sites;
  } catch (error) {
    console.error("Error fetching site data:", error);
  }
};

const subscribe = async (guideId) => {
  // Vérification si l'utilisateur est authentifié
  const isAuthenticated = authService.isAuthenticated(); // Méthode personnalisée pour vérifier l'authentification

  if (!isAuthenticated) {
    // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
    router.push({ name: 'connexion' });
    return;
  }

  // Si l'utilisateur est connecté, continuer avec la logique d'abonnement
  try {
    await guideService.subscribeToGuide(guideId);
    abonnemntMessage.value = 'Abonnement réussi !';
  } catch (error) {
    abonnemntMessage.value = 'Erreur lors de l\'abonnement : ' + error.message;
  }
};



// Méthode pour construire l'URL du média (vidéo ou image)
const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `http://127.0.0.1:8000/storage/${contenu}`;
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
.profil-guide h2 {
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

@media (max-width: 767px) {
  .guides {
    flex-direction: column;
    align-items: center;
    gap: 20px;
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
}

@media (min-width: 768px) {
}
</style>
