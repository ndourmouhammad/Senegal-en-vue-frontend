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
          <h1>Nos événements</h1>
        </div>
      </div>

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
  <img :src="getImageUrl(evenement.image)" class="card-img-top" alt="Guide Image" />
  <!-- Replace category_id with the category name -->
  <span class="activity-badge">{{ getCategoryName(evenement.category_id) }}</span>
  <div class="card-body">
    <h5 class="card-title">{{ evenement.nom }}</h5> <!-- Adjusted from 'name' to 'nom' -->
    <p class="card-text">{{ evenement.description }}</p>
    <div class="d-flex justify-content-between">
      <button class="badge">{{ evenement.nombre_participant }} places</button>
      <router-link
        :to="'/evenement/' + evenement.id"
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

    <!-- Footer -->
    <FooterTouriste />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HeaderTouriste from "../communs/HeaderTouriste.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import evenementService from '@/services/evenements';
import categorieService from '@/services/categories';

// Reactive variables for events and categories
const evenements = ref([]);
const categories = ref([]);

// Fetch events
const evenementSites = async () => {
  try {
    const response = await evenementService.get();
    evenements.value = response.data; // Store the retrieved events
  } catch (error) {
    console.error('Erreur lors de la récupération des evenements:', error);
  }
};

// Fetch categories
const getCategories = async () => {
  try {
    const response = await categorieService.get();
    categories.value = response.data; // Store the retrieved categories
  } catch (error) {
    console.error('Erreur lors de la récupération des categories:', error);
  }
};

// Get category name by category_id
const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId);
  return category ? category.nom : "Unknown"; // Return the category name or 'Unknown' if not found
};

// Méthode pour construire l'URL de l'image
const getImageUrl = (contenu) => {
  return contenu.startsWith('http') ? contenu : `http://127.0.0.1:8000/storage/${contenu}`;
};

// Load events and categories when the component is mounted
onMounted(() => {
  evenementSites();
  getCategories();
});

</script>

<style scoped>
.container-fluid {
  width: 85%;
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
  .banniere {
    background-image: none; /* Cacher l'image */
    height: 20vh; /* Diminuer la hauteur */
    background-color: #3498db;
  }

  .banniere h1 {
    font-size: 24px; /* Réduire la taille du texte */
  }
}
</style>
