<!-- src/App.vue -->
<template>
  <div>
    <!-- Loader affiché pendant le chargement de la route -->
    <div v-if="loading" class="loader-wrapper">
      <div class="loader"></div>
    </div>

    <router-view v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const loading = ref(true); // Gestion du loader
const router = useRouter();

onMounted(() => {
  // Désactiver le loader une fois que la première page est chargée
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  // Afficher le loader lors de la navigation vers une autre route
  router.beforeEach((to, from, next) => {
    loading.value = true; // Activer le loader
    next(); // Passer à la route suivante
  });

  router.afterEach(() => {
    // Simuler un délai, puis désactiver le loader
    setTimeout(() => {
      loading.value = false;
    }, 1000); // Temps de simulation du chargement de la nouvelle route
  });
});
</script>

<style>
/* Style global si nécessaire */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
/* #F8F9FA comme couleur de fond */
body {
  background-color: #F8F9FA;
  font-family: 'Montserrat', sans-serif;
}
/* Styles du loader, identiques à ceux du premier exemple */
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
