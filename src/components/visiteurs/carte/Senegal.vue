<template>
    <svg
      height="299.9936"
      version="1.1"
      width="407.6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 407.6 299.9936"
      preserveAspectRatio="xMinYMin"
      style="overflow: hidden; position: relative; left: -0.600037px; top: -0.599998px;"
    >
      <!-- Assuming these are components representing regions in the SVG -->
      <Diourbel @click="showRegionInfo('Diourbel')" />
      <Dakar @click="showRegionInfo('Dakar')" />
      <Thies @click="showRegionInfo('Thiès')" />
      <Louga @click="showRegionInfo('Louga')" />
      <Matam @click="showRegionInfo('Matam')" />
      <SaintLouis @click="showRegionInfo('Saint-Louis')" />
      <Tambacounda @click="showRegionInfo('Tambacounda')" />
      <Kaffrine @click="showRegionInfo('Kaffrine')" />
      <Fatick @click="showRegionInfo('Fatick')" />
      <Kaolack @click="showRegionInfo('Kaolack')" />
      <Kedougou @click="showRegionInfo('Kédougou')" />
      <Kolda @click="showRegionInfo('Kolda')" />
      <Sedhiou @click="showRegionInfo('Sedhiou')" />
      <Ziguenchor @click="showRegionInfo('Ziguinchor')" />

    </svg>
  </template>
  
  <script setup>
  import Diourbel from "./Diourbel.vue";
  import Dakar from "./Dakar.vue";
  import Thies from "./Thies.vue";
  import Louga from "./Louga.vue";
  import Matam from "./Matam.vue";
  import SaintLouis from "./SaintLouis.vue";
  import Tambacounda from "./Tambacounda.vue";
  import Kaffrine from "./Kaffrine.vue";
  import Fatick from "./Fatick.vue";
  import Kaolack from "./Kaolack.vue";
  import Kedougou from "./Kedougou.vue";
  import Kolda from "./Kolda.vue";
  import Sedhiou from "./Sedhiou.vue";
  import Ziguenchor from "./Ziguenchor.vue";
  import { ref, onMounted } from "vue";
  import regionsService from "@/services/regions";
  
  const regionInfos = ref({});
  
  // Méthode pour récupérer les informations des régions depuis l'API
  async function fetchRegions() {
    try {
      const regions = await regionsService.getRegions(); // Appel du service
      console.log("Informations des régions : ", regions);
      regionInfos.value = regions.data; // Stockage des informations dans la variable réactive
    } catch (error) {
      console.error("Erreur lors de la récupération des régions :", error);
    }
  }
  
  onMounted(fetchRegions);
  
  // Fonction pour afficher les informations d'une région
  function showRegionInfo(regionName) {
  // Trouver la région correspondante dans le tableau data
  const region = regionInfos.value.find((region) => region.libelle === regionName); 

  if (region) {
    console.log(`Libellé: ${region.libelle}`);
    console.log(`Description: ${region.description}`);
    console.log(`Population: ${region.population}`);
    console.log(`Superficie: ${region.superficie}`);
  } else {
    console.log("Informations non disponibles pour cette région.");
  }
}

  </script>
  
  <style scoped></style>
  