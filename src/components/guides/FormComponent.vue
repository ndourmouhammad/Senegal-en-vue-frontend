<template>
  <div>
    <HeaderGuide />

    <!-- Contenu principal -->
    <div class="main container-fluid mt-5 d-flex">
      <img src="@/assets/form.svg" alt="Form Image" class="image" />
      <div class="form">
        <h1>Ajouter un nouveau site</h1>
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
              <p v-if="errors.libelle" class="error-message">{{ errors.libelle }}</p>
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
              <p v-if="errors.tarif_entree" class="error-message">{{ errors.tarif_entree }}</p>
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
              <p v-if="errors.heure_ouverture" class="error-message">{{ errors.heure_ouverture }}</p>
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
              <p v-if="errors.heure_fermeture" class="error-message">{{ errors.heure_fermeture }}</p>
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
              <p v-if="errors.region_id" class="error-message">{{ errors.region_id }}</p>
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
              <p v-if="errors.places_disponible" class="error-message">{{ errors.places_disponible }}</p>
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
import siteService from '@/services/sites'; // Importer votre service
import { useRouter } from 'vue-router';  // Importer useRouter
import { ValidatorCore } from '@/validators';

// Variables réactives
const site = ref({
  libelle: '',
  tarif_entree: '',
  heure_ouverture: '',
  heure_fermeture: '',
  region_id: '',
  description: '',
  places_disponible: '',
  contenu: null,
});

const regions = ref([]);
const errors = ref({});
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter(); 

// Récupérer les régions à l'initialisation du composant
onMounted(async () => {
  try {
    const data = await siteService.getRegions();
    console.log(data);
    regions.value = data.data;
  } catch (error) {
    errorMessage.value = "Erreur lors de la récupération des régions.";
  }
});

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
  errors.value.tarif_entree = ValidatorCore.positiveNumber(site.value.tarif_entree);
  errors.value.heure_ouverture = ValidatorCore.validTime(site.value.heure_ouverture);
  errors.value.heure_fermeture = ValidatorCore.validTime(site.value.heure_fermeture);
  errors.value.region_id = ValidatorCore.required(site.value.region_id);
  errors.value.places_disponible = ValidatorCore.validParticipants(site.value.places_disponible);
  errors.value.description = ValidatorCore.minLength(site.value.description, 10);
  errors.value.contenu = ValidatorCore.validateFile(site.value.contenu);

  // // Check if there are any errors
  // if (Object.values(errors.value).some((error) => error !== true)) {
  //   return; // Prevent submission if there are errors
  // }

  const formData = new FormData();
  formData.append('libelle', site.value.libelle);
  formData.append('tarif_entree', site.value.tarif_entree);
  formData.append('heure_ouverture', site.value.heure_ouverture);
  formData.append('heure_fermeture', site.value.heure_fermeture);
  formData.append('region_id', site.value.region_id);
  formData.append('places_disponible', site.value.places_disponible);
  formData.append('description', site.value.description);

  if (site.value.contenu) {
    formData.append('contenu', site.value.contenu);
    console.log("Contenu ajouté à formData:", formData.get('contenu')); // Vérifiez que le fichier est bien présent
  } else {
    console.error("Le fichier contenu est manquant");
  }

  try {
  console.log("Données envoyées:", formData);
  const response = await siteService.addSite(formData);
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
