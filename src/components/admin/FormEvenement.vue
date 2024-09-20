<template>
    <div>
      <HeaderAdmin />
  
      <!-- Contenu principal -->
      <div class="main container-fluid mt-5 d-flex">
        <img src="@/assets/form.svg" alt="Form Image" class="image" />
        <div class="form">
          <h1>Ajouter un evenement</h1>
         <form action="" class="mt-5">
    <div class="row">
        <!-- LibelleNombre de participants side by side -->
        <div class="col-md-6 mb-3">
            <label for="nom">Nom</label>
            <input
                type="text"
                class="form-control"
                id="nom"
                name="nom"
                placeholder="Entrez le nom"
            />
        </div>
        <div class="col-md-6 mb-3">
            <label for="lieu">Lieu</label>
            <input
                type="text"
                class="form-control"
                id="lieu"
                name="lieu"
                placeholder="Entrez la lieu"
            />
        </div>
    </div>
    <div class="row">
        <!-- Libelle and Region side by side -->
        <div class="col-md-6 mb-3">
            <label for="prix">Prix</label>
            <input
                type="text"
                class="form-control"
                id="prix"
                name="prix"
                placeholder="Entrez le prix"
            />
        </div>
        <div class="col-md-6 mb-3">
            <label for="nombre_participants">Nombre de participants</label>
            <input
                type="text"
                class="form-control"
                id="nombre_participants"
                name="nombre_participants"
                placeholder="Entrez le nombre de participants"
            />
        </div>
    </div>

    <div class="row">
        <!-- Heure d'ouverture and Heure fermeture side by side -->
        <div class="col-md-6 mb-3">
            <label for="date_debut">Date de debut</label>
            <input
                type="text"
                class="form-control"
                id="date_debut"
                name="date_debut"
                placeholder="Entrez la date de debut"
            />
        </div>
        <div class="col-md-6 mb-3">
            <label for="date_fin">Date de fin</label>
            <input
                type="text"
                class="form-control"
                id="date_fin"
                name="date_fin"
                placeholder="Entrez la date de fin"
            />
        </div>
    </div>

    <!-- Full-width Description -->
    <div class="mb-3">
        <label for="description">Description</label>
        <textarea
            class="form-control"
            id="description"
            name="description"
            placeholder="Entrez la description"
            rows="4"
        ></textarea>
    </div>

    <!-- Full-width Contenu -->
    <div class="mb-3">
        <label for="contenu">Contenu</label>
        <input
            class="form-control"
            id="contenu"
            name="contenu"
            placeholder="Entrez le contenu"
            type="file"
        />
    </div>

    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary mb-5">Ajouter</button>
</form>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import HeaderAdmin from "../communs/HeaderAdmin.vue";

  </script>
  
  <style scoped>
  .container-fluid {
    width: 85%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .d-flex {
    gap: 90px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .form h1 {
    color: var(--black, #051d30);
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
  
  .form .inputs {
    display: flex;
    gap: 45px;
  }
  
  label {
    color: var(--black, #051d30);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  
  input,
  textarea {
    width: 100%;
    border-radius: 10px;
    border: 1px solid var(--stroke_card, rgba(0, 0, 0, 0.1));
    background: var(--White, #fff);
  }
  
  textarea {
    height: auto;
  }
  
  .full-width {
    width: 100%;
  }
  
  .btn-primary {
    display: flex;
    width: 152px;
    padding: 10px 0;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-radius: 25px;
    background: var(--couleur-primaire, #3498DB);
    color: var(--White, var(--White, #FFF));
    font-family: "Nunito Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    border: none;
    display: flex;
    justify-content: center;
  }

  /* Responsivite mobile */

  @media screen and (max-width: 768px) {
    .form .inputs {
      flex-direction: column;
    }
    img {
      display:none;
    }
  } 
  </style>
  