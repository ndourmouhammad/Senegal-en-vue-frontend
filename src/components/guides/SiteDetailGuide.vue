<template>
    <div>
      <!-- Appel du composant Header -->
      <HeaderGuide />
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
          <div class="reservatios">
            <h1>Liste des reservations</h1>
            <div class="col-md-12 participants-table">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Nom complet</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <!-- Exemple de données statiques pour remplacer le contenu dynamique Angular -->
      <tr>
        <td>John Doe</td>
        <td class="table-actions">
          <img
            src="@/assets/check.svg"
            class="me-3"
            alt="Approve"
            style="cursor: pointer;"
          />
          <img
            src="@/assets/cancel.svg"
            class="me-3"
            alt="Reject"
            style="cursor: pointer;"
          />
        </td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td class="table-actions">
          <span>Accepté</span>
        </td>
      </tr>
    </tbody>
    
  </table>
  <div class="voir-tous">
    <a href="/reservations/1">Voir tous</a>
  </div>
</div>

            </div>
          
  
        </div>
        
  
      </div>
    
    </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import HeaderGuide from "../communs/HeaderGuide.vue";
    
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
    h1  {
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

    .participants-table {
  margin-top: 20px;
  padding: 20px;
}

.participants-table .table {
  width: 100%;
  border-collapse: collapse;
  padding: 20px;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-actions img {
  width: 20px;
  cursor: pointer;
}

.table-actions span {
  font-family: Montserrat;
  font-size: 14px;
}



.voir-tous a {
  font-family: Montserrat;
  font-size: 14px;
  color: #3498db;
  text-decoration: none;
}

.voir-tous a:hover {
  text-decoration: underline;
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
      .card-body h1 {
        color: var(--black, #051D30);

/* Titre */
font-family: Montserrat;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
      }
      
    }
  </style>
  
    