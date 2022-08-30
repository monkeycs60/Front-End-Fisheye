// import the script from factories/photographer.js
import { photographerFactory } from "../factories/1indexphotographer.js";

async function getPhotographers() {
  let photographers = [];
  // Penser à remplacer par les données récupérées dans le json

  console.log(window.location.origin);
  // await fetch("/Front-End-Fisheye/data/photographers.json")
  let lienExterne = window.location.origin + "/data/photographers.json";
  console.log(lienExterne);
  //if lien externe  does not contains 192 then add Front-End-Fisheye before the data in LienExterne 
  if (!lienExterne.includes("192")) {
    console.log("lien externe ne contient pas 192");
    lienExterne = window.location.origin + "/Front-End-Fisheye/data/photographers.json";
  }
console.log(lienExterne);

  await fetch(lienExterne)
    .then((response) => response.json())
    .then((data) => {
      photographers = data.photographers;
    })
    .catch((error) => {
      console.log(error);
    });

  // et bien retourner le tableau photographers seulement une fois
  return {
    photographers: [...photographers],
  };
}

// Ajoute les informations sur le photographe depuis le fichier JSON directement vers le DOM (nom, localisation, tagline, prix)
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);

    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    const photographersLocation = photographerModel.photographersLocation();
    userCardDOM.appendChild(photographersLocation);

    const photographersTagline = photographerModel.photographersTagline();
    userCardDOM.appendChild(photographersTagline);

    const photographersPrice = photographerModel.photographersPrice();
    userCardDOM.appendChild(photographersPrice);
  });
}

// fonction asynchrone pour récupérer les informations en temps voulu
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
