<template>
    <!-- Appel du composant Header -->
    <HeaderTouriste />
    <div class="container-fluid mt-4">
      
      <div class="card mb-3 card-no-border mt-4" style="border-radius: 30px">
        <div class="banniere">
          <img :src="guideImage" alt="Banner Image" />
        </div>
      </div>

      <div class="guides">

        <div class="profil-guide">
            <h2>Les informations du guide</h2>
            <div class="infomations">
                <img src="@/assets/guide.svg" alt="">
                <div class="details">
                    <div class="info">
                        <h3>{{ guideNom }}</h3>
                        <p>{{ guideLocation }}</p>
                        <p>{{ guideLangues }}</p>
                        <p>{{ guideNbAbonnes }} abonnés</p>
                        
                        <p>{{ guideTelephone }}</p>
                        <p class="email">{{ guideEmail }}</p>
                    </div>
                    <div class="abonnement">
                        <button>S'abonner</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="info-sites mb-4">
            <h2>Les sites ajoutées récemment</h2>
            <div class="carte">
                <div class="card shadow-sm d-flex flex-column">
            <img src="@/assets/destination1.svg" alt="">
            <div class="card-body flex-fill">
              <h5 class="card-title">Balade dromodaire Lompoul</h5>
             
              
            </div>
          </div>
          <div class="card shadow-sm d-flex flex-column">
            <img src="@/assets/destination1.svg" alt="">
            <div class="card-body flex-fill">
              <h5 class="card-title">Balade dromodaire Lompoul</h5>
             
              
            </div>
          </div>
            </div>
        </div>

      </div>
  
      
      

    </div>
  
    <FooterTouriste />
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import HeaderTouriste from "../communs/HeaderTouriste.vue";
  import FooterTouriste from "../communs/FooterTouriste.vue";
  
  // Simulate fetching event details based on the event ID
  const route = useRoute();
  const guideId = route.params.id;
  
  // guide details (sample data)
  const guideNom = ref("");
  const guideLocation = ref("");
  const guideImage = ref("");
  const guideLangues = ref("");
  const guideNbAbonnes = ref("");
  const guideEmail = ref("");
  const guideTelephone = ref("");
  
  
  const fetchguideDetails = async (id) => {
    // Simulated API call (replace with actual API call)
    const guideDetails = {
      nom: `Mouhammad Ndour`,
      location: `Dakar/Dakar plateau`,
      image: "https://via.placeholder.com/1200x600",
      langues: "Français, Anglais, Arabe",
      abonnes: 50,
      telephone: "78 103 35 01",
      email: "ndourmouhammad15@gmail.com",
    };
  
    // Update state with fetched data
    guideNom.value = guideDetails.nom;
    guideLocation.value = guideDetails.location;
    guideImage.value = guideDetails.image;
    guideLangues.value = guideDetails.langues;
    guideNbAbonnes.value = guideDetails.abonnes;
    guideEmail.value = guideDetails.email;
    telephone.value = guideDetails.telephone;
  };
  
  // On component mount, fetch the guide details
  onMounted(() => {
    fetchguideDetails(guideId);
  });
  </script>
  
  <style scoped>
  

  .container-fluid {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
  }

  .banniere img {
    border-radius: 30px;
    width: 100%;
    height: 40vh;
  }

  .guides {
    display: flex;
    justify-content: space-between;
  }

  .profil-guide {
    display: flex;
    flex-direction: column;
  }
  .profil-guide h2 {
    color: #000;

/* Sous titres */
font-family: Montserrat;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-top: 40px;
margin-bottom: 40px;
  }
  .profil-guide .infomations{
    width: 719px;
height: auto;
flex-shrink: 0;
border-radius: 15.396px;
border: 1.54px solid rgba(0, 0, 0, 0.10);
background: var(--White, #FFF);
margin-bottom: 60px;
display: flex;
padding: 32px 14px 29px 24px;
gap: 40px;
  }
  .infomations img {
    width: 232px;
height: 282px;
flex-shrink: 0;
  }
  .info {
    display: inline-flex;
flex-direction: column;
align-items: flex-start;
gap: 5px;
  }
  .info h3 {
    color: var(--black, #051D30);
font-family: Montserrat;
font-size: 30.792px;
font-style: normal;
font-weight: 600;
line-height: normal;
  }
  .info p {
    color: var(--black, #051D30);
font-family: "Nunito Sans";
font-size: 18.475px;
font-style: normal;
font-weight: 400;
line-height: normal;

  }
  .info .email {
    display: flex;
width: 250px;
padding: 7.698px 20.015px;
justify-content: space-between;
align-items: center;
border-radius: 15.396px;
background: rgba(255, 130, 0, 0.10);
color: #6E6666;
font-family: Montserrat;
font-size: 12.317px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-top: -30px;
  }
  .abonnement button {
    display: flex;
width: 152px;
padding: 10px 0px;
justify-content: space-between;
align-items: center;
border-radius: 25px;
background: #3498DB;
border: none;
color: var(--White, var(--White, #FFF));

/* Choix */
font-family: "Nunito Sans";
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
display: flex;
align-items: center;
justify-content: center;
  }

  .info-sites {
    display: flex;
    flex-direction: column;
  }
  .info-sites h2 {
    color: var(--black, #051D30);

/* Sous titres */
font-family: Montserrat;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-top: 40px;
margin-bottom: 40px;
  }
  .info-sites .site {
    width: 307px;
height: 233px;
flex-shrink: 0;
border-radius: 10px;
border: 1px solid var(--stroke_card, rgba(0, 0, 0, 0.10));
background: var(--White, #FFF);
  }
  .info-sites .site .image {
    width: 301px;
height: 177px;
flex-shrink: 0;
border-radius: 10px 10px 0px 0px;
background: url(https://picsum.photos/300) lightgray 50% / cover no-repeat;
  }
  .info-sites .site .site-nom {
    color: var(--black, #051D30);
font-family: Montserrat;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
padding: 19px 211px, 9px 21px;
  }
  .info-sites .carte {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  @media (max-width: 767px) {
   .guides {
     flex-direction: column;
     align-items: center;
     gap: 20px;
   }
   
   .infomations {
     flex-direction: column;
     align-items: center;
     width: 100%;
     padding: 20px;
   }

   .info h3, .info p {
     text-align: center;
   }

   .info .email {
     width: 80%;
     text-align: center;
   }

   .profil-guide .abonnement button {
     width: 100%;
   }

   .info-sites {
     width: 100%;
     padding: 0;
   }

   .info-sites .carte {
     flex-direction: column;
     align-items: center;
   }

   .info-sites .site {
     width: 100%;
   }
   .profil-guide .infomations {
     width: 100%;}
}


  @media (min-width: 768px) {
    
  }
</style>

  