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
      <!-- Composants représentant les régions dans le SVG avec Tooltip -->
      <Diourbel
        v-tooltip.hover="getRegionTooltip('Diourbel')"
        @mouseover="showRegionInfo('Diourbel')"
      />
      <Dakar
        v-tooltip="getRegionTooltip('Dakar')"
        @mouseover="showRegionInfo('Dakar')"
      />
      <Thies
        v-tooltip="getRegionTooltip('Thiès')"
        @click="showRegionInfo('Thiès')"
      />
      <Louga
        v-tooltip="getRegionTooltip('Louga')"
        @click="showRegionInfo('Louga')"
      />
      <Matam
        v-tooltip="getRegionTooltip('Matam')"
        @click="showRegionInfo('Matam')"
      />
      <SaintLouis
        v-tooltip="getRegionTooltip('Saint-Louis')"
        @click="showRegionInfo('Saint-Louis')"
      />
      <Tambacounda
        v-tooltip="getRegionTooltip('Tambacounda')"
        @click="showRegionInfo('Tambacounda')"
      />
      <Kaffrine
        v-tooltip="getRegionTooltip('Kaffrine')"
        @click="showRegionInfo('Kaffrine')"
      />
      <Fatick
        v-tooltip="getRegionTooltip('Fatick')"
        @click="showRegionInfo('Fatick')"
      />
      <Kaolack
        v-tooltip="getRegionTooltip('Kaolack')"
        @click="showRegionInfo('Kaolack')"
      />
      <Kedougou
        v-tooltip="getRegionTooltip('Kédougou')"
        @click="showRegionInfo('Kédougou')"
      />
      <Kolda
        v-tooltip="getRegionTooltip('Kolda')"
        @click="showRegionInfo('Kolda')"
      />
      <Sedhiou
        v-tooltip="getRegionTooltip('Sedhiou')"
        @click="showRegionInfo('Sedhiou')"
      />
      <Ziguenchor
        v-tooltip="getRegionTooltip('Ziguinchor')"
        @click="showRegionInfo('Ziguinchor')"
      />
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
  
  // Variables réactives
  const regionInfos = ref([]);
  const selectedRegion = ref(null);
  
  // Méthode pour récupérer les informations des régions depuis l'API
  async function fetchRegions() {
    try {
      const regions = await regionsService.getRegions();
      regionInfos.value = regions.data; // Stockage des informations dans la variable réactive
    } catch (error) {
      console.error("Erreur lors de la récupération des régions :", error);
    }
  }
  
  // Méthode pour obtenir le tooltip d'une région
  function getRegionTooltip(regionName) {
    const region = regionInfos.value.find((region) => region.libelle === regionName);
  
    if (region) {
      return `Région: ${region.libelle}\nPopulation: ${region.population}\nSuperficie: ${region.superficie} km²`;
    }
    return "Informations non disponibles";
  }
  
  // Méthode pour afficher les informations d'une région au clic (facultatif)
  function showRegionInfo(regionName) {
    const region = regionInfos.value.find((region) => region.libelle === regionName);
  
    if (region) {
      selectedRegion.value = region;
      console.log(`Libellé: ${region.libelle}`);
      console.log(`Description: ${region.description}`);
      console.log(`Population: ${region.population}`);
      console.log(`Superficie: ${region.superficie}`);
    } else {
      console.log("Informations non disponibles pour cette région.");
    }
  }
  
  // Appel de l'API au moment du montage du composant
  onMounted(fetchRegions);
  </script>
  
  <style scoped>
  /* Styles personnalisés pour les régions ou la présentation des informations */
  h3 {
    margin-top: 20px;
    font-weight: bold;
  }
  p {
    margin: 5px 0;
  }
  </style>
  