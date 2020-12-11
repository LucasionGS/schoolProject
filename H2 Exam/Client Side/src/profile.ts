addEventListener("load", async () => {
  const p = new URLSearchParams(location.search);
  if (p.has("id")) {
    var user = await Api.User.getUser(+p.get("id"), true);
    var pc = document.querySelector<HTMLDivElement>("#profileContainer");
  }
  else location.href = "/posts.html";

  pc.appendChild(user.createElement());
});