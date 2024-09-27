<template>
  <div>
    <HeaderGuide />

    <!-- Contenu principal -->
    <div class="main container-fluid mt-5 d-flex">
      <img src="@/assets/form.svg" alt="Form Image" class="image" />
      <div class="form">
        <h1>Ajouter une activite</h1>
        <form @submit.prevent="submitForm" class="mt-5">
          
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
              <p v-if="errors.libelle" class="error-message">{{ errors.libelle }}</p>
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
            <p v-if="errors.description" class="error-message">{{ errors.description }}</p>
          </div>

          <!-- Contenu -->
          <div class="mb-3">
            <label for="contenu">Contenu (Image)</label>
            <input
              type="file"
              class="form-control"
              id="contenu"
              @change="handleFileUpload"
            />
            <p v-if="errors.contenu" class="error-message">{{ errors.contenu }}</p>
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
import HeaderGuide from "../communs/HeaderGuide.vue";
import activiteService from '@/services/activites'; // Importer votre service
import { useRouter } from 'vue-router';  // Importer useRouter
import { ValidatorCore } from '@/validators';

// Variables réactives
const site = ref({
  libelle: '',
  description: '',
  contenu: null,
});


const errors = ref({});
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter(); 


// Gestion de l'upload du fichier
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    site.value.contenu = file;
    console.log("Fichier sélectionné:", site.value.contenu); // Vérifier que le fichier est bien sélectionné
  } else {
    console.error("Aucun fichier sélectionné");
  }
};


// Soumission du formulaire
const submitForm = async () => {
  // Reset errors
  errors.value = {};

  // Validation
  errors.value.libelle = ValidatorCore.required(site.value.libelle);
  errors.value.description = ValidatorCore.minLength(site.value.description, 10);
  errors.value.contenu = ValidatorCore.validateFile(site.value.contenu);

  const formData = new FormData();
  formData.append('libelle', site.value.libelle);
  formData.append('description', site.value.description);

  if (site.value.contenu) {
    formData.append('contenu', site.value.contenu);
    console.log("Contenu ajouté à formData:", formData.get('contenu')); // Vérifiez que le fichier est bien présent
  } else {
    console.error("Le fichier contenu est manquant");
  }

  try {
    const response = await activiteService.addActivite(formData);
    // successMessage.value = "Site ajouté avec succès.";
    router.push('/activites');
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = error.response ? error.response.data.message : "Une erreur s'est produite.";
    successMessage.value = '';
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
.error-message {
  color: red;
  font-size: 0.875em;
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
