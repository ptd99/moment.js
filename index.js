
const body = document.querySelector("body");
function sizeCheck() {
  let size = body.offsetWidth;
  console.log(size, body.className);

  if (size >= 800) {
    body.className = "Exbig";
  } else if (size >= 500) {
    body.className = "Big";
  } else {
    body.className = "Small";
  }
}

window.addEventListener("resize", sizeCheck);