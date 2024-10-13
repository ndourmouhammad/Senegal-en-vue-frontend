<template>
    <div>
      <HeaderAdmin />
  
      <!-- Contenu principal -->
      <div class="main container-fluid mt-5 d-flex">
        <img src="@/assets/form.svg" alt="Form Image" class="image" />
        <div class="form">
          <h1>Modifier un site</h1>
          <form @submit.prevent="submitForm" class="mt-5">
            <div class="row">
              <!-- Libelle and Tarif side by side -->
              <div class="col-md-6 mb-3">
                <label for="libelle">Libelle</label>
                <input
                  v-model="site.libelle"
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
                  v-model="site.tarif_entree"
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
                <label for="ouverture">Heure d'ouverture</label>
                <input
                  v-model="site.heure_ouverture"
                  type="time"
                  class="form-control"
                  id="ouverture"
                  name="ouverture"
                  placeholder="Entrez l'heure d'ouverture"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="fermeture">Heure de fermeture</label>
                <input
                  v-model="site.heure_fermeture"
                  type="time"
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
              <label for="region_id">Région</label>
              <select v-model="site.region_id" class="form-control" id="region_id">
                <option v-for="region in regions" :key="region.id" :value="region.id">
                  {{ region.libelle }}
                </option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
                <label for="places_disponible">Participants</label>
                <input
                  v-model="site.places_disponible"
                  type="number"
                  class="form-control"
                  id="places_disponible"
                  name="places_disponible"
                  placeholder="Entrez le nombre de places disponibles"
                />
              </div>
            </div>
  
            <!-- Description -->
            <div class="mb-3">
              <label for="description">Description</label>
              <textarea
                v-model="site.description"
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
              <p v-if="site.contenu" class="mt-2">Fichier existant :</p>
  
              <div v-if="site.contenu">
                <template v-if="isVideo(site.contenu)">
                  <video
                    controls
                    :src="getMediaUrl(site.contenu)"
                    class="mt-2"
                    style="max-width: 50px; height: 50px"
                  ></video>
                </template>
                <template v-else>
                  <img
                    :src="getMediaUrl(site.contenu)"
                    alt="Image existante"
                    class="mt-2"
                    style="max-width: 50px; height: 50px"
                  />
                </template>
              </div>
            </div>
  
            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary mb-5">Modifier</button>
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
  import { IMG_URL } from "@/config";
import HeaderAdmin from "../communs/HeaderAdmin.vue";
import siteService from "@/services/sites";
  
  // Variables réactives
  const site = ref({
    libelle: "",
    tarif_entree: "",
    heure_ouverture: "",
    heure_fermeture: "",
    region_id: "",
    description: "",
    places_disponible: "",
    contenu: null,
  });
  
  const regions = ref([]);
  const errorMessage = ref("");
  const successMessage = ref("");
  const router = useRouter();
  const siteId = router.currentRoute.value.params.id;
  
  // Récupérer les régions et les détails du site à l'initialisation du composant
  onMounted(async () => {
    try {
      const data = await siteService.getRegions();
      regions.value = data.data;
  
      // Charger les détails du site existant
      const siteData = await siteService.getSiteDetails(siteId);
      site.value = siteData.data; // Assurez-vous que votre API retourne bien les données dans ce format
    } catch (error) {
      errorMessage.value = "Erreur lors de la récupération des données.";
    }
  });
  
  // Gestion de l'upload du fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      site.value.contenu = file; // Remplacez l'ancien contenu par le nouveau
      console.log("Fichier sélectionné :", site.value.contenu);
    } else {
      console.error("Aucun fichier sélectionné");
    }
  };
  
  const submitForm = async () => {
    const formData = new FormData();
    formData.append("libelle", site.value.libelle);
    formData.append("tarif_entree", site.value.tarif_entree);
    formData.append("heure_ouverture", site.value.heure_ouverture);
    formData.append("heure_fermeture", site.value.heure_fermeture);
    formData.append("region_id", site.value.region_id);
    formData.append("description", site.value.description);
    formData.append("places_disponible", site.value.places_disponible);
  
    // Vérifiez si un nouveau fichier a été sélectionné
    if (site.value.contenu instanceof File) {
      formData.append("contenu", site.value.contenu); // Nouveau fichier
    } else if (typeof site.value.contenu === "string") {
      // Si c'est une chaîne (ancien fichier), ne pas l'inclure dans FormData
      console.log(
        "Aucun nouveau fichier sélectionné, en gardant le fichier existant : ",
        site.value.contenu
      );
    } else {
      console.error("Aucun contenu sélectionné à envoyer");
    }
  
    try {
      await siteService.updateSite(siteId, formData);
      successMessage.value = "Site modifié avec succès.";
      errorMessage.value = "";
      router.push("/sites-admin");
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
  