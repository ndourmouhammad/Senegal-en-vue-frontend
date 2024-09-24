<template>
  <div>
    <header-guide />
    <!-- Contenu principal -->
    <div class="container-fluid mt-4">
      <div class="row mt-4">
        <!-- Sidebar pour filtrer -->
        <div class="col-md-3">
          <div class="filter-sidebar">
            <h5>Filtrer par région</h5>
            <form>
              <div class="form-group">
                <label for="activity_area">Sélectionner une région</label>
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

          <router-link to="/form" style="text-decoration: none">
            <button class="btn-ajouter mt-3 mb-3">Ajouter</button>
          </router-link>
        </div>

        <!-- Carte des événements -->
        <div class="col-md-9">
          <div class="row">
            <!-- Exemples d'événements -->
            <div
              class="col-md-4 mb-4"
              v-for="site in filteredSites"
              :key="site.id"
            >
              <div class="card mb-4 h-100">
                <video
                  v-if="isVideo(site.contenu)"
                  :src="getMediaUrl(site.contenu)"
                  class="card-img-top"
                  controls
                ></video>
                <img
                  v-else
                  :src="getMediaUrl(site.contenu)"
                  class="card-img-top"
                  :alt="site.libelle"
                />

                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">{{ site.libelle }}</h5>
                  <p class="card-text">{{ site.description }}</p>
                  <div class="d-flex justify-content-between">
                    <router-link
                      :to="'/sites-guide/' + site.id"
                      class="btn-success nav-link mt-auto"
                    >
                      Voir
                    </router-link>
                    <button
                      class="btn-success btn-supprimer"
                      @click="deleteSite(site.id)"
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
    </div>
  </div>
</template>

<script setup>
import HeaderGuide from "../communs/HeaderGuide.vue";
import { ref, onMounted } from "vue";
import siteService from "@/services/sites";
import { useRouter } from "vue-router";

const sites = ref([]);
const filteredSites = ref([]);
const loading = ref(true);
const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter();

// Récupérer l'ID de l'utilisateur connecté
const getCurrentUserId = () => {
  return localStorage.getItem("userId"); // Récupérer directement l'ID
};

const fetchUserSites = async () => {
  try {
    const data = await siteService.get(); // Récupérer tous les sites
    console.log(data); // Afficher la réponse complète

    sites.value = data.data; // Assurez-vous que cela correspond à la structure de votre réponse

    const userId = getCurrentUserId(); // Récupérer l'ID de l'utilisateur connecté
    console.log("User ID:", userId); // Afficher l'ID de l'utilisateur

    // Afficher tous les user_id des sites récupérés
    sites.value.forEach((site) => {
      console.log("Site User ID:", site.user_id); // Afficher chaque user_id
    });

    filteredSites.value = sites.value.filter(
      (site) => site.user_id === parseInt(userId)
    ); // Filtrer les sites
  } catch (error) {
    console.error("Erreur lors de la récupération des sites:", error);
  } finally {
    loading.value = false; // Fin du chargement
  }
};

// Méthode pour construire l'URL du média (vidéo ou image)
const getMediaUrl = (contenu) => {
  return contenu.startsWith("http")
    ? contenu
    : `http://127.0.0.1:8000/storage/${contenu}`;
};

// Méthode pour vérifier si le contenu est une vidéo
const isVideo = (contenu) => {
  return (
    contenu.endsWith(".mp4") ||
    contenu.endsWith(".mov") ||
    contenu.endsWith(".avi")
  );
};
const deleteSite = async (siteId) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce site ?")) {
    try {
      await siteService.deleteSite(siteId); // Appel à votre service de suppression
      successMessage.value = "Site supprimé avec succès.";
      errorMessage.value = "";

      // Retirer le site de filteredSites
      filteredSites.value = filteredSites.value.filter(
        (site) => site.id !== siteId
      );

      // Optionnel : si vous souhaitez rediriger après la suppression
      // router.push('/sites-guide'); // Ajustez selon vos besoins
    } catch (error) {
      console.error("Erreur lors de la suppression du site :", error);
      errorMessage.value = error.response
        ? error.response.data.message
        : "Une erreur s'est produite.";
      successMessage.value = "";
    }
  }
};

onMounted(fetchUserSites);
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
.btn-ajouter {
  display: flex;
  width: 148.013px;
  padding: 10px 0px;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  background: #3498db;
  color: var(--White, var(--White, #fff));

  /* Choix */
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  border: none;
  display: flex;
  justify-content: center;
}

.filter-sidebar label {
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-title {
  color: #27ae60;
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
  width: 100px;
  height: 40.392px;
  flex-shrink: 0;
  border-radius: 22.95px;
  background: #27ae60;
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 14.688px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-supprimer {
  background: red;
  border: none;
}
@media (max-width: 768px) {
  .filter-sidebar {
    margin-bottom: 20px;
  }
}
</style>
