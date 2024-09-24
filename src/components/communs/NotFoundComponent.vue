<template>
    <div class="not-found">
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <router-link to="/">Retour à l'accueil</router-link>
    </div>
  </template>

<script setup>

</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
  color: #000;
  font-family: "Nunito Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  align-items: center;
}
</style>