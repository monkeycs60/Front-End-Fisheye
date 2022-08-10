import { headerPhotographerFactory } from "../factories/headerPhotographer.js";
import { mediaPhotographerFactory } from "../factories/mediaFactory.js";
import { titlesPhotographerFactory } from "../factories/titlesFactory.js";

const photoSection = document.querySelector(".photographer_section");
const fullList = document.querySelector("ul");
const listedItems = document.querySelectorAll("li");
const boutonFiltre = document.querySelector(".filter-button");
const popularity = document.querySelector(".popularity");
const date = document.querySelector(".date");
const title = document.querySelector(".title");

async function getPhotographers() {
  let photographers = [];
  await fetch("/Front-End-Fisheye/data/photographers.json")
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
    //search parameter in the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return photographer.id == id;
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

  //append the picture to photoheader
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

  await fetch("/Front-End-Fisheye/data/photographers.json")
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
  let photographersDate = [];
  await fetch("/Front-End-Fisheye/data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      //filter the media array to get only the media related to the photographer

      //search parameter in the url
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      //get the media related to the photographer
      const photographerMedia = data.media.filter((photographerMedia) => {
        return photographerMedia.photographerId == id;
      });

      //create an array with all the dates of the media
      const photographersDateArray = photographerMedia.map(
        (photographerMedia) => {
          return photographerMedia.date;
        }
      );
      console.log(photographersDateArray);

      //SORT THE PHOTOS BY DATE
      fullList.children[2].addEventListener("click", (e) => {
        e.preventDefault();

        const dateInvisible = document.querySelectorAll(".invisibleDate");

        for (let index = 0; index < photoSection.children.length; index++) {
          for (let j = 0; j < photographersDateArray.length; j++) {
            if (photographersDateArray[index] == dateInvisible[j].innerText) {
              photoSection.children[j].style.order = index;
            }
          }
        }

        fullList.classList.toggle("down");
        boutonFiltre.innerHTML = `<p>Date</p> <i class="fa-solid fa-chevron-down"></i>`;
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
function setTri() {
  const photoLikes = document.querySelectorAll(".pLikes");
  console.log(photoLikes);
}
setTri();

async function displayMedia(photographersMedia) {
  const photoSection = document.querySelector(".photographer_section");
  const gridDiv = document.querySelector(".grid-div ");
  //log second child of photosection

  //if photographer.id = url param, get all the media related to this photographer
  const photographerMedia = photographersMedia.filter((photographerMedia) => {
    //search parameter in the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return photographerMedia.photographerId == id;
  });

  //make an array with all images contained in photographerMedia
  const photographersMediaArray = photographerMedia.map((photographerMedia) => {
    if (photographerMedia.image) {
      return photographerMedia.image;
    } else if (photographerMedia.video) {
      return photographerMedia.video;
    }
    // return photographerMedia.image
  });

  const photographersTitleArray = photographerMedia.map((photographerMedia) => {
    return {
      title: photographerMedia.title,
      likes: photographerMedia.likes,
      date: photographerMedia.date,
    };
  });

  const photographerGalleryFirst = mediaPhotographerFactory(
    photographersMediaArray
  );
  const photographersMediaDOM = photographerGalleryFirst.createImageFromArray();

  const photographerTitlesGallery = titlesPhotographerFactory(
    photographersTitleArray
  );
  const photographersTitlesDOM =
    photographerTitlesGallery.createTitlesFromArray();

  //  const photosLike = document.querySelectorAll(".pLikes");
  //  console.log(photosLike);

  const likeCount = document.querySelectorAll(".pLikes");
  console.log(likeCount);
  const likeCountArray = Array.from(likeCount);
  console.log(likeCountArray);

  const likeCountArrayInt = likeCountArray.map((likeCount) => {
    return parseInt(likeCount.textContent);
  });

  const likeCountArraySorted = likeCountArrayInt.sort((a, b) => b - a);
  console.log(likeCountArraySorted);

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < likeCountArraySorted.length; j++) {
      if (likeCountArraySorted[index] == likeCount[j].innerText) {
        photoSection.children[j].style.order = index;
      }
    }
  }
}

async function lastInit() {
  // Récupère les datas des photographes
  const { photographersMedia } = await getPhotographersMedia();
  displayMedia(photographersMedia);
}

lastInit();

//classe les children de photoSection selon l'ordre alphabetique du titre de l'image

//add event listener on FILTER pannel

boutonFiltre.addEventListener("click", (e) => {
  e.preventDefault();

  boutonFiltre.style.display = "none";

  //change innerHTML of popularity to "Popularity"
  popularity.innerHTML = `Popularité <i class="fa-solid fa-chevron-up"></i>`;

  fullList.classList.toggle("down");
});

//change the order of the grid items
//add event listener on the third child of the fullList

fullList.children[0].addEventListener("click", (e) => {
  e.preventDefault();

  const likeCount = document.querySelectorAll(".pLikes");
  console.log(likeCount);
  const likeCountArray = Array.from(likeCount);
  console.log(likeCountArray);

  const likeCountArrayInt = likeCountArray.map((likeCount) => {
    return parseInt(likeCount.textContent);
  });

  const likeCountArraySorted = likeCountArrayInt.sort((a, b) => b - a);
  console.log(likeCountArraySorted);

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < likeCountArraySorted.length; j++) {
      if (likeCountArraySorted[index] == likeCount[j].innerText) {
        photoSection.children[j].style.order = index;
      }
    }
  }

  fullList.classList.toggle("down");
  boutonFiltre.innerHTML = `<p>Popularité</p> <i class="fa-solid fa-chevron-down"></i>`;
  boutonFiltre.style.display = "block";
});

