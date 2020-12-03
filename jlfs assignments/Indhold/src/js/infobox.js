addEventListener("load", function () {
    infoBox();
});
function infoBox() {
    var boxes = document.getElementsByClassName("info");
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        console.log(box);
        box.addEventListener("click", infoBoxShift);
    }
}
function infoBoxShift() {
    var div = this.getElementsByTagName("div")[0];
    // It could be done like this
    /*
    if (div.style.display != "block")
      div.style.display = "block";
    else
      div.style.display = "none";
    */
    // But it can also be shorthanded, since both if and else assign a string to `display`
    div.style.display = div.style.display != "block" ? "block" : "none";
}
