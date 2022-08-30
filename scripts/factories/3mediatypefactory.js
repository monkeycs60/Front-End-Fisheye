// factory pour créer soit une card IMG, soit une card VIDEO
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

      // create link for local and gh pages
      let lienExterneMedia = `${window.location.origin}/assets/samplephotos/${data[index]}`;
      if (!lienExterneMedia.includes("192.168")) {
        lienExterneMedia = lienExterneMedia.replace(
          "/assets",
          "/Front-End-Fisheye/assets"
        );
      }

      // if data contains .mp4 in its title, create a video element
      if (data[index].includes(".mp4")) {
        const video = document.createElement("video");
        // video.setAttribute("src", `./../../assets/samplephotos/${data[index]}`);
        video.setAttribute("src", lienExterneMedia);
        article.appendChild(video);
        video.setAttribute("data-video", "true");
      } else {
        const img = document.createElement("img");
        // img.setAttribute("src", `./../../assets/samplephotos/${data[index]}`);
        img.setAttribute("src", lienExterneMedia);
        img.setAttribute("data-image", "true");
        article.appendChild(img);
      }
    }
  }

  return { createImageFromArray };
}
