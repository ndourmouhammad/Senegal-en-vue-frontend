<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderAdmin />

    <!-- Contenu principal -->

    <div class="container-fluid">
      <div class="titre d-flex justify-content-between">
        <h2>Les articles</h2>
        <!-- <button class="btn btn-ajout">Ajouter</button> -->
        <router-link to="/article-add" style="text-decoration: none">
          <button class="btn btn-ajout">Ajouter</button>
        </router-link>
      </div>

      <div class="row mt-1">
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
                  <p class="card-description">{{ article.contenu.substring(0, 200) }}...</p>
                  <div class="d-flex justify-content-between">
                    <router-link
                      :to="'/article-admin/' + article.id"
                      class="card-link"
                    >
                      Voir plus
                    </router-link>
                    <button
                      class="card-link btn-supprimer"
                      @click="deleteArticle(article.id)"
                    >
                      Supprimer
                    </button>
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
import { ref, onMounted } from "vue";
import HeaderAdmin from "../communs/HeaderAdmin.vue";
import articleService from "@/services/articles";
import FooterTouriste from "../communs/FooterTouriste.vue";
import { IMG_URL } from "@/config";

// Déclarer une variable réactive pour stocker les articles
const articles = ref([]);
const errorMessage = ref("");
const successMessage = ref("");
const paginatedArticles = ref([]);
const currentPage = ref(1);
const perPage = 6;
const totalPages = ref(0);

// Fonction pour récupérer les articles depuis le service
const fetchArticles = async () => {
  try {
    const response = await articleService.get();
    articles.value = response.data.data; // Accède à la liste des articles ici
    console.log(articles.value); // Vérifie que les articles sont bien récupérés
    totalPages.value = Math.ceil(articles.value.length / perPage); // Calculer le nombre total de pages
    paginateArticles();
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    errorMessage.value = error.response?.data?.message || "Une erreur s'est produite.";
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
// Fonction pour supprimer un article
const deleteArticle = async (articleId) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
    try {
      await articleService.deleteArticle(articleId); // Appel à votre service de suppression
      successMessage.value = "Article supprimé avec succès.";
      errorMessage.value = "";

      // Retirer l'article supprimé de la liste des articles
      articles.value = articles.value.filter(
        (article) => article.id !== articleId
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
      errorMessage.value = error.response?.data?.message || "Une erreur s'est produite.";
      successMessage.value = "";
    }
  }
};

// Méthode pour construire l'URL de l'image
const getImageUrl = (image) => {
  return image.startsWith("http")
    ? image
    : `${IMG_URL}/${image}`;
};

// Appel de la fonction pour récupérer les articles lorsque le composant est monté
onMounted(fetchArticles);
</script>

<style scoped>
.container-fluid {
  width: 85%;
  margin: auto;
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

.btn-ajout {
  display: flex;
  width: 150px;
  height: 51.849px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #3498db;
  color: var(--base-white, var(--White, #fff));
  text-align: center;

  /* Bold/16px */
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 175% */
  letter-spacing: -0.2px;
  margin-top: 4rem;
}
.btn-supprimer {
  background: red;
  border: none;
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
  .custom-card {
    margin: 20px 0;
  }
  .titre {
    flex-direction: column;
    margin-top: 0rem;
  }
  .btn-ajout {
    margin-top: 0rem;
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
