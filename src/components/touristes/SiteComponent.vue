<template>
  <div>
    <HeaderTouriste />

    <div class="container-fluid mt-4">
      <div class="banniere">
        <div>
          <h1>Sites touristiques</h1>
        </div>
      </div>

      <div class="row mt-4">
        <!-- Sidebar pour filtrer -->
        <div class="col-md-3">
          <div class="filter-sidebar">
            <h5>Filtrer par région</h5>
            <form @submit.prevent="applyFilter">
              <div class="form-group">
                <label for="region">Sélectionner une région</label>
                <select
                  v-model="selectedRegion"
                  class="form-control"
                  id="region"
                  name="region"
                >
                  <option value="">Toutes les régions</option>
                  <option
                    v-for="region in regions"
                    :key="region.id"
                    :value="region.id"
                  >
                    {{ region.libelle }}
                  </option>
                </select>
              </div>
              <button
                type="submit"
                class="btn btn-light rounded-pill px-3 mt-2 btn-filter"
                style="background-color: #3498db; color: #fff"
              >
                Filtrer
              </button>
            </form>
          </div>
        </div>

        <!-- Carte des sites -->
        <div class="col-md-9 destination-section">
          <h2>Nos sites touristiques</h2>
          <div class="row">
            <p class="mt-4 mb-5">Découvrez les plus belles destinations du Sénégal, entre plages paradisiaques, parcs nationaux, et villes historiques. Chaque région offre une expérience unique, mêlant paysages époustouflants et immersion culturelle. Préparez-vous à explorer un Sénégal authentique, riche en diversité et en traditions.</p>
            <div class="col-md-4 mb-4" v-for="site in paginatedSites" :key="site.id">
              <div class="card shadow-sm">
          <img
            v-if="!isVideo(site.contenu)"
            :src="getMediaUrl(site.contenu)"
            class="card-img-top"
            :alt="site.libelle"
          />
          <video
            v-else
            :src="getMediaUrl(site.contenu)"
            class="card-img-top"
            controls
          ></video>
          <div class="card-body">
            <h5 class="card-title">{{ site.libelle }}</h5>
            <p class="card-text">{{ site.description.substring(0, 100) }}...</p>
            <router-link :to="'/site/' + site.id" class="btn-success btn-link">
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

      <!-- Pagination -->
      <div class="pagination-controls mt-4">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="btn btn-outline-primary">
          Précédent
        </button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="btn btn-outline-primary">
          Suivant
        </button>
      </div>
    </div>

    <FooterTouriste />
  </div>
</template>

<script setup>
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import { ref, onMounted } from 'vue';
import siteService from '@/services/sites';
import regionService from '@/services/regions'; // Assurez-vous que votre service regions existe
import { IMG_URL } from "@/config";

const sites = ref([]);
const filteredSites = ref([]);
const paginatedSites = ref([]);
const currentPage = ref(1);
const perPage = 6;
const totalPages = ref(0);
const regions = ref([]);
const selectedRegion = ref(""); // Région sélectionnée

// Fonction pour récupérer les sites
const fetchSites = async () => {
  try {
    const response = await siteService.get();
    sites.value = response.data;
    paginateSites();
  } catch (error) {
    console.error('Erreur lors de la récupération des sites:', error);
  }
};

// Fonction pour récupérer les régions
const fetchRegions = async () => {
  try {
    const response = await regionService.getRegions();
    regions.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des régions:', error);
  }
};

// Filtrer les sites par région
const applyFilter = () => {
  if (selectedRegion.value) {
    filteredSites.value = sites.value.filter(
      (site) => site.region_id === selectedRegion.value
    );
  } else {
    filteredSites.value = sites.value;
  }
  paginateSites(); // Recalcule la pagination après filtrage
};

// Pagination
function paginateSites() {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  paginatedSites.value = filteredSites.value.slice(start, end);
  totalPages.value = Math.ceil(filteredSites.value.length / perPage);
}

// Changer de page
function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    paginateSites();
  }
}

// Appel des fonctions lors du montage du composant
onMounted(async () => {
  await fetchSites();
  await fetchRegions();
  applyFilter(); // Filtrer initialement sans région sélectionnée
});

// Méthodes pour gérer les médias (image/vidéo)
const getMediaUrl = (contenu) => {
  return contenu.startsWith('http') ? contenu : `${IMG_URL}/${contenu}`;
};
const isVideo = (contenu) => {
  return contenu.endsWith('.mp4') || contenu.endsWith('.mov') || contenu.endsWith('.avi');
};
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
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 45px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

.filter-sidebar {
  width: 300px;
  height: auto;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--stroke_card, rgba(0, 0, 0, 0.1));
  background: var(--White, #fff);
  padding: 10px;
}

.filter-sidebar h5 {
  color: #2c3e50;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.filter-sidebar label {
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.filter-sidebar btn-filter {
  display: flex;
  width: 92px;
  height: 34px;
  padding: 10px 0px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 25px;
  border: 1px solid #f8f9fa;
  background: #3498db;
}

.card {
    width:100%
}

.card-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-img-top {
  height: 250px;
  object-fit: cover;
}
.destination-section h2 {
  font-size: 32px;
  font-family: Montserrat;
  color: #3498db;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}
.destination-section p {
  font-family: "Nunito Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
  flex-grow: 1;
}
.btn-success {
    width: 40%;
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
.btn-success:hover {
  background: #3498db;
  color: #f8f9fa;
}
/* Styles pour la pagination */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.pagination-controls button {
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 25px;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  background-color: #3498db;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;
}

.pagination-controls button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.pagination-controls button:hover:not(:disabled) {
  background-color: #2980b9;
}

.pagination-controls span {
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  margin: 0 15px;
}

/* Modern flat design for the card */
.card {
    background-color: #f0f4ff;
    border-radius: 15px;
    border: none;
    padding: 20px;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }

  .card-img-top {
    height: 20vh;
    border-radius: 12px;
    background-color: #ffffff;
    object-fit: cover;
  }

  .card-body {
    text-align: center;
  }



  .card-text {
    font-size: 1rem;
    color: #666;
    margin-bottom: 20px;
    text-align: center;
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


  .btn-link svg {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }

@media (max-width: 768px) {
  .banniere {
    background-image: none; /* Cacher l'image */
    height: 20vh; /* Diminuer la hauteur */
    background-color: #3498db;
  }

  .banniere h1 {
    font-size: 24px; /* Réduire la taille du texte */
  }
  .filter-sidebar {
    margin-bottom: 20px;
  }
  .pagination-controls {
    flex-direction: column;
    gap: 10px;
  }

  .pagination-controls button {
    width: 100%;
    padding: 8px;
    font-size: 14px;
  }

  .pagination-controls span {
    margin: 10px 0;
  }

}
</style>
