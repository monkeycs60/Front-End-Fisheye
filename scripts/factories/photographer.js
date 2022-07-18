function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    //fetch datas from photographer.json and log them in console
    fetch(`/Front-End-Fisheye/data/photographers.json`)
    .then((response) => response.json())
    .then((data) => console.log(data.photographers[0].name))
    //create a new object with the datas of the photographer
    //log the name of each photographer
    .then((data) => console.log(data.photographers));
    

    //     .then(data => console.log(data))
    //    //log the name of all photographers in the console
       
    //     .then(data => console.log(data.body))

  


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