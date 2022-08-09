import { headerPhotographerFactory } from "../factories/headerPhotographer.js";
import { mediaPhotographerFactory } from "../factories/mediaFactory.js";
import { titlesPhotographerFactory } from "../factories/titlesFactory.js";

const photoSection = document.querySelector(".photographer_section");
const gridDiv = document.querySelectorAll(".grid-div ");
const description = document.querySelectorAll(".description-grid");
const pTitle = document.querySelectorAll(".pTitle");
const fullList = document.querySelector("ul");





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
      //push each date for each media in the array
      

    
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
  await fetch("/data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      //filter the media array to get only the media related to the photographer
      
        //search parameter in the url
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        console.log(id);
        //get the media related to the photographer
        const photographerMedia = data.media.filter((photographerMedia) => {
          return photographerMedia.photographerId == id;
        });
        console.log(photographerMedia);
        //create an array with all the dates of the media
        const photographersDateArray = photographerMedia.map((photographerMedia) => {
          return photographerMedia.date;

        });
        console.log(photographersDateArray);

        //SORT THE PHOTOS BY DATE
        fullList.children[1].addEventListener("click", (e) => {
          e.preventDefault();
          console.log("click");
          const dateInvisible = document.querySelectorAll(".invisibleDate");
    

for (let index = 0; index < photoSection.children.length; index++) {
  for (let j = 0; j < photographersDateArray.length; j++) {
    if (photographersDateArray[index] == dateInvisible[j].innerText) {
      photoSection.children[j].style.order = index;
    }
    
  }
}


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
      date: photographerMedia.date,
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




//classe les children de photoSection selon l'ordre alphabetique du titre de l'image





//add event listener on filter pannel
const boutonFilter = document.querySelector(".filter-button");
boutonFilter.addEventListener("click", (e) => {
  e.preventDefault();
  const listedItems = document.querySelectorAll("li");
  const down = document.querySelector("ul");
  
  down.classList.toggle("down");
}
  );

 
  
  //change the order of the grid items
  //add event listener on the third child of the fullList 

  fullList.children[0].addEventListener("click", (e) => {
    e.preventDefault();

    const likeCount = document.querySelectorAll(".pLikes");
    const likeCountArray = Array.from(likeCount);
    console.log(likeCountArray);

    const likeCountArrayInt = likeCountArray.map((likeCount) => {
      return parseInt(likeCount.textContent);
    }
    );

    const likeCountArraySorted = likeCountArrayInt.sort((a, b) => a - b);
    console.log(likeCountArraySorted);
    
    for (let index = 0; index < photoSection.children.length; index++) {
      for (let j = 0; j < likeCountArraySorted.length; j++) {
        if (likeCountArraySorted[index] == likeCount[j].innerText) {
          photoSection.children[j].style.order = index;
        }
        
      }
    }

  }
  );

  // async function orderGrid {}
  let pLikes = document.querySelectorAll(".pLikes");
  let pLikesArray = Array.from(pLikes);
  console.log(pLikesArray);
  

    fullList.children[2].addEventListener("click", (e) => {
      e.preventDefault();
     
      const mediaTitle = document.querySelectorAll(".pTitle");
      const mediaTitleArray = [];     
      
      console.log(photoSection.children);
      console.log(mediaTitle[2]);
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
        for (let j = 0; j < mediaTitleArray.length; j++) {
          if (mediaTitleArray[index] == mediaTitle[j].innerText) {
            photoSection.children[j].style.order = index;
          }
          
        }
      }


     
    });
