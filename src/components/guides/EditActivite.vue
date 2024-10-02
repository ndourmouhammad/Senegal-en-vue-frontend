<template>
    <div>
      <HeaderGuide />
  
      <!-- Contenu principal -->
      <div class="main container-fluid mt-5 d-flex">
        <img src="@/assets/form.svg" alt="Form Image" class="image" />
        <form @submit.prevent="submitForm" class="mt-5">
          <h1>Modifier une activite</h1>
          <!-- Libelle and Tarif side by side -->
          <div class="mb-3">
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

        <!-- Description -->
        <div class="mb-3">
          <label for="description">Description</label>
          <textarea
            v-model="site.description"
            class="form-control"
            id="description"
            name="description"
            placeholder="Entrez la description"
            rows="6"
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
                  style="max-width: 100px; height: 100px"
                ></video>
              </template>
              <template v-else>
                <img
                  :src="getMediaUrl(site.contenu)"
                  alt="Image existante"
                  class="mt-2"
                  style="max-width: 100px; height: 100px"
                />
              </template>
            </div>
          </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary mb-5">Enregistrer</button>
      </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router'; 
  import HeaderGuide from "../communs/HeaderGuide.vue";
  import activiteService from '@/services/activites'; // Importer votre service
  import { IMG_URL } from "@/config";
  
  // Variables réactives
  const site = ref({
    libelle: '',
    description: '',
    contenu: null,
  });
  
 
  const errorMessage = ref('');
  const successMessage = ref('');
  const router = useRouter(); 
  const ActiviteId = router.currentRoute.value.params.id;
  
  // Récupérer les régions et les détails du site à l'initialisation du composant
  onMounted(async () => {
    try {
      // Charger les détails du site existant
      const data = await activiteService.getActiviteDetails(ActiviteId);
      site.value = data.data; // Assurez-vous que votre API retourne bien les données dans ce format
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
    formData.append('libelle', site.value.libelle);
    formData.append('description', site.value.description);

    // Vérifiez si un nouveau fichier a été sélectionné
    if (site.value.contenu instanceof File) {
        formData.append('contenu', site.value.contenu); // Nouveau fichier
    } else if (typeof site.value.contenu === 'string') {
        // Si c'est une chaîne (ancien fichier), ne pas l'inclure dans FormData
        console.log("Aucun nouveau fichier sélectionné, en gardant le fichier existant : ", site.value.contenu);
    } else {
        console.error("Aucun contenu sélectionné à envoyer");
    }

    try {
        await activiteService.updateActivite(ActiviteId, formData);
        successMessage.value = "Activite modifié avec succès.";
        errorMessage.value = '';
        router.push('/activites');
    } catch (error) {
        console.error("Erreur API :", error);
        errorMessage.value = error.response ? error.response.data.message : "Une erreur s'est produite.";
        successMessage.value = '';
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
  background: var(--couleur-primaire, #3498DB);
  color: var(--White, #FFF);
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

  