import { headerPhotographerFactory } from "../factories/2headerphotographer.js";
import { mediaPhotographerFactory } from "../factories/3mediatypefactory.js";
import { titlesPhotographerFactory } from "../factories/4cardfactory.js";
import { FormValidation } from "../modules/formcontent.js";
import { lightboxDisplay } from "../modules/lightboxcontent.js";
import { defaultSortByPopularity } from "../modules/sorter.js";

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
  photographerGalleryFirst.createImageFromArray();

  const photographerTitlesGallery = titlesPhotographerFactory(
    photographersTitleArray
  );
  photographerTitlesGallery.createTitlesFromArray();

//Permet de faire le tri par popularité au chargement de la page photographe
defaultSortByPopularity();

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

lightboxDisplay();
