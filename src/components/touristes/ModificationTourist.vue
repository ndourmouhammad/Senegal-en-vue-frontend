<template>
    <div>
      <HeaderTouriste />
  
      <div class="container-fluid mt-1">
        <!-- Profil Header -->
        <div class="profile-header d-flex align-items-center">
          <h2>Modification de mon profil</h2>
        </div>
        <div class="profile-container mt-5">
          <div class="profile-form">
            <form @submit.prevent="submitForm" class="d-flex flex-column gap-3">
              <div class="form-row gap-3">
                <!-- Nom -->
                <div class="form-group">
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    placeholder="Nom"
                    class="input-field"
                  />
                </div>
  
                <!-- Email -->
                <div class="form-group">
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    placeholder="Email"
                    class="input-field"
                  />
                </div>
              </div>
  
              <div class="form-row">
                <!-- Date de naissance -->
                <div class="form-group">
                  <input
                    type="text"
                    id="date_naissance"
                    v-model="form.date_naissance"
                    placeholder="Date de naissance"
                    class="input-field"
                  />
                </div>
  
                <!-- Sexe -->
                <div class="form-group">
                  <select id="genre" v-model="form.genre" class="input-field">
                    <option disabled value="">Sélectionnez le sexe</option>
                    <!-- Placeholder option -->
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>
              </div>
  
              <div class="form-row">
                <!-- Téléphone -->
                <div class="form-group">
                  <input
                    type="text"
                    id="telephone"
                    v-model="form.telephone"
                    placeholder="Téléphone"
                    class="input-field"
                  />
                </div>
  
                <!-- Localisation -->
                <div class="form-group">
                  <input
                    type="text"
                    id="adresse"
                    v-model="form.adresse"
                    placeholder="Adresse"
                    class="input-field"
                  />
                </div>
              </div>
  
              <div class="form-row single-column">
                <div class="form-group">
                  <input
                    type="file"
                    id="photo_profil"
                    placeholder="Image de profil"
                    class="input-field"
                    @change="handleFileUpload"
                  />
  
                  <!-- Affiche l'image existante si elle est présente -->
                  <div v-if="form.photo_profil">
                    <img
                      :src="getMediaUrl(form.photo_profil)"
                      alt="Image existante"
                      class="mt-2"
                      style="max-width: 50px; height: 50px"
                    />
                </div>
                </div>
              </div>
  
              <!-- Bouton Enregistrer -->
              <div class="button-container">
                <button type="submit" class="save-btn">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
     <div class="mt-5">
        <footer-touriste />
     </div>
    </div>
  </template>
  <script setup>
  import HeaderTouriste from "../communs/HeaderTouriste.vue";
  import FooterTouriste from "../communs/FooterTouriste.vue";
  import { reactive, onMounted } from "vue";
  import userService from "@/services/users.js";
  import { useRouter } from "vue-router";

  
  const router = useRouter();
  
  // Déclarer les données du formulaire en utilisant reactive
  const form = reactive({
    name: "",
    email: "",
    date_naissance: "",
    genre: "",
    telephone: "",
    adresse: "",
    photo_profil: "",
  });
  
  // Fonction pour charger les informations du profil de l'utilisateur
  const fetchUser = async () => {
    try {
      const response = await userService.user();
      form.name = response.name;
      form.email = response.email;
      form.date_naissance = response.date_naissance;
      form.genre = response.genre;
      form.telephone = response.telephone;
      form.adresse = response.adresse;
      form.photo_profil = response.photo_profil;
    } catch (error) {
      console.error(
        "Erreur lors de la sélection des informations de l'utilisateur:",
        error
      );
    }
  };
  
  const getMediaUrl = (contenu) => {
    if (typeof contenu === "string") {
      // Vérifier si c'est une URL relative ou absolue
      if (contenu.startsWith("http") || contenu.startsWith("/")) {
        return contenu;
      }
      // Si c'est un chemin relatif, ajouter un domaine ou une base d'URL
      return `/path/to/uploads/${contenu}`; // Mettez à jour selon votre configuration
    } else if (contenu instanceof File) {
      // Si c'est un fichier, utiliser une URL blob pour l'afficher
      return URL.createObjectURL(contenu);
    }
  
    return ""; // Retourner une chaîne vide si rien n'est valide
  };
  
  // Lancer la fonction pour charger les informations du profil de l'utilisateur
  onMounted(() => {
    fetchUser();
  });
  
  // Gestion de l'upload du fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      form.photo_profil = file; // Replace the existing photo with the new file
    } else {
      console.error("No file selected");
    }
  };
  
  // Méthode pour soumettre le formulaire et mettre à jour les informations
  const submitForm = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("date_naissance", form.date_naissance);
    formData.append("genre", form.genre);
    formData.append("telephone", form.telephone);
    formData.append("adresse", form.adresse);
  
    // Check if a new file was selected
    if (form.photo_profil instanceof File) {
      formData.append("photo_profil", form.photo_profil); // New file uploaded
    }
  
    try {
      await userService.modifierInformations(formData);
      router.push("/profil-touriste");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  </script>
  
  <style scoped>
  .container-fluid {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    overflow-x: hidden;
  }
  
  /* Profile Header */
  .profile-header {
    background: url(@/assets/bienvenue.svg) no-repeat center center;
    background-size: cover; /* Ensures the image covers the entire section */
    background-position: center; /* Centers the image */
    background-repeat: no-repeat; /* Prevents the image from repeating */
    border-radius: 20px;
    width: 100%;
    height: 40vh;
    display: flex;
    justify-content: center;
    gap: 550px;
  }
  
  .profile-header h2 {
    color: var(--White, #fff);
    font-family: Montserrat;
    font-size: 45px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
  
  .profile-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .profile-form {
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .form-group {
    flex: 1;
  }
  
  .single-column {
    flex-direction: column;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #2c3e50;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  .input-field:focus {
    border-bottom: 1px solid #3498db;
  }
  
  .button-container {
    text-align: left;
  }
  
  .save-btn {
    display: flex;
    width: 183px;
    padding: 10px 0;
    justify-content: space-between;
    align-items: center;
    border-radius: 25px;
    border: 1px solid #3498db;
    background: var(--White, #fff);
    color: var(--couleur-primaire, #3498db);
  
    font-family: "Nunito Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }
  
  .save-btn:hover {
    background-color: #3498db;
    color: white;
  }
  
  input::placeholder {
    color: var(--graye, #999);
    font-family: "Nunito Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  
  /* Responsive mobile */
  @media screen and (max-width: 768px) {
    .profile-header {
      height: 25vh;
      background: #3498db;
      width: 100%;
    }
  
    .profile-header h2 {
      font-size: 20px;
    }
  
    .form-row {
      flex-direction: column; /* Make the form rows stack vertically */
    }
  
    .form-group {
      width: 100%; /* Ensure form groups take full width */
    }
  
    .input-field {
      width: 100%; /* Inputs take full width */
    }
  }
  </style>
  