<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderTouriste />

    <!-- Contenu principal -->
    <div class="container-fluid mt-4 mb-4">
      <div class="banniere">
        <h1>Blog</h1>
      </div>

      <div class="titre">
        <h2>
          Explorez le monde autrement, à travers des récits inspirants et des
          découvertes uniques.
        </h2>
      </div>

      <div class="row mt-4">
        <!-- Carte des articles touristiques -->
        <div class="col-md-12">
          <div class="row">
            <!-- Boucle sur les articles touristiques -->
            <div
              class="col-12 col-md-4 mb-4"
              v-for="article in paginatedArticles"
              :key="article.id"
            >
              <div class="custom-card">
                <div class="card-content">
                  <h5 class="card-title">{{ article.titre }}</h5>
                </div>
                <div class="card-image">
                  <img
                    :src="getImageUrl(article.image)"
                    class="card-img-top"
                    alt="Guide Image"
                  />
                </div>
                <div class="card-content">
                  <p class="card-description">{{ article.contenu.substring(0, 100) }}...</p>
                  <!-- {{ site.description.substring(0, 150) }}... -->
                  <router-link :to="'/article/' + article.id" class="card-link">
                    Voir plus
                  </router-link>
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
import { ref, onMounted } from "vue";
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import articleService from "@/services/articles";

// Déclarer une variable réactive pour stocker les articles
const articles = ref([]);
const paginatedArticles = ref([]);
const currentPage = ref(1);
const perPage = 6;
const totalPages = ref(0);

// Fonction pour récupérer les articles depuis le service
const articleSites = async () => {
  try {
    const response = await articleService.get();
    articles.value = response.data.data; // Accède à la liste des articles ici
    console.log(articles.value); // Vérifie que les articles sont bien récupérés
    totalPages.value = Math.ceil(articles.value.length / perPage); // Calculer le nombre total de pages
    paginateArticles();
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
  }
};

// Fonction pour paginer les articles
const paginateArticles = () => {
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  paginatedArticles.value = articles.value.slice(startIndex, endIndex);
};

// Fonction pour changer de page
const changePage = (pageNumber) => {
  currentPage.value = pageNumber;
  paginateArticles();
};

// Méthode pour construire l'URL de l'image
const getImageUrl = (image) => {
  return image.startsWith("http")
    ? image
    : `http://127.0.0.1:8000/storage/${image}`;
};

// Appel de la fonction pour récupérer les articles lorsque le composant est monté
onMounted(articleSites);
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

.banniere h1 {
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 45px;
  font-weight: 800;
}

.titre h2 {
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 600;
  margin-top: 60px;
  margin-bottom: 60px;
}

.custom-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  /* overflow: hidden; */
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap:2rem;
  text-align: center;
  padding: 10px;
  margin: 10px;
  height: 100%;
  
  width: 100%;
}

.custom-card:hover {
  transform: translateY(-10px);
}

.card-image img {
  /* width: 100%;
  height: 400px; */
  object-fit: cover;
  max-height: 250px; 
}



.card-title {
  font-size: 24px; 
  font-weight: 700; 
  color: #00214a;

  font-family: "Montserrat", sans-serif;
}

.card-description {
  font-size: 14px;
  color: #606060;
  margin-bottom: 15px;
  font-family: "Montserrat", sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;

  -webkit-box-orient: vertical;
}

.card-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border-radius: 30px; /* Plus arrondi pour correspondre à la maquette */
  font-size: 16px; /* Légèrement plus grand */
  font-weight: bold;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  transition: background-color 0.3s ease;
}

.card-link:hover {
  background-color: #219150;
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

/* Responsivité */
@media (max-width: 768px) {
  .banniere {
    height: 20vh;
    background-color: #3498db;
  }

  .banniere h1 {
    font-size: 24px;
  }

  .custom-card {
    margin: 20px 0;
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
  .card-title {
    font-size: 18px;
  }
}
</style>
