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
    const imgTitle = document.querySelectorAll(".pTitle");
 

   
    const doubleSelector = document.querySelectorAll("article > video, article > img");
 
  
    //add event listener to each img
    doubleSelector.forEach((img) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();

        window.scrollTo(0, 0);


        //create a const for html
        const wholeDocument = document.querySelector("html");
        const lightboxImage = document.querySelector(".lightbox-image").children[0];
        const closeCross = document.querySelector(".fa-xmark");
        const chevronLeft = document.querySelector(".fa-chevron-left");
        const chevronRight = document.querySelector(".fa-chevron-right");
        const imageActuelle = document.querySelector("#lightboxImage");

        //impeed scroll, focus on the lightbox
        wholeDocument.style.overflowY = "hidden";
        wholeDocument.style.overflowX = "hidden";
        //

        //make lightbox visible
        lightboxContainer.style.display = "flex";
        

        //set the src of the lightboxImage to the src of the img that was clicked
        // lightboxImage.src = e.target.src;

        console.log(e.target);
        // console.log(lightboxImage.src);
        //if lightboximage includes a video, play the video
const typeOfMedia = e.target.tagName;
const mediaPlayed = document.querySelector(".lightbox-image").children[0];
const mediaContainer = document.querySelector(".lightbox-image");
        console.log(document.querySelector(".lightbox-image").innerHTML);

console.log(typeOfMedia);
if (typeOfMedia === "VIDEO") {
  mediaContainer.innerHTML = `<video id="lightboxImage" controls autoplay loop width=500 ><source src="${e.target.src}" type="video/mp4"></video>;
       <p class="lightboxDescription"></p>
  `;
  
} else {
  mediaContainer.innerHTML = `<img id="lightboxImage" src="${e.target.src}" alt="${e.target.alt}">;
  <p class="lightboxDescription"></p>
  `;
}





        let compteur = 0;
        let currentImg = img.dataset.position;
        let nextPosition = parseInt(currentImg) + 1;
        let previousPosition = parseInt(currentImg) - 1;
        let nextImg = document.querySelector(`article img[data-position="${nextPosition}"]`);
        let previousImg = document.querySelector(`article img[data-position="${previousPosition}"]`);
     
       
       
       
        const longueurTableau = document.querySelectorAll("article img").length;


        // addevent listener to chevron left to see previous image
        chevronLeft.addEventListener("click", (e) => {
          e.preventDefault();
        console.log(`compteur fonction descendante : ${compteur}`);


          if (compteur > 0) {
            
            imageActuelle.src = document.querySelector(`article img[data-position="${previousPosition - (-compteur)}"]`).src
            // imageActuelle.src = previousImg.src;
           
          } else {

            const imagePrecedente = document.querySelector(`article img[data-position="${previousPosition}"]`);          
            imageActuelle.src = imagePrecedente.src; 

      }
       if (compteur >= 0 && compteur <= longueurTableau - 1) {
        // compteur++;
        compteur--;
       } else {
        compteur = 0;
       }
       
        });


        
          //addevent listener to chevron right to see next image
          chevronRight.addEventListener("click", (e) => {
            e.preventDefault();

            const nextImgCarousel = document.querySelector(`article img[data-position="${nextPosition + compteur}"]`);
            const videoPosition = document.querySelector(`article video[data-position="${nextPosition + compteur}"]`);
            const imagePosition = document.querySelector(`article img[data-position="${nextPosition + compteur}"]`);

            console.log(`compteur fonction ascendante : ${compteur}`);
            console.log(document.querySelector(`article img[data-position="2"]`));
            //add currentImg to compteur
            
     



        
        
           
            if (parseInt(currentImg) + parseInt(compteur) == longueurTableau ) {


              // CONDITION POUR VIDEO
              //if nextImgCarousel is null, log error
              console.log(imagePosition);
//create a const, first position, for the data-position of the first image
const firstPositionImage = document.querySelector(`article img[data-position="0"]`); 
const firstPositionVideo = document.querySelector(`article video[data-position="0"]`);
console.log(firstPositionImage);
console.log(firstPositionVideo);

if (firstPositionImage == null) {
  mediaContainer.innerHTML = `<video id="lightboxImage" controls autoplay loop width=500 ><source src="${firstPositionVideo.src}" type="video/mp4"></video>;
  <p class="lightboxDescription"></p>
`;
} else {
  mediaContainer.innerHTML = `<img id="lightboxImage" src="${firstPositionImage.src}" />;
       <p class="lightboxDescription"></p>`;
}
 


              console.log("fin du carroussel");
        


              compteur = -1;
              currentImg = 0;
              nextPosition = 1;
              
            } else if (compteur == 0) {
             

              // CONDITION POUR VIDEO
              //if nextImgCarousel is null, log error
              console.log(imagePosition);
              if (imagePosition == null) {
                console.log("erreur image non trouvée");
                console.log(nextPosition + compteur);
                
                console.log(videoPosition);
                mediaContainer.innerHTML = `<video id="lightboxImage" controls autoplay loop width=500 ><source src="${videoPosition.src}" type="video/mp4"></video>;
       <p class="lightboxDescription"></p>
  `;

               //CONDITION POUR IMAGE
              } else {
                console.log("image trouvée");    
                mediaContainer.innerHTML = `<img id="lightboxImage" src="${imagePosition.src}" />;
       <p class="lightboxDescription"></p>`;
                // imageActuelle.src = document.querySelector(`article img[data-position="${nextPosition + compteur}"]`).src;
            
              }


            } else if (compteur <= longueurTableau - 1) {

             

              if (imagePosition == null) {
                console.log("erreur image non trouvée");
                console.log(nextPosition + compteur);
                
                console.log(videoPosition);
                mediaContainer.innerHTML = `<video id="lightboxImage" controls autoplay loop width=500 ><source src="${videoPosition.src}" type="video/mp4"></video>;
       <p class="lightboxDescription"></p>
  `;

               //CONDITION POUR IMAGE
              } else {
                console.log("image trouvée");    
                mediaContainer.innerHTML = `<img id="lightboxImage" src="${imagePosition.src}" />;
       <p class="lightboxDescription"></p>`;
                // imageActuelle.src = document.querySelector(`article img[data-position="${nextPosition + compteur}"]`).src;
            
              }






              console.log(`troisième condition 190 : ${nextPosition + compteur}`);
              //find the img with the data-order equal to the currentImg - 1
             
         
             
            } else {
  
              const imagePrecedente = document.querySelector(`article img[data-position="${nextPosition}"]`);             
              imageActuelle.src = imagePrecedente.src; 
  
        }

        // if (compteur >= 0 && compteur <= longueurTableau - 1) {
        //   compteur++;
        //  } else {
        //   compteur++;
        //   // compteur = 0;
        // }
        compteur++;


console.log(compteur);
         
          
          });



          //add event listener to closeCross
          closeCross.addEventListener("click", () => {
            //make lightbox invisible
            lightboxContainer.style.display = "none";
            //impeed scroll, focus on the page
            wholeDocument.style.overflowY = "scroll";
            wholeDocument.style.overflowX = "scroll";

            //reset the compteur
            compteur = 0;

          });
      });
    });
  }

  return { createTitlesFromArray };
}
