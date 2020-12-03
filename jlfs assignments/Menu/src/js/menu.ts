addEventListener("load", () => {
  menuPointActive();
});

function menuPointActive() {
  let current = "" + window.location;
  let nav = document.getElementById("mainmenu");
  let anchors = nav.getElementsByTagName("a");
  
  if (current.search(".html") == -1) current += "index.html";

  for (let i = 0; i < anchors.length; i++) {
    const a = anchors[i];
    
    if (current.toLowerCase() == a.href.toLowerCase())
      a.className = "active";
  }
}