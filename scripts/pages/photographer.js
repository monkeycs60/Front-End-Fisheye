import { headerPhotographerFactory } from "../factories/2headerphotographer.js";
import { mediaPhotographerFactory } from "../factories/3mediatypefactory.js";
import { titlesPhotographerFactory } from "../factories/4cardfactory.js";
import { FormValidation } from "../modules/formcontent.js";
import { lightboxDisplay } from "../modules/lightboxcontent.js";
import { defaultSortByPopularity } from "../modules/sorter.js";
import { sortByPopularity } from "../modules/sorter.js";
import { sortByDate } from "../modules/sorter.js";
import { sortByTitle } from "../modules/sorter.js";

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
  photographerGalleryFirst.createImageFromArray();

  const photographerTitlesGallery = titlesPhotographerFactory(
    photographersTitleArray
  );
  photographerTitlesGallery.createTitlesFromArray();

//Permet de faire le tri par popularité au chargement de la page photographe
defaultSortByPopularity();

//crée la lightbox
  lightboxDisplay();

 
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


// Menu de tri : tri par popularité
sortByPopularity();
 // Menu de tri : tri par date
 sortByDate();
 // Menu de tri : tri par titre
sortByTitle();




// log each individual like count

/// CONTACT FORM MODAL
const contactButton = document.querySelector(".contact_button");
const contactModal = document.querySelector("#contact_modal");

// close modal
export function closeModalContact() {
  document.querySelector(".page-container").style.opacity = "1";
  contactModal.style.display = "none";
  document.querySelector(".page-container").style.pointerEvents = "auto";
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

  FormValidation();
}

contactButton.addEventListener("click", activateContactButton);

// close the modal
const closeButton = document.querySelector(".close-cross");
closeButton.addEventListener("click", closeModalContact);

// lightboxDisplay();
