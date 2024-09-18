<template>
  <!-- Appel du composant Header -->
  <HeaderTouriste />
  <div class="container-fluid mt-4">
    <h1 class="titre">Détail de la page de l’événement</h1>
    <!-- Carte de l'événement -->
    <div class="card mb-3 card-no-border mt-4" style="border-radius: 30px">
      <div class="banniere">
        <img :src="eventImage" alt="Banner Image" />
      </div>
    </div>

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
    </div>
    <button class="btn btn-primary mb-5">Reserver</button>
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
