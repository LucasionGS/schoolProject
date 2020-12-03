addEventListener("load", function () {
    document.getElementById("mappoint1").addEventListener("mouseover", function () { return hoverOver(document.getElementById("info1")); });
    document.getElementById("mappoint1").addEventListener("mouseout", function () { return hoverOut(document.getElementById("info1")); });
    document.getElementById("mappoint2").addEventListener("mouseover", function () { return hoverOver(document.getElementById("info2")); });
    document.getElementById("mappoint2").addEventListener("mouseout", function () { return hoverOut(document.getElementById("info2")); });
    document.querySelectorAll(".info").forEach(function (p) { return p.style.display = "none"; });
});
/**
 *
 * @param paragraph Paragraph to modify.
 */
function hoverOver(paragraph) {
    paragraph.style.display = "block";
}
/**
 *
 * @param paragraph Paragraph to modify.
 */
function hoverOut(paragraph) {
    paragraph.style.display = "none";
}
