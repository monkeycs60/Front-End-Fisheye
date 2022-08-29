// FORM VALIDATION
const surname = document.querySelector("#surname");
const name = document.querySelector("#lastname");
const email = document.querySelector("#mail");
const message = document.querySelector("#message");

// error messages creation
const surnameErrorMessage = document.createElement("p");
const nameErrorMessage = document.createElement("p");
const emailErrorMessage = document.createElement("p");
const messageErrorMessage = document.createElement("p");

// const ouvertue/fermeture form
const contactButton = document.querySelector(".contact_button");
const contactModal = document.querySelector("#contact_modal");
const closeButton = document.querySelector(".close-cross");

// fonctions validation formulaire
export function validateSurname() {
  const surnameRegExp = /^[a-zA-ZÀ-ÿ-]+$/;

  if (surname.value.length < 2) {
    // add red borders to the input when the value is not valid (i.e. <2 characters)
    surname.style.border = "3px solid red";
    // add an error message if the value is not valid
    surnameErrorMessage.textContent =
      "Votre prénom doit contenir au moins 2 caractères";
    // apply the css "errorClass" to the error message
    surnameErrorMessage.classList.add("errorClass");

    // add the error message as child of the parent element of input (i.e. the div formData)
    if (surname.parentElement.children.length === 2) {
      surname.parentElement.appendChild(surnameErrorMessage);
    }
    // return false in order to impeed form validation
    return false;
  }
  if (!surnameRegExp.test(surname.value)) {
    // if the value written in the input doesn't match the regexp, add red borders, as above
    surname.style.border = "3px solid red";
    // add en error message
    surnameErrorMessage.textContent =
      "Le prénom ne peut pas contenir de chiffres, de caractères spéciaux ni d'espace.";
    // apply the css "errorClass" to the error message
    surnameErrorMessage.classList.add("errorClass");
    // add the error message as child of the parent element of input (i.e. the div formData)
    if (surname.parentElement.children.length === 2) {
      surname.parentElement.appendChild(surnameErrorMessage);
    }
    // return false in order to impeed form validation
    return false;
  }
  // remove the error message
  surnameErrorMessage.remove();
  surnameErrorMessage.textContent = "";
  surnameErrorMessage.classList.remove("errorClass");
  // if none of the negative conditions above are met, it means that the value is valid
  // so that, add green borders to the input
  surname.style.border = "3px solid green";
  // return true in order to allow form validation
  return true;
}

export function validateNom() {
  const nameRegExp = /^[a-zA-ZÀ-ÿ- ]+$/;

  if (name.value.length < 2) {
    name.style.border = "3px solid red";
    nameErrorMessage.textContent =
      "Votre nom doit contenir au moins 2 caractères";
    nameErrorMessage.classList.add("errorClass");

    if (name.parentElement.children.length === 2) {
      name.parentElement.appendChild(nameErrorMessage);
    }
    return false;
  }
  if (!nameRegExp.test(name.value)) {
    name.style.border = "3px solid red";
    nameErrorMessage.textContent =
      "Le nom ne peut contenir ni des chiffres ni des caractères spéciaux";
    nameErrorMessage.classList.add("errorClass");
    if (name.parentElement.children.length === 2) {
      name.parentElement.appendChild(nameErrorMessage);
    }
    return false;
  }
  nameErrorMessage.remove();
  nameErrorMessage.textContent = "";
  nameErrorMessage.classList.remove("errorClass");
  name.style.border = "3px solid green";
  return true;
}

export function validateEmail() {
  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegExp.test(email.value)) {
    email.style.border = "3px solid red";
    emailErrorMessage.textContent = "Veuillez entrer une adresse email valide.";
    emailErrorMessage.classList.add("errorClass");
    if (email.parentElement.children.length === 2) {
      email.parentElement.appendChild(emailErrorMessage);
    }
    return false;
  }
  emailErrorMessage.remove();
  email.style.border = "3px solid green";
  emailErrorMessage.classList.remove("errorClass");
  emailErrorMessage.textContent = "";
  return true;
}

