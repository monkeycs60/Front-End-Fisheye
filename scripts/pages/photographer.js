import { headerPhotographerFactory } from "../factories/headerPhotographer.js";

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

    const photographersInfosName = photographerHeaderInfos.photographersInfosName();
    photographersInfosTxt.appendChild(photographersInfosName);

    const photographersInfosLocation = photographerHeaderInfos.photographersInfosLocation();
    photographersInfosTxt.appendChild(photographersInfosLocation);

    const photographersTagline = photographerHeaderInfos.photographersTagline();
    photographersInfosTxt.appendChild(photographersTagline);

    //append the picture to photoheader
    const photographersProfilPic = photographerHeaderInfos.photographersProfilPic();
    photoHeader.appendChild(photographersProfilPic);

}



async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
  }
  
  init();