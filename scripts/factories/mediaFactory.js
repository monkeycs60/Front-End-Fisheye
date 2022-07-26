
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
   
      const img = document.createElement("img");
      img.setAttribute("src", `/Front-End-Fisheye/assets/SamplePhotos/${data[index]}`);
      img.setAttribute("alt", `cool`);
      photoSection.appendChild(img);
    
  }
        }
  
    
   


   return { infoCardZ, createImageFromArray }

}

    //foreach entry of data, create a new img element
    


//    const dest = data.map((data) => {
//         const img = document.createElement("img");
//         img.setAttribute("src", `/Front-End-Fisheye/assets/SamplePhotos/${data}`);
//         img.setAttribute("alt", `photo de Jean`);
//         return img;
        
//     }
   
//     );
   
  

  
   

    

    


//     function photographersGallery() {
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         img.setAttribute("alt", `photo ${image}`);
//         //set width to 33%
//         img.style.width = "33%";
//         img.style.height = "33%";
//         return (img);
//     }

//     function photographersMovie() {
//         const video = document.createElement( 'video' );
//         video.setAttribute("src", movie)
//         video.setAttribute("alt", `video ${video}`);
//         //set width 400px and height 300px
//         video.setAttribute("width", "400");
//         video.setAttribute("height", "300");
//         return (video);
//     }

//     // if (image !== undefined) {
//     //     return { photographersGallery }
//     // }
//     // if (video !== undefined) {
//     //     return { photographersMovie }
//     // }
//     return { createImageFromArray}
//     // return {   photographersGallery, photographersMovie }  
// }
