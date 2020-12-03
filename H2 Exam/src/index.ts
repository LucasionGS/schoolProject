addEventListener("load", () => {
  Api.Post.getPosts()
  .then(async posts => {
    posts = posts.slice(0, 12);
    const container = document.getElementById("postsContainer");
    let curLine: HTMLDivElement;
    await Api.User.getUsers();
    posts.forEach((post, i) => {
      if (i == 0 || i % 4 == 0) {
        curLine = document.createElement("div");
        curLine.classList.add("postsLine");
        container.appendChild(curLine);
      }
      curLine.appendChild(post.createElementSmall());
    })
  });
});