//Mettre le code JavaScript lié à la page photographer.html

//import the script from factories/photographer.js

import { photographerFactory } from "../factories/photographer.js";
import { getPhotographers, displayData, init } from "./index.js";


getPhotographers().then((data) => {
    
    const photographers = data.photographers;
    console.log(photographers);
    displayDataPhotographers(photographers);
    }
    ).catch((error) => {
        console.log(error);
    }
    );


async function displayDataPhotographers(photographers) {
    const photoHeader = document.querySelector(".photograph-header");

//filter the photographer matching with the id in the url
    const photographer = photographers.filter((photographer) => {
        //search parameter in the url
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        return photographer.id == id;
        
    }
    );
    console.log(photographer);
   

  
    //display the data of the photographer
    displayData(photographer);
   

    
}

