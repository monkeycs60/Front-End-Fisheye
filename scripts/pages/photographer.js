import { headerPhotographerFactory } from "../factories/headerPhotographer.js";
import { mediaPhotographerFactory } from "../factories/mediaFactory.js";
import { titlesPhotographerFactory } from "../factories/titlesFactory.js";

const photoSection = document.querySelector(".photographer_section");
const fullList = document.querySelector("ul");
const boutonFiltre = document.querySelector(".filter-button");
const popularity = document.querySelector(".popularity");

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

  const photographer = photographers.filter((photographer) => {
    // search parameter in the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return photographer.id.toString() === id;
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
      console.log(data);
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
        (photographerMedia) => photographerMedia.photographerId == id
      );

      // create an array with all the dates of the media
      const photographersDateArray = photographerMedia.map(
        (photographerMedia) => photographerMedia.date
      );

      // SORT THE PHOTOS BY DATE
      fullList.children[1].addEventListener("click", (e) => {
        e.preventDefault();

        const dateInvisible = document.querySelectorAll(".invisibleDate");

        for (let index = 0; index < photoSection.children.length; index++) {
          for (let j = 0; j < photographersDateArray.length; j++) {
            if (photographersDateArray[index] == dateInvisible[j].innerText) {
              photoSection.children[j].style.order = index;
              console.log(photoSection.children[j]);
              photoSection.children[j].dataset.order = index;
              photoSection.children[j].children[0].dataset.order = index;
              console.log(
                `tri par date : ${photoSection.children[j].dataset.order}`
              );
            }
          }
        }

        // for each photo, change the order of the photo in the DOM

        fullList.classList.toggle("down");
        boutonFiltre.innerHTML = `<span>Date</span> <i class="fa-solid fa-chevron-down"></i>`;
        boutonFiltre.style.display = "block";
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
  const photoSection = document.querySelector(".photographer_section");
  // log second child of photosection

  // if photographer.id = url param, get all the media related to this photographer
  const photographerMedia = photographersMedia.filter((photographerMedia) => {
    // search parameter in the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return photographerMedia.photographerId == id;
  });

  // make an array with all images contained in photographerMedia
  const photographersMediaArray = photographerMedia.map((photographerMedia) => {
    if (photographerMedia.image) {
      return photographerMedia.image;
    }
    if (photographerMedia.video) {
      return photographerMedia.video;
    }
    // return photographerMedia.image
  });

  const photographersTitleArray = photographerMedia.map(
    (photographerMedia) => ({
      title: photographerMedia.title,
      likes: photographerMedia.likes,
      date: photographerMedia.date,
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

  const likeCountArrayInt = likeCountArray.map((likeCount) =>
    parseInt(likeCount.textContent)
  );

  const likeCountArraySorted = likeCountArrayInt.sort((a, b) => b - a);
  console.log(likeCountArraySorted);

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < likeCountArraySorted.length; j++) {
      if (likeCountArraySorted[index] == likeCount[j].innerText) {
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
  console.log(articleChildren);

  // for each children push its first child in an array
  const arrayMedia = [];
  articleChildren.forEach((child) => {
    arrayMedia.push(child.children[0]);
  });
  console.log(arrayMedia);

  // sort the array by data-order
  const arrayMediaByOrder = arrayMedia.sort(
    (a, b) => a.dataset.order - b.dataset.order
  );

  console.log(arrayMediaByOrder);

  for (let index = 0; index < arrayMediaByOrder.length; index++) {
    // set data-position to the index of the array
    arrayMediaByOrder[index].dataset.position = index;
  }

  /// /////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////
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

  // change innerHTML of popularity to "Popularity"
  popularity.innerHTML = `<span> Popularité </span> <i class="fa-solid fa-chevron-up"></i>`;

  fullList.classList.toggle("down");
});

// change the order of the grid items
// add event listener on the third child of the fullList

fullList.children[0].addEventListener("click", (e) => {
  e.preventDefault();

  const likeCount = document.querySelectorAll(".pLikes");
  console.log(likeCount);
  const likeCountArray = Array.from(likeCount);
  console.log(likeCountArray);

  const likeCountArrayInt = likeCountArray.map((likeCount) =>
    parseInt(likeCount.textContent)
  );

  const likeCountArraySorted = likeCountArrayInt.sort((a, b) => b - a);
  console.log(likeCountArraySorted);

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < likeCountArraySorted.length; j++) {
      if (likeCountArraySorted[index] == likeCount[j].innerText) {
        photoSection.children[j].style.order = index;
        console.log(photoSection.children[j]);
        photoSection.children[j].dataset.order = index;
        photoSection.children[j].children[0].dataset.order = index;
        console.log(
          `tri par likes : ${photoSection.children[j].dataset.order}`
        );
      }
    }
  }

  fullList.classList.toggle("down");
  boutonFiltre.innerHTML = `<span>Popularité</span> <i class="fa-solid fa-chevron-down"></i>`;
  boutonFiltre.style.display = "block";
});

// Listener for TITLE of photos
fullList.children[2].addEventListener("click", (e) => {
  e.preventDefault();

  const mediaTitle = document.querySelectorAll(".pTitle");
  const mediaTitleArray = [];

  mediaTitle.forEach((mediaTitle) => {
    // push the title of each media in an array
    mediaTitleArray.push(mediaTitle.innerText);
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

  // change the order of the grid items following its  title position in the mediaTitleArray

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < mediaTitleArray.length; j++) {
      if (mediaTitleArray[index] == mediaTitle[j].innerText) {
        photoSection.children[j].style.order = index;
        photoSection.children[j].dataset.order = index;
        photoSection.children[j].children[0].dataset.order = index;
      }
    }
  }

  fullList.classList.toggle("down");
  boutonFiltre.innerHTML = `<span>Titre</span> <i class="fa-solid fa-chevron-down"></i>`;
  boutonFiltre.style.display = "block";
});

// log each individual like count

/// CONTACT FORM MODAL
const contactButton = document.querySelector(".contact_button");
const contactModal = document.querySelector("#contact_modal");
const modalBox = document.querySelector(".modal");

contactButton.addEventListener("click", (e) => {
  e.preventDefault();

  // add the photographer name to the contact form
  const artistName = document.querySelector(".name").innerText;
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

  surname.addEventListener("keyup", validateSurname);
  email.addEventListener("keyup", validateEmail);
  name.addEventListener("keyup", validateNom);
  message.addEventListener("keyup", validateMessage);
  // message.addEventListener("keyup", validateMessage);

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
    } else if (!surnameRegExp.test(surname.value)) {
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
    } else {
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
     } else if (!nameRegExp.test(name.value)) {
       name.style.border = "3px solid red";
       nameErrorMessage.textContent =
         "Le nom ne peut contenir ni des chiffres ni des caractères spéciaux";
       nameErrorMessage.classList.add("errorClass");
       if (name.parentElement.children.length === 2) {
         name.parentElement.appendChild(nameErrorMessage);
       }
       return false;
     } else {
       nameErrorMessage.remove();
       nameErrorMessage.textContent = "";
       nameErrorMessage.classList.remove("errorClass");
       name.style.border = "3px solid green";
       return true;
     }
  }

  function validateEmail() {
    const emailRegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegExp.test(email.value)) {
      email.style.border = "3px solid red";
      emailErrorMessage.textContent =
        "Veuillez entrer une adresse email valide.";
      emailErrorMessage.classList.add("errorClass");
      if (email.parentElement.children.length === 2) {
        email.parentElement.appendChild(emailErrorMessage);
      }
      return false;
    } else {
      emailErrorMessage.remove();
    email.style.border = "3px solid green";
    emailErrorMessage.classList.remove("errorClass");
    emailErrorMessage.textContent = "";
    return true;
    }
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
    } else if (message.value.length > 500) {
      message.style.border = "3px solid red";
      messageErrorMessage.textContent =
        "Votre message doit contenir moins de 500 caractères.";
      messageErrorMessage.classList.add("errorClass");
      if (message.parentElement.children.length === 2) {
        message.parentElement.appendChild(messageErrorMessage);
      }
      return false;
    }
    else {
      messageErrorMessage.remove();
    message.style.border = "3px solid green";
    messageErrorMessage.classList.remove("errorClass");
    messageErrorMessage.textContent = "";
    return true;
    }
  }

  // add event listener to the button submit
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    // call the functions to validate the form
    validateSurname();
    validateNom();
    validateEmail();
    validateMessage();
    // if all the functions return true, the form is submitted
    if (
      validateSurname() &&
      validateNom() &&
      validateEmail() &&
      validateMessage()
    ) {
      


      console.log(`Prénom : ${surname.value}`);
      console.log(`Nom : ${name.value}`);
      console.log(`Email : ${mail.value}`);
      console.log(`Message : ${message.value}`);


      

      // reset the form
      // set all borders to default
      surname.style.border = "3px solid #ccc";
      name.style.border = "3px solid #ccc";
      email.style.border = "3px solid #ccc";
      message.style.border = "3px solid #ccc";
      surname.value = "";
      name.value = "";
      email.value = "";
      message.value = "";


      // reset the error messages

      surnameErrorMessage.remove();
      surname.style.border = "3px solid grey";
      surnameErrorMessage.textContent = "";
      surnameErrorMessage.classList.remove("errorClass");

      nameErrorMessage.remove();
      name.style.border = "3px solid grey";
      nameErrorMessage.textContent = "";
      nameErrorMessage.classList.remove("errorClass");

      emailErrorMessage.remove();
      email.style.border = "3px solid grey";
      emailErrorMessage.textContent = "";
      emailErrorMessage.classList.remove("errorClass");

      messageErrorMessage.remove();
       message.style.border = "3px solid grey";
       messageErrorMessage.textContent = "";
       messageErrorMessage.classList.remove("errorClass");

      form.reset();
      closeModalContact();
    } else {
      return false;
    }
  });
});

// close the modal
const closeButton = document.querySelector(".close-cross");
closeButton.addEventListener("click", closeModalContact);

function closeModalContact() {
  // const errorMessageAll = document.querySelectorAll(".errorClass");
  // errorMessageAll.forEach((errorMessage) => {
  //   errorMessage.remove();
  // }
  // );
 
  document.querySelector(".page-container").style.opacity = "1";
  contactModal.style.display = "none";
  document.querySelector(".page-container").style.pointerEvents = "auto";


}
