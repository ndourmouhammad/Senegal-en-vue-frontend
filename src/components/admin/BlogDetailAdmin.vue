<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderAdmin />

    <!-- Main Content -->
    <div class="container-fluid mt-1" v-if="articleDetails">
      <!-- Image principale avec bande d'infos -->
      <div class="main-image-container">
        <div class="main-img">
          <img :src="getMediaUrl(articleDetails.image)" alt="La culture Serere" class="main-image">
        </div>
        <div class="image-overlay blue-overlay d-flex justify-content-between align-items-center py-3">
          <h5 class="title">Titre : {{ articleDetails.titre }}</h5>
          <div class="d-flex align-items-center justify-content-between gap-3">
            <div class="reactions">
              <span class="me-3"><img src="@/assets/like.svg" alt=""> {{ articleReactions.likes_count }}</span>
              <span><img src="@/assets/dislike.svg" alt=""> {{ articleReactions.dislikes_count }}</span>
            </div>
            <div>
              <span>{{ articleDetails.date_publication }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section de l'article -->
      <div class="article-section mt-4">
        <h2>{{ articleDetails.titre }}</h2>
        <p>{{ articleDetails.contenu }}</p>
      </div>

      <!-- btn modifier -->
      
      <button class="btn-modifier" @click="redirectToEdit">Modifier</button>

      <!-- Commentaires Section -->
      <div class="row comments-section mt-5">
        <h2>Gestion des commentaires</h2>
        <div class="col-md-6 comment-list">
          <div v-for="comment in paginatedCommentaires" :key="comment.id" class="comment-card d-flex mb-3">
            <img :src="getMediaUrl(comment.user.photo_profil)" alt="User" class="comment-avatar me-3" />
            <div class="comment-content">
              <div class="d-flex justify-content-between">
                <strong class="comment-author">{{ comment.user.name }}</strong>
                <img src="@/assets/delete.svg" alt="Delete" @click="handleDeleteComment(articleId, comment.id)" />
              </div>
              <p class="comment-time">{{ new Date(comment.created_at).toLocaleString() }}</p>
              <p class="comment-text">{{ comment.contenu }}</p>
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
      </div>
    </div>
    <FooterTouriste />
  </div>
</template>

<script setup>
import HeaderAdmin from "../communs/HeaderAdmin.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import articleService from "@/services/articles";
import commentaireService from "@/services/commentaires";
import FooterTouriste from "../communs/FooterTouriste.vue";

// Simulate fetching event details based on the event ID
const route = useRoute();
const router = useRouter();
const articleId = route.params.id;

const articleDetails = ref(null);
const articleReactions = ref([null]);
const commentaireArticle = ref([null]);
const paginatedCommentaires = ref(null);
const perPage = 2;
const currentPage = ref(1);
const totalPages = ref(1);

const fetchArticleDetails = async (articleId) => {
  try {
    const article = await articleService.getArticlesDetails(articleId);
    articleDetails.value = article.data;

    const reactions = await articleService.getReactions(articleId);
    articleReactions.value = reactions;

    const commentaires = await commentaireService.get(articleId);
    commentaireArticle.value = commentaires;
    totalPages.value = Math.ceil(commentaires.data.length / perPage);
    paginateCommentaires();
  } catch (error) {
    console.error("Error fetching event data:", error);
  }
};

// Pagination des commentaires
const paginateCommentaires = () => {
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  paginatedCommentaires.value = commentaireArticle.value.data.slice(
    startIndex,
    endIndex
  );
};

// Changement de page
const changePage = (pageNumber) => {
  currentPage.value = pageNumber;
  paginateCommentaires();
};

// Redirect to edit page
const redirectToEdit = () => {
  router.push({ name: 'edit-article', params: { id: articleId } });
};

// Get media URL for images
const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `http://127.0.0.1:8000/storage/${contenu}`;
};

// Handle comment deletion
const handleDeleteComment = async (articleId, commentId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire?')) {
    try {
      await articleService.deleteComment(articleId, commentId);
      // After deleting, filter out the deleted comment from the list
      commentaireArticle.value.data = commentaireArticle.value.data.filter(
        (comment) => comment.id !== commentId
      );
      alert('Commentaire supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
      alert('Erreur lors de la suppression du commentaire.');
    }
  }
};

