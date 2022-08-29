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
      // add aria-label attribute to img element
      imgArticle.setAttribute(
        "aria-label",
        `${data[index].title}, Ouvrir en grand`
      );
      const pLikes = document.createElement("p");
      const pHeart = document.createElement("div");
      // creat a const that creates i
      pLikes.innerHTML = `${data[index].likes}`;
      pLikes.classList.add("pLikes");
      pLikes.setAttribute("aria-label", `nombre de likes`);
      pHeart.innerHTML = `<i class="coeur fa-regular fa-heart"></i>`;
      pHeart.children[0].setAttribute(
        "aria-label",
        `Ajouter à mes favoris ; déjà ${data[index].likes} j'aime !`
      );
      invisibleDate.innerHTML = `${data[index].date}`;
      invisibleDate.classList.add("invisibleDate");
      photoSection.children[index].appendChild(globalContainer);
      globalContainer.appendChild(div);
      globalContainer.appendChild(div2);
      div.appendChild(pTitle);
      div2.appendChild(pLikes);
      div2.appendChild(pHeart);
      div2.appendChild(invisibleDate);
      counter += data[index].likes;
    }

    // creation de la partie LIKE
    const p = document.createElement("p");
    p.innerHTML = `${counter} <i class="fa-solid fa-heart"></i>`;
    p.setAttribute("tabindex", 0);
    p.setAttribute("aria-label", `nombre total de likes : ${counter}`);
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
  }

  return { createTitlesFromArray };
}
