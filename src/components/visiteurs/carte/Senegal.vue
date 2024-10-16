<template>
  <svg
    height="499.9936"
    version="1.1"
    width="607.6"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 407.6 299.9936"
    preserveAspectRatio="xMinYMin"
    style="overflow: hidden; position: relative; left: -0.600037px; top: -0.599998px;"
  >
    <!-- Composants représentant les régions dans le SVG avec Tooltip et redirection -->
    <Diourbel
      v-tooltip.hover="getRegionTooltip('Diourbel')"
      @click="redirectToRegion('Diourbel')"
    />
    <Dakar
      v-tooltip="getRegionTooltip('Dakar')"
      @click="redirectToRegion('Dakar')"
    />
    <Thies
      v-tooltip="getRegionTooltip('Thiès')"
      @click="redirectToRegion('Thiès')"
    />
    <Louga
      v-tooltip="getRegionTooltip('Louga')"
      @click="redirectToRegion('Louga')"
    />
    <Matam
      v-tooltip="getRegionTooltip('Matam')"
      @click="redirectToRegion('Matam')"
    />
    <SaintLouis
      v-tooltip="getRegionTooltip('Saint-Louis')"
      @click="redirectToRegion('Saint-Louis')"
    />
    <Tambacounda
      v-tooltip="getRegionTooltip('Tambacounda')"
      @click="redirectToRegion('Tambacounda')"
    />
    <Kaffrine
      v-tooltip="getRegionTooltip('Kaffrine')"
      @click="redirectToRegion('Kaffrine')"
    />
    <Fatick
      v-tooltip="getRegionTooltip('Fatick')"
      @click="redirectToRegion('Fatick')"
    />
    <Kaolack
      v-tooltip="getRegionTooltip('Kaolack')"
      @click="redirectToRegion('Kaolack')"
    />
    <Kedougou
      v-tooltip="getRegionTooltip('Kédougou')"
      @click="redirectToRegion('Kédougou')"
    />  
    <Kolda
      v-tooltip="getRegionTooltip('Kolda')"
      @click="redirectToRegion('Kolda')"
    />
    <Sedhiou
      v-tooltip="getRegionTooltip('Sedhiou')"
      @click="redirectToRegion('Sedhiou')"
    />
    <Ziguenchor
      v-tooltip="getRegionTooltip('Ziguinchor')"
      @click="redirectToRegion('Ziguinchor')"
    />

    <text x="75" y="135" font-size="9" fill="black">Diourbel</text>
    <text x="5" y="130" font-size="9" fill="black">Dakar</text>
    <text x="44" y="140" font-size="9" fill="black">Thiès</text>
    <text x="110" y="100" font-size="9" fill="black">Louga</text>
    <text x="220" y="100" font-size="9" fill="black">Matam</text>
    <text x="150" y="40" font-size="9" fill="black">Saint-Louis</text>
    <text x="250" y="190" font-size="9" fill="black">Tambacounda</text>
    <text x="140" y="170" font-size="9" fill="black">Kaffrine</text>
    <text x="65" y="170" font-size="9" fill="black">Fatick</text>
    <text x="100" y="190" font-size="9" fill="black">Kaolack</text>
    <text x="320" y="260" font-size="9" fill="black">Kédougou</text>
    <text x="180" y="250" font-size="9" fill="black">Kolda</text>
    <text x="120" y="250" font-size="9" fill="black">Sédhiou</text>
    <text x="68" y="250" font-size="9" fill="black">Ziguinchor</text>
    
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
import { useRouter } from "vue-router";

// Variables réactives
const regionInfos = ref([]);
const router = useRouter(); // Utilisation du router pour la navigation

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

// Méthode pour rediriger vers la page d'une région
function redirectToRegion(regionName) {
  const region = regionInfos.value.find((region) => region.libelle === regionName);

  if (region) {
    // Redirige vers la route de la région, par exemple /regions/Diourbel
    router.push({ name: "region", params: { regionName: region.libelle } });
  } else {
    console.error("Aucune information disponible pour cette région.");
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
  path:hover {
  fill: red; 
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3); /* Ajoute une ombre légère */
  transition: fill 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

  </style>