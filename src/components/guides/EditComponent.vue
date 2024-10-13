<template>
  <div>
    <HeaderGuide />

    <!-- Contenu principal -->
    <div class="main container-fluid mt-5 d-flex">
      <img src="@/assets/form.svg" alt="Form Image" class="image" />
      <div class="form">
        <h1>Modifier une excursion</h1>
        <form @submit.prevent="submitForm" class="mt-5">
          <div class="row">
            <!-- Libelle and Tarif side by side -->
            <div class="col-md-6 mb-3">
              <label for="libelle">Libelle</label>
              <input
                v-model="excursion.libelle"
                type="text"
                class="form-control"
                id="libelle"
                name="libelle"
                placeholder="Entrez le libelle"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="tarif_entree">Tarif</label>
              <input
                v-model="excursion.tarif_entree"
                type="number"
                class="form-control"
                id="tarif_entree"
                name="tarif_entree"
                placeholder="Entrez le tarif"
              />
            </div>
          </div>

          <div class="row">
            <!-- Heure d'ouverture and Heure de fermeture side by side -->
            <div class="col-md-6 mb-3">
              <label for="ouverture">Date  de debut</label>
              <input
                v-model="excursion.date_debut"
                type="date"
                class="form-control"
                id="ouverture"
                name="ouverture"
                placeholder="Entrez l'heure d'ouverture"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="fermeture">Date de fin</label>
              <input
                v-model="excursion.date_fin"
                type="date"
                class="form-control"
                id="fermeture"
                name="fermeture"
                placeholder="Entrez l'heure de fermeture"
              />
            </div>
          </div>

          <!-- Région -->
          <div class="row">
            <div class="col-md-6 mb-3">
            <label for="site_id">Site</label>
            <select v-model="excursion.site_touristique_id" class="form-control" id="site_touristique_id">
              <option v-for="site in sites" :key="site.id" :value="site.id">
                {{ site.libelle }}
              </option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
              <label for="nombre_participants">Participants</label>
              <input
                v-model="excursion.nombre_participants"
                type="number"
                class="form-control"
                id="nombre_participants"
                name="nombre_participants"
                placeholder="Entrez le nombre de places disponibles"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label for="description">Description</label>
            <textarea
              v-model="excursion.description"
              class="form-control"
              id="description"
              name="description"
              placeholder="Entrez la description"
              rows="4"
            ></textarea>
          </div>

          <!-- Contenu -->
          <div class="mb-3">
            <label for="contenu">Contenu (Image ou Vidéo)</label>
            <input
              type="file"
              class="form-control"
              id="contenu"
              @change="handleFileUpload"
            />
            <p v-if="excursion.contenu" class="mt-2">Fichier existant :</p>

            <div v-if="excursion.contenu">
              <template v-if="isVideo(excursion.contenu)">
                <video
                  controls
                  :src="getMediaUrl(excursion.contenu)"
                  class="mt-2"
                  style="max-width: 50px; height: 50px"
                ></video>
              </template>
              <template v-else>
                <img
                  :src="getMediaUrl(excursion.contenu)"
                  alt="Image existante"
                  class="mt-2"
                  style="max-width: 50px; height: 50px"
                />
              </template>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary mb-5">Enregistrer</button>
        </form>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import HeaderGuide from "../communs/HeaderGuide.vue";
import siteService from "@/services/sites"; 
import excursionService from "@/services/excursions";
import { IMG_URL } from "@/config";

// Variables réactives
const excursion = ref({
  libelle: "",
  tarif_entree: "",
  date_debut: "",
  date_fin: "",
  site_touristique_id: "",
  description: "",
  nombre_participants: "",
  contenu: null,
});

const sites = ref([]);
const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter();
const excursionId = router.currentRoute.value.params.id;

// Récupérer les régions et les détails du site à l'initialisation du composant
onMounted(async () => {
  try {
    const data = await siteService.get();
    sites.value = data.data;

    // Charger les détails du site existant
    const excursionData = await excursionService.getExcursion(excursionId);
    excursion.value = excursionData.data; // Assurez-vous que votre API retourne bien les données dans ce format
  } catch (error) {
    errorMessage.value = "Erreur lors de la récupération des données.";
  }
});

// Gestion de l'upload du fichier
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    excursion.value.contenu = file; // Remplacez l'ancien contenu par le nouveau
    console.log("Fichier sélectionné :", excursion.value.contenu);
  } else {
    console.error("Aucun fichier sélectionné");
  }
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("libelle", excursion.value.libelle);
  formData.append("tarif_entree", excursion.value.tarif_entree);
  formData.append("date_debut", excursion.value.date_debut);
  formData.append("date_fin", excursion.value.date_fin);
  formData.append("site_touristique_id", excursion.value.site_touristique_id);
  formData.append("description", excursion.value.description);
  formData.append("nombre_participants", excursion.value.nombre_participants);

  // Vérifiez si un nouveau fichier a été sélectionné
  if (excursion.value.contenu instanceof File) {
    formData.append("contenu", excursion.value.contenu); // Nouveau fichier
  } else if (typeof excursion.value.contenu === "string") {
    // Si c'est une chaîne (ancien fichier), ne pas l'inclure dans FormData
    console.log(
      "Aucun nouveau fichier sélectionné, en gardant le fichier existant : ",
      excursion.value.contenu
    );
  } else {
    console.error("Aucun contenu sélectionné à envoyer");
  }

  try {
    const response = await excursionService.updateExcursion(excursionId, formData);
    console.log(response);
    successMessage.value = "Site modifié avec succès.";
    errorMessage.value = "";
    router.push("/sites-guide");
  } catch (error) {
    console.error("Erreur API :", error);
    errorMessage.value = error.response
      ? error.response.data.message
      : "Une erreur s'est produite.";
    successMessage.value = "";
  }
};

// Méthode pour construire l'URL du média (vidéo ou image)
const getMediaUrl = (contenu) => {
  if (typeof contenu === "string") {
    // Vérifiez si c'est une URL relative ou absolue
    if (contenu.startsWith("http") || contenu.startsWith("/")) {
      return contenu;
    } else {
      return `${IMG_URL}/${contenu}`; // IMG_URL doit être défini
    }
  } else if (contenu instanceof File) {
    // Si c'est un fichier, utilisez une URL blob pour l'afficher
    return URL.createObjectURL(contenu);
  }

  return ""; // Gérez le cas où contenu n'est ni une chaîne ni un fichier
};


// Méthode pour vérifier si le contenu est une vidéo
const isVideo = (contenu) => {
  if (typeof contenu === "string") {
    return (
      contenu.endsWith(".mp4") ||
      contenu.endsWith(".mov") ||
      contenu.endsWith(".avi")
    );
  } else if (contenu instanceof File) {
    // Vérifier le type MIME du fichier
    return contenu.type.startsWith("video/");
  }
  return false;
};
</script>

<style scoped>
.container-fluid {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.d-flex {
  gap: 90px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form h1 {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
}

label {
  color: var(--black, #051d30);
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

input,
textarea,
select {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--stroke_card, rgba(0, 0, 0, 0.1));
  background: var(--White, #fff);
}

textarea {
  height: auto;
}

.btn-primary {
  display: flex;
  width: 152px;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 25px;
  background: var(--couleur-primaire, #3498db);
  color: var(--White, #fff);
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  border: none;
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .form .inputs {
    flex-direction: column;
  }
  img {
    display: none;
  }
}
</style>
