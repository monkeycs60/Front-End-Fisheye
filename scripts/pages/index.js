// import the script from factories/photographer.js
import { photographerFactory } from "../factories/1indexphotographer.js";

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  let url = window.location.href;
  let blocPages = window.location.pathname.split("/");
  let page = blocPages[blocPages.length - 1];
  let photographers = [];
  console.log(url.substring(0, url.indexOf(page)));
  //log front end fisheye
  // await fetch("/Front-End-Fisheye/data/photographers.json")
  console.log(
    `${url.substring(
      0,
      url.indexOf(page)
    )}Front-End-Fisheye/data/photographers.json`
  );
  console.log(`${url.substring(0, url.indexOf(page))}data/photographers.json`);
  await fetch(
    `${url.substring(
      0,
      url.indexOf(page)
    )}Front-End-Fisheye/data/photographers.json`
  )
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
