<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderTouriste />

    <!-- Contenu de la page d'accueil -->
    <div class="banniere position-relative">
      <video class="banniere-video" autoplay muted loop>
        <source src="@/assets/video-banniere2.mp4" type="video/mp4" />
        <!-- Message si la vidéo ne peut pas être lue -->
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>

      <!-- Texte et boutons superposés -->
      <div class="overlay-content d-flex flex-column justify-content-center align-items-center text-center">
        <h1 class="text-white">DÉCOUVREZ LA BEAUTÉ ET LA CULTURE DU SÉNÉGAL</h1>
        <p class="text-white">
          <span class="text-success">Senegal en vue</span>, vous invite à explorer la beauté naturelle
          et la richesse culturelle du Sénégal.
        </p>
        <div class="boutons">
          <button class="btn-primary me-2">Connexion</button>
          <button class="btn-warning">Inscription</button>
        </div>
      </div>
    </div>

    <!-- Carte interactive -->
     <div class="carte container">
      <div class="info">
        <h1>Explorez le Sénégal en un clic : Découvrez les trésors cachés de notre pays</h1>
        <p>
          Le Sénégal, riche en culture et en diversité, offre une expérience unique où modernité et traditions se côtoient. Du mbalax aux coutumes ancestrales, chaque région dévoile des trésors culturels. En plus de ses plages et paysages, le pays propose une plongée dans l'histoire et les arts. Explorez ses sites touristiques pour découvrir un Sénégal authentique, entre découvertes culturelles et aventures naturelles.
        </p>
      </div>
      <div class="image">
        <img src="@/assets/country.svg" alt="Carte du senegal">
      </div>
     </div>

     <!-- Nos destinations -->
     <div class="container my-5 destinations">
    <h2 class="text-center mb-5">Nos destinations</h2>
    <div class="row">
    <!-- Première carte -->
    <div class="col-md-4 mb-4 d-flex">
      <div class="card shadow-sm">
        <img src="@/assets/destination1.svg" class="card-img-top" alt="destination1">
        <div class="card-body">
          <h5 class="card-title">Monument de la renaissance</h5>
          <p class="card-text">Dakar est la capitale du Sénégal, est une ville dynamique située sur la côte atlantique. Elle est connue pour son riche patrimoine culturel...</p>
          <a href="#" class="btn btn-success">Voir plus</a>
        </div>
      </div>
    </div>
    
    <!-- Deuxième carte -->
    <div class="col-md-4 mb-4 d-flex">
      <div class="card shadow-sm">
        <img src="@/assets/destination2.svg" class="card-img-top" alt="destination1">
        <div class="card-body">
          <h5 class="card-title">Île de Gorée</h5>
          <p class="card-text">L’île de Gorée, situé au large de Dakar au Sénégal, est célèbre pour son histoire liée à la traite des esclaves. Ce site classé patrimoine mondiale de ...</p>
          <a href="#" class="btn btn-success">Voir plus</a>
        </div>
      </div>
    </div>

    <!-- Troisième carte -->
    <div class="col-md-4 mb-4 d-flex">
      <div class="card shadow-sm">
        <img src="@/assets/destination3.svg" class="card-img-top" alt="destination1">
        <div class="card-body">
          <h5 class="card-title">Joal Fadiouth</h5>
          <p class="card-text">Joal Fadiouth est une commune du Sénégal située à l’extrémité de la petite-côte, au sud-est de Dakar. Elle réunit en réalité deux villages.</p>
          <a href="#" class="btn btn-success">Voir plus</a>
        </div>
      </div>
    </div>
  </div>
  </div>

  <!-- Nos activités -->
<div class="container my-5 destinations">
  <h2 class="text-center mb-5">Nos activités</h2>
  <div class="row">
    <!-- Première carte -->
    <div class="col-md-4 mb-4 d-flex">
      <div class="card shadow-sm d-flex flex-column">
        <video class="card-img-top" controls>
          <source src="@/assets/balade-lac-rose.mp4" type="video/mp4">
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
        <div class="card-body flex-fill">
          <h5 class="card-title">Balade lac rose</h5>
          <p class="card-text">Dakar est la capitale du Sénégal, est une ville dynamique située sur la côte atlantique. Elle est connue pour son riche patrimoine culturel...</p>
          <a href="#" class="btn btn-success">Voir plus</a>
        </div>
      </div>
    </div>
    
    <!-- Deuxième carte -->
    <div class="col-md-4 mb-4 d-flex">
      <div class="card shadow-sm d-flex flex-column">
        <video class="card-img-top" controls>
          <source src="@/assets/SenegalLandofTeranga.mp4" type="video/mp4">
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
        <div class="card-body flex-fill">
          <h5 class="card-title">Safari</h5>
          <p class="card-text">L’île de Gorée, situé au large de Dakar au Sénégal, est célèbre pour son histoire liée à la traite des esclaves. Ce site classé patrimoine mondiale de ...</p>
          <a href="#" class="btn btn-success">Voir plus</a>
        </div>
      </div>
    </div>

    <!-- Troisième carte -->
    <div class="col-md-4 mb-4 d-flex">
      <div class="card shadow-sm d-flex flex-column">
        <video class="card-img-top" controls>
          <source src="@/assets/EcolodgedeLompoul.mp4" type="video/mp4">
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
        <div class="card-body flex-fill">
          <h5 class="card-title">Balade dromodaire Lompoul</h5>
          <p class="card-text">Joal Fadiouth est une commune du Sénégal située à l’extrémité de la petite-côte, au sud-est de Dakar. Elle réunit en réalité deux villages.</p>
          <a href="#" class="btn btn-success">Voir plus</a>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
  // Importation du composant Header
  import HeaderTouriste from '../communs/HeaderTouriste.vue';

  
