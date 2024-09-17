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
}
</style>