// Fetch article and comments on mount
onMounted(async () => {
  await fetchArticleDetails(articleId);
});
</script>

  <style scoped>
  /* Style général */
  .container-fluid {
    width: 85%;
    margin: auto;
  }
  
  .main-image-container {
    position: relative;
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
  
  .main-image {
    width: 100%;
    border-radius: 15px;
  }
  
  .blue-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0px 0px 10px 10px;
background: #3498DB;
    color: white;
    padding: 10px 20px;
    
  }
  
  .image-overlay .title {
    color: var(--White, #FFF);

/* Paragraphes */
font-family: montserrat;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
  }
  
  .image-overlay .d-flex {
    font-size: 14px;
  }
  
  /* Section de l'article */
  .article-section h2 {
    color: #000;

/* Sous titres */
font-family: Montserrat;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
  }
  .btn-modifier {
    width: 152px;
height: 44px;
flex-shrink: 0;
border-radius: 25px;
background: #3498DB;
color: #F8F9FA;
font-family: Montserrat;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;
border:none;
  }
  
  .article-section p {
    color: var(--black, #051D30);

/* Paragraphes */
font-family: "Nunito Sans";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
  }
  
  /* Section des commentaires */
  .comments-section {
    display: flex;
  }

  .comments-section h2 {
    color: #3498DB;

/* Sous titres */
font-family: Montserrat;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 1.5rem;
  }
  
  .comment-form h4 {
    color: #3498DB;

/* Sous titres */
font-family: Montserrat;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
  }
  
  .comment-box {
    min-height: 100px;
    border-radius: 5px;
border: 1px solid #3498DB;
background: #F8F9FA;
box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.10);
width: 466px;
color: #6E6666;

/* paragraphes */
font-family: "Nunito Sans";
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
  }
  
  /* Cartes de commentaire */
  .comment-card {
    border-radius: 4.589px;
border: 0.918px solid var(--Border, #EAEAEA);
background: var(--White, #FFF);
box-shadow: 1.836px 0.918px 4.589px 0px rgba(0, 0, 0, 0.15);
    padding: 20px;
  }
  
  .comment-avatar {
    border-radius: 36.715px;
background: url(https://via.placeholder.com/50) lightgray 50% / cover no-repeat;
width: 36.715px;
height: 36.715px;
  }
  
  .comment-content {
    flex-grow: 1;
  }
  .comment-author {
    color: #000;
font-family: Montserrat;
font-size: 11.932px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: 0.597px;
  }
  
  .comment-time {
    color: var(--Subtitle-text-color, #808080);
font-family: "Nunito Sans";
font-size: 9.179px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: 0.459px;
  }
  
  .comment-text {
    color: #000;
font-family: "Nunito Sans";
font-size: 12.85px;
font-style: normal;
font-weight: 300;
line-height: 22.947px; /* 178.571% */
letter-spacing: 0.643px;
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
  
  /* Responsive */
  /* Responsive design pour les écrans plus petits */
@media (max-width: 768px) {
    .main-image-container {
    border-radius: 30px;
    background: rgba(52, 152, 219, 0.80);
    height: auto; /* Permet à la hauteur de s'adapter au contenu */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .reactions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .main-image-container .main-img img {
    display: none; /* Cacher l'image en version mobile */
  }
  
  .blue-overlay {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%; /* Assurez-vous que le texte prend toute la largeur */
    color: white;
    background: none; /* Pas de fond nécessaire en mobile */
    padding: 10px;
  }
  
  .blue-overlay .title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .overlay-info {
    font-size: 12px;
  }
  .comments-section h2 {
    font-size: 20px;
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

/* Responsivité pour les écrans encore plus petits */
@media (max-width: 576px) {
    .main-image-container {
        height: 150px; /* Fixer une hauteur plus petite pour la bannière */
    }

    .blue-overlay h5 {
        font-size: 16px; /* Encore plus petit pour les petits écrans */
    }

    .blue-overlay span {
        font-size: 10px; /* Ajuster la taille du texte pour les petits écrans */
    }

    .article-section h2 {
        font-size: 20px; /* Réduire la taille des titres de l'article */
    }

    .article-section p {
        font-size: 12px; /* Réduire la taille des paragraphes */
    }

    .btn-modifier {
        width: 100px; /* Réduire la taille du bouton */
        font-size: 14px; /* Réduire la taille de la police */
    }

    /* Ajustements supplémentaires pour la section des commentaires */
    .comment-card {
        padding: 10px; /* Réduire l'espacement des commentaires */
        font-size: 12px; /* Réduire la taille de la police des commentaires */
    }

    .comment-avatar {
        width: 30px;
        height: 30px; /* Réduire la taille de l'avatar */
    }
}

  </style>
  