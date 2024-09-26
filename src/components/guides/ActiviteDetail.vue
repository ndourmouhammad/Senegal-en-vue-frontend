<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderGuide />
    <div class="container-fluid mt-1">
      <h1 class="titre">Détail de la page du site touristique</h1>
      <!-- Carte de l'événement -->
      <div class="card mb-3 card-no-border mt-4" style="border-radius: 30px">
        <div class="banniere" v-if="activiteDetails">
          <video
            v-if="isVideo(activiteDetails?.contenu)"
            :src="getMediaUrl(activiteDetails?.contenu)"
            controls
          ></video>
          <img
            v-else
            :src="getMediaUrl(activiteDetails?.contenu)"
            :alt="activiteDetails?.libelle"
          />
        </div>
        <div v-else>
          <p>Chargement des informations du guide...</p>
        </div>
      </div>

      <div class="flex">
        <div class="sites-detail">
          <div class="body_detail mt-4">
            <div class="card-body">
              <h1>{{ activiteDetails?.libelle }}</h1>
              <p>{{ activiteDetails?.description }}</p>
            </div>
          </div>
          <button class="btn btn-primary mb-5" @click="redirectToEdit">Modifier</button>
        </div>
      </div>

      <!-- Nouvelle section pour lier une activité à un site -->
      <div class="link-site mt-5">
        <h2>Lier une activité à un site touristique</h2>
        <div>
          <label for="site-select">Sélectionnez un site :</label>
          <select id="site-select" v-model="selectedSite">
            <option v-for="site in sitesList" :key="site.id" :value="site.id">
              {{ site.libelle }}
            </option>
          </select>
        </div>
        <button class="btn btn-success mt-3" @click="linkActiviteToSite">Lier à ce site</button>
      </div>
    </div>
    <div class="mt-5">
      <footer-touriste />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderGuide from "../communs/HeaderGuide.vue";
import FooterTouriste from "../communs/FooterTouriste.vue";
import activiteService from "@/services/activites";
import siteService from "@/services/sites";

// Simulate fetching event details based on the event ID
const route = useRoute();
const router = useRouter();
const activiteId = route.params.id;
const sitesList = ref([]);
const selectedSite = ref(null);
const activiteDetails = ref(null);

const fetchActivites = async (activiteId) => {
  try {
    // Fetch activite details
    const activite = await activiteService.getActiviteDetails(activiteId);
    console.log("activite Details:", activite);
    activiteDetails.value = activite.data

    const data = await siteService.get(); // Récupérer tous les sites
    console.log(data); // Afficher la réponse complète
    sitesList.value = data.data; // Assurez-vous que cela correspond à la structure de votre réponse

  } catch (error) {
    console.error("Error fetching activite data:", error);
  }
};

// Fonction pour lier une activité à un site
const linkActiviteToSite = async () => {
  if (selectedSite.value) {
    try {
      await activiteService.lierActiviteASite(activiteId, selectedSite.value);
      alert("Activité liée au site avec succès !");
    } catch (error) {
      console.error("Erreur :", error);
      alert("Une erreur est survenue lors de la liaison de l'activité.");
    }
  } else {
    alert("Veuillez sélectionner un site.");
  }
};




