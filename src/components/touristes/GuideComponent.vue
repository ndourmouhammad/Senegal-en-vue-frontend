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
            placeholder="Rechercher des guides touristiques"
            class="input"
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
                class="col-12 col-md-3 mb-4"
                v-for="guide in guides"
                :key="guide.id"
              >
                <div class="card mb-4">
                  <img
                    :src="guide.image"
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
                      Langues parlées : {{ guide.langues }}
                    </p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button class="btn-subscribe">S'abonner</button>
                      <router-link
                        :to="'/guide/' + guide.id"
                        class="btn-more"
                      >
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
  
      <!-- Footer -->
      <FooterTouriste />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import HeaderTouriste from "../communs/HeaderTouriste.vue";
  import FooterTouriste from "../communs/FooterTouriste.vue";
  
  // Exemple de données statiques pour les guides
  const guides = ref([
    {
      id: 1,
      name: "Mouhammad Ndour",
      email: "ndourmouhammad15@gmail.com",
      image: "https://via.placeholder.com/150",
      note: 6.9,
      telephone: "78 103 35 01",
      langues: "Français, Anglais, Arabe",
    },
    {
      id: 2,
      name: "Mouhammad Ndour",
      email: "ndourmouhammad15@gmail.com",
      image: "https://via.placeholder.com/150",
      note: 7.5,
      telephone: "78 103 35 01",
      langues: "Français, Anglais, Arabe",
    },
    {
      id: 3,
      name: "Mouhammad Ndour",
      email: "ndourmouhammad15@gmail.com",
      image: "https://via.placeholder.com/150",
      note: 8.1,
      telephone: "78 103 35 01",
      langues: "Français, Anglais, Arabe",
    },
    {
      id: 4,
      name: "Mouhammad Ndour",
      email: "ndourmouhammad15@gmail.com",
      image: "https://via.placeholder.com/150",
      note: 8.9,
      telephone: "78 103 35 01",
      langues: "Français, Anglais, Arabe",
    },
  ]);
  </script>
  
  <style scoped>
  .container-fluid {
    width: 90%;
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
    overflow: hidden;
    background: var(--White, #FFF);
box-shadow: 0px 0px 21.692px 0px rgba(0, 0, 0, 0.10);
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
gap: 15px;
border: none;
  }
  
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card-body .info {
    display: flex;
width: 331.882px;
height: auto;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
color: #00214A;
font-family: "Nunito Sans";
font-size: 13px;
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
    width: 136.657px;
height: 142.08px;
flex-shrink: 0;
border-radius: 142.08px;
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
  
  @media (max-width: 768px) {
    .banniere {
      height: 20vh;
      background-color: #3498db;
    }
  
    .banniere h1 {
      font-size: 24px;
    }
  }
  </style>
  