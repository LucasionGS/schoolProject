addEventListener("load", () => {
  Api.Post.getPosts()
  .then(async posts => {
    const container = document.getElementById("postsContainer");
    let curLine: HTMLDivElement;
    await Api.User.getUsers();
    posts.forEach((post, i) => {
      curLine = document.createElement("div");
      curLine.classList.add("postsLine");
      container.appendChild(curLine);
      curLine.appendChild(post.createElement());
    })
  });
});