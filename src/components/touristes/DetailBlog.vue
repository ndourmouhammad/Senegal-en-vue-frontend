<template>
    <div>
      <!-- Appel du composant Header -->
      <HeaderTouriste />
  
      <!-- Main Content -->
      <div class="container-fluid mt-1" v-if="articleDetails">
        <!-- Image principale avec bande d'infos -->
        <div class="main-image-container" v-if="articleDetails">
          <div class="main-img">
            <img :src="getMediaUrl(articleDetails.image)" alt="La culture Serere" class="main-image">
          </div>
          <div class="image-overlay blue-overlay d-flex justify-content-between align-items-center py-3">
            
              <h5 class="title">Titre : {{ articleDetails.titre }}</h5>
              <div class="d-flex align-items-center justify-content-between gap-3">
                <div class="reactions">
                    <span class="me-3"><img src="@/assets/like.svg"  alt=""> {{ articleReactions.likes_count }}</span>
                <span><img src="@/assets/dislike.svg" alt=""> {{ articleReactions.dislikes_count }}</span>
                </div>
                <div>
                    <span>Date de publication : {{articleDetails.date_publication}}</span>
                </div>
              </div>
          </div>
        </div>
        
        
  
        <!-- Section de l'article -->
        <div class="article-section mt-4">
          <h2>{{articleDetails.titre}}</h2>
          <p>
            {{ articleDetails.contenu }}
          </p>
        </div>
  
        <!-- Commentaires Section (Formulaire + Commentaires) -->
        <div class="row comments-section mt-5">
  <!-- Formulaire de commentaire -->
  <div class="col-md-6 comment-form">
    <h4>Commentaires</h4>
    <textarea v-model="newComment" class="form-control mb-3 comment-box" placeholder="Saisissez votre commentaire"></textarea>
    <button class="btn btn-primary mb-4" @click="submitComment">Commenter</button>
  </div>

  <!-- Liste des commentaires (Cartes) -->
  <div class="col-md-6 comment-list">
    <div v-for="comment in commentaireArticle.data" :key="comment.id" class="comment-card d-flex mb-3">
      <img :src="getMediaUrl(comment.user.photo_profil)" alt="User" class="comment-avatar me-3">
      <div class="comment-content">
        <strong class="comment-author">{{ comment.user.name }}</strong>
        <p class="comment-time">{{ new Date(comment.created_at).toLocaleString() }}</p>
        <p class="comment-text">{{ comment.contenu }}</p>
      </div>
    </div>

    <!-- Ajout de pagination si nécessaire -->
  </div>
</div>

      </div>
      <div v-else>
    <p>Chargement des détails de l'événement...</p>
  </div>
  
      <!-- Footer -->
      <FooterTouriste />
    </div>
  </template>
  
  <script setup>
  import HeaderTouriste from "../communs/HeaderTouriste.vue";
  import FooterTouriste from "../communs/FooterTouriste.vue";
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import articleService from '@/services/articles';
  import commentaireService from '@/services/commentaires';

// Simulate fetching event details based on the event ID
const route = useRoute();
const articleId = route.params.id;

const articleDetails = ref(null);
const articleReactions = ref([null]);
const commentaireArticle = ref([null]);

const fetchArticleDetails = async (articleId) => {
  try {
    const article = await articleService.getArticlesDetails(articleId);
    console.log("Article Details:", article);
    articleDetails.value = article.data;

    const reactions = await articleService.getReactions(articleId);
    console.log("Sites récupérés :", reactions); // Vérifie si ça retourne un tableau vide
    articleReactions.value = reactions;

    const commentaires = await commentaireService. get(articleId);
    console.log("Commentaires récupérés :", commentaires); // Vérifie si ça retourne un tableau vide
    commentaireArticle.value = commentaires;


  } catch (error) {
    console.error("Error fetching event data:", error);
  }
};

const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `http://127.0.0.1:8000/storage/${contenu}`;
};

// On component mount, fetch the sites and event details
onMounted(async () => {
  await fetchArticleDetails (articleId);
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
  
  .main-img img {
    width: 100%;
    border-radius: 15px;
    /* object-fit: cover; */
    height: 60vh;
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
  .btn-primary {
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
  
  /* Pagination */
  .pagination .page-link {
    color: #007bff;
  }
  
  .pagination .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .blue-overlay .title {
      font-size: 18px;
    }
  
    .overlay-info {
      font-size: 12px;
    }
  
    .article-section h2 {
      font-size: 24px;
    }
  
    .article-section p {
      font-size: 16px;
    }
  
    .comment-card {
      flex-direction: column;
      align-items: center;
    }
  
    .comment-avatar {
      margin-bottom: 10px;
    }
    .comment-box {
      width: 100%;
    }
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
  }
  </style>
  