</script>

<style scoped>
/* Style spécifique pour la bannière */
.banniere {
  position: relative;
  height: 80vh;
  overflow: hidden;
}

.banniere-video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Pour ajuster la vidéo à la taille du conteneur */
}

/* Superposition du contenu */
.overlay-content {
  position: absolute;
  top: 200px;
  left: 100px;
  right: 0;
  bottom: 0;
  z-index: 2; /* Assure que le texte soit visible au-dessus de la vidéo */
  border-radius: 20px;
  background: rgba(38, 38, 38, 0.45);
  width: 628px;
  height: 266.206px;
  flex-shrink: 0;
}
h1 .text-white {
  width: 597px;
  height: 85.627px;
  flex-shrink: 0;
  color: var(--White, #FFF);

  /* h1 */
  font-family: Montserrat;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

p .text-white {
  width: 576.98px;
  height: 51.977px;
  flex-shrink: 0;
  color: var(--White, #FFF);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
}

.text-success {
  color: var(--White, #27AE60);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 30px; /* 150% */
}

/* Style des boutons */
.boutons {
  display: flex;
  gap: 127px;
}

.btn {
  padding: 10px 20px;
  font-size: 18px;
}

.btn-primary {
  width: 217.636px;
  height: 53.411px;
  flex-shrink: 0;
  border-radius: 35.795px;
  background: #3498DB;
  border: none;
  color: #F8F9FA;
  font-family: Montserrat;
  font-size: 22.909px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.btn-warning {
  width: 217.636px;
  height: 53.411px;
  flex-shrink: 0;
  border-radius: 35.795px;
  background: #F1C40F;
  border: none;
  color: #3498DB;
  font-family: Montserrat;
  font-size: 22.909px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

/* Carte  */
.carte {
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
}
.info h1 {
  width: 597px;
height: 147px;
flex-shrink: 0;
color: #2C3E50;
font-family: Montserrat;
font-size: 40px;
font-style: normal;
font-weight: 700;
text-align: justify;
line-height: normal;
}
.info p {
  width: 595.459px;
  color: #000;
font-family: "Nunito Sans";
font-size: 24.387px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-align: justify;
}
.image img {
  width: 589.574px;
height: 445px;
flex-shrink: 0;
}

.destinations {
  margin-top: 120px;
}
.destinations h2 {
  color: #2C3E50;
text-align: justify;
font-family: Montserrat;
font-size: 57.185px;
font-style: normal;
font-weight: 600;
line-height: 150%; /* 85.778px */
}

.destinations .card-title {
  color: #27AE60;

/* Heading/H5 Bold */
font-family: Montserrat;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 120%; /* 28.8px */
letter-spacing: 0.12px;
}

.destinations .card-text {
  color: #000;

/* paragraphes */
font-family: "Nunito Sans";
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
.btn-success {
  width: 152px;

  flex-shrink: 0;
  border-radius: 25px;
background: #27AE60;
  border: none;
  color: #F8F9FA;
font-family: Montserrat;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;
text-decoration: none;
padding: 10px;
margin-top: auto;
}
.card {
  display: flex;
  flex-direction: column;
}
.card-body {
  flex: 1; /* Permet à la carte de s'étendre pour remplir l'espace */
}
.card-img-top {
  max-height: 300px; /* Ajustez cette valeur selon vos besoins */
  object-fit: cover; /* Pour maintenir le ratio de l'image */
}

/* Styles pour les petits écrans */
@media (max-width: 768px) {
  .banniere {
    height: 60vh;
  }

  .overlay-content {
    top: 150px;
    left: 20px;
    right: 20px;
    width: calc(100% - 40px);
    height: auto;
    padding: 20px;
    border-radius: 10px;
  }

  h1 .text-white {
    font-size: 24px;
    width: 100%;
    text-align: center;
  }

  p .text-white {
    font-size: 16px;
    width: 100%;
    text-align: center;
  }

  .boutons {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    max-width: 300px;
    font-size: 16px;
    padding: 15px;
  }

  .btn-primary {
    font-size: 18px;
  }

  .btn-warning {
    font-size: 18px;
  }
  .image {
    display: none;
  }
  .info {
    gap: 15px;
  }
  .info h1 {
    color: #2C3E50;
text-align: justify;
font-family: Montserrat;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
height: auto;
width: 363px;
  }
  .info p {
    color: #000;
text-align: justify;
font-family: "Nunito Sans";
font-size: 13px;
font-style: normal;
font-weight: 400;
line-height: normal;
height: auto;
width: 363px;
  }
}
</style>
