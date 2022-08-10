
 export function mediaPhotographerFactory(data) {

    // const { image, video } = data;
    // console.log(image, video, data[0].image);
   
   console.log(data);
   console.log(`/Front-End-Fisheye/assets/SamplePhotos/${data}`);


   //for each data create a new img element
   function createImageFromArray() {
    const photoSection = document.querySelector(".photographer_section");
   //CREATE N IMG ELEMENTS CORRESPOND TO DATA.LENGTH and fill each img element with the data.image
  for (let index = 0; index < data.length; index++) {
     //create a div element
     const div = document.createElement("div");
       div.classList.add("grid-div");
     photoSection.appendChild(div);
     
     //if data contains .mp4 in its title, create a video element
    if (data[index].includes(".mp4")) {
        const video = document.createElement("video");
        // video.setAttribute("src", `/assets/SamplePhotos/${data[index]}`);
        video.setAttribute("src", `/Front-End-Fisheye/assets/SamplePhotos/${data[index]}`);
        video.setAttribute("controls", "controls");
        div.appendChild(video);
    }
     else {
         const img = document.createElement("img");
      // img.setAttribute("src", `/assets/SamplePhotos/${data[index]}`);
      img.setAttribute("src", `/Front-End-Fisheye/assets/SamplePhotos/${data[index]}`);
      img.setAttribute("alt", `cool`);
      div.appendChild(img);
     }
    
  }

const gridDiv = document.querySelectorAll(".grid-div");
const gridDivArray = Array.from(gridDiv);
console.log(gridDivArray[1]);

const desc = document.querySelectorAll(".description-grid2");
console.log(desc);

  //log the like count of each ima
  

// const likeCountArrayInt = likeCountArray.map((pLikes) => {
//   return parseInt(pLikes.textContent);
// }
// );

// const likeCountArraySorted = likeCountArrayInt.sort((a, b) => a - b);
// console.log(likeCountArraySorted);

// for (let index = 0; index < photoSection.children.length; index++) {
//   for (let j = 0; j < likeCountArraySorted.length; j++) {
//     if (likeCountArraySorted[index] == likeCount[j].innerText) {
//       photoSection.children[j].style.order = index;
//     }
    
//   }
// }

        }
  
    
   


   return { createImageFromArray }

}

  
  

  
   

    

    

