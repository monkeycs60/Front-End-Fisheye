fetch("/Front-End-Fisheye/data/photographers.json")
.then((response) => response.json())
.then((data) => {
console.log(data.photographers);
return data.photographers;

}).catch((error) => {
    console.log(error);
});