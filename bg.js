const body = document.querySelector("body");
const IMG_NUMBER = 10;


let count = 0;


function paintImage(){

    if (count !== 0) {
        const previousImage = body.querySelector(`#img${count-1}`)
    previousImage.remove();}
    const number = Math.floor(Math.random() * IMG_NUMBER);

    const image = new Image();
    image.src = `https://images.unsplash.com/photo-1468476775582-6bede20f356f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1066&q=80`;
    // failed to load a correct path
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