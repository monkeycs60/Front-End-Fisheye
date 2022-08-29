// factory pour la page index (page d'accueil)
export function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // creation des constantes pour les elements html
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    img.setAttribute("src", picture);
    h2.textContent = name;
    h2.classList.add("name");
    link.appendChild(img);
    link.appendChild(h2);

    // ajouts des éléments d'accessibilité
    link.setAttribute("tabindex", 0);
    link.setAttribute("aria-label", `Lien vers le profil de ${name}`);
    link.setAttribute("role", "link");
    // redirection dynamique sur la page de la photographe
    link.setAttribute("href", `./../../photographer.html?id=${id}`);

    article.appendChild(link);
    return article;
  }

  function photographersLocation() {
    const p = document.createElement("p");
    p.textContent = `${city}, ${country}`;
    p.classList.add("location");
    return p;
  }
  function photographersTagline() {
    const p = document.createElement("p");
    p.textContent = `${tagline}`;
    p.classList.add("tagline");
    return p;
  }
  function photographersPrice() {
    const p = document.createElement("p");
    p.textContent = `${price}€/jour`;
    p.classList.add("price");
    return p;
  }

  return {
    name,
    picture,
    getUserCardDOM,
    photographersLocation,
    photographersTagline,
    photographersPrice,
  };
}