const redirectToEdit = () => {
  // Remplacez `edit` par le nom de votre route ou le chemin si vous ne l'avez pas nommée
  router.push({ name: 'edit-activite', params: { id: activiteId } });
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

// On component mount, fetch the event details
onMounted(() => {
  fetchActivites(activiteId);
});
</script>

<style scoped>
h1 {
  color: #000;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.container-fluid {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.banniere img,
.banniere video {
  border-radius: 30px;
  width: 100%;
  height: 40vh;
  object-fit: cover;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.guide {
  width: 600px;
  height: 308px;
  padding: 21px 14px 24px 24px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 25px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--White, #fff);
  display: flex;
  gap: 25px;
}

.guide-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  width: 253px;
  height: 139px;
}

.guide-info .metier {
  display: flex;
  height: 25px;
  padding: 10px 18px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #f0f0f0;
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 8px;
  font-weight: 500;
  line-height: normal;
}

.guide-info .nom {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.guide-info .detail {
  width: 253px;
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.guide-info .email {
  display: flex;
  width: 170px;
  padding: 5px 13px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background: rgba(255, 130, 0, 0.1);
}

.guide-info .email a {
  text-decoration: none;
  color: #6e6666;
  font-family: Montserrat;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.guide img {
  width: 275px;
  height: 263px;
}

.destinations {
  margin-top: 120px;
}

.destinations h2 {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.destinations .card-title {
  color: #27ae60;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 28.8px */
  letter-spacing: 0.12px;
}

.destinations .card-text {
  color: #000;
  font-family: "Nunito Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.btn-success {
  width: 152px;
  flex-shrink: 0;
  border-radius: 25px;
  background: #27ae60;
  border: none;
  color: #f8f9fa;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  padding: 10px;
  margin-top: auto;
}

.card {
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1; /* Permet à la carte de s'étendre pour remplir l'espace */
}

.card-img-top {
  max-height: 300px; /* Ajustez cette valeur selon vos besoins */
  object-fit: cover; /* Pour maintenir le ratio de l'image */
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-body h1 {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
}

.card-body p {
  width: 602px;
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
}

.info-item {
  color: var(--black, #051d30);
  font-family: "Nunito Sans";
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 30px;
  margin-left: 45px;
}

.btn-primary {
  display: flex;
  width: 152px;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: #3498db;
  color: var(--White, #fff);
  font-family: "Nunito Sans";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.participants-table {
  margin-top: 20px;
  padding: 20px;
}

.participants-table .table {
  width: 100%;
  border-collapse: collapse;
  padding: 20px;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-actions img {
  width: 20px;
  cursor: pointer;
}

.table-actions span {
  font-family: Montserrat;
  font-size: 14px;
}

.voir-tous a {
  font-family: Montserrat;
  font-size: 14px;
  color: #3498db;
  text-decoration: none;
}

.voir-tous a:hover {
  text-decoration: underline;
}

@media (max-width: 767px) {
  .card-body {
    padding: 15px;
  }

  .card-body p {
    width: 100%;
    font-family: "Nunito Sans", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    word-wrap: break-word;
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 0;
    word-wrap: break-word;
  }

  .info-item img {
    margin-right: 10px;
  }

  .reservation-button {
    margin-top: 20px;
  }
  .flex {
    flex-direction: column;
  }
  .guide {
    width: 360px;
    height: 200px;
    display: inline-flex;
    padding: 21px 14px 24px 24px;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 25px;
  }

  .guide-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    width: 150px;
    height: 139px;
  }

  .guide-info .metier {
    display: flex;
    height: 20px;
    padding: 5px 13px;
    align-items: center;
    gap: 10px;
  }

  .guide-info .nom {
    color: var(--black, #051d30);

    /* Sous-titre */
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .guide-info .detail {
    color: var(--black, #051d30);
    font-family: "Nunito Sans";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 160px;
  }

  .guide-info .email {
    display: flex;
    width: 127px;
    padding: 5px 13px;
    justify-content: space-between;
    align-items: center;
  }

  .guide-info .email a {
    text-decoration: none;
    color: #6e6666;
    font-family: Montserrat;
    font-size: 7px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .guide img {
    width: 151px;
    height: 149px;
    object-fit: cover;
  }
}

@media (min-width: 768px) {
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card-body p {
    width: 100%;
    max-width: 600px;
    font-family: "Nunito Sans", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    word-wrap: break-word;
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-left: 20px;
    word-wrap: break-word;
  }

  .info-item img {
    margin-right: 10px;
  }

  .reservation-button {
    margin-top: 30px;
  }
  .card-body h1 {
    color: var(--black, #051d30);

    /* Titre */
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
