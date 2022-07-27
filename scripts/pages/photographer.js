import { headerPhotographerFactory } from "../factories/headerPhotographer.js";
import { mediaPhotographerFactory } from "../factories/mediaFactory.js";
import { titlesPhotographerFactory } from "../factories/titlesFactory.js";

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
      
      console.log(data.media);
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
  const photoSection = document.querySelector(".photographer_section");
  const gridDiv = document.querySelector(".grid-div ");
  //log second child of photosection
 


 //if photographer.id = url param, get all the media related to this photographer
  const photographerMedia = photographersMedia.filter((photographerMedia) => {
    //search parameter in the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return photographerMedia.photographerId == id;
  }
  );
  console.log(photographerMedia);
  console.log(photographerMedia[1].title);
  //make an array with all images contained in photographerMedia
  const photographersMediaArray = photographerMedia.map((photographerMedia) => {
   if (photographerMedia.image) {
     return photographerMedia.image;
   }
   else if (photographerMedia.video) {
     return photographerMedia.video;
   }
    // return photographerMedia.image  
  }
  );
  console.log(photographersMediaArray);


  const photographersTitleArray = photographerMedia.map((photographerMedia) => {
    return {
      title: photographerMedia.title,
      likes: photographerMedia.likes,
    };
  }
  );

 console.log(photographersTitleArray);

 
 
 const photographerGalleryFirst = mediaPhotographerFactory(photographersMediaArray);
 const photographersMediaDOM = photographerGalleryFirst.createImageFromArray();
 
 const photographerTitlesGallery = titlesPhotographerFactory(photographersTitleArray);
 const photographersTitlesDOM = photographerTitlesGallery.createTitlesFromArray();

}


async function lastInit() {
  // Récupère les datas des photographes
  const { photographersMedia } = await getPhotographersMedia();
  displayMedia(photographersMedia);
}

lastInit();

//sort the different images in the gallery by likes
// const photographersMedia = photographersMedia.sort((a, b) => {
//   return b.likes - a.likes;
// }


async function displayMediaTitlesLikes(photographersMedia) {
  const photoSection = document.querySelector(".photographer_section");
  const gridDiv = document.querySelector(".grid-div ");

 //if photographer.id = url param, get all the media related to this photographer
  const photographerMedia = photographersMedia.filter((photographerMedia) => {
    //search parameter in the url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return photographerMedia.photographerId == id;
  }
  );
  console.log(photographerMedia);
//create an array with all titles and likes contained in photographerMedia
  const photographersMediaArray = photographerMedia.map((photographerMedia) => {
    return {
      title: photographerMedia.title,
      likes: photographerMedia.likes,
    };
  }
  );

 console.log(photographersMediaArray);

// const photographerGalleryFirst = mediaPhotographerFactory(photographersMediaArray);
// const photographersMediaDOM = photographerGalleryFirst.createImageFromArray();

}
