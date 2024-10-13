<template>
  <div>
    <HeaderGuide />

    <!-- Contenu principal -->
    <div class="main container-fluid mt-5 d-flex">
      <img src="@/assets/form.svg" alt="Form Image" class="image" />
      <div class="form">
        <h1>Ajouter un nouvelle excursion</h1>
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
              <p v-if="errors.libelle" class="error-message">{{ errors.libelle }}</p>
            </div>
            <div class="col-md-6 mb-3">
              <label for="tarif_entree">Tarif</label>
              <input
                v-model="excursion.tarif_entree"
                type="text"
                class="form-control"
                id="tarif_entree"
                name="tarif_entree"
                placeholder="Entrez le tarif"
              />
              <p v-if="errors.tarif_entree" class="error-message">{{ errors.tarif_entree }}</p>
            </div>
          </div>

          <div class="row">
            <!-- Heure d'ouverture and Heure de fermeture side by side -->
            <div class="col-md-6 mb-3">
              <label for="ouverture">Heure d'ouverture</label>
              <input
                v-model="excursion.date_debut"
                type="date"
                class="form-control"
                id="ouverture"
                name="ouverture"
                placeholder="Entrez l'heure d'ouverture"
              />
              <p v-if="errors.date_debut" class="error-message">{{ errors.date_debut }}</p>
            </div>
            <div class="col-md-6 mb-3">
              <label for="fermeture">Heure de fermeture</label>
              <input
                v-model="excursion.date_fin"
                type="date"
                class="form-control"
                id="fermeture"
                name="fermeture"
                placeholder="Entrez l'heure de fermeture"
              />
              <p v-if="errors.date_fin" class="error-message">{{ errors.date_fin }}</p>
            </div>
          </div>

          <!-- Région -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="site_touristique_id">Sites</label>
              <select v-model="excursion.site_touristique_id" class="form-control" id="site_touristique_id">
                <option v-for="excursion in sites" :key="excursion.id" :value="excursion.id">
                  {{ excursion.libelle }}
                </option>
              </select>
              <p v-if="errors.site_touristique_id" class="error-message">{{ errors.site_touristique_id }}</p>
            </div>
            <div class="col-md-6 mb-3">
              <label for="nombre_participants">Participants</label>
              <input
                v-model="excursion.nombre_participants"
                type="text"
                class="form-control"
                id="nombre_participants"
                name="nombre_participants"
                placeholder="Entrez le nombre de places disponibles"
              />
              <p v-if="errors.nombre_participants" class="error-message">{{ errors.nombre_participants }}</p>
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
import siteService from '@/services/sites'; 
import excursionService from '@/services/excursions';
import { useRouter } from 'vue-router';  
import { ValidatorCore } from '@/validators';



// Variables réactives
const excursion = ref({
  libelle: '',
  tarif_entree: '',
  date_debut: '',
  date_fin: '',
  site_touristique_id: '',
  description: '',
  nombre_participants: '',
  contenu: null,
});

const sites = ref([]);
const errors = ref({});
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter(); 

// Récupérer les régions à l'initialisation du composant
onMounted(async () => {
  try {
    const data = await siteService.get();
    console.log(data);
    sites.value = data.data;
  } catch (error) {
    errorMessage.value = "Erreur lors de la récupération des régions.";
  }
});

// Gestion de l'upload du fichier
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    excursion.value.contenu = file;
    console.log("Fichier sélectionné:", excursion.value.contenu); // Vérifier que le fichier est bien sélectionné
  } else {
    console.error("Aucun fichier sélectionné");
  }
};


// Soumission du formulaire
const submitForm = async () => {
  // Reset errors
  errors.value = {};

  // Validation
  errors.value.libelle = ValidatorCore.required(excursion.value.libelle);
  errors.value.tarif_entree = ValidatorCore.positiveNumber(excursion.value.tarif_entree);
  errors.value.date_debut = ValidatorCore.validTime(excursion.value.date_debut);
  errors.value.date_fin = ValidatorCore.validTime(excursion.value.date_fin);
  errors.value.site_touristique_id = ValidatorCore.required(excursion.value.site_touristique_id);
  errors.value.nombre_participants = ValidatorCore.validParticipants(excursion.value.nombre_participants);
  errors.value.description = ValidatorCore.minLength(excursion.value.description, 10);
  errors.value.contenu = ValidatorCore.validateFile(excursion.value.contenu);

  // // Check if there are any errors
  // if (Object.values(errors.value).some((error) => error !== true)) {
  //   return; // Prevent submission if there are errors
  // }

  const formData = new FormData();
  formData.append('libelle', excursion.value.libelle);
  formData.append('tarif_entree', excursion.value.tarif_entree);
  formData.append('date_debut', excursion.value.date_debut);
  formData.append('date_fin', excursion.value.date_fin);
  formData.append('site_touristique_id', excursion.value.site_touristique_id);
  formData.append('nombre_participants', excursion.value.nombre_participants);
  formData.append('description', excursion.value.description);

  if (excursion.value.contenu) {
    formData.append('contenu', excursion.value.contenu);
    console.log("Contenu ajouté à formData:", formData.get('contenu')); // Vérifiez que le fichier est bien présent
  } else {
    console.error("Le fichier contenu est manquant");
  }

  try {
  console.log("Données envoyées:", formData);
  const response = await excursionService.addExcursion(formData);
  console.log(response);
  
  successMessage.value = "Site ajouté avec succès.";
  router.push('/sites-guide');
  errorMessage.value = '';
} catch (error) {
  console.error("Erreur lors de l'ajout du site:", error);
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
