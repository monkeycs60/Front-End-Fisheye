export function titlesPhotographerFactory(data) {
  // const { image, video } = data;
  // console.log(image, video, data[0].image);

  console.log(data);

  //for each data create a new img element
  function createTitlesFromArray() {
    const photoSection = document.querySelector(".photographer_section");
    const gridDiv = document.querySelector(".grid-div ");
    const sticky = document.querySelector(".sticky");
    //define first child of photosection
    let counter = 0;

    //CREATE N IMG ELEMENTS CORRESPOND TO DATA.LENGTH and fill each img element with the data.image
    for (let index = 0; index < data.length; index++) {
      //create a p element with data.title and data.likes as text
      const globalContainer = document.createElement("div");
      const div = document.createElement("div");
      const div2 = document.createElement("div");
      const pTitle = document.createElement("p");
      const invisibleDate = document.createElement("p");
      div.classList.add("description-grid");
      div2.classList.add("description-grid2");
      globalContainer.classList.add("global-container");
      pTitle.innerHTML = `${data[index].title}`;
      pTitle.classList.add("pTitle");
      const pLikes = document.createElement("p");
      const pHeart = document.createElement("p");
      pLikes.innerHTML = `${data[index].likes}`;
      pLikes.classList.add("pLikes");
      pHeart.innerHTML = `<i class="coeur fa-regular fa-heart"></i>`;
      invisibleDate.innerHTML = `${data[index].date}`;
      invisibleDate.classList.add("invisibleDate");
      photoSection.children[index].appendChild(globalContainer);
      // photoSection.children[index].appendChild(div2);
      globalContainer.appendChild(div);
      globalContainer.appendChild(div2);
      div.appendChild(pTitle);
      div2.appendChild(pLikes);
      div2.appendChild(pHeart);
      div2.appendChild(invisibleDate);
      counter += data[index].likes;
    }
    console.log(counter);
    const p = document.createElement("p");
    p.innerHTML = `${counter} <i class="fa-solid fa-heart"></i>`;
    sticky.appendChild(p);

    const icon = document.querySelectorAll(".fa-heart");
    //event listener for each icon
    icon.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const previous = e.target.parentNode.previousSibling;
        if (icon.classList.contains("fa-solid")) {
          counter--;
          previous.innerHTML = parseInt(previous.innerHTML) - 1;
          p.innerHTML = `${counter} <i class="fa-solid fa-heart"></i>`;
        } else {
          counter++;
          previous.innerHTML = parseInt(previous.innerHTML) + 1;
          p.innerHTML = `${counter} <i class="fa-solid fa-heart"></i>`;
        }

        e.target.classList.toggle("fa-solid");
        e.target.classList.toggle("fa-regular");
      });
    });

    //creation LIGHTBOX
    const lightboxContainer = document.querySelector("#lightbox-container");
    const closeCross = document.querySelector(".close-cross");
    //create const for all img inside article
    const img = document.querySelectorAll("article img");
    console.log(img);
    const imgTitle = document.querySelectorAll(".pTitle");
    console.log(imgTitle);

  

    //add event listener to each img
    img.forEach((img) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();

        window.scrollTo(0, 0);


        //create a const for html
        const wholeDocument = document.querySelector("html");
        const lightboxImage = document.querySelector(".lightbox-image img");
        const closeCross = document.querySelector(".fa-xmark");
        const chevronLeft = document.querySelector(".fa-chevron-left");
        const chevronRight = document.querySelector(".fa-chevron-right");

        //impeed scroll, focus on the lightbox
        wholeDocument.style.overflowY = "hidden";
        wholeDocument.style.overflowX = "hidden";
        //

        //make lightbox visible
        lightboxContainer.style.display = "flex";
        

        //set the src of the lightboxImage to the src of the img that was clicked
        lightboxImage.src = e.target.src;

        //sort the photos following their style order
        
    

        const allArticles = document.querySelectorAll("article");


        // const previousImage = e.target.parentNode.previousSibling.children[0].src;
        // const nextImage = e.target.parentNode.nextSibling.children[0].src;
        let compteur = 0;
        let currentImg = img.dataset.order;
        console.log(typeof currentImg);
        console.log(currentImg);
        let nextPosition = parseInt(currentImg) + 1;
        let previousPosition = parseInt(currentImg) - 1;
        let nextImg = document.querySelector(`article img[data-order="${nextPosition}"]`);
        let previousImg = document.querySelector(`article img[data-order="${previousPosition}"]`);
        console.log(nextImg);
        console.log(previousImg);
       
       
        const imageActuelle = document.querySelector("#lightboxImage");
        const longueurTableau = document.querySelectorAll("article img").length;
        console.log(longueurTableau);

        // addevent listener to chevron left to see previous image
        chevronLeft.addEventListener("click", (e) => {
          e.preventDefault();
        console.log(`compteur fonction descendante : ${compteur}`);


          if (compteur > 0) {
        
            // currentImg = currentImg - compteur;
            console.log(currentImg);
            console.log(img.src);
            
            //find the img with the data-order equal to the currentImg - 1
            console.log(previousImg);
            
            console.log(document.querySelector("#lightboxImage"));
            
            imageActuelle.src = document.querySelector(`article img[data-order="${previousPosition - compteur}"]`).src
            // imageActuelle.src = previousImg.src;
           
          } else {

            const imagePrecedente = document.querySelector(`article img[data-order="${previousPosition}"]`);
            console.log(imagePrecedente);
            
            imageActuelle.src = imagePrecedente.src; 

      }
       if (compteur >= 0 && compteur <= longueurTableau - 1) {
        compteur++;
       } else {
        compteur = 0;
       }
       
        });


        
          //addevent listener to chevron right to see next image
          chevronRight.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(`compteur fonction ascendante : ${compteur}`);

            if (compteur == 0) {
              imageActuelle.src = nextImg.src;
            } else if (compteur <= longueurTableau - 1) {
              // currentImg = currentImg - compteur;
              console.log(currentImg);
              console.log(img.src);
              
              //find the img with the data-order equal to the currentImg - 1
              console.log(previousImg);
              
              console.log(document.querySelector("#lightboxImage"));
              
              imageActuelle.src = document.querySelector(`article img[data-order="${nextPosition + compteur}"]`).src
              // imageActuelle.src = previousImg.src;
             
            } else {
  
              const imagePrecedente = document.querySelector(`article img[data-order="${nextPosition}"]`);
              console.log(imagePrecedente);
              
              imageActuelle.src = imagePrecedente.src; 
  
        }

        if (compteur >= 0 && compteur <= longueurTableau - 1) {
          compteur++;
         } else {
          compteur = 0;
         }
//if img dataset order is max, then go to the first img
         
          
          });



          //add event listener to closeCross
          closeCross.addEventListener("click", () => {
            //make lightbox invisible
            lightboxContainer.style.display = "none";
            //impeed scroll, focus on the page
            wholeDocument.style.overflowY = "scroll";
            wholeDocument.style.overflowX = "scroll";
          });
      });
    });
  }

  return { createTitlesFromArray };
}
