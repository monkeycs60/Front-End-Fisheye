export function titlesPhotographerFactory(data) {
  // const { image, video } = data;
  // console.log(image, video, data[0].image);

  console.log(data);

  //for each data create a new img element
  function createTitlesFromArray() {
    const photoSection = document.querySelector(".photographer_section");
    const gridDiv = document.querySelector(".grid-div ");
    //define first child of photosection

    //CREATE N IMG ELEMENTS CORRESPOND TO DATA.LENGTH and fill each img element with the data.image
    for (let index = 0; index < data.length; index++) {
      //create a p element with data.title and data.likes as text
      const div = document.createElement("div");
      const pTitle = document.createElement("p");
      pTitle.innerHTML = `${data[index].title}`;
      const pLikes = document.createElement("p");
      pLikes.innerHTML = `${data[index].likes} <i class="fa-solid fa-heart"></i>`;
      photoSection.children[index].appendChild(div);
        div.appendChild(pTitle);
        div.appendChild(pLikes);
    }
  }
  return { createTitlesFromArray };
}
