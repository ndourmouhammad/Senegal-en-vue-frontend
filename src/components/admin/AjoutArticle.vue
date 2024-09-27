<template>
    <div>
      <HeaderAdmin />
  
      <!-- Contenu principal -->
      <div class="main container-fluid mt-5 d-flex">
        <img src="@/assets/form.svg" alt="Form Image" class="image" />
        <div class="form">
          <h1>Ajouter un nouveau article</h1>
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
                <p v-if="errors.titre" class="error-message">{{ errors.titre }}</p>
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
              <p v-if="errors.date_publication" class="error-message">{{ errors.date_publication }}</p>
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
              <p v-if="errors.contenu" class="error-message">{{ errors.contenu }}</p>
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
              <p v-if="errors.image" class="error-message">{{ errors.image }}</p>
            </div>
  
            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary mb-5">Ajouter</button>
          </form>
  
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import HeaderAdmin from "../communs/HeaderAdmin.vue";
  import { useRouter } from 'vue-router';  // Importer useRouter
  import articleService from "@/services/articles";
  import { ValidatorCore } from '@/validators';
  
  // Variables réactives
  const article = ref({
    titre: '',
    contenu: '',
    date_publication: '',
    image: null,  // updated key for image
  });
  
 
  const errorMessage = ref('');
  const successMessage = ref('');
  const router = useRouter(); 

  const errors = ref({});

  
  // Gestion de l'upload du fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      article.value.image = file;
    } else {
      console.error("Aucun fichier sélectionné");
    }
  };
  

  // Soumission du formulaire
  const submitForm = async () => {
    // Reset errors
    errors.value = {};

    // Validation
    errors.value.titre = ValidatorCore.required(article.value.titre);
    errors.value.contenu = ValidatorCore.minLength(article.value.contenu);
    errors.value.date_publication = ValidatorCore.required(article.value.date_publication);
    errors.value.image = ValidatorCore.validateFile(article.value.image);
  
    // Check if there are any errors
    // if (Object.values(errors.value).some((error) => error !== true)) {
    //   return; // Prevent submission if there are errors
    // }
    const formData = new FormData();
    formData.append('titre', article.value.titre);
    formData.append('contenu', article.value.contenu);
    formData.append('date_publication', article.value.date_publication);
    formData.append('image', article.value.image);

  
    if (article.value.image) {  // Utilisation de 'image' au lieu de 'contenu'
      formData.append('image', article.value.image);  // Correction ici
    }
  
    try {
      await articleService.addArticle(formData);
      router.push('/blog-admin');
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = error.response ? error.response.data.message : "Une erreur s'est produite.";
    }
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
    background: var(--couleur-primaire, #3498DB);
    color: var(--White, var(--White, #FFF));
    font-family: "Nunito Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    border: none;
    display: flex;
    justify-content: center;
  }
  .error-message {
  color: red;
  font-size: 0.875em;
}
  
  @media screen and (max-width: 768px) {
    .form .inputs {
      flex-direction: column;
    }
    img {
      display:none;
    }
  } 
  </style>
  