
 export function mediaPhotographerFactory(data) {

    const { image } = data;
    console.log(image);
    const picture = `../../assets/Sample Photos/${image}`;
    
    

    function photographersGallery() {
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo ${image}`);
        return (img);
    }

    return {   photographersGallery  }
}
