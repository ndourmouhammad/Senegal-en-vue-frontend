<template>
    <div>
      <!-- Appel du composant Header -->
      <HeaderAdmin />
  
      <!-- Contenu principal -->
      
      <div class="container-fluid ">
        <div class="titre d-flex justify-content-between">
          <h2>Les articles</h2>
          <button class="btn btn-ajout">Ajouter</button>
        </div>
  
        <div class="row mt-1">
          <!-- Carte des articles touristiques -->
          <div class="col-md-12">
            <div class="row">
              <!-- Boucle sur les articles touristiques -->
              <div class="col-12 col-md-3 mb-4" v-for="article in articles" :key="article.id">
                <div class="custom-card">
                  <div class="card-content">
                    <h5 class="card-title">{{ article.titre }}</h5>
                  </div>
                  <div class="card-image">
                    <img :src="article.image" alt="Guide Image" />
                  </div>
                  <div class="card-content">
                    <p class="card-description">{{ article.description }}</p>
                    <router-link :to="'/article-admin/' + article.id" class="card-link">
                      Voir plus
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
import HeaderAdmin from "../communs/HeaderAdmin.vue";
 
  
  // Exemple de données statiques pour les guides
  const articles = ref([
    {
      id: 1,
      titre: "La culture du Sénégal",
      image: "https://via.placeholder.com/150",
      description:
        "Le Sénégal est un pays riche en patrimoine culturel, offrant des récits uniques de sa population et de son histoire..."
    },
    {
      id: 2,
      titre: "Les plages du Sénégal",
      image: "https://via.placeholder.com/150",
      description:
        "Découvrez les plus belles plages du Sénégal, offrant un paysage idyllique et des moments de détente exceptionnels..."
    },
    {
      id: 3,
      titre: "Les traditions sénégalaises",
      image: "https://via.placeholder.com/150",
      description:
        "Plongez dans les traditions et coutumes qui font la richesse du Sénégal, un pays à la culture millénaire..."
    },
    {
      id: 4,
      titre: "Les parcs nationaux du Sénégal",
      image: "https://via.placeholder.com/150",
      description:
        "Explorez les parcs nationaux du Sénégal, abritant une faune et une flore exceptionnelles dans des paysages variés..."
    }
  ]);
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
    overflow: hidden;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    padding: 15px;
    margin: 10px;
    height: 100%;
    min-height: 350px; /* Pour assurer une hauteur minimale */
  }
  
  .custom-card:hover {
    transform: translateY(-10px);
  }
  
  .card-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
    max-height: 150px; /* Limiter la hauteur de l'image pour assurer la consistance des cartes */
  }
  
  .card-content {
    padding: 10px;
  }
  
  .card-title {
    font-size: 22px; /* Plus grand pour correspondre à la maquette */
    font-weight: 700; /* Gras */
    color: #00214a;
    margin-bottom: 10px;
    font-family: 'Montserrat', sans-serif;
  }
  
  .card-description {
    font-size: 14px;
    color: #606060;
    margin-bottom: 15px;
    font-family: 'Montserrat', sans-serif;
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
    font-family: 'Montserrat', sans-serif;
    transition: background-color 0.3s ease;
  }
  
  .card-link:hover {
    background-color: #219150;
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
background: #3498DB;
color: var(--base-white, var(--White, #FFF));
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
  }
  </style>
  