<template>
  <div>
    <HeaderTouriste />
    <div class="container-fluid mt-1">
      <div class="banniere">
        <!-- Vérification si region existe avant d'accéder à ses propriétés -->
        <h1 v-if="region">{{ region.libelle }}</h1>
        <h1 v-else>Région non trouvée</h1>
      </div>
      <div class="content-wrapper mt-5">
        <!-- Region Details -->
        <div class="region-details" v-if="region">
          <div class="body_detail mt-4">
            <div class="card-body">
              <h1>{{ region.libelle }}</h1>
              <p >{{ region.description }}</p>
              <div class="info-item">Superficie : {{ region.superficie }} km²</div>
              <div class="info-item">Population : {{ region.population }} habitants</div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Chargement des données de la région...</p>
        </div>

        <!-- Region Image -->
        <div class="region-image">
          <div v-if="region && region.image">
            
            <video
                  v-if="isVideo(region.image)"
                  :src="getMediaUrl(region.image)"
                  class="card-img-top"
                  controls
                ></video>
                <img
                  v-else
                  :src="getMediaUrl(region.image)"
                  class="card-img-top"
                  :alt="region.libelle"
                />
          </div>
          <div v-else>
            <p>Aucune image disponible pour cette région.</p>
          </div>
        </div>


      </div>

      <div class="my-5 destinations">
       


    <h2 class="text-center mb-5">Les sites touristiques à visiter</h2>
    <div class="row">
      <div
        v-for="activity in sites"
        :key="activity.id"
        class="col-md-4 mb-4 d-flex"
      >
        <div class="card shadow-sm d-flex flex-column">
          <template v-if="isVideo(activity.contenu)">
            <video class="card-img-top" controls>
              <source
                :src="getMediaUrl(activity.contenu)"
                type="video/mp4"
              />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </template>
          <template v-else>
            <img
              class="card-img-top"
              :src="getMediaUrl(activity.contenu)"
              alt="Activity Image"
            />
          </template>

          <div class="card-body flex-fill">
            <h5 class="card-title">{{ activity.libelle }}</h5>
            <p class="card-text">{{ activity.description }}</p>
            <router-link
                    :to="'/site/' + activity.id"
                    class="btn-success btn-link"
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

    </div>
    <FooterTouriste />
  </div>
</template>

<script setup>
import HeaderTouriste from "@/components/communs/HeaderTouriste.vue";
import FooterTouriste from "@/components/communs/FooterTouriste.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import regionsService from "@/services/regions";
import { IMG_URL } from "@/config";

// Reactive variables
const region = ref(null);
const route = useRoute(); // Access route parameters
const sites = ref(null);

// Fetch region details
async function fetchRegion() {
  try {
    const regionName = route.params.regionName;
    const { data: regions } = await regionsService.getRegions();

    const fetchedSites = await regionsService.getSitesParRegion(regionName);
    sites.value = fetchedSites.data;
    console.log("Sites : ", sites.value);

    // Check if regions data is an array
    if (Array.isArray(regions)) {
      region.value = regions.find((r) => r.libelle === regionName) || null;
      if (!region.value) {
        console.error("Aucune information disponible pour cette région.");
      }
    } else {
      console.error("Les régions récupérées ne sont pas au format attendu.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de la région:", error);
  }
}

// Helper method to get media URL
const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `${IMG_URL}/${contenu}`;
};

const isVideo = (contenu) => {
  return contenu.endsWith('.mp4') || contenu.endsWith('.mov') || contenu.endsWith('.avi');
};


// Fetch the region on component mount
onMounted(fetchRegion);
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}

.container-fluid {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.banniere {
  background-image: url("@/assets/evenement-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  font-size: 200px;
  font-weight: 700;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
}



.region-image {
  width: 50rem;
  height: 22rem;
  padding: 21px 14px 24px 24px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--White, #fff);
  margin-top: 20px;
  margin-bottom:20px
}

.region-image img {
  width: 100%;
  height: auto;

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

/* .card-body p {
  width: 300px;
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
} */

.info-item {
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  
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
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width:500px;
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
.btn-link svg {
  margin-left: 8px;
  width: 16px;
  height: 16px;
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
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
}

.card-body p {
  width: 58rem;
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  align-items : justify;
}

.info-item {
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
  margin-left: 45px;
}

@media screen and (max-width: 768px) {
  .card-body {
    padding: 15px;
  }

  .card-body p {
    width: 100%;
    font-family: "Nunito Sans", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    align-items:justify;
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 0;
    align-items:justify;
  }

  .info-item img {
    margin-right: 10px;
  }
  .content-wrapper {
    flex-direction: column;
  }
  .region-image {
    width: 100%;
    height: auto;
    padding: 21px 14px 24px 24px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: var(--White, #fff);
    margin-top: 20px;
    margin-bottom:20px
  }
}

</style>
