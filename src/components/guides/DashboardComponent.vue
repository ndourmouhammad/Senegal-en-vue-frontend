<template>
  <div>
    <HeaderGuide />
    <!-- Contenu principal -->
    <div class="container-fluid mt-1">
      <div class="banniere">
        <!-- <img
              src="@/assets/evenement-bg.png"
              alt="Banner Image"
            /> -->
        <div>
          <h1>Bienvenue Mamadou !</h1>
        </div>
      </div>
      <div class="cartes d-flex justify-content-between mt-5">
        <div class="carte1">
            <p class="chiffre">150</p>
            <p class="text">Sites touristiques</p>
        </div>
        <div class="carte1">
            <p class="chiffre">50</p>
            <p class="text">Reservations</p>
        </div>
        <div class="carte1">
            <p class="chiffre">10</p>
            <p class="text">Abonnés</p>
        </div>
        <div class="carte1">
            <p class="chiffre">5</p>
            <p class="text">Clients</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderGuide from "../communs/HeaderGuide.vue";
</script>

<style scoped>
.container-fluid {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}
.banniere {
  background-image: url("@/assets/evenement-bg.png"); /* Insert the path to your image */
  background-size: cover; /* Ensures the image covers the entire section */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  border-radius: 20px;
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.banniere h1 {
  color: var(--White, #fff);
  font-family: Montserrat;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.carte1 {
  width: 250px;
  height: 208px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--couleur-primaire, #3498db);
  background: rgba(52, 152, 219, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carte1 .chiffre {
    color: #000;
font-family: Montserrat;
font-size: 45px;
font-style: normal;
font-weight: 800;
line-height: normal;
margin-top: 27px;
}
.carte1 .text {
    color: #000;
font-family: Montserrat;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 57px;
}

/* Responsivite mobile */
@media (max-width: 768px) {
  .banniere {
    height: 30vh;
  }

  .banniere h1 {
    font-size: 25px;
  }
  .cartes {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
}
</style>
