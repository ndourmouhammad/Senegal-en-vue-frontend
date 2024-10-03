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
          placeholder="Rechercher par langue"
          class="input"
          v-model="searchQuery"
          @input="filterGuides"
        />
      </div>

      <div class="titre">
        <h2>Explorez notre collection complète de guides incontournables</h2>
      </div>

      <!-- Grid of Guide Cards -->
      <div class="row mt-4">
        <div class="col-md-12">
          <div class="row">
            <div
              class="col-12 col-md-4 mb-4"
              v-for="guide in paginatedGuides"
              :key="guide.id"
            >
              <div class="box">
                <div class="box-top">
                  <img
                    :src="getImageUrl(guide.photo_profil)"
                    class="box-image"
                    alt="Guide Image"
                    @error="onImageError"
                  />
                  <div class="title-flex">
                    <h3 class="box-title">{{ guide.name }}</h3>
                    <p class="user-follow-info">{{ guide.email }}</p>
                  </div>
                  <p class="description">Note : {{ guide.note }} / 10</p>
                  <p class="description">Téléphone : {{ guide.telephone }}</p>
                  <p class="description">Langues : {{ guide.langues }}</p>
                </div>
                <router-link :to="'/guide/' + guide.id" class="button">
                  Voir plus
                </router-link>
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
import { ref, onMounted, computed } from "vue";
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import guideService from '@/services/guides';
import { IMG_URL } from "@/config";

const guides = ref([]);
const paginatedGuides = ref([]);
const currentPage = ref(1);
const perPage = 6;
const totalPages = ref(0);
const searchQuery = ref("");

const guideSites = async () => {
  try {
    const response = await guideService.get();
    guides.value = response.data;
    paginateGuides();
  } catch (error) {
    console.error('Erreur lors de la récupération des guides:', error);
  }
};

const filteredGuides = computed(() => {
  if (searchQuery.value === "") {
    return guides.value;
  } else {
    return guides.value.filter(guide =>
      guide.langues.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
});

const paginateGuides = () => {
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  paginatedGuides.value = filteredGuides.value.slice(startIndex, endIndex);
  totalPages.value = Math.ceil(filteredGuides.value.length / perPage);
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    paginateGuides();
  }
};

const filterGuides = () => {
  currentPage.value = 1;
  paginateGuides();
};

const getImageUrl = (contenu) => {
  return contenu.startsWith('http') ? contenu : `${IMG_URL}/${contenu}`;
};

// Fallback image if an error occurs
const onImageError = (event) => {
  event.target.src = "@/assets/fallback-image.png"; // Replace with a fallback image path
};

onMounted(guideSites);
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
  /* overflow: hidden; */
  background: var(--White, #fff);
  box-shadow: 0px 0px 21.692px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border: none;
  width: 80%;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-body .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #00214a;
  font-family: "Nunito Sans";
  font-size: 16px;
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
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    
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

@media (max-width: 768px) {
  .banniere {
    height: 20vh;
    background-color: #3498db;
  }

  .banniere h1 {
    font-size: 24px;
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
  .card {
    width:100%;
  }
  .card-body {
    width: 100%;
    height: auto;
  }
  .card img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    
  }
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

:root {
  --purple: hsl(240, 80%, 89%);
  --pink: hsl(0, 59%, 94%);
  --light-bg: hsl(204, 37%, 92%);
  --light-gray-bg: hsl(0, 0%, 94%);
  --white: hsl(0, 0%, 100%);
  --dark: hsl(0, 0%, 7%);
  --text-gray: hsl(0, 0%, 30%);
}

body {
  background: var(--light-bg);
  font-family: "Space Grotesk", sans-serif;
  color: var(--dark);
}

h3 {
  font-size: 1.5em;
  font-weight: 700;
}

p {
  font-size: 1em;
  line-height: 1.7;
  font-weight: 300;
  color: var(--text-gray);
}

.description {
  white-space: wrap;
}

a {
  text-decoration: none;
  color: inherit;
}

.wrap {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  gap: 24px;
  padding: 24px;
  flex-wrap: wrap;
}

.box {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  position: relative;
  padding: 24px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  flex: 1;
  gap: 10px;
 
}

.box-top {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 12px;
  margin-bottom: 36px;
}

.box-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: 40% 40%;
}

.title-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-title {
  border-left: 3px solid var(--purple);
  padding-left: 12px;
}

.user-follow-info {
  color: hsl(0, 0%, 60%);
}

.button {
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: auto;
  padding: 16px;
  color: #fff;
  background: #3498db;

  transition: background 0.4s ease;
  border-radius: 25px;
}



.fill-one {
  background: var(--light-bg);
}

.fill-two {
  background: var(--pink);
}

/* RESPONSIVE QUERIES */

@media (min-width: 320px) {
  .title-flex {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
  }
  .user-follow-info {
    margin-top: 6px;
  }
}

@media (min-width: 460px) {
  .title-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
  }
  .user-follow-info {
    margin-top: 6px;
  }
}

@media (min-width: 640px) {
  .box {
    flex-basis: calc(50% - 12px);
  }
  .title-flex {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
  }
  .user-follow-info {
    margin-top: 6px;
  }
}

@media (min-width: 840px) {
  .title-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
  }
  .user-follow-info {
    margin-top: 6px;
  }
}

@media (min-width: 1024px) {
  .box {
    flex-basis: calc(33.3% - 16px);
  }
  .title-flex {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
  }
  .user-follow-info {
    margin-top: 6px;
  }
}

@media (min-width: 1100px) {
  .box {
    flex-basis: calc(25% - 18px);
  }
}

</style>
