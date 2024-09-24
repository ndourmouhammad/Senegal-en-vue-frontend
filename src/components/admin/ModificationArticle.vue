<template>
  <div>
    <HeaderAdmin />

    <!-- Contenu principal -->
    <div class="main container-fluid mt-5 d-flex">
      <img src="@/assets/form.svg" alt="Form Image" class="image" />
      <div class="form">
        <h1>Modifier l'article</h1>
        <form @submit.prevent="submitForm" class="mt-5">
          <div class="row">
            <!-- Libelle and Tarif side by side -->
            <div class="mb-3">
              <label for="titre">Titre</label>
              <input
                v-model="article.titre"
                type="text"
                class="form-control"
                id="titre"
                name="titre"
                placeholder="Entrez le titre"
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="date_publication">Date de publication</label>
            <input
              v-model="article.date_publication"
              type="date"
              class="form-control"
              id="date_publication"
              name="date_publication"
              placeholder="Entrez la date de publication"
            />
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label for="contenu">Contenu</label>
            <textarea
              v-model="article.contenu"
              class="form-control"
              id="contenu"
              name="contenu"
              placeholder="Entrez le contenu"
              rows="6"
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="image">Image</label>
            <input
              type="file"
              class="form-control"
              id="image"
              @change="handleFileUpload"
            />

            <div v-if="article.image">
              <template v-if="isVideo(article.image)">
                <video
                  controls
                  :src="getMediaUrl(article.image)"
                  class="mt-2"
                  style="max-width: 50px; height: 50px"
                ></video>
              </template>
              <template v-else>
                <img
                  :src="getMediaUrl(article.image)"
                  alt="Image existante"
                  class="mt-2"
                  style="max-width: 50px; height: 50px"
                />
              </template>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary mb-5">Ajouter</button>
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
import { useRouter } from "vue-router"; // Importer useRouter
import articleService from "@/services/articles";

// Variables réactives
const article = ref({
  titre: "",
  contenu: "", // Pour le texte
  date_publication: "",
  image: null, // Clé distincte pour l'image
});

const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter();
const articleId = router.currentRoute.value.params.id;

onMounted(async () => {
  try {
    const data = await articleService.getArticlesDetails(articleId);
    article.value = data.data;
  } catch (error) {
    errorMessage.value = "Erreur lors de la recuperation des donnees";
  }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    article.value.image = file; // Stocker l'image
    console.log("Fichier sélectionné :", file);
  } else {
    console.error("Aucun fichier sélectionné");
  }
};

// Soumission du formulaire
const submitForm = async () => {
  const formData = new FormData();
  formData.append("titre", article.value.titre);
  formData.append("contenu", article.value.contenu);
  formData.append("date_publication", article.value.date_publication);

  // Si l'image est un fichier
  if (article.value.image instanceof File) {
    formData.append("image", article.value.image); // Ajout de l'image
  } else if (typeof article.value.image === "string") {
    console.log("Garder l'image existante : ", article.value.image);
  } else {
    console.error("Aucun fichier d'image à envoyer");
  }

  // Vérifiez le contenu du FormData avant de l'envoyer
  for (let pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  try {
    await articleService.updateArticle(articleId, formData);
    successMessage.value = "Article modifié avec succès.";
    errorMessage.value = "";
    router.push("/blog-admin");
  } catch (error) {
    console.error("Erreur API :", error);
    errorMessage.value = error.response
      ? error.response.data.message
      : "Une erreur s'est produite.";
    successMessage.value = "";
  }
};

const getMediaUrl = (contenu) => {
  if (typeof contenu === "string") {
    // Vérifiez si c'est une URL relative ou absolue
    if (contenu.startsWith("http") || contenu.startsWith("/")) {
      return contenu;
    }
  } else if (contenu instanceof File) {
    // Si c'est un fichier, utilisez une URL blob pour l'afficher
    return URL.createObjectURL(contenu);
  }

  return ""; // Ou gérez le cas où contenu n'est ni une chaîne ni un fichier
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
