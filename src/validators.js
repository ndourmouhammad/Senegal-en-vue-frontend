// src/validators.js
export class ValidatorCore {
  static validateName(name) {
    if (!name) {
      return "Le nom complet est requis.";
    }
    if (name.length < 2) {
      return "Le nom doit comporter au moins 3 caractères.";
    }
    return ""; // No error
  }

  static validPassword(password) {
    if (!password) {
      return "Le mot de passe est requis.";
    }

    return "";
  }

  static validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "L'adresse email est requise.";
    }
    if (!emailPattern.test(email)) {
      return "L'adresse email n'est pas valide.";
    }
    return ""; // No error
  }

  static async validateEmailUnique(email) {
    try {
      const response = await fetch(
        `/api/check-email?email=${encodeURIComponent(email)}`
      );

      // Log de la réponse
      const textResponse = await response.text(); // Lire la réponse sous forme de texte
      console.log("Raw response:", textResponse);

      // Vérifiez si la réponse est un code d'erreur HTTP
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      // Essayez de parser la réponse
      const result = JSON.parse(textResponse);

      if (result.exists) {
        return "L'email est déjà pris.";
      }
      return ""; // Pas d'erreur
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      return "Une erreur s'est produite lors de la vérification de l'email.";
    }
  }

  static validatePassword(password) {
    const minLength = 8; // Minimum length
    const hasUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
    const hasLowerCase = /[a-z]/.test(password); // At least one lowercase letter
    const hasNumbers = /\d/.test(password); // At least one number
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character

    if (!password) {
      return "Le mot de passe est requis.";
    }
    if (password.length < minLength) {
      return `Le mot de passe doit comporter au moins ${minLength} caractères.`;
    }
    if (!hasUpperCase) {
      return "Le mot de passe doit contenir au moins une lettre majuscule.";
    }
    if (!hasLowerCase) {
      return "Le mot de passe doit contenir au moins une lettre minuscule.";
    }
    if (!hasNumbers) {
      return "Le mot de passe doit contenir au moins un chiffre.";
    }
    if (!hasSpecialChars) {
      return "Le mot de passe doit contenir au moins un caractère spécial.";
    }
    return ""; // No error
  }

  static validatePasswordConfirmation(password, passwordConfirmation) {
    if (password !== passwordConfirmation) {
      return "Les mots de passe ne correspondent pas.";
    }
    return ""; // No error
  }

  static validateGenre(genre) {
    if (!genre) {
      return "Le genre est requis.";
    }
    return ""; // No error
  }

  static validateTelephone(telephone) {
    const telephonePattern = /^(77|78|76|75|70|33)\d{7}$/; // Matches Senegalese phone numbers
    if (!telephone) {
      return "Le numéro de téléphone est requis.";
    }
    if (!telephonePattern.test(telephone)) {
      return "Le numéro de téléphone doit commencer par 77, 78, 76, 75, 70 ou 33 et comporter 9 chiffres.";
    }
    return ""; // No error
  }

  static validateAddress(address) {
    if (!address) {
      return "L'adresse est requise.";
    }
    return ""; // No error
  }

  static validateDate(date) {
    if (!date) {
      return "La date de naissance est requise.";
    }
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate > today) {
      return "La date de naissance ne peut pas être une date future.";
    }
    return ""; // No error
  }

  static validateRole(role) {
    if (!role) {
      return "Le rôle est requis.";
    }
    return ""; // No error
  }

  static validateFile(file, fieldName) {
    // Types MIME acceptés
    const acceptedMimeTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "video/quicktime",
    ];
    const maxSize = 50 * 1024 * 1024;

    if (!file) {
      return `Le fichier ${fieldName} est requis.`;
    }
    if (!acceptedMimeTypes.includes(file.type)) {
      return `Le fichier ${fieldName} doit être un fichier de type : ${acceptedMimeTypes.join(
        ", "
      )}.`;
    }
    if (file.size > maxSize) {
      // Limite de 50 Ko
      return `Le fichier ${fieldName} ne doit pas dépasser 50 Ko.`;
    }
    return ""; // Pas d'erreur
  }

  static validateLoginForm(email, password) {
    const emailError = this.validateEmail(email);
    const passwordError = this.validatePassword(password);

    if (emailError) {
      return emailError;
    }

    if (passwordError) {
      return passwordError;
    }

    return ""; // No error
  }

  // Validation pour vérifier que le champ n'est pas vide
static required(value) {
  return value ? '' : 'Ce champ est obligatoire';
}

// Validation pour vérifier que le tarif est un nombre positif
static positiveNumber(value) {
  return value > 0 ? '' : 'Le tarif doit être un nombre positif';
}

// Validation pour l'heure d'ouverture et de fermeture (vérification de la plage horaire)
static validTime(value) {
  return value ? '' : 'Veuillez entrer une heure valide';
}

// Validation pour la description (au moins 10 caractères)
static minLength(value, min = 10) {
  return value && value.length >= min
    ? ''
    : `Ce champ doit contenir au moins ${min} caractères`;
}

// Validation pour s'assurer que les places disponibles est un nombre positif
static validParticipants(value) {
  return value > 0 ? '' : 'Le nombre de participants doit être un nombre positif';
}

  
}
