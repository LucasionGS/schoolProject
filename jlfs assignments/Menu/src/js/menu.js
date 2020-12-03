addEventListener("load", function () {
    menuPointActive();
});
function menuPointActive() {
    var current = "" + window.location;
    var nav = document.getElementById("mainmenu");
    var anchors = nav.getElementsByTagName("a");
    if (current.search(".html") == -1)
        current += "index.html";
    for (var i = 0; i < anchors.length; i++) {
        var a = anchors[i];
        if (current.toLowerCase() == a.href.toLowerCase())
            a.className = "active";
    }
}
