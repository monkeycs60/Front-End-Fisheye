//Mettre le code JavaScript lié à la page photographer.html

//import the script from factories/photographer.js

import { photographerFactory } from "../factories/photographer.js";
import { getPhotographers, displayData, init } from "./index.js";


getPhotographers().then((data) => {
    console.log(data);
    const photographers = data.photographers;
    displayData(photographers);
    }
    ).catch((error) => {
        console.log(error);
    }
    );


