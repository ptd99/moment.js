const body = document.querySelector("body");
const IMG_NUMBER = 10;


let count = 0;


function paintImage(){

    if (count !== 0) {
        const previousImage = body.querySelector(`#img${count-1}`)
    previousImage.remove();}
    const number = Math.floor(Math.random() * IMG_NUMBER);

    const image = new Image();
    image.src = `./images/img${number + 1}.jpg`;
    image.classList.add('bgImage');
    image.id = `img${count}`;
    count++;
    body.appendChild(image);
}

function init(){

    paintImage();
    setInterval(paintImage, 60000);
}

init();