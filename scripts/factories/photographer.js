function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log(data.photographers);
    }).catch((error) => {
        console.log(error);
    });


    
 


    
    

   

  


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
    return { name, picture, getUserCardDOM }
}