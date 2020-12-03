addEventListener("load", () => {
  document.getElementById("mappoint1").addEventListener("mouseover", () => hoverOver(
    document.getElementById("info1") as HTMLParagraphElement
  ));
  document.getElementById("mappoint1").addEventListener("mouseout", () => hoverOut(
    document.getElementById("info1") as HTMLParagraphElement
  ));
  document.getElementById("mappoint2").addEventListener("mouseover", () => hoverOver(
    document.getElementById("info2") as HTMLParagraphElement
  ));
  document.getElementById("mappoint2").addEventListener("mouseout", () => hoverOut(
    document.getElementById("info2") as HTMLParagraphElement
  ));

  document.querySelectorAll<HTMLParagraphElement>(".info").forEach(p => p.style.display = "none");
});

/**
 * 
 * @param paragraph Paragraph to modify.
 */
function hoverOver(paragraph: HTMLParagraphElement): void {
  paragraph.style.display = "block";
}

/**
 * 
 * @param paragraph Paragraph to modify.
 */
function hoverOut(paragraph: HTMLParagraphElement): void {
  paragraph.style.display = "none";
}