<template>
    <div class="bg-image">
      <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
          <div class="col-lg-6 col-md-8 col-sm-10 col-12">
            <div class="form-container">
              <div class="logo text-center mb-4">
                <!-- You can include your logo here -->
              </div>
              <h1 class="text-center">INSCRIPTION</h1>
  
              <!-- Registration Form -->
              <form class="mt-4">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <input type="text" class="form-control custom-input" placeholder="Nom complet" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <input type="email" class="form-control custom-input" placeholder="Adresse email" required>
                  </div>
                </div>
  
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <input type="password" class="form-control custom-input" placeholder="Mot de passe" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <!-- Select for Gender -->
                    <select v-model="form.genre" class="form-control custom-input" required>
                      <option value="" disabled selected>Genre</option>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                  </div>
                </div>
  
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <input type="tel" class="form-control custom-input" placeholder="Téléphone" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <input type="text" class="form-control custom-input" placeholder="Adresse" required>
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-12 mb-3">
                    <input type="file" class="form-control custom-input full-width-input" required>
                  </div>
                </div>
  
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <input type="date" class="form-control custom-input" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <!-- Select for Role -->
                    <select v-model="form.role" class="form-control custom-input" @change="checkRole" required>
                      <option value="" disabled selected>Rôle</option>
                      <option value="Touriste">Touriste</option>
                      <option value="Guide">Guide</option>
                    </select>
                  </div>
                </div>
                
                <!-- Inputs supplémentaires masqués par défaut -->
                <div class="row" v-if="isGuide">
                  <div class="col-md-6 mb-3">
                    <input type="text" class="form-control custom-input" placeholder="Langue(s) parlée(s)" >
                  </div>
                  <div class="col-md-6 mb-3">
                    <input type="text" class="form-control custom-input" placeholder="Numéro de carte de guide" >
                  </div>
                </div>
                <div class="row" v-if="isGuide">
                  <div class="col-12 mb-3">
                    <input type="file" class="form-control custom-input full-width-input" required >
                  </div>
                </div>

  
                <div class="text-center">
                  <button type="submit" class="custom-button limited-width">S'inscrire</button>
                </div>
              </form>
  
              <div class="text-center mt-3">
                <router-link to="/connexion" class="text-decoration-none link-custom">
                  Vous avez déjà un compte ? <span>cliquer ici</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  
  // Create a reactive form object to handle form data
  const form = reactive({
    genre: '',
    role: '',
    languages: '',
    guideCardNumber: ''
  });
  
  // Define a variable to track if the role is "Guide"
  const isGuide = ref(false);
  
  // Function to check the selected role and toggle additional fields
  function checkRole() {
    isGuide.value = form.role === 'Guide';
  }
  </script>
  
  <style scoped>
  /* Background Image Styling */
  .bg-image {
    background-image: url("@/assets/background-image.svg");
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
   
  }
  
  /* Form Container */
  .form-container {
    background: transparent;
    padding: 2rem;
    width: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  font-family: "Montserrat", sans-serif;
}
  
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  /* Logo Styling */
  .logo img {
    width: 100px;
  }
  
  /* Form Inputs */
  .custom-input {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #fff;
    border-radius: 0;
    color: #fff;
    width: 100%;
  }
  
  .custom-input::placeholder {
    color: #aaa;
    font-family: "Nunito Sans", sans-serif;
    font-size: 16px;
  }
  
  /* Button Styling */
  .custom-button {
    background-color: #f1c40f;
    color: #3498db;
    border: none;
    font-size: 16px;
    font-weight: 500px;
    height: 44px;
    border-radius: 25px;
    transition: background-color 0.3s ease;
    width: 152px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  
  .custom-button:hover {
    background-color: #3498db;
    color: #f1c40f;
  }
  
  /* Custom Link Styling */
  .link-custom {
    color: #fff;
    font-family: "Nunito Sans", sans-serif;
    font-size: 16px;
  }
  
  .link-custom span {
    font-weight: bold;
    color: #f1c40f;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .custom-input {
      width: 100%;
    }
    .custom-button {
      font-size: 14px;
    }
    h1 {
      font-size: 2rem;
    }
    .form-container {
      padding: 1rem;
      gap: 0.5rem;
      margin-top: -1rem;

    }
    .form {
      gap: 0.5rem;
      font-size: 14px;
    }
    .bg-image {
      padding: 1rem;
      gap: 0.5rem;
      height: 150vh;
    }
  }
  </style>
  