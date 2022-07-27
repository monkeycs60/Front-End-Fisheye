
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
    const p = document.createElement("p");
        p.innerHTML = `${data[index].title} - ${data[index].likes}`;
        photoSection.children[index].appendChild(p);
    }

    
  }
  return { createTitlesFromArray }
        }
  
    
   





  
  

  
   

    

    

