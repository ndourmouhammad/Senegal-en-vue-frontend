<template>
  <div>
    <!-- Appel du composant Header -->
    <HeaderTouriste />
    <div class="container-fluid mt-1">
      <h1 class="titre">Détail de la page du site touristique</h1>
      <!-- Carte de l'événement -->
      <div class="card mb-3 card-no-border mt-4" style="border-radius: 30px">
        <div class="banniere">
          <img :src="eventImage" alt="Banner Image" />
        </div>
      </div>
  
      
      <div class="flex">
        <div class="sites-detail">
            <div class="body_detail mt-4">
        <div class="card-body">
          <h1>{{ eventTitle }}</h1>
          <p>{{ eventDescription }}</p>
  
          <div class="info-item">
            <img
              src="@/assets/event_seat.svg"
              alt="{{ remainingPlaces }}"
              class="me-2"
            />
            {{ remainingPlaces }} participants
          </div>
  
          <div class="info-item">
            <img
              src="@/assets/date.svg"
              alt="{{ eventStartDate }}"
              class="me-2"
            />
            {{ eventStartDate }} - {{ eventEndDate }}
          </div>
  
          <div class="info-item">
            <img
              src="@/assets/location-outline.svg"
              alt="{{ eventLocation }}"
              class="me-2"
            />
            {{ eventLocation }}
          </div>
          <div class="info-item">
            <img
              src="@/assets/phone-outline.svg"
              alt="{{ telephone }}"
              class="me-2"
            />
            {{ telephone }}
          </div>
          <div class="info-item">
            <img src="@/assets/payments.svg" alt="{{ prix }}" class="me-2" />
            {{ prix }} FCFA
          </div>
        </div>
      </div>
      <button class="btn btn-primary mb-5">Reserver</button>
        </div>
        <div class="guide">
          <img src="@/assets/guide.svg" alt="Guide Image" />
          <div class="guide-info">
            <p class="metier">Guide touristique</p>
            <p class="nom">Mamadou Ngom</p>
            <p class="detail">
                Note : 7 / 10 <br>
                Dakar Plateau / Dakar <br>
                Langues parlées : Serere, Wolof et Français
            </p>
            <p class="email">
                <a href="mailto:ngommamadou@gmail.com">ngommamadou@gmail.com</a>
            </p>
         </div>
        </div>

      </div>
      <div class=" my-5 destinations">
      <h2 class="text-center mb-5">Les activités paratiqués</h2>
      <div class="row">
        <!-- Première carte -->
        <div class="col-md-4 mb-4 d-flex">
          <div class="card shadow-sm d-flex flex-column">
            <video class="card-img-top" controls>
              <source src="@/assets/balade-lac-rose.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            <div class="card-body flex-fill">
              <h5 class="card-title">Balade lac rose</h5>
              <p class="card-text">
                Dakar est la capitale du Sénégal, est une ville dynamique située
                sur la côte atlantique. Elle est connue pour son riche
                patrimoine culturel...
              </p>
              <a href="#" class="btn btn-success">Voir plus</a>
            </div>
          </div>
        </div>

        <!-- Deuxième carte -->
        <div class="col-md-4 mb-4 d-flex">
          <div class="card shadow-sm d-flex flex-column">
            <video class="card-img-top" controls>
              <source
                src="@/assets/SenegalLandofTeranga.mp4"
                type="video/mp4"
              />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            <div class="card-body flex-fill">
              <h5 class="card-title">Safari</h5>
              <p class="card-text">
                L’île de Gorée, situé au large de Dakar au Sénégal, est célèbre
                pour son histoire liée à la traite des esclaves. Ce site classé
                patrimoine mondiale de ...
              </p>
              <a href="#" class="btn btn-success">Voir plus</a>
            </div>
          </div>
        </div>

        <!-- Troisième carte -->
        <div class="col-md-4 mb-4 d-flex">
          <div class="card shadow-sm d-flex flex-column">
            <video class="card-img-top" controls>
              <source src="@/assets/EcolodgedeLompoul.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
            <div class="card-body flex-fill">
              <h5 class="card-title">Balade dromodaire Lompoul</h5>
              <p class="card-text">
                Joal Fadiouth est une commune du Sénégal située à l’extrémité de
                la petite-côte, au sud-est de Dakar. Elle réunit en réalité deux
                villages.
              </p>
              <a href="#" class="btn btn-success">Voir plus</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  
    <FooterTouriste />
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import HeaderTouriste from "../communs/HeaderTouriste.vue";
  import FooterTouriste from "../communs/FooterTouriste.vue";
  
  // Simulate fetching event details based on the event ID
  const route = useRoute();
  const eventId = route.params.id;
  
  // Event details (sample data)
  const eventTitle = ref("");
  const eventDescription = ref("");
  const eventImage = ref("");
  const eventLocation = ref("");
  const eventStartDate = ref("");
  const eventEndDate = ref("");
  const remainingPlaces = ref(0);
  const telephone = ref("");
  const prix = ref("");
  
  const fetchEventDetails = async (id) => {
    // Simulated API call (replace with actual API call)
    const eventDetails = {
      name: `Dakar, Monument de  la  renaissance africaine`,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
  `,
      image: "https://via.placeholder.com/1200x600",
      location: "Dakar, Monument de  la  renaissance africaine",
      startDate: "09h00",
      endDate: "20h00",
      remainingPlaces: 50,
      telephone: "78 103 35 01",
      prix: "1000",
    };
  
    // Update state with fetched data
    eventTitle.value = eventDetails.name;
    eventDescription.value = eventDetails.description;
    eventImage.value = eventDetails.image;
    eventLocation.value = eventDetails.location;
    eventStartDate.value = eventDetails.startDate;
    eventEndDate.value = eventDetails.endDate;
    remainingPlaces.value = eventDetails.remainingPlaces;
    telephone.value = eventDetails.telephone;
    prix.value = eventDetails.prix;
  };
  
  // On component mount, fetch the event details
  onMounted(() => {
    fetchEventDetails(eventId);
  });
  </script>
  
  <style scoped>
  h1 .titre {
    color: #000;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

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

  .flex {
    display: flex;
    justify-content: space-between;
  }

  .guide {
    width: 600px;
    height: 308px;
    padding: 21px 14px 24px 24px;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 25px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.10);
    background: var(--White, #FFF);
    display: flex;
    gap: 25px;
  }

  .guide-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 9px;
    width: 253px;
    height: 139px;
  }

  .guide-info .metier {
    display: flex;
    height: 25px;
    padding: 10px 18px;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    background: #F0F0F0;
    color: var(--black, #051D30);
    font-family: Montserrat;
    font-size: 8px;
    font-weight: 500;
    line-height: normal;
  }

  .guide-info .nom {
    color: var(--black, #051D30);
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .guide-info .detail {
    width: 253px;
    color: var(--black, #051D30);
    font-family: "Nunito Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .guide-info .email {
    display: flex;
    width: 170px;
    padding: 5px 13px;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background: rgba(255, 130, 0, 0.10);
  }

  .guide-info .email a {
    text-decoration: none;
    color: #6E6666;
    font-family: Montserrat;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .guide img {
    width: 275px;
    height: 263px;
  }

  .destinations {
    margin-top: 120px;
  }

  .destinations h2 {
    color: var(--black, #051D30);
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .destinations .card-title {
    color: #27ae60;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 28.8px */
    letter-spacing: 0.12px;
  }

  .destinations .card-text {
    color: #000;
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
    background: #27ae60;
    border: none;
    color: #f8f9fa;
    font-family: Montserrat;
    font-size: 16px;
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

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card-body h1 {
    color: var(--black, #051d30);
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
  }

  .card-body p {
    width: 602px;
    color: var(--black, #051d30);
    font-family: "Nunito Sans";
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  }

  .info-item {
    color: var(--black, #051d30);
    font-family: "Nunito Sans";
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 30px;
    margin-left: 45px;
  }

  .btn-primary {
    display: flex;
    width: 152px;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    background: #3498db;
    color: var(--White, #fff);
    font-family: "Nunito Sans";
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  @media (max-width: 767px) {
    .card-body {
      padding: 15px;
    }

    .card-body p {
      width: 100%;
      font-family: "Nunito Sans", sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.6;
      word-wrap: break-word;
    }

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-left: 0;
      word-wrap: break-word;
    }

    .info-item img {
      margin-right: 10px;
    }

    .reservation-button {
      margin-top: 20px;
    }
    .flex {
     flex-direction: column;
    }
    .guide {
    width: 360px;
    height: 200px;
    display: inline-flex;
padding: 21px 14px 24px 24px;
justify-content: flex-end;
align-items: flex-start;
gap: 25px;
  }

  .guide-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    width: 150px;
    height: 139px;
  }

  .guide-info .metier {
    display: flex;
height: 20px;
padding: 5px 13px;
align-items: center;
gap: 10px;
  }

  .guide-info .nom {
    color: var(--black, #051D30);

/* Sous-titre */
font-family: Montserrat;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: normal;
  }

  .guide-info .detail {
    color: var(--black, #051D30);
font-family: "Nunito Sans";
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
width: 160px;
  }

  .guide-info .email {
    display: flex;
width: 127px;
padding: 5px 13px;
justify-content: space-between;
align-items: center;
  }

  .guide-info .email a {
    text-decoration: none;
    color: #6E6666;
font-family: Montserrat;
font-size: 7px;
font-style: normal;
font-weight: 500;
line-height: normal;
  }

  .guide img {
    width: 151px;
    height: 149px;
    object-fit: cover;
  }
  }

  @media (min-width: 768px) {
    .card-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .card-body p {
      width: 100%;
      max-width: 600px;
      font-family: "Nunito Sans", sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.6;
      word-wrap: break-word;
    }

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      margin-left: 20px;
      word-wrap: break-word;
    }

    .info-item img {
      margin-right: 10px;
    }

    .reservation-button {
      margin-top: 30px;
    }
     .main-image-container {
    border-radius: 30px;
    background: rgba(52, 152, 219, 0.80);
    height: auto; /* Permet à la hauteur de s'adapter au contenu */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .reactions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .main-image-container .main-img img {
    display: none; /* Cacher l'image en version mobile */
  }
  
  .blue-overlay {
    position: static;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%; /* Assurez-vous que le texte prend toute la largeur */
    color: white;
    background: none; /* Pas de fond nécessaire en mobile */
    padding: 10px;
  }
  
  .blue-overlay .title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .overlay-info {
    font-size: 12px;
  }
  .comments-section h2 {
    font-size: 20px;
  }
    
  }
</style>

  