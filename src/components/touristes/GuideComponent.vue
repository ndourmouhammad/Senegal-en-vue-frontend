<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderTouriste />

    <!-- Contenu principal -->
    <div class="container-fluid mt-4">
      <div class="banniere">
        <div>
          <h1>Guides touristiques</h1>
        </div>
      </div>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Rechercher par langue"
          class="input"
          v-model="searchQuery"
          @input="filterGuides"
        />
      </div>

      <div class="titre">
        <h2>Explorez notre collection complète de guides incontournables</h2>
      </div>

      <div class="row mt-4">
        <!-- Carte des guides touristiques -->
        <div class="col-md-12">
          <div class="row">
            <!-- Exemples de guides touristiques -->
            <div
              class="col-12 col-md-4 mb-4"
              v-for="guide in paginatedGuides"
              :key="guide.id"
            >
              <div class="card mb-4">
                <img
                  :src="getImageUrl(guide.photo_profil)"
                  class="card-img-top"
                  alt="Guide Image"
                />

                <div class="card-body text-center">
                  <div class="info">
                    <p class="card-text">{{ guide.name }}</p>
                    <p class="card-text">{{ guide.email }}</p>
                    <p class="card-text">Note : {{ guide.note }} / 10</p>
                    <p class="card-text">Téléphone : {{ guide.telephone }}</p>
                    <p class="card-text">
                      Langues : {{ guide.langues }}
                    </p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <!-- <button class="btn-subscribe">S'abonner</button> -->
                    <router-link :to="'/guide/' + guide.id" class="btn-more">
                      Voir plus
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="pagination-controls mt-4">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn btn-outline-primary"
        >
          Précédent
        </button>

        <span>Page {{ currentPage }} sur {{ totalPages }}</span>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn btn-outline-primary"
        >
          Suivant
        </button>
      </div>
    </div>

    <!-- Footer -->
    <FooterTouriste />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import guideService from '@/services/guides';
import { IMG_URL } from "@/config";

// Variables réactives pour les guides, recherche, pagination, etc.
const guides = ref([]);
const paginatedGuides = ref([]);
const currentPage = ref(1);
const perPage = 6; 
const totalPages = ref(0);
const searchQuery = ref(""); // Variable pour stocker la recherche

// Fonction pour récupérer les guides depuis le service
const guideSites = async () => {
  try {
    const response = await guideService.get();
    guides.value = response.data;
    paginateGuides();
  } catch (error) {
    console.error('Erreur lors de la récupération des guides:', error);
  }
};

// Fonction de filtrage des guides par langue
const filteredGuides = computed(() => {
  if (searchQuery.value === "") {
    return guides.value;
  } else {
    return guides.value.filter(guide =>
      guide.langues.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
});

// Fonction pour paginer les guides filtrés
const paginateGuides = () => {
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  paginatedGuides.value = filteredGuides.value.slice(startIndex, endIndex);
  totalPages.value = Math.ceil(filteredGuides.value.length / perPage); // Calculer le nombre total de pages après filtrage
};

// Fonction pour changer de page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    paginateGuides();
  }
};

// Fonction déclenchée lorsque l'utilisateur tape dans la barre de recherche
const filterGuides = () => {
  currentPage.value = 1; // Revenir à la première page lors de la recherche
  paginateGuides();
};

// Appel de la fonction pour récupérer les guides lorsque le composant est monté
onMounted(guideSites);

// Méthode pour obtenir l'URL de l'image
const getImageUrl = (contenu) => {
  return contenu.startsWith('http') ? contenu : `${IMG_URL}/${contenu}`;
};

</script>


<style scoped>
.container-fluid {
  width: 85%;
  margin: auto;
}

.banniere {
  background-image: url("@/assets/evenement-bg.png");
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.titre h2 {
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 40px;
}

.banniere h1 {
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 45px;
  font-weight: 800;
}

.search-bar input {
  width: 350px;
  height: 56px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 22px;
  margin-bottom: 22px;
  padding: 22px;
}

.search-bar input::placeholder {
  color: #9a9ab0;
  font-family: "Nunito Sans";
  font-size: 16px;
  font-weight: 400;
}

.card {
  border-radius: 10px;
  /* overflow: hidden; */
  background: var(--White, #fff);
  box-shadow: 0px 0px 21.692px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border: none;
  width: 80%;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-body .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #00214a;
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px;
  align-items: start;
}

.btn-subscribe {
  width: 120px;
  height: 40px;
  border-radius: 20px;
  background-color: #3498db;
  color: #fff;
  font-family: Montserrat;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.card img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    
  }

.btn-more {
  width: 120px;
  height: 40px;
  border-radius: 20px;
  background-color: #27ae60;
  color: #fff;
  font-family: Montserrat;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.btn-more:hover,
.btn-subscribe:hover {
  opacity: 0.8;
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

@media (max-width: 768px) {
  .banniere {
    height: 20vh;
    background-color: #3498db;
  }

  .banniere h1 {
    font-size: 24px;
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
  .card {
    width:100%;
  }
  .card-body {
    width: 100%;
    height: auto;
  }
  .card img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    
  }
}
</style>