export function validateMessage() {
  if (message.value.length < 10) {
    message.style.border = "3px solid red";
    messageErrorMessage.textContent =
      "Votre message doit contenir au moins 10 caractères.";
    messageErrorMessage.classList.add("errorClass");
    if (message.parentElement.children.length === 2) {
      message.parentElement.appendChild(messageErrorMessage);
    }
    return false;
  }
  if (message.value.length > 500) {
    message.style.border = "3px solid red";
    messageErrorMessage.textContent =
      "Votre message doit contenir moins de 500 caractères.";
    messageErrorMessage.classList.add("errorClass");
    if (message.parentElement.children.length === 2) {
      message.parentElement.appendChild(messageErrorMessage);
    }
    return false;
  }

  messageErrorMessage.remove();
  message.style.border = "3px solid green";
  messageErrorMessage.classList.remove("errorClass");
  messageErrorMessage.textContent = "";
  return true;
}

// fermeture formulaire
export function closeModalContact() {
  document.querySelector(".page-container").style.opacity = "1";
  contactModal.style.display = "none";
  document.querySelector(".page-container").style.pointerEvents = "auto";
}

// add event listener to the button submit
export function SubmitForm(envoiForm) {
  envoiForm.preventDefault();

  if (
    validateSurname() &&
    validateNom() &&
    validateEmail() &&
    validateMessage()
  ) {
    console.log(`surname: ${surname.value}`);
    console.log(`name: ${name.value}`);
    console.log(`email: ${email.value}`);
    console.log(`message: ${message.value}`);

    // reset the form
    // set all borders to default
    surname.style.border = "none";
    name.style.border = "none";
    email.style.border = "none";
    message.style.border = "none";
    surname.value = "";
    name.value = "";
    email.value = "";
    message.value = "";

    closeModalContact();
  } else {
    validateSurname();
    validateNom();
    validateEmail();
    validateMessage();
  }
}

export function FormValidation() {
  // FORM VALIDATION
  const submit = document.querySelector("#submitContact");

  // event listeners on the form inputs
  surname.addEventListener("keyup", validateSurname);
  email.addEventListener("keyup", validateEmail);
  name.addEventListener("keyup", validateNom);
  message.addEventListener("keyup", validateMessage);
  submit.addEventListener("click", SubmitForm, { once: true });
}

function activateContactButton(e) {
  e.preventDefault();

  // add aria-label to the contact modal with the name of the photographer
  contactModal.setAttribute("aria-label", "formulaire de contact");
  // add the photographer name to the contact form
  const artistName = document.querySelector(".name").innerText;
  contactModal.setAttribute("aria-label", `Contactez ${artistName} `);
  const titre = document.querySelector("h2");
  titre.innerHTML = `<span>Contactez-moi </span> <span> ${artistName} </span>`;

  contactModal.style.display = "block";

  document.querySelector(".page-container").style.opacity = "0.5";
  // change pointervent to none on the page container
  document.querySelector(".page-container").style.pointerEvents = "none";

  // add all the elements inside modal which you want to make focusable
  function focusOnContactModal() {
    const focusableElements = contactModal.querySelectorAll('[tabindex="0"]');
    const firstFocusableElement = focusableElements[0]; // get first element to be focused inside modal
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1]; // get last element to be focused inside modal

    document.addEventListener("keydown", (tab) => {
      const isTabPressed = tab.key === "Tab";
      if (!isTabPressed) {
        return;
      }

      if (tab.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // add focus for the last focusable element
          tab.preventDefault();
        }
      } else {
        // if tab key is pressed
        if (document.activeElement === lastFocusableElement) {
          // if focused has reached to last focusable element then focus first focusable element after pressing tab
          firstFocusableElement.focus(); // add focus for the first focusable element
          tab.preventDefault();
        }
      }
    });
    firstFocusableElement.focus();
  }
// add event listener on escape key to close the modal
  document.addEventListener("keydown", (escape) => {
    if (escape.key === "Escape") {
      closeModalContact();
    }
  });

focusOnContactModal();
FormValidation();
}

export function OpenAndCloseContactModal() {
  contactButton.addEventListener("click", activateContactButton);
  closeButton.addEventListener("click", closeModalContact);
}
