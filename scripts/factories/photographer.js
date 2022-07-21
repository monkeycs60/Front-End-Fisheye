
export function photographerFactory(data) {
    const { name, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    const city = data.city;
    const country = data.country;
    const tagline = data.tagline;
    const price = data.price;
    const id = data.id;
    
    console.log(data);


    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        //add an alt attribute to the image
        img.setAttribute("alt", `photo de profil de ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("name");
        article.appendChild(img);
        article.appendChild(h2);
        //add tabindex 0 to allow focus
        article.setAttribute("tabindex", 0);
        return (article);
    }

    function photographersLocation() {
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
    function photographersPrice() {
        const p = document.createElement( 'p' );
        p.textContent = `${price}€/jour`;
        p.classList.add("price");
        return (p);
    }



    return { name, picture, getUserCardDOM, photographersLocation, photographersTagline, photographersPrice }
}
