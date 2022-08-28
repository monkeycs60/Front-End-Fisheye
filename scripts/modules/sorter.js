const photoSection = document.querySelector(".photographer_section");
const fullList = document.querySelector("ul");
const boutonFiltre = document.querySelector(".filter-button");
const popularity = document.querySelector(".popularity");
const date = document.querySelector(".date");
const title = document.querySelector(".title");

// Event listener on the filter button
export function ButtonSwitchListener() {
  boutonFiltre.addEventListener("click", (e) => {
    e.preventDefault();
    boutonFiltre.style.display = "none";
    // set aria expanded to true
    boutonFiltre.setAttribute("aria-expanded", "true");
    // change innerHTML of popularity to "Popularity"
    popularity.innerHTML = `<span> Popularité </span> <i class="fa-solid fa-chevron-up"></i>`;
    fullList.classList.toggle("down");
  });
}

// TRI PAR DEFAUT au chargement de la page PHOTOGRAPHER.HTML = POPULARITE
export function defaultSortByPopularity() {
  const likeCount = document.querySelectorAll(".pLikes");
  const likeCountArray = Array.from(likeCount);

  const likeCountArrayInt = likeCountArray.map((likeCountNumber) =>
    parseInt(likeCountNumber.textContent)
  );

  const likeCountArraySorted = likeCountArrayInt.sort((a, b) => b - a);

  // CREATION DU DATA-POSITION AFIN D EVITER LES DOUBLONS DANS DATA ORDER

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

  // log parent of each photo
  const titleOrder = [];
  const likeButton = [];
  arrayMediaByOrder.forEach((child) => {
    titleOrder.push(child.parentNode.children[1].children[0].children[0]);
    likeButton.push(
      child.parentNode.children[1].children[1].children[1].children[0]
    );
  });

  for (let index = 0; index < arrayMediaByOrder.length; index++) {
    // set data-position to the index of the array
    arrayMediaByOrder[index].dataset.position = index;
    // set attribute tabindex according to the index of the array + 8 + index*2
    arrayMediaByOrder[index].setAttribute("tabindex", index * 3 + 8);

    titleOrder[index].setAttribute("tabindex", `${8 + index * 3 + 1}`);
    likeButton[index].setAttribute("tabindex", `${8 + index * 3 + 2}`);

    // titleOrder[index].setAttribute("tabindex", `${8 + index * 2}`);
  }

  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < likeCountArraySorted.length; j++) {
      if (likeCountArraySorted[index].toString() === likeCount[j].innerText) {
        photoSection.children[j].style.order = index;
        photoSection.children[j].dataset.order = index;
        photoSection.children[j].children[0].dataset.order = index;
      }
    }
  }
}

// LISTENERS POUR LES 3 BOUTONS DE TRI

// 1 - PREMIER BOUTON : POPULARITE
export function sortByPopularity() {
  function buttonPopularityPress(e) {
    e.preventDefault();

    const likeCount = document.querySelectorAll(".pLikes");
    const likeCountArray = Array.from(likeCount);

    const likeCountArrayInt = likeCountArray.map((likeCountText) =>
      parseInt(likeCountText.textContent)
    );

    const likeCountArraySorted = likeCountArrayInt.sort((a, b) => b - a);

    // create an array with the img children of photoSection sorted by data-position
    const arrayMediaLike = [];
    const articleChildrenLike = document.querySelectorAll("article");
    articleChildrenLike.forEach((child) => {
      arrayMediaLike.push(child.children[0]);
    });
    // sort the array by data-position
    const arrayMediaByOrderLike = arrayMediaLike.sort(
      (a, b) => a.dataset.position - b.dataset.position
    );

    for (let j = 0; j < arrayMediaByOrderLike.length; j++) {
      arrayMediaByOrderLike[j].setAttribute("tabindex", `${8 + j * 3}`);
      arrayMediaByOrderLike[
        j
      ].parentNode.children[1].children[0].children[0].setAttribute(
        "tabindex",
        `${8 + j * 3 + 1}`
      );
      arrayMediaByOrderLike[
        j
      ].parentNode.children[1].children[1].children[1].children[0].setAttribute(
        "tabindex",
        `${8 + j * 3 + 2}`
      );
    }

    for (let index = 0; index < photoSection.children.length; index++) {
      for (let j = 0; j < likeCountArraySorted.length; j++) {
        if (likeCountArraySorted[index].toString() === likeCount[j].innerText) {
          photoSection.children[j].style.order = index;
          photoSection.children[j].dataset.order = index;
          photoSection.children[j].children[0].dataset.order = index;
        }
      }
    }

    fullList.classList.toggle("down");
    boutonFiltre.innerHTML = `<span>Popularité</span> <i class="fa-solid fa-chevron-down"></i>`;
    boutonFiltre.style.display = "block";
    boutonFiltre.setAttribute("aria-expanded", "false");
    popularity.setAttribute("aria-selected", "true");
    title.setAttribute("aria-selected", "false");
    date.setAttribute("aria-selected", "false");
    fullList.setAttribute("aria-activedescendant", "popularity");
  }
  fullList.children[0].addEventListener("click", buttonPopularityPress);
}

// 2 - DEUXIEME BOUTON : DATE

