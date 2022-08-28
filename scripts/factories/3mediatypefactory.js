export function mediaPhotographerFactory(data) {
  // for each data create a new img element
  function createImageFromArray() {
    const photoSection = document.querySelector(".photographer_section");
    // CREATE N IMG ELEMENTS CORRESPOND TO DATA.LENGTH and fill each img element with the data.image
    for (let index = 0; index < data.length; index++) {
      // create a div element
      const article = document.createElement("article");
      article.classList.add("grid-div");
      photoSection.appendChild(article);

      // if data contains .mp4 in its title, create a video element
      if (data[index].includes(".mp4")) {
        const video = document.createElement("video");

        video.setAttribute("src", `./../../assets/SamplePhotos/${data[index]}`);
        article.appendChild(video);
        // add a data-attribute to the video element, equal to its data position in the array
        video.setAttribute("data-video", "true");
        // tabindex 0 for the video element
      } else {
        const img = document.createElement("img");
        img.setAttribute("src", `./../../assets/SamplePhotos/${data[index]}`);
        // add a data-attribute to the img element, equal to its data position in the array
        img.setAttribute("data-image", "true");
        article.appendChild(img);
      }
    }
  }

  return { createImageFromArray };
}
