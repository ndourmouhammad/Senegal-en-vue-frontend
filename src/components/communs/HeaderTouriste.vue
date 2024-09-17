<template>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-light container">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <!-- Logo and title -->
         
          <img src="@/assets/logo.svg" alt="Sénegal en Vue" class="logo">
          
        </a>
  
        <!-- Mobile menu button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Menu links -->
        <div class="collapse navbar-collapse gap-2" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Accueil</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Sites touristiques</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Guides touristiques</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Évènements</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Blog</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* Header logo styling */
 
  .logo {
    width: 137px;
    height: auto;
  }
  
.nav-item a {
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    color: #2C3E50;
}

.nav-item a.active {
    color: #3498DB;
}
  
  .highlight {
    color: #f0c040; /* Use the yellow color similar to the mockup */
  }
  
  /* Mobile responsiveness */
  @media (max-width: 767px) {
    .brand-title {
      font-size: 1.2rem;
    }
  }
  </style>
  