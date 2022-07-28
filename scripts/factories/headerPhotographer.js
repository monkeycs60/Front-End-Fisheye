
 export function headerPhotographerFactory(data) {

    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;
    const sticky = document.querySelector(".sticky");
 

    const p = document.createElement("p");
    p.innerHTML = `${data.price} € / jour`;
    sticky.appendChild(p);
    console.log(data.price);
    
    

    function infoCard() {
        const infoCard = document.createElement("div");
        infoCard.classList.add("info-card");
        return infoCard;
    }
     

    function photographersInfosName() {
        const p = document.createElement( 'p' );
        p.textContent = `${name}`;
        p.classList.add("name");
        return (p);
    }
    function photographersInfosLocation() {
        const p = document.createElement( 'p' );
        p.textContent = `${city}, ${country}`;
        p.classList.add("location");
        return (p);
    }
    function photographersTagline() {
        const p = document.createElement( 'p' );
        p.textContent = `${tagline}`;
        p.classList.add("tagline");
        return (p);
    }
    

    function photographersProfilPic() {
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo de profil de ${name}`);
        return (img);
    }

    return {  photographersTagline, photographersInfosName, photographersInfosLocation, infoCard, picture, id, photographersProfilPic  }
}