export async function sortByDate() {
  await fetch("./../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      // filter the media array to get only the media related to the photographer

      // search parameter in the url
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      // get the media related to the photographer
      const photographerMedia = data.media.filter(
        (photographerMediaGetId) =>
          photographerMediaGetId.photographerId.toString() === id
      );

      // create an array with all the dates of the media
      const photographersDateArray = photographerMedia.map(
        (photographerMediaDate) => photographerMediaDate.date
      );

      // SORT THE PHOTOS BY DATE
      function ButtonDatePress(e) {
        e.preventDefault();

        const dateInvisible = document.querySelectorAll(".invisibleDate");
        const dateInvisibleArray = Array.from(dateInvisible);
        // for each element of dateInvisibleArray, log its parent element
        const DateImageArray = [];
        const dateLikeArray = [];
        const dateTitleArray = [];

        dateInvisibleArray.forEach((dates) => {
          dateLikeArray.push(dates.parentElement.children[1].children[0]);
          dateTitleArray.push(
            dates.parentElement.parentElement.children[0].children[0]
          );
          DateImageArray.push(
            dates.parentElement.parentElement.parentElement.children[0]
          );
        });

        for (let j = 0; j < DateImageArray.length; j++) {
          DateImageArray[j].setAttribute("tabindex", j * 3 + 8);
          dateTitleArray[j].setAttribute("tabindex", j * 3 + 8 + 1);
          dateLikeArray[j].setAttribute("tabindex", j * 3 + 8 + 2);
        }

        for (let index = 0; index < photoSection.children.length; index++) {
          for (let j = 0; j < photographersDateArray.length; j++) {
            if (photographersDateArray[index] === dateInvisible[j].innerText) {
              photoSection.children[j].style.order = index;
              photoSection.children[j].dataset.order = index;
              photoSection.children[j].children[0].dataset.order = index;
            }
          }
        }

        // for each photo, change the order of the photo in the DOM

        fullList.classList.toggle("down");
        boutonFiltre.innerHTML = `<span>Date</span> <i class="fa-solid fa-chevron-down"></i>`;
        boutonFiltre.style.display = "block";
        boutonFiltre.setAttribute("aria-expanded", "false");
        // change aria selected to true
        popularity.setAttribute("aria-selected", "false");
        title.setAttribute("aria-selected", "false");
        date.setAttribute("aria-selected", "true");
        // change aria activedescendant of fulllist to date
        fullList.setAttribute("aria-activedescendant", "date");
      }
      fullList.children[1].addEventListener("click", ButtonDatePress);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 3 - TROISIEME BOUTON : TITRE
export function sortByTitle() {
  function buttonTitlePress(e) {
    e.preventDefault();

    const mediaTitle = document.querySelectorAll(".pTitle");
    const mediaTitleArray = [];
    const mediaTitleArrayParent = [];

    mediaTitle.forEach((mediaTitleText) => {
      // push the title of each media in an array
      mediaTitleArray.push(mediaTitleText.innerText);
    });

    mediaTitle.forEach((mediaTitleParent) => {
      // push the title of each media in an array
      mediaTitleArrayParent.push(mediaTitleParent);
    });

    // sort the array by title
    mediaTitleArray.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    // sort the array by title
    mediaTitleArrayParent.sort((a, b) => {
      if (a.innerText < b.innerText) {
        return -1;
      }
      if (a.innerText > b.innerText) {
        return 1;
      }
      return 0;
    });

    // change the order of the grid items following its  title position in the mediaTitleArray

    for (let index = 0; index < photoSection.children.length; index++) {
      for (let j = 0; j < mediaTitleArray.length; j++) {
        if (mediaTitleArray[index].toString() === mediaTitle[j].innerText) {
          photoSection.children[j].style.order = index;
          photoSection.children[j].dataset.order = index;
          photoSection.children[j].children[0].dataset.order = index;
        }
      }
    }

    // get the images and video sorted by title
    const mediaTitleImageElement = [];
    const mediaTitleSubElement = [];
    const mediaLikeElement = [];

    mediaTitleArrayParent.forEach((list) => {
      mediaTitleImageElement.push(
        list.parentNode.parentNode.parentNode.children[0]
      );
      mediaLikeElement.push(
        list.parentNode.parentNode.parentNode.children[1].children[1]
          .children[1].children[0]
      );
      mediaTitleSubElement.push(list.parentNode.children[0]);
    });

    for (let j = 0; j < mediaTitleImageElement.length; j++) {
      // set data-position to the index of the array
      mediaTitleImageElement[j].setAttribute("tabindex", j * 3 + 8);
      mediaTitleSubElement[j].setAttribute("tabindex", `${8 + j * 3 + 1}`);
      mediaLikeElement[j].setAttribute("tabindex", `${8 + j * 3 + 2}`);
    }

    fullList.classList.toggle("down");
    boutonFiltre.innerHTML = `<span>Titre</span> <i class="fa-solid fa-chevron-down"></i>`;
    boutonFiltre.style.display = "block";
    boutonFiltre.setAttribute("aria-expanded", "false");
    popularity.setAttribute("aria-selected", "false");
    title.setAttribute("aria-selected", "true");
    date.setAttribute("aria-selected", "false");
    fullList.setAttribute("aria-activedescendant", "title");
  }
  fullList.children[2].addEventListener("click", buttonTitlePress);
}
