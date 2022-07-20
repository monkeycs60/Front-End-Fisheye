// function photographerFactory(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/${portrait}`;


//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }


function photographerFactory(data) {
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
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
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