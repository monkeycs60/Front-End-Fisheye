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

  const tableauArticleLike = [];
  for (let index = 0; index < photoSection.children.length; index++) {
    for (let j = 0; j < likeCountArraySorted.length; j++) {
      if (likeCountArraySorted[index].toString() === likeCount[j].innerText) {
        tableauArticleLike.push(photoSection.children[j]);
        photoSection.children[j].dataset.order = index;
        photoSection.children[j].children[0].dataset.order = index;
      }
    }
  }
  // place the children in the dom, as child of the photoSection, according to its place in the array
  for (let index = 0; index < tableauArticleLike.length; index++) {
    photoSection.appendChild(tableauArticleLike[index]);
  }

  // set tabindex to 0 for all the key elements of photographer page
  const childrenTabindex = [
    document.querySelectorAll(".photographer_section img"),
    document.querySelectorAll(".photographer_section video"),
    document.querySelectorAll(".pTitle"),
    document.querySelectorAll(".coeur"),
  ];
  childrenTabindex.forEach((children) => {
    children.forEach((child) => {
      child.setAttribute("tabindex", 0);
    });
  });
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

    const tableauArticleLikeSort = [];
    for (let index = 0; index < photoSection.children.length; index++) {
      for (let j = 0; j < likeCountArraySorted.length; j++) {
        if (likeCountArraySorted[index].toString() === likeCount[j].innerText) {
          tableauArticleLikeSort.push(photoSection.children[j]);
        }
      }
    }
    for (let k = 0; k < tableauArticleLikeSort.length; k++) {
      photoSection.appendChild(tableauArticleLikeSort[k]);
      tableauArticleLikeSort[k].style.order = k;
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
        // SORT the date in another array
        const photographersDateArraySorted = photographersDateArray
          .sort((a, b) => new Date(a) - new Date(b))
          .reverse();

        const tableauArticleDateSort = [];
        for (let index = 0; index < photoSection.children.length; index++) {
          for (let j = 0; j < photographersDateArraySorted.length; j++) {
            if (
              photographersDateArraySorted[index] === dateInvisible[j].innerText
            ) {
              tableauArticleDateSort.push(photoSection.children[j]);
            }
          }
        }
        for (let j = 0; j < tableauArticleDateSort.length; j++) {
          photoSection.appendChild(tableauArticleDateSort[j]);
          tableauArticleDateSort[j].style.order = j;
        }

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

    // change the order of the grid items following its  title position in the mediaTitleArray
    const tableauArticleTitleSort = [];
    for (let index = 0; index < photoSection.children.length; index++) {
      for (let j = 0; j < mediaTitleArray.length; j++) {
        if (mediaTitleArray[index].toString() === mediaTitle[j].innerText) {
          tableauArticleTitleSort.push(photoSection.children[j]);
        }
      }
    }
    for (let l = 0; l < tableauArticleTitleSort.length; l++) {
      photoSection.appendChild(tableauArticleTitleSort[l]);
      tableauArticleTitleSort[l].style.order = l;
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