console.log(fullList.children);

//Listener for TITLE of photos
fullList.children[4].addEventListener("click", (e) => {
  e.preventDefault();

  const mediaTitle = document.querySelectorAll(".pTitle");
  const mediaTitleArray = [];

  mediaTitle.forEach((mediaTitle) => {
    //push the title of each media in an array
    mediaTitleArray.push(mediaTitle.innerText);
  });

  //sort the array by title
  mediaTitleArray.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  //change the order of the grid items following its  title position in the mediaTitleArray

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < mediaTitleArray.length; j++) {
      if (mediaTitleArray[index] == mediaTitle[j].innerText) {
        photoSection.children[j].style.order = index;
      }
    }
  }

  fullList.classList.toggle("down");
  boutonFiltre.innerHTML = `<p>Titre</p> <i class="fa-solid fa-chevron-down"></i>`;
  boutonFiltre.style.display = "block";
});

// async function orderGrid() {
// let pLikes = document.querySelectorAll(".pLikes");
// let pLikesArray = Array.from(pLikes);
// console.log(pLikes);
// console.log(pLikesArray);

// const pTitle = document.querySelectorAll(".pTitle");
// const pTitleArray = Array.from(pTitle);
// console.log(pTitle);

// const images = document.querySelectorAll("image");
// console.log(images);

// const titreSite = document.getElementsByClassName("name");
// console.log(titreSite[0]);
// }
// orderGrid();

const likede = document.getElementsByClassName("pLikes");
console.log(likede);
//log each individual like count

/// CONTACT FORM MODAL
const contactButton = document.querySelector(".contact_button");
const contactModal = document.querySelector("#contact_modal");
const modalBox = document.querySelector(".modal");

contactButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  // modal.style.display = "block";
  //toggle class active on the modal

  contactModal.style.display = "block";

  document.querySelector(".page-container").style.opacity = "0.5";
  //change pointervent to none on the page container
  document.querySelector(".page-container").style.pointerEvents = "none";
 
});

//close the modal
const closeButton = document.querySelector(".close-cross");
closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".page-container").style.opacity = "1";
  contactModal.style.display = "none";
  document.querySelector(".page-container").style.pointerEvents = "auto";
});

// const likePhotos = document.querySelectorAll(".pLikes");
// console.log(likePhotos);
