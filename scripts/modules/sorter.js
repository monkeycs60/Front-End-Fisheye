const photoSection = document.querySelector(".photographer_section");
const fullList = document.querySelector("ul");


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
