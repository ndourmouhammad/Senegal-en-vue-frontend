<template>
    <div>
      <!-- Appel du composant Header -->
      <HeaderTouriste />
  
      <!-- Main Content -->
      <div class="container-fluid mt-1">
        <!-- Image principale avec bande d'infos -->
        <div class="main-image-container">
          <img src="@/assets/culture-serere.png" alt="La culture Serere" class="main-image">
          <div class="image-overlay blue-overlay d-flex justify-content-between align-items-center py-3">
            
              <h5 class="title">Titre : La culture Serere</h5>
              <div class="d-flex align-items-center justify-content-between gap-3">
                <div>
                    <span class="me-3"><img src="@/assets/like.svg" alt=""> 255</span>
                <span><img src="@/assets/dislike.svg" alt=""> 14</span>
                </div>
                <div>
                    <span>Date de publication : 21/04/2024</span>
                </div>
              </div>
            
            
          </div>
        </div>
  
        <!-- Section de l'article -->
        <div class="article-section mt-4">
          <h2>La culture Serere</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum hendrerit risus, eget vulputate dui tincidunt a...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nunc a nisi ornare tempor. Phasellus tristique...</p>
        </div>
  
        <!-- Commentaires Section (Formulaire + Commentaires) -->
        <div class="row comments-section mt-5">
          <!-- Formulaire de commentaire -->
          <div class="col-md-6 comment-form">
            <h4>Commentaires</h4>
            <textarea class="form-control mb-3 comment-box" placeholder="Saisissez votre commentaire"></textarea>
            <button class="btn btn-primary mb-4">Commenter</button>
          </div>
  
          <!-- Liste des commentaires (Cartes) -->
          <div class="col-md-6 comment-list">
            <div class="comment-card d-flex mb-3">
              <img src="https://via.placeholder.com/50" alt="User" class="comment-avatar me-3">
              <div class="comment-content">
                <strong class="comment-author">Golangiang</strong>
                <p class="comment-time">Il y a 1 heure</p>
                <p class="comment-text">How to get KDE on FreeBSD?</p>
              </div>
            </div>
  
            <div class="comment-card d-flex mb-3">
              <img src="https://via.placeholder.com/50" alt="User" class="comment-avatar me-3">
              <div class="comment-content">
                <strong class="comment-author">Linoxgd</strong>
                <p class="comment-time">Il y a 3 heures</p>
                <p class="comment-text">What is difference between Java and JavaScript?</p>
              </div>
            </div>
  
            <!-- Ajout de pagination si nécessaire -->
            
          </div>
        </div>
      </div>
  
      <!-- Footer -->
      <FooterTouriste />
    </div>
  </template>
  
  <script setup>
  import HeaderTouriste from "../communs/HeaderTouriste.vue";
  import FooterTouriste from "../communs/FooterTouriste.vue";
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
  }
  </style>
  