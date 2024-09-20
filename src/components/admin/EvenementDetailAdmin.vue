<template>
    <!-- Appel du composant Header -->
    <HeaderAdmin />
    <div class="container-fluid mt-4">
      
      <!-- Carte de l'événement -->
      <div class="card mb-3 card-no-border mt-1" style="border-radius: 30px">
        <div class="banniere">
          <img :src="eventImage" alt="Banner Image" />
        </div>
      </div>
      
      <div class="flex">

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
            {{ remainingPlaces }} places
          </div>
  
          <div class="info-item">
            <img
              src="@/assets/date.svg"
              alt="{{ eventStartDate }}"
              class="me-2"
            />
            Du {{ eventStartDate }} au {{ eventEndDate }}
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
  
    
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
import HeaderAdmin from "../communs/HeaderAdmin.vue";
  
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
      startDate: "25/09/2024",
      endDate: "27/09/2024",
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
  
    /* Sous titres */
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
  /* Adaptation du style fourni */
  
  .banniere img {
    border-radius: 30px;
    width: 100%;
    height: 40vh;
  }
  .flex {
      display: flex;
      justify-content: space-between;
    }
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .card-body h1 {
    color: var(--black, #051d30);
  
    /* Titre */
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  
  .card-body p {
    width: 602px;
   
    flex-shrink: 0;
    color: var(--black, #051d30);
  
    /* Paragraphes */
    font-family: "Nunito Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  
  .info-item {
    color: var(--black, #051d30);
  
    /* Paragraphes */
    font-family: "Nunito Sans";
    font-size: 14px;
    font-style: normal;
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
    color: var(--White, var(--White, #fff));
  
    /* Choix */
    font-family: "Nunito Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
  .reservatios h1 {
    color: #000;
    font-family: Montserrat;
      font-size: 45px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      margin-top: 1.5rem;
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
  @media (max-width: 767px) {
    .card-body {
      padding: 15px;
    }
  
    .card-body p {
      width: 100%; /* Ensure full width of container */
      color: var(--black, #051d30);
      font-family: "Nunito Sans", sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.6; /* Increased line-height for readability */
      word-wrap: break-word; /* Force long words to break */
    }
  
    .info-item {
      display: flex; /* Align icon and text horizontally */
      align-items: center;
      margin-bottom: 10px; /* Adjust bottom margin */
      margin-left: 0; /* Align to the left */
      word-wrap: break-word; /* Ensure content breaks if it's too long */
    }
  
    .info-item img {
      margin-right: 10px; /* Add some space between icon and text */
    }
  
    .reservation-button {
      margin-top: 20px;
    }
    .flex {
     flex-direction: column;
    }
    .reservatios h1 {
      color: #000;
      font-family: Montserrat;
        font-size: 25px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-top: 1.5rem;
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
      max-width: 600px; /* Max width for larger screens */
      color: var(--black, #051d30);
      font-family: "Nunito Sans", sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.6; /* Increased line-height */
      word-wrap: break-word; /* Break long words */
    }
  
    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      margin-left: 20px;
      word-wrap: break-word; /* Ensure content breaks if it's too long */
    }
  
    .info-item img {
      margin-right: 10px;
    }
  
    .reservation-button {
      margin-top: 30px;
    }
   
  }
  </style>
  