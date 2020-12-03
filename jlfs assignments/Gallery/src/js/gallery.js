addEventListener("load", function () {
    document.getElementById("buttonBack").addEventListener("click", galleryBack);
    document.getElementById("buttonForward").addEventListener("click", galleryForward);
    document.getElementById("picture").addEventListener("click", galleryPictureLargeToggle);
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
    var thumbs = document.getElementById("galleryThumbnails");
    var _loop_1 = function (i) {
        var pic = pictures[i];
        var a = document.createElement("a");
        a.addEventListener("click", function () { return galleryPictureSet(i); });
        a.style.background = "url(" + pic + ") center center / cover no-repeat";
        thumbs.appendChild(a);
    };
    for (var i = 0; i < pictures.length; i++) {
        _loop_1(i);
    }
}
function galleryForward() {
    pictureIndex = pictureIndex == pictures.length - 1 ? 0 : pictureIndex + 1;
    document.getElementById("picture").src = pictures[pictureIndex];
}
function galleryBack() {
    pictureIndex = pictureIndex == 0 ? pictures.length - 1 : pictureIndex - 1;
    document.getElementById("picture").src = pictures[pictureIndex];
}
function galleryPictureSet(id) {
    document.getElementById("picture").src = pictures[id];
}
function galleryPictureLargeToggle() {
    pictureLarge = !pictureLarge;
    // Absolute works better in this case, since fixed makes scrolling impossible
    document.getElementById("gallery").style.position = pictureLarge ? "absolute" : "relative";
}
