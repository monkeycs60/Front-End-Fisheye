import { headerPhotographerFactory } from "../factories/2headerphotographer.js";
import { mediaPhotographerFactory } from "../factories/3mediatypefactory.js";
import { titlesPhotographerFactory } from "../factories/4cardfactory.js";
import {
  FormValidation,
  OpenAndCloseContactModal,
} from "../modules/formcontent.js";
import { lightboxDisplay } from "../modules/lightboxcontent.js";
import {
  ButtonSwitchListener,
  defaultSortByPopularity,
  sortByPopularity,
  sortByDate,
  sortByTitle,
} from "../modules/sorter.js";

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

// On récupère les données de chacun des photographes depuis les JSON pour les afficher sur le header de la page photographer html
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

// On récupère les médias de chacun des photographes
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

// On affiche les médias chargés depuis le JSON dans le corps de la page photographer
async function displayMedia(photographersMedia) {
  // if photographer.id = url param, get all the media related to this photographer
  const photographerMedia = photographersMedia.filter((photographerMediaId) => {
    // search parameter in the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return photographerMediaId.photographerId.toString() === id;
  });

  // Permet de faire le tri entre les différentes types de médias (photo, vidéo)
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

  // on sélectionne les éléments qui nous intéressent pour ensuite les afficher (likes, titres), sauf la date - qui nous servira pour le tri
  const photographersTitleArray = photographerMedia.map(
    (photographerMediaInformation) => ({
      title: photographerMediaInformation.title,
      likes: photographerMediaInformation.likes,
      date: photographerMediaInformation.date,
    })
  );

  // On affiche les médias filtrés et leur titre dans le DOM
  const photographerGalleryFirst = mediaPhotographerFactory(
    photographersMediaArray
  );
  photographerGalleryFirst.createImageFromArray();

  const photographerTitlesGallery = titlesPhotographerFactory(
    photographersTitleArray
  );
  photographerTitlesGallery.createTitlesFromArray();

  // Permet de faire le tri par popularité au chargement de la page photographe
  defaultSortByPopularity();

  // crée la lightbox
  lightboxDisplay();
}

async function lastInit() {
  // Récupère les datas des photographes
  const { photographersMedia } = await getPhotographersMedia();
  displayMedia(photographersMedia);
}
// Appel de la fonction asynchrone
lastInit();

// Transforme le bouton "Popularité" en li avec le même intitulé
ButtonSwitchListener();
// Menu de tri : tri par popularité
sortByPopularity();
// Menu de tri : tri par date
sortByDate();
// Menu de tri : tri par titre
sortByTitle();

// formulaire

// validation du formulaire
FormValidation();
// ouvre la modal de contact ou la ferme
OpenAndCloseContactModal();
