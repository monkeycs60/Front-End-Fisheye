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
      const div = document.createElement("div");
    div.classList.add("description-grid");
      const pTitle = document.createElement("p");
      pTitle.innerHTML = `${data[index].title}`;
      pTitle.classList.add("pTitle");
      const pLikes = document.createElement("p");
      pLikes.innerHTML = `${data[index].likes} <i class="coeur fa-regular fa-heart"></i>`;
      pLikes.classList.add("pLikes");
      photoSection.children[index].appendChild(div);
      div.appendChild(pTitle);
      div.appendChild(pLikes);
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
        e.target.classList.toggle("fa-solid");
        e.target.classList.toggle("fa-regular");
        likeValue++;
        
      }
      );
    });
   
  }
  
  return { createTitlesFromArray };
}
