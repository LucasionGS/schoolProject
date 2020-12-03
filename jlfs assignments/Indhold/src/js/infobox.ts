addEventListener("load", () => {
  infoBox();
});

function infoBox() {
  const boxes = document.getElementsByClassName("info") as HTMLCollectionOf<HTMLDivElement>;
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    console.log(box);
    
    box.addEventListener("click", infoBoxShift)
  }
}


function infoBoxShift(this: HTMLDivElement) {
  const div = this.getElementsByTagName("div")[0] as HTMLDivElement;
  
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