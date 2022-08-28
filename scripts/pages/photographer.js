import { headerPhotographerFactory } from "../factories/headerPhotographer.js";
import { mediaPhotographerFactory } from "../factories/mediaFactory.js";
import { titlesPhotographerFactory } from "../factories/titlesFactory.js";

const photoSection = document.querySelector(".photographer_section");
const fullList = document.querySelector("ul");
const boutonFiltre = document.querySelector(".filter-button");
const popularity = document.querySelector(".popularity");
const date = document.querySelector(".date");
const title = document.querySelector(".title");

async function getPhotographers() {
  let photographers = [];
  // await fetch("/Front-End-Fisheye/data/photographers.json")
  await fetch("./../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      photographers = data.photographers;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    photographers: [...photographers],
  };
}

async function displayData(photographers) {
  const photoHeader = document.querySelector(".photograph-header");

  const photographer = photographers.filter((photographerId) => {
    // search parameter in the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return photographerId.id.toString() === id;
  });

  const photographerHeaderInfos = headerPhotographerFactory(photographer[0]);

  const photographersInfosTxt = photographerHeaderInfos.infoCard();
  photoHeader.appendChild(photographersInfosTxt);

  const photographersInfosName =
    photographerHeaderInfos.photographersInfosName();
  photographersInfosTxt.appendChild(photographersInfosName);

  const photographersInfosLocation =
    photographerHeaderInfos.photographersInfosLocation();
  photographersInfosTxt.appendChild(photographersInfosLocation);

  const photographersTagline = photographerHeaderInfos.photographersTagline();
  photographersInfosTxt.appendChild(photographersTagline);

  // append the picture to photoheader
  const photographersProfilPic =
    photographerHeaderInfos.photographersProfilPic();
  photoHeader.appendChild(photographersProfilPic);

  // switch the DOM place of the button contact_button with the div info_card
  const contactButton = document.querySelector(".contact_button");
  const infoCard = document.querySelector(".info-card");
  photoHeader.insertBefore(infoCard, contactButton);
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

async function getPhotographersMedia() {
  let photographersMedia = [];

  // await fetch("/Front-End-Fisheye/data/photographers.json")
  await fetch("./../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      photographersMedia = data.media;
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    photographersMedia: [...photographersMedia],
  };
}

async function getPhotographersDate() {
  const photographersDate = [];
  // await fetch("/Front-End-Fisheye/data/photographers.json")
  await fetch("./../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      // filter the media array to get only the media related to the photographer

      // search parameter in the url
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      // get the media related to the photographer
      const photographerMedia = data.media.filter(
        (photographerMediaGetId) =>
          photographerMediaGetId.photographerId.toString() === id
      );

      // create an array with all the dates of the media
      const photographersDateArray = photographerMedia.map(
        (photographerMediaDate) => photographerMediaDate.date
      );

      // SORT THE PHOTOS BY DATE
      fullList.children[1].addEventListener("click", (e) => {
        e.preventDefault();

        const dateInvisible = document.querySelectorAll(".invisibleDate");
        const dateInvisibleArray = Array.from(dateInvisible);
        // for each element of dateInvisibleArray, log its parent element
        const DateImageArray = [];
        const dateLikeArray = [];
        const dateTitleArray = [];

        dateInvisibleArray.forEach((dates) => {
          dateLikeArray.push(dates.parentElement.children[1].children[0]);
          dateTitleArray.push(
            dates.parentElement.parentElement.children[0].children[0]
          );
          DateImageArray.push(
            dates.parentElement.parentElement.parentElement.children[0]
          );
        });

        for (let j = 0; j < DateImageArray.length; j++) {
          DateImageArray[j].setAttribute("tabindex", j * 3 + 8);
          dateTitleArray[j].setAttribute("tabindex", j * 3 + 8 + 1);
          dateLikeArray[j].setAttribute("tabindex", j * 3 + 8 + 2);
        }

        for (let index = 0; index < photoSection.children.length; index++) {
          for (let j = 0; j < photographersDateArray.length; j++) {
            if (photographersDateArray[index] === dateInvisible[j].innerText) {
              photoSection.children[j].style.order = index;
              photoSection.children[j].dataset.order = index;
              photoSection.children[j].children[0].dataset.order = index;
            }
          }
        }

        // for each photo, change the order of the photo in the DOM

        fullList.classList.toggle("down");
        boutonFiltre.innerHTML = `<span>Date</span> <i class="fa-solid fa-chevron-down"></i>`;
        boutonFiltre.style.display = "block";
        boutonFiltre.setAttribute("aria-expanded", "false");
        // change aria selected to true
        popularity.setAttribute("aria-selected", "false");
        title.setAttribute("aria-selected", "false");
        date.setAttribute("aria-selected", "true");
        // change aria activedescendant of fulllist to date
        fullList.setAttribute("aria-activedescendant", "date");
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    photographersDate: [...photographersDate],
  };
}

getPhotographersDate();

async function displayMedia(photographersMedia) {
  // if photographer.id = url param, get all the media related to this photographer
  const photographerMedia = photographersMedia.filter((photographerMediaId) => {
    // search parameter in the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return photographerMediaId.photographerId.toString() === id;
  });

  // make an array with all images contained in photographerMedia
  const photographersMediaArray = photographerMedia.map(
    (photographerMediaType) => {
      if (photographerMediaType.image) {
        return photographerMediaType.image;
      }
      if (photographerMediaType.video) {
        return photographerMediaType.video;
      }
      return photographerMedia.image;
    }
  );

  const photographersTitleArray = photographerMedia.map(
    (photographerMediaInformation) => ({
      title: photographerMediaInformation.title,
      likes: photographerMediaInformation.likes,
      date: photographerMediaInformation.date,
    })
  );

  const photographerGalleryFirst = mediaPhotographerFactory(
    photographersMediaArray
  );
  const photographersMediaDOM = photographerGalleryFirst.createImageFromArray();

  const photographerTitlesGallery = titlesPhotographerFactory(
    photographersTitleArray
  );
  const photographersTitlesDOM =
    photographerTitlesGallery.createTitlesFromArray();

  const likeCount = document.querySelectorAll(".pLikes");
  const likeCountArray = Array.from(likeCount);

  const likeCountArrayInt = likeCountArray.map((likeCountNumber) =>
    parseInt(likeCountNumber.textContent)
  );

  const likeCountArraySorted = likeCountArrayInt.sort((a, b) => b - a);

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < likeCountArraySorted.length; j++) {
      if (likeCountArraySorted[index].toString === likeCount[j].innerText) {
        photoSection.children[j].style.order = index;
        photoSection.children[j].dataset.order = index;
        photoSection.children[j].children[0].dataset.order = index;
      }
    }
  }

  // CREATION DU DATA-POSITION AFIN D EVITER LES DOUBLONS DANS DATA ORDER
  // CREATION DU DATA-POSITION AFIN D EVITER LES DOUBLONS DANS DATA ORDER
  // CREATION DU DATA-POSITION AFIN D EVITER LES DOUBLONS DANS DATA ORDER

  // create a const for children of article
  const articleChildren = document.querySelectorAll("article");

  // for each children push its first child in an array
  const arrayMedia = [];
  articleChildren.forEach((child) => {
    arrayMedia.push(child.children[0]);
  });

  // sort the array by data-order
  const arrayMediaByOrder = arrayMedia.sort(
    (a, b) => a.dataset.order - b.dataset.order
  );

  // log parent of each photo
  const titleOrder = [];
  const likeButton = [];
  arrayMediaByOrder.forEach((child) => {
    titleOrder.push(child.parentNode.children[1].children[0].children[0]);
    likeButton.push(
      child.parentNode.children[1].children[1].children[1].children[0]
    );
  });

  for (let index = 0; index < arrayMediaByOrder.length; index++) {
    // set data-position to the index of the array
    arrayMediaByOrder[index].dataset.position = index;
    // set attribute tabindex according to the index of the array + 8 + index*2
    arrayMediaByOrder[index].setAttribute("tabindex", index * 3 + 8);

    titleOrder[index].setAttribute("tabindex", `${8 + index * 3 + 1}`);
    likeButton[index].setAttribute("tabindex", `${8 + index * 3 + 2}`);

    // titleOrder[index].setAttribute("tabindex", `${8 + index * 2}`);
  }

  /// ///////////////////////////////////////////////////////
}

async function lastInit() {
  // Récupère les datas des photographes
  const { photographersMedia } = await getPhotographersMedia();
  displayMedia(photographersMedia);
}

lastInit();

// classe les children de photoSection selon l'ordre alphabetique du titre de l'image

// add event listener on FILTER pannel

boutonFiltre.addEventListener("click", (e) => {
  e.preventDefault();

  boutonFiltre.style.display = "none";
  // set aria expanded to true
  boutonFiltre.setAttribute("aria-expanded", "true");

  // change innerHTML of popularity to "Popularity"
  popularity.innerHTML = `<span> Popularité </span> <i class="fa-solid fa-chevron-up"></i>`;

  fullList.classList.toggle("down");
});

// change the order of the grid items
// add event listener on the third child of the fullList

fullList.children[0].addEventListener("click", (e) => {
  e.preventDefault();

  const likeCount = document.querySelectorAll(".pLikes");
  const likeCountArray = Array.from(likeCount);

  const likeCountArrayInt = likeCountArray.map((likeCountText) =>
    parseInt(likeCountText.textContent)
  );

  const likeCountArraySorted = likeCountArrayInt.sort((a, b) => b - a);

  // create an array with the img children of photoSection sorted by data-position
  const arrayMediaLike = [];
  const articleChildrenLike = document.querySelectorAll("article");
  articleChildrenLike.forEach((child) => {
    arrayMediaLike.push(child.children[0]);
  });
  // sort the array by data-position
  const arrayMediaByOrderLike = arrayMediaLike.sort(
    (a, b) => a.dataset.position - b.dataset.position
  );

  for (let j = 0; j < arrayMediaByOrderLike.length; j++) {
    arrayMediaByOrderLike[j].setAttribute("tabindex", `${8 + j * 3}`);
    arrayMediaByOrderLike[
      j
    ].parentNode.children[1].children[0].children[0].setAttribute(
      "tabindex",
      `${8 + j * 3 + 1}`
    );
    arrayMediaByOrderLike[
      j
    ].parentNode.children[1].children[1].children[1].children[0].setAttribute(
      "tabindex",
      `${8 + j * 3 + 2}`
    );
  }

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < likeCountArraySorted.length; j++) {
      if (likeCountArraySorted[index].toString() === likeCount[j].innerText) {
        photoSection.children[j].style.order = index;
        photoSection.children[j].dataset.order = index;
        photoSection.children[j].children[0].dataset.order = index;
      }
    }
  }

  fullList.classList.toggle("down");
  boutonFiltre.innerHTML = `<span>Popularité</span> <i class="fa-solid fa-chevron-down"></i>`;
  boutonFiltre.style.display = "block";
  boutonFiltre.setAttribute("aria-expanded", "false");
  popularity.setAttribute("aria-selected", "true");
  title.setAttribute("aria-selected", "false");
  date.setAttribute("aria-selected", "false");
  fullList.setAttribute("aria-activedescendant", "popularity");
});

