
 export function mediaPhotographerFactory(data) {

    const { image } = data;
    const picture = `../../assets/Sample Photos/${name}`;
    
    

    function infoCard() {
        const infoCard = document.createElement("div");
        infoCard.classList.add("info-card");
        return infoCard;
    }
     


    function photographersProfilPic() {
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo de profil de ${name}`);
        return (img);
    }

    return {  photographersTagline, photographersInfosName, photographersInfosLocation, infoCard, picture, id, photographersProfilPic  }
}
