<template>
  <div>
    <HeaderAdmin />

    <!-- Contenu principal -->
    <div class="main container-fluid mt-5 d-flex">
      <img src="@/assets/form.svg" alt="Form Image" class="image" />
      <div class="form">
        <h1>Modifier un evenement</h1>
        <form @submit.prevent="submitForm" class="mt-5">
          <div class="row">
            <!-- Libelle and Tarif side by side -->
            <div class="col-md-6 mb-3">
              <label for="nom">Nom</label>
              <input
                v-model="evenement.nom"
                type="text"
                class="form-control"
                id="nom"
                name="nom"
                placeholder="Entrez le nom"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="prix">Prix</label>
              <input
                v-model="evenement.prix"
                type="text"
                class="form-control"
                id="prix"
                name="prix"
                placeholder="Entrez le tarif"
              />
            </div>
          </div>

          <div class="row">
            <!-- Heure d'ouverture and Heure de fermeture side by side -->
            <div class="col-md-6 mb-3">
              <label for="date_debut">Date de debut</label>
              <input
                v-model="evenement.date_debut"
                type="date"
                class="form-control"
                id="date_debut"
                name="date_debut"
                placeholder="Entrez la date de debut"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="date_fin">Date de fin</label>
              <input
                v-model="evenement.date_fin"
                type="date"
                class="form-control"
                id="date_fin"
                name="date_fin"
                placeholder="Entrez la date de fin"
              />
            </div>
          </div>

          <div class="row">
            <!-- Région -->
            <div class="col-md-6 mb-3">
              <label for="region_id">Lieu</label>
              <select
                v-model="evenement.site_touristique_id"
                class="form-control"
                id="region_id"
              >
                <option v-for="site in sites" :key="site.id" :value="site.id">
                  {{ site.libelle }}
                </option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label for="nombre_participant">Nombre de participants</label>
              <input
                v-model="evenement.nombre_participant"
                type="text"
                class="form-control"
                id="nombre_participant"
                name="nombre_participant"
                placeholder="Le nombre des participants"
              />
            </div>
          </div>

          <!-- Categorie -->
          <div class="mb-3">
            <label for="category_id">Categorie</label>
            <select
              v-model="evenement.category_id"
              class="form-control"
              id="category_id"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.nom }}
              </option>
            </select>
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label for="description">Description</label>
            <textarea
              v-model="evenement.description"
              class="form-control"
              id="description"
              name="description"
              placeholder="Entrez la description"
              rows="4"
            ></textarea>
          </div>

          <!-- Contenu -->
          <div class="mb-3">
            <label for="image">Image</label>
            <input
              type="file"
              class="form-control"
              id="image"
              @change="handleFileUpload"
            />
           

            <div v-if="evenement.image">
              <template v-if="isVideo(evenement.image)">
                <video
                  controls
                  :src="getMediaUrl(evenement.image)"
                  class="mt-2"
                  style="max-width: 50px; height: 50px"
                ></video>
              </template>
              <template v-else>
                <img
                  :src="getMediaUrl(evenement.image)"
                  alt="Image existante"
                  class="mt-2"
                  style="max-width: 50px; height: 50px"
                />
              </template>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary mb-5">
            Enregistrer
          </button>
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
import HeaderAdmin from "../communs/HeaderAdmin.vue";
import siteService from "@/services/sites"; // Importer votre service
import { useRouter } from "vue-router"; // Importer useRouter
import categorieService from "@/services/categories";
import evenementService from "@/services/evenements";
import { IMG_URL } from "@/config";

// Variables réactives
const evenement = ref({
  nom: "",
  nombre_participant: "",
  date_debut: "",
  date_fin: "",
  prix: "",
  category_id: "",
  site_touristique_id: "",
  description: "",
  contenu: null, // updated key for image
});

const sites = ref([]);
const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter();
const categories = ref([]);
const evenementId = router.currentRoute.value.params.id;

// Récupérer les sites et catégories à l'initialisation du composant
onMounted(async () => {
  try {
    const data = await siteService.get();
    sites.value = data.data;
    const response = await categorieService.get();
    categories.value = response.data;

    const evenementData = await evenementService.getEvenementDetails(
      evenementId
    );
    evenement.value = evenementData.data;
  } catch (error) {
    errorMessage.value = "Erreur lors de la récupération des données.";
  }
});

// Gestion de l'upload du fichier
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    evenement.value.image = file;
  } else {
    console.error("Aucun fichier sélectionné");
  }
};


// Soumission du formulaire
const submitForm = async () => {
  const formData = new FormData();
  formData.append("nom", evenement.value.nom);
  formData.append("prix", evenement.value.prix);
  formData.append("date_debut", evenement.value.date_debut);
  formData.append("date_fin", evenement.value.date_fin);
  formData.append("site_touristique_id", evenement.value.site_touristique_id);
  formData.append("nombre_participant", evenement.value.nombre_participant);
  formData.append("category_id", evenement.value.category_id);
  formData.append("description", evenement.value.description);

  if (evenement.value.image instanceof File) {
    formData.append("image", evenement.value.image); // Nouveau fichier
  } else if (typeof evenement.value.image === "string") {
    // Si c'est une chaîne (ancien fichier), ne pas l'inclure dans FormData
    console.log(
      "Aucun nouveau fichier sélectionné, en gardant le fichier existant : ",
      evenement.value.image
    );
  } else {
    console.error("Aucun image sélectionné à envoyer");
  }

  try {
    await evenementService.updateEvenement(evenementId, formData);
    successMessage.value = "evenement modifié avec succès.";
    errorMessage.value = "";
    router.push("/evenements-admin");
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
  return contenu.startsWith("http")
    ? contenu
    : `${IMG_URL}/${contenu}`;
};

// Méthode pour vérifier si le contenu est une vidéo
const isVideo = (contenu) => {
  return (
    contenu.endsWith(".mp4") ||
    contenu.endsWith(".mov") ||
    contenu.endsWith(".avi")
  );
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

.form .inputs {
  display: flex;
  gap: 45px;
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
textarea {
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
  color: var(--White, var(--White, #fff));
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
