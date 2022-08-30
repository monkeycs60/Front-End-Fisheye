// import the script from factories/photographer.js
import { photographerFactory } from "../factories/1indexphotographer.js";

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json

  let photographers = [];
  await fetch(`${window.location.origin}/data/photographers.json`)
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
