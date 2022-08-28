// creation LIGHTBOX
export function lightboxDisplay() {
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
        mediaContainer.innerHTML = ` <div class="lightboxImageContainer"> <video id="lightboxImage" controls autoplay loop width=500 tabindex="0"><source src="${e.target.src}" type="video/mp4"></video> </div>
       <p class="lightboxDescription">${e.target.parentNode.children[1].children[0].children[0].textContent}</p> 
  `;
        mediaContainer.children[0].children[0].setAttribute(
          "aria-label",
          `${e.target.parentNode.children[1].children[0].children[0].textContent}`
        );
      } else {
        mediaContainer.innerHTML = `<div class="lightboxImageContainer"> <img id="lightboxImage" src="${e.target.src}" alt="${e.target.alt}" tabindex="0"> </div>
  <p class="lightboxDescription">${e.target.alt}</p> 
  `;
        // set .lightboxDescription width = img width
        const lightboxDescription = document.querySelector(
          ".lightboxDescription"
        );
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
          mediaContainer.innerHTML = ` <div class="lightboxImageContainer"> <video id="lightboxImage" controls autoplay loop width=500 tabindex="0"><source src="${arrayMediaByOrder[index].src}" type="video/mp4"></video> </div>
  <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
  `;
          // add an aria label with name of the video
          mediaContainer.children[0].children[0].setAttribute(
            "aria-label",
            `${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}`
          );
        } else {
          mediaContainer.innerHTML = `
           <div class="lightboxImageContainer"> <img id="lightboxImage" src="${arrayMediaByOrder[index].src}" tabindex="0"/> </div>
          <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
          `;
          // add an aria label with name of the img
          mediaContainer.children[0].children[0].setAttribute(
            "aria-label",
            `${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}`
          );
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
          mediaContainer.innerHTML = ` <div class="lightboxImageContainer"> <video id="lightboxImage" controls autoplay loop width=500 tabindex="0"><source src="${arrayMediaByOrder[index].src}" type="video/mp4"></video> </div>
      <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
      `;
          // add an aria label with name of the video
          mediaContainer.children[0].children[0].setAttribute(
            "aria-label",
            `${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}`
          );
        } else {
          mediaContainer.innerHTML = `
          <div class="lightboxImageContainer"> <img id="lightboxImage" src="${arrayMediaByOrder[index].src}" tabindex="0" /> </div>
          <p class="lightboxDescription">${arrayMediaByOrder[index].alt}</p> 
          `;
          // add an aria label with name of the img
          mediaContainer.children[0].children[0].setAttribute(
            "aria-label",
            `${arrayMediaByOrder[index].alt}`
          );
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
            mediaContainer.innerHTML = ` <div class="lightboxImageContainer"><video id="lightboxImage" controls autoplay loop width=500 tabindex="0"><source src="${arrayMediaByOrder[index].src}" type="video/mp4"></video> </div>
  <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
  `;
            // add an aria label with name of the video
            mediaContainer.children[0].children[0].setAttribute(
              "aria-label",
              `${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}`
            );
          } else {
            mediaContainer.innerHTML = `
          <div class="lightboxImageContainer"> <img id="lightboxImage" src="${arrayMediaByOrder[index].src}" tabindex="0" /> </div>
          <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
          `;
            // add an aria label with name of the img
            mediaContainer.children[0].children[0].setAttribute(
              "aria-label",
              `${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}`
            );
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
            mediaContainer.innerHTML = ` <div class="lightboxImageContainer"><video id="lightboxImage" controls autoplay loop width=500 tabindex="0"><source src="${arrayMediaByOrder[index].src}" type="video/mp4"></video> </div>
  <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
  `;
            // add an aria label with name of the video
            mediaContainer.children[0].children[0].setAttribute(
              "aria-label",
              `${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}`
            );
          } else {
            mediaContainer.innerHTML = `
           <div class="lightboxImageContainer"> <img id="lightboxImage" src="${arrayMediaByOrder[index].src}" tabindex="0"/> </div>
          <p class="lightboxDescription">${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}</p> 
          `;
            // add an aria label with name of the img
            mediaContainer.children[0].children[0].setAttribute(
              "aria-label",
              `${arrayMediaByOrder[index].nextElementSibling.children[0].children[0].textContent}`
            );
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
          // wholeDocument.style.overflowX = "scroll";

          // reset the contenu of the mediaContainer
          mediaContainer.innerHTML = "";
        }
      });

      // add event listener to closeCross
      closeCross.addEventListener("click", () => {
        // make lightbox invisible
        lightboxContainer.style.display = "none";
        // impeed scroll, focus on the page
        wholeDocument.style.overflowY = "scroll";
        // wholeDocument.style.overflowX = "scroll";

        // reset the contenu of the mediaContainer
        mediaContainer.innerHTML = "";
      });


      // ACTIVATE FOCUS ON LIGHTBOX WHEN OPENED
      function focusOnLightboxModal() {
        
        const allFocusableElements = lightboxContainer.querySelectorAll(
          '[tabindex="0"]'
        );
        console.log(allFocusableElements);
        const firstFocusableElement = allFocusableElements[0];
        console.log(firstFocusableElement);
        const lastFocusableElement =
          allFocusableElements[allFocusableElements.length - 1]; // get last element to be focused inside modal
        console.log(lastFocusableElement);
    
        document.addEventListener("keydown", function (e) {
          let isTabPressed = e.key === "Tab";
          if (!isTabPressed) {
            return;
          }
          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }
        });
        firstFocusableElement.focus();
      }
      focusOnLightboxModal();
    });
  });
}