// Listener for TITLE of photos
fullList.children[2].addEventListener("click", (e) => {
  e.preventDefault();

  const mediaTitle = document.querySelectorAll(".pTitle");
  const mediaTitleArray = [];
  const mediaTitleArrayParent = [];

  mediaTitle.forEach((mediaTitleText) => {
    // push the title of each media in an array
    mediaTitleArray.push(mediaTitleText.innerText);
  });

  mediaTitle.forEach((mediaTitleParent) => {
    // push the title of each media in an array
    mediaTitleArrayParent.push(mediaTitleParent);
  });

  // sort the array by title
  mediaTitleArray.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  // sort the array by title
  mediaTitleArrayParent.sort((a, b) => {
    if (a.innerText < b.innerText) {
      return -1;
    }
    if (a.innerText > b.innerText) {
      return 1;
    }
    return 0;
  });

  // change the order of the grid items following its  title position in the mediaTitleArray

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < mediaTitleArray.length; j++) {
      if (mediaTitleArray[index].toString() === mediaTitle[j].innerText) {
        photoSection.children[j].style.order = index;
        photoSection.children[j].dataset.order = index;
        photoSection.children[j].children[0].dataset.order = index;
      }
    }
  }

  // get the images and video sorted by title
  const mediaTitleImageElement = [];
  const mediaTitleSubElement = [];
  const mediaLikeElement = [];

  mediaTitleArrayParent.forEach((list) => {
    mediaTitleImageElement.push(
      list.parentNode.parentNode.parentNode.children[0]
    );
    mediaLikeElement.push(
      list.parentNode.parentNode.parentNode.children[1].children[1].children[1]
        .children[0]
    );
    mediaTitleSubElement.push(list.parentNode.children[0]);
  });

  for (let j = 0; j < mediaTitleImageElement.length; j++) {
    // set data-position to the index of the array
    mediaTitleImageElement[j].setAttribute("tabindex", j * 3 + 8);
    mediaTitleSubElement[j].setAttribute("tabindex", `${8 + j * 3 + 1}`);
    mediaLikeElement[j].setAttribute("tabindex", `${8 + j * 3 + 2}`);
  }

  fullList.classList.toggle("down");
  boutonFiltre.innerHTML = `<span>Titre</span> <i class="fa-solid fa-chevron-down"></i>`;
  boutonFiltre.style.display = "block";
  boutonFiltre.setAttribute("aria-expanded", "false");
  popularity.setAttribute("aria-selected", "false");
  title.setAttribute("aria-selected", "true");
  date.setAttribute("aria-selected", "false");
  fullList.setAttribute("aria-activedescendant", "title");
});

