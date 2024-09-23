<template>
  <div>
    <HeaderAdmin />

    <!-- Contenu principal -->
    <div class="main container-fluid mt-5 d-flex">
      <img src="@/assets/form.svg" alt="Form Image" class="image" />
      <div class="form">
        <h1>Ajouter un nouveau site</h1>
        <form @submit.prevent="submitForm" class="mt-5">
          <div class="row">
            <!-- Libelle and Tarif side by side -->
            <div class="col-md-6 mb-3">
              <label for="nom">Nom</label>
              <input
                v-model="site.nom"
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
                v-model="site.prix"
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
                v-model="site.date_debut"
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
                v-model="site.date_fin"
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
              <select v-model="site.site_touristique_id" class="form-control" id="region_id">
                <option v-for="site in sites" :key="site.id" :value="site.id">
                  {{ site.libelle }}
                </option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label for="nombre_participant">Nombre de participants</label>
              <input
                v-model="site.nombre_participant"
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
            <select v-model="site.category_id" class="form-control" id="category_id">
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.nom }}
              </option>
            </select>
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
            <label for="image">Image</label>
            <input
              type="file"
              class="form-control"
              id="image"
              @change="handleFileUpload"
            />
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
import siteService from '@/services/sites'; // Importer votre service
import { useRouter } from 'vue-router';  // Importer useRouter
import categorieService from "@/services/categories";
import evenementService from "@/services/evenements";

// Variables réactives
const site = ref({
  nom: '',
  nombre_participant: '',
  date_debut: '',
  date_fin: '',
  prix: '',
  category_id: '',
  site_touristique_id: '',
  description: '',
  contenu: null,  // updated key for image
});

const sites = ref([]);
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter(); 
const categories = ref([]);

// Récupérer les sites et catégories à l'initialisation du composant
onMounted(async () => {
  try {
    const data = await siteService.get();
    sites.value = data.data;
    const response = await categorieService.get();
    categories.value = response.data;
  } catch (error) {
    errorMessage.value = "Erreur lors de la récupération des données.";
  }
});

// Gestion de l'upload du fichier
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    site.value.image = file;
  } else {
    console.error("Aucun fichier sélectionné");
  }
};

// Soumission du formulaire
// Soumission du formulaire
const submitForm = async () => {
  const formData = new FormData();
  formData.append('nom', site.value.nom);
  formData.append('prix', site.value.prix);
  formData.append('date_debut', site.value.date_debut);
  formData.append('date_fin', site.value.date_fin);
  formData.append('site_touristique_id', site.value.site_touristique_id);
  formData.append('nombre_participant', site.value.nombre_participant);
  formData.append('category_id', site.value.category_id);
  formData.append('description', site.value.description);

  if (site.value.image) {  // Utilisation de 'image' au lieu de 'contenu'
    formData.append('image', site.value.image);  // Correction ici
  }

  try {
    await evenementService.addEvenement(formData);
    router.push('/evenements-admin');
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

@media screen and (max-width: 768px) {
  .form .inputs {
    flex-direction: column;
  }
  img {
    display:none;
  }
} 
</style>
