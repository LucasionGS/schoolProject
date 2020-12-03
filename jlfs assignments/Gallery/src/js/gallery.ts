addEventListener("load", () => {
  (document.getElementById("buttonBack") as HTMLInputElement).addEventListener("click", galleryBack);
  (document.getElementById("buttonForward") as HTMLInputElement).addEventListener("click", galleryForward);
  (document.getElementById("picture") as HTMLImageElement).addEventListener("click", galleryPictureLargeToggle);
  
  galleryCreateThumbnails();
});

var pictures = [
  "Pictures/A.png",
  "Pictures/B.png",
  "Pictures/C.png",
  "Pictures/D.png",
  "Pictures/E.png",
];
var pictureLarge = false;
var pictureIndex = 0;


function galleryCreateThumbnails() {
  let thumbs = document.getElementById("galleryThumbnails") as HTMLDivElement;
  for (let i = 0; i < pictures.length; i++) {
    const pic = pictures[i];
    const a = document.createElement("a");
    a.addEventListener("click", () => galleryPictureSet(i));
    a.style.background = `url(${pic}) center center / cover no-repeat`;
    thumbs.appendChild(a);
  }
}

function galleryForward() {
  pictureIndex = pictureIndex == pictures.length - 1 ? 0 : pictureIndex + 1;
  (document.getElementById("picture") as HTMLImageElement).src = pictures[pictureIndex];
}

function galleryBack() {
  pictureIndex = pictureIndex == 0 ? pictures.length - 1 : pictureIndex - 1;
  (document.getElementById("picture") as HTMLImageElement).src = pictures[pictureIndex];
}

function galleryPictureSet(id: number) {
  (document.getElementById("picture") as HTMLImageElement).src = pictures[id];
}

function galleryPictureLargeToggle() {
  pictureLarge = !pictureLarge;
  // Absolute works better in this case, since fixed makes scrolling impossible
  (document.getElementById("gallery") as HTMLDivElement).style.position = pictureLarge ? "absolute" : "relative";
}