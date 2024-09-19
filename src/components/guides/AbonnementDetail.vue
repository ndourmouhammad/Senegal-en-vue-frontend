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
            <h1>Fatoumata Dansoko</h1>
          </div>
        </div>
        <div class="main flex">
          <div class="info">
            <p>Fatoumata Dansoko</p>
            <p>fatoumatadansoko@gmail.com</p>
            <p>+221 78 103 35 01</p>
            <p>Dakar plateau / Dakar</p>
            <p>15/05/2000</p>
            <p>Femme</p>
            <button class="btn">Bannir</button>
          </div>
          <div class="image">

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
    overflow-x:hidden;
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
  .flex {
    display:flex;
    gap:520px;
    justify-content:center;
    align-items : center
  }
  .image {
    width: 222px;
height: 216.736px;
flex-shrink: 0;
border-radius: 222px;
background: url(@/assets/profil-abonne.svg) lightgray 50% / cover no-repeat;
  }
  
  .info {
    width: 333px;
height: 319px;
flex-shrink: 0;
border-radius: 5px;
border: 1px solid #3498DB;

/* Thin Shadow 2 -2 - 10 */
box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.10);
margin-top:5rem;
padding: 14px 16px;
  }
  .btn {
    display: flex;
width: 95.564px;
padding: 10px 0px;
justify-content: space-between;
align-items: center;
border-radius: 25px;
background: #FF3D00;
color: var(--cartes-de-presentation, #F8F9FA);

/* Choix */
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
justify-content: center;
  }
  
  /* Responsivite mobile */
  @media (max-width: 768px) {
    .banniere {
      height: 30vh;
    }
  
    .banniere h1 {
      font-size: 25px;
    }
    .flex {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-bottom:1.5rem;
    }
    
  }
  </style>
  