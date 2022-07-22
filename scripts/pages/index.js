//import the script from factories/photographer.js
import { photographerFactory } from "../factories/photographer.js";

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json

  let photographers = [];
  await fetch("/Front-End-Fisheye/data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.photographers);
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

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
