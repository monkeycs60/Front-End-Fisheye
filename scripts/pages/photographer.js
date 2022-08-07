import { headerPhotographerFactory } from "../factories/headerPhotographer.js";
import { mediaPhotographerFactory } from "../factories/mediaFactory.js";
import { titlesPhotographerFactory } from "../factories/titlesFactory.js";

async function getPhotographers() {
  let photographers = [];
  await fetch("/data/photographers.json")
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

  await fetch("/data/photographers.json")
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



const photoSection = document.querySelector(".photographer_section");
const gridDiv = document.querySelectorAll(".grid-div ");
const description = document.querySelectorAll(".description-grid");
const pTitle = document.querySelectorAll(".pTitle");
const pLikes = document.querySelectorAll(".pLikes");
console.log(pTitle);

//classe les children de photoSection selon l'ordre alphabetique du titre de l'image
console.log(photoSection.children);
console.log(description[1]);
//sort photoSection.children by title
// photoSection.children.sort((a, b) => {
//   if (a.children[0].innerText < b.children[0].innerText) {
//     return -1;
//   }
//   if (a.children[0].innerText > b.children[0].innerText) {
//     return 1;
//   }
//   return 0;
// }
// );



//add event listener on filter pannel
const boutonFilter = document.querySelector(".filter-button");
boutonFilter.addEventListener("click", (e) => {
  e.preventDefault();
  const listedItems = document.querySelectorAll("li");
  const down = document.querySelector("ul");
  
  down.classList.toggle("down");
}
  );

  const listedItems = document.querySelectorAll("li");
  //change the order of the grid items
  listedItems.forEach((listedItem) => {
    listedItem.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = listedItem.innerText;
      const mediaTitle = document.querySelectorAll(".pTitle");
      console.log(filter);
      console.log(photoSection.children);
      console.log(mediaTitle[2]);
const mediaTitleArray = [];     
      mediaTitle.forEach((mediaTitle) => {
        //push the title of each media in an array
        mediaTitleArray.push(mediaTitle.innerText);
      });
      console.log(mediaTitleArray);
      //sort the array by title
      mediaTitleArray.sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      }
      );
      console.log(mediaTitleArray);
      //change the order of the grid items following its  title position in the mediaTitleArray
    
      console.log(photoSection.children);

      for (let index = 0; index < photoSection.children.length; index++) {
        if (mediaTitleArray[index] == mediaTitle[0].innerText) {
          photoSection.children[0].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[1].innerText) {
          photoSection.children[1].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[2].innerText) {
          photoSection.children[2].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[3].innerText) {
          photoSection.children[3].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[4].innerText) {
          photoSection.children[4].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[5].innerText) {
          photoSection.children[5].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[6].innerText) {
          photoSection.children[6].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[7].innerText) {
          photoSection.children[7].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[8].innerText) {
          photoSection.children[8].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[9].innerText) {
          photoSection.children[9].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[10].innerText) {
          photoSection.children[10].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[11].innerText) {
          photoSection.children[11].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[12].innerText) {
          photoSection.children[12].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[13].innerText) {
          photoSection.children[13].style.order = index;

        }
        else if (mediaTitleArray[index] == mediaTitle[14].innerText) {
          photoSection.children[14].style.order = index;

        }

      }


   


      //sort photoSection.children by mediaTitle 
    //  for (let index = 0; index < photoSection.children.length; index++) {
    //     console.log(mediaTitle[index].innerText);
    //     if (filter == mediaTitle[index].innerText) {
    //       console.log("ok");
    //       photoSection.children[index].style.order = "1";
    //     }
    //     else {
    //       photoSection.children[index].style.order = "2";
    //     }
      
    //  }
      
      //   //sort photoSection.children by title
      // photoSection.children.sort((a, b) => {
      //   if (a.children[0].innerText < b.children[0].innerText) {
      //     return -1;
      //   }
      //   if (a.children[0].innerText > b.children[0].innerText) {
      //     return 1;
      //   }
      //   return 0;
      // }
      // );
      // //sort photoSection.children by likes
      // photoSection.children.sort((a, b) => {
      //   if (a.children[1].innerText < b.children[1].innerText) {
      //     return -1;
      //   }
      //   if (a.children[1].innerText > b.children[1].innerText) {
      //     return 1;
      //   }
      //   return 0;
      // }
      // );
      // //sort photoSection.children by date
      // photoSection.children.sort((a, b) => {
      //   if (a.children[2].innerText < b.children[2].innerText) {
      //     return -1;
      //   }
      //   if (a.children[2].innerText > b.children[2].innerText) {
      //     return 1;
      //   }
      //   return 0;
      // }
      // );

      // //sort photoSection.children by popularity
      // photoSection.children.sort((a, b) => {
      //   if (a.children[3].innerText < b.children[3].innerText) {
      //     return -1;
      //   }
      //   if (a.children[3].innerText > b.children[3].innerText) {
      //     return 1;
      //   }
      //   return 0;
      // }
      // );

      // //sort photoSection.children by price
      // photoSection.children.sort((a, b) => {
      //   if (a.children[4].innerText < b.children[4].innerText) {
      //     return -1;
      //   }
      //   if (a.children[4].innerText > b.children[4].innerText) {
      //     return 1;
      //   }
      //   return 0;
      // }
      // );
    });

  }

  );