// log each individual like count

/// CONTACT FORM MODAL
const contactButton = document.querySelector(".contact_button");
const contactModal = document.querySelector("#contact_modal");

// close modal
function closeModalContact() {
  document.querySelector(".page-container").style.opacity = "1";
  contactModal.style.display = "none";
  document.querySelector(".page-container").style.pointerEvents = "auto";
}

contactButton.addEventListener("click", (e) => {
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

  // FORM VALIDATION
  const form = document.querySelector("#contactForm");
  const surname = document.querySelector("#surname");
  const name = document.querySelector("#lastname");
  const email = document.querySelector("#mail");
  const message = document.querySelector("#message");
  const submit = document.querySelector("#submitContact");
  // error messages creation
  const surnameErrorMessage = document.createElement("p");
  const nameErrorMessage = document.createElement("p");
  const emailErrorMessage = document.createElement("p");
  const messageErrorMessage = document.createElement("p");

  // fonctions validation

  function validateSurname() {
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

  function validateNom() {
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

  function validateEmail() {
    const emailRegExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegExp.test(email.value)) {
      email.style.border = "3px solid red";
      emailErrorMessage.textContent =
        "Veuillez entrer une adresse email valide.";
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

  function validateMessage() {
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

  // event listeners on the form inputs
  surname.addEventListener("keyup", validateSurname);
  email.addEventListener("keyup", validateEmail);
  name.addEventListener("keyup", validateNom);
  message.addEventListener("keyup", validateMessage);

  // add event listener to the button submit
  function SubmitForm(envoiForm) {
    envoiForm.preventDefault();
const errors = document.querySelectorAll(".errorClass");
console.log(errors);


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

      surnameErrorMessage.remove();
      surnameErrorMessage.textContent = "";
      surnameErrorMessage.classList.remove("errorClass");

      nameErrorMessage.remove();
      nameErrorMessage.textContent = "";
      nameErrorMessage.classList.remove("errorClass");

      emailErrorMessage.remove();
      emailErrorMessage.textContent = "";
      emailErrorMessage.classList.remove("errorClass");

      messageErrorMessage.remove();
      messageErrorMessage.textContent = "";
      messageErrorMessage.classList.remove("errorClass");

      //reset errors 
      errors.forEach(error => {
        error.remove();
      } );

      closeModalContact();
    } else {
      validateSurname();
      validateNom();
      validateEmail();
      validateMessage();
    }
  }
  submit.addEventListener("click", SubmitForm, {"once": true});
});

// close the modal
const closeButton = document.querySelector(".close-cross");
closeButton.addEventListener("click", closeModalContact);
