export function headerPhotographerFactory(data) {
  const { name, portrait, city, country, tagline, id } = data;
  const picture = `assets/photographers/${portrait}`;
  const sticky = document.querySelector(".sticky");
  const p = document.createElement("p");
  p.innerHTML = `${data.price} € / jour`;
  p.setAttribute("tabindex", "0");
  p.setAttribute("aria-label", `Prix du photographe: ${data.price} € par jour`);
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
    pName.setAttribute("aria-label", `Nom du photographe: ${name}`);
    return pName;
  }
  function photographersInfosLocation() {
    const pLocation = document.createElement("p");
    pLocation.textContent = `${city}, ${country}`;
    pLocation.classList.add("location");
    pLocation.setAttribute("tabindex", 0);
    pLocation.setAttribute(
      "aria-label",
      `${name} habite à ${city}, ${country}`
    );
    return pLocation;
  }
  function photographersTagline() {
    const pTagline = document.createElement("p");
    pTagline.textContent = `${tagline}`;
    pTagline.classList.add("tagline");
    pTagline.setAttribute("tabindex", 0);
    pTagline.setAttribute("aria-label", `${name} a comme devise: ${tagline}`);
    return pTagline;
  }

  function photographersProfilPic() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${name}`);
    img.setAttribute("tabindex", 0);
    img.setAttribute("aria-label", `photo de profil de ${name}`);
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
