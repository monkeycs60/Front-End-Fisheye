export function headerPhotographerFactory(data) {
  const { name, portrait, city, country, tagline, id } = data;
  const picture = `assets/photographers/${portrait}`;
  const sticky = document.querySelector(".sticky");
  const p = document.createElement("p");
  p.innerHTML = `${data.price} € / jour`;
  sticky.appendChild(p);
  function infoCard() {
    const infoCardDiv = document.createElement("div");
    infoCardDiv.classList.add("info-card");
    return infoCardDiv;
  }

  function photographersInfosName() {
    const pName = document.createElement("p");
    pName.textContent = `${name}`;
    pName.classList.add("name");
    pName.setAttribute("tabindex", 0);
    return pName;
  }
  function photographersInfosLocation() {
    const pLocation = document.createElement("p");
    pLocation.textContent = `${city}, ${country}`;
    pLocation.classList.add("location");
    pLocation.setAttribute("tabindex", 0);
    return pLocation;
  }
  function photographersTagline() {
    const pTagline = document.createElement("p");
    pTagline.textContent = `${tagline}`;
    pTagline.classList.add("tagline");
    pTagline.setAttribute("tabindex", 0);
    return pTagline;
  }

  function photographersProfilPic() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${name}`);
    img.setAttribute("tabindex", 0);
    return img;
  }

  return {
    photographersTagline,
    photographersInfosName,
    photographersInfosLocation,
    infoCard,
    picture,
    id,
    photographersProfilPic,
  };
}
