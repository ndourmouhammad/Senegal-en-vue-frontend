<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderTouriste />

    <!-- Contenu principal -->
    <div class="container-fluid mt-4">
      <div class="banniere">
        <!-- <img
              src="@/assets/evenement-bg.png"
              alt="Banner Image"
            /> -->
        <div>
          <h1>Sites touristiques</h1>
        </div>
      </div>

      <div class="row mt-4">
        <!-- Sidebar pour filtrer -->
        <div class="col-md-3">
          <div class="filter-sidebar">
            <h5>Filtrer par région</h5>
            <form>
              <div class="form-group">
                <label for="activity_area">Selectionner une région</label>
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
        </div>

        <!-- Carte des événements -->
        <div class="col-md-9">
          <div class="row">
            <!-- Exemples d'événements -->
            <div class="col-md-4 mb-4" v-for="site in sites" :key="site.id">
              <div class="card mb-4">
                <img :src="site.image" class="card-img-top" alt="Event Image" />

                <div class="card-body">
                  <h5 class="card-title">{{ site.name }}</h5>
                  <p class="card-text">{{ site.description }}</p>
                  <!-- <a href="#" class="btn btn-success">Voir plus</a> -->
                  <router-link
                      :to="'/site/' + site.id"
                      class="btn-success nav-link"
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

    <!-- Footer -->
    <FooterTouriste />
  </div>
</template>

<script setup>
import { ref } from "vue";
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";

// Exemple de données statiques pour les événements
const sites = ref([
  {
    id: 1,
    name: "Dakar",
    description:
      "Dakar est la capitale du Sénégal, est une ville dynamique située sur la côte atlantique. Elle est connue pour son riche patrimoine culturel, ses ...",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Île de Gorée",
    description:
      "L’île de Gorée, situé au large de Dakar au Sénégal, est célèbre pour son histoire liée à la traite des esclaves. Ce site classé patrimoine mondiale de ...",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Joal Fadiouth",
    description:
      "Joal Fadiouth est une commune du Sénégal située à l’extrémité de la petite-côte, au sud-est de Dakar. Elle réunit en réalité deux villages.",
    image: "https://via.placeholder.com/150",
  },
]);
</script>

<style scoped>
.container-fluid {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.banniere {
  background-image: url("@/assets/evenement-bg.png"); /* Insert the path to your image */
  background-size: cover; /* Ensures the image covers the entire section */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
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
  font-style: normal;
  font-weight: 800;
  line-height: normal;
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

.card {
    width:100%
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
    color: #27AE60;
font-family: Montserrat;
font-size: 22.032px;
font-style: normal;
font-weight: 700;
line-height: 120%; /* 26.439px */
letter-spacing: 0.11px;
}

.card-text {
    color: #000;
font-family: "Nunito Sans";
font-size: 11.016px;
font-style: normal;
font-weight: 400;
line-height: normal;
  flex-grow: 1;
}
.btn-success {
    width: 139.537px;
height: 40.392px;
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
}

@media (max-width: 768px) {
  .banniere {
    background-image: none; /* Cacher l'image */
    height: 20vh; /* Diminuer la hauteur */
    background-color: #3498db;
  }

  .banniere h1 {
    font-size: 24px; /* Réduire la taille du texte */
  }
  .filter-sidebar {
    margin-bottom: 20px;
  }
}
</style>
