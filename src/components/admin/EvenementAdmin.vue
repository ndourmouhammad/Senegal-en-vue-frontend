<template>
    <div>
      <!-- Appel du composant Header -->
      <HeaderAdmin />
  
      <!-- Contenu principal -->
      <div class="container-fluid mt-1">
        
  
        <div class="row mt-4">
          <!-- Sidebar pour filtrer -->
          <div class="col-md-3">
            <div class="filter-sidebar">
              <h5>Filtrer par activité</h5>
              <form>
                <div class="form-group">
                  <label for="activity_area">Sélectionner une activité</label>
                  <select
                    class="form-control"
                    id="activity_area"
                    name="activity_area"
                  >
                    <option value="activite1">Activité 1</option>
                    <option value="activite2">Activité 2</option>
                    <option value="activite3">Activité 3</option>
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
            <router-link to="/form-evenement" style="text-decoration: none;">
              <button class="btn-ajouter mt-3 mb-3">Ajouter</button>
            </router-link>
          </div>
  
          <!-- Carte des événements -->
          <div class="col-md-9">
            <div class="row">
              <!-- Exemples d'événements -->
              <div
                class="col-md-4 mb-4"
                v-for="evenement in evenements"
                :key="evenement.id"
              >
                <div class="card mb-4">
                  <img
                    :src="evenement.image"
                    class="card-img-top"
                    alt="Event Image"
                  />
                  <span class="activity-badge">{{ evenement.activity }}</span>
                  <div class="card-body">
                    <h5 class="card-title">{{ evenement.name }}</h5>
                    <p class="card-text">{{ evenement.description }}</p>
                    <div class="d-flex justify-content-between">
                      <button class="badge">{{ evenement.places }} places</button>
                      <router-link
                        :to="'/evenement-admin/' + evenement.id"
                        class="badge nav-link"
                      >
                        Voir Détails
                      </router-link>
                    </div>
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
 
  
  // Exemple de données statiques pour les événements
  const evenements = ref([
    {
      id: 1,
      name: "Événement 1",
      description: "Description de l’événement 1",
      places: 50,
      image: "https://via.placeholder.com/150",
      activity: "Activité 1",
    },
    {
      id: 2,
      name: "Événement 2",
      description:
        "ParagrapheParagrapheParagrapheParagrapheParagrapheParagrapheParagrapheParagrapheParagrapheParagrapheParagrapheParagraphe",
      places: 30,
      image: "https://via.placeholder.com/150",
      activity: "Activité 2",
    },
    {
      id: 3,
      name: "Événement 3",
      description: "Description de l’événement 3",
      places: 20,
      image: "https://via.placeholder.com/150",
      activity: "Activité 3",
    },
  ]);
  </script>
  
  <style scoped>
  .container-fluid {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
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
  .btn-ajouter {
    display: flex;
width: 148.013px;
padding: 10px 0px;
justify-content: space-between;
align-items: center;
border-radius: 25px;
background: #3498DB;
color: var(--White, var(--White, #FFF));

/* Choix */
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
border:none;
display: flex;
justify-content: center;

  }
  
  .card {
    height: 100%;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 400px; /* Hauteur minimale pour uniformiser les cartes */
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
  
  .card-title {
    color: #051d30;
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 700;
  }
  
  .card-text {
    color: #051d30;
    font-family: "Nunito Sans";
    font-size: 12px;
    flex-grow: 1;
  }
  
  .activity-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    padding: 5px 10px;
    background: #3498db;
    border-radius: 4px;
  }
  
  .badge {
    display: flex;
    padding: 5px 13px;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background: rgba(39, 174, 96, 0.1);
    color: #6e6666;
    font-family: Montserrat;
    font-size: 8px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
  }
  .d-flex router-link {
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    
  }
  </style>
  