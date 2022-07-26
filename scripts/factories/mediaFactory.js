
 export function mediaPhotographerFactory(data) {

    // const { image, video } = data;
    // console.log(image, video, data[0].image);
   
   console.log(data);
   console.log(`/Front-End-Fisheye/assets/SamplePhotos/${data}`);

   function infoCardZ() {
    const infoCard = document.createElement("div");
    infoCard.classList.add("coucou");
    return infoCard;
}

   //for each data create a new img element
   function createImageFromArray() {
    const photoSection = document.querySelector(".photographer_section");
   //CREATE N IMG ELEMENTS CORRESPOND TO DATA.LENGTH and fill each img element with the data.image
  for (let index = 0; index < data.length; index++) {
   //if data contains .mp4 in its title, create a video element
    if (data[index].includes(".mp4")) {
        const video = document.createElement("video");
        video.setAttribute("src", `/Front-End-Fisheye/assets/SamplePhotos/${data[index]}`);
        video.setAttribute("controls", "controls");
        photoSection.appendChild(video);
    }
     else {
         const img = document.createElement("img");
      img.setAttribute("src", `/Front-End-Fisheye/assets/SamplePhotos/${data[index]}`);
      img.setAttribute("alt", `cool`);
      photoSection.appendChild(img);
     }
    
  }
        }
  
    
   


   return { infoCardZ, createImageFromArray }

}

  
  

  
   

    

    

