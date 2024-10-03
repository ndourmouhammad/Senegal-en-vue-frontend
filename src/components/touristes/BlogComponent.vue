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
        <div class="card shadow-sm h-100">
          <!-- Image de l'article -->
          <img
            :src="getImageUrl(article.image)"
            class="card-img-top"
            alt="Image de l'article"
          />
          <!-- Corps de la carte -->
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ article.titre }}</h5>
            <p class="card-text">
              {{ article.contenu.substring(0, 100) }}...
            </p>
            <!-- Lien pour voir plus -->
            <router-link
              :to="'/article/' + article.id"
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
import { IMG_URL } from "@/config";

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
    : `${IMG_URL}/${image}`;
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


.card-image img {
  /* width: 100%;
  height: 400px; */
  object-fit: cover;
  max-height: 250px; 
}



.card-title {
  font-size: 16px; 
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
    text-align: justify
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
