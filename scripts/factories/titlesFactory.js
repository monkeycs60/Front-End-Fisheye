// import photographer.js
// import {Photographer} from './../pages/photographer.js';

export function titlesPhotographerFactory(data) {
  // for each data create a new img element
  function createTitlesFromArray() {
    const photoSection = document.querySelector(".photographer_section");
    const sticky = document.querySelector(".sticky");
    // define first child of photosection
    let counter = 0;

    // CREATE N IMG ELEMENTS CORRESPOND TO DATA.LENGTH and fill each img element with the data.image
    for (let index = 0; index < data.length; index++) {
      // create a p element with data.title and data.likes as text
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
      // create a const for img element inside article
      const imgArticle = document.querySelector(".photographer_section")
        .children[index].children[0];
      // set alt attribute to img element
      imgArticle.setAttribute("alt", `${data[index].title}`);
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
    const p = document.createElement("p");
    p.innerHTML = `${counter} <i class="fa-solid fa-heart"></i>`;
    sticky.appendChild(p);

    const icon = document.querySelectorAll(".fa-heart");
    // event listener for each icon
    icon.forEach((iconHeart) => {
      iconHeart.addEventListener("click", (e) => {
        const previous = e.target.parentNode.previousSibling;
        if (iconHeart.classList.contains("fa-solid")) {
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

    // creation LIGHTBOX
    const lightboxContainer = document.querySelector("#lightbox-container");
    const doubleSelector = document.querySelectorAll(
      "article > video, article > img"
    );

    // add event listener to each img
    doubleSelector.forEach((img) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();

        window.scrollTo(0, 0);

        // create a const for html
        const wholeDocument = document.querySelector("html");
        const closeCross = document.querySelector(".fa-xmark");
        const chevronLeft = document.querySelector(".fa-chevron-left");
        const chevronRight = document.querySelector(".fa-chevron-right");
        // impeed scroll, focus on the lightbox
        wholeDocument.style.overflowY = "hidden";
        wholeDocument.style.overflowX = "hidden";
        //

        // make lightbox visible
        lightboxContainer.style.display = "flex";

        // set the src of the lightboxImage to the src of the img that was clicked

        // console.log(lightboxImage.src);

        const typeOfMedia = e.target.tagName;
        const mediaContainer = document.querySelector(".lightbox-image");

        if (typeOfMedia === "VIDEO") {
          mediaContainer.innerHTML = ` <div class="lightboxImageContainer"> <video id="lightboxImage" controls autoplay loop width=500 ><source src="${e.target.src}" type="video/mp4"></video> </div>
       <p class="lightboxDescription">${e.target.parentNode.children[1].children[0].children[0].textContent}</p> 
  `;
        } else {
          mediaContainer.innerHTML = `<div class="lightboxImageContainer"> <img id="lightboxImage" src="${e.target.src}" alt="${e.target.alt}"> </div>
  <p class="lightboxDescription">${e.target.alt}</p> 
  `;
          // set .lightboxDescription width = img width
          const lightboxDescription = document.querySelector(
            ".lightboxDescription"
          );
          console.log(lightboxDescription.offsetWidth);
          console.log(e.target.offsetWidth);
          lightboxDescription.style.width = `${
            document.querySelector("#lightboxImage").offsetWidth
          }px`;
        }

        // CREATION DE L INDEX POUR LA LIGHTBOX ////////////////////////////

        // create a const for children of article
        const articleChildren = document.querySelectorAll("article");
        // for each children push its first child in an array
        const arrayMedia = [];
        articleChildren.forEach((child) => {
          arrayMedia.push(child.children[0]);
        });

        // sort the array by data-order
        const arrayMediaByOrder = arrayMedia.sort(
          (a, b) => a.dataset.order - b.dataset.order
        );

        // index of the clicked img display the img src which has the same data-position as the clicked img
        let index = arrayMediaByOrder.indexOf(e.target);

        // add event listener on chevronLeft : when clicked, display the previous img in the array
        chevronLeft.addEventListener("click", (eChevronLeft) => {
          eChevronLeft.preventDefault();
          if (index === 0) {
            index = arrayMediaByOrder.length - 1;
          } else {
            index--;
          }

          // if the img is a video, display the video
          if (arrayMediaByOrder[index].tagName === "VIDEO") {
            mediaContainer.innerHTML = ` <div class="lightboxImageContainer"> <video id="lightboxImage" controls autoplay loop width=500 ><source src="${arrayMediaByOrder[index].src}" type="video/mp4"></video> </div>
  <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
  `;
          } else {
            mediaContainer.innerHTML = `
           <div class="lightboxImageContainer"> <img id="lightboxImage" src="${arrayMediaByOrder[index].src}" /> </div>
          <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
          `;
          }
        });

        // add event listener on chevronRight : when clicked, display the next img in the array
        chevronRight.addEventListener("click", (eChevronRight) => {
          eChevronRight.preventDefault();
          if (index === arrayMediaByOrder.length - 1) {
            index = 0;
          } else {
            index++;
          }

          // if the img is a video, display the video
          if (arrayMediaByOrder[index].tagName === "VIDEO") {
            mediaContainer.innerHTML = ` <div class="lightboxImageContainer"> <video id="lightboxImage" controls autoplay loop width=500 ><source src="${arrayMediaByOrder[index].src}" type="video/mp4"></video> </div>
      <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
      `;
          } else {
            mediaContainer.innerHTML = `
          <div class="lightboxImageContainer"> <img id="lightboxImage" src="${arrayMediaByOrder[index].src}" /> </div>
          <p class="lightboxDescription">${arrayMediaByOrder[index].alt}</p> 
          `;
          }
        });

        // if you press left arrow, display the previous img in the array
        document.addEventListener("keydown", (eKeyLeft) => {
          if (eKeyLeft.key === "ArrowLeft") {
            if (index === 0) {
              index = arrayMediaByOrder.length - 1;
            } else {
              index--;
            }

            // if the img is a video, display the video
            if (arrayMediaByOrder[index].tagName === "VIDEO") {
              mediaContainer.innerHTML = ` <div class="lightboxImageContainer"><video id="lightboxImage" controls autoplay loop width=500 ><source src="${arrayMediaByOrder[index].src}" type="video/mp4"></video> </div>
  <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
  `;
            } else {
              mediaContainer.innerHTML = `
          <div class="lightboxImageContainer"> <img id="lightboxImage" src="${arrayMediaByOrder[index].src}" /> </div>
          <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
          `;
            }
          }
        });

        // if you press right arrow, display the next img in the array
        document.addEventListener("keydown", (eKeyRight) => {
          if (eKeyRight.key === "ArrowRight") {
            if (index === arrayMediaByOrder.length - 1) {
              index = 0;
            } else {
              index++;
            }

            // if the img is a video, display the video
            if (arrayMediaByOrder[index].tagName === "VIDEO") {
              mediaContainer.innerHTML = ` <div class="lightboxImageContainer"><video id="lightboxImage" controls autoplay loop width=500 ><source src="${arrayMediaByOrder[index].src}" type="video/mp4"></video> </div>
  <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
  `;
            } else {
              mediaContainer.innerHTML = `
           <div class="lightboxImageContainer"> <img id="lightboxImage" src="${arrayMediaByOrder[index].src}" /> </div>
          <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
          `;
            }
          }
        });

        // if you press esc, close the lightbox
        document.addEventListener("keydown", (eEscape) => {
          if (eEscape.key === "Escape") {
            // make lightbox invisible
            lightboxContainer.style.display = "none";
            // impeed scroll, focus on the page
            wholeDocument.style.overflowY = "scroll";
            wholeDocument.style.overflowX = "scroll";

            // reset the contenu of the mediaContainer
            mediaContainer.innerHTML = "";
          }
        });

        // if you click on the lightbox, close it
        // lightbox.addEventListener("click", (e) => {
        //   if (e.target.id === "lightbox") {
        //     lightbox.style.display = "none";
        //   }
        // });

        // add event listener to closeCross
        closeCross.addEventListener("click", () => {
          // make lightbox invisible
          lightboxContainer.style.display = "none";
          // impeed scroll, focus on the page
          wholeDocument.style.overflowY = "scroll";
          wholeDocument.style.overflowX = "scroll";

          // reset the contenu of the mediaContainer
          mediaContainer.innerHTML = "";
        });
      });
    });
  }

  return { createTitlesFromArray };
}
