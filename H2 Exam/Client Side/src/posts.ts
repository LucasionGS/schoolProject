addEventListener("load", async () => {
  const posts = await Api.Post.getPosts()
  .then(async posts => {
    const container = document.getElementById("postsContainer");
    let curLine: HTMLDivElement;
    await Api.User.getUsers();
    posts.forEach((post, i) => {
      curLine = document.createElement("div");
      curLine.classList.add("postsLine");
      container.appendChild(curLine);
      curLine.appendChild(post.createElement());
    });

    return posts;
  });

  // Search feature
  const search = document.querySelector<HTMLInputElement>("#searchField input");
  search.addEventListener("input", () => {
    posts.forEach(post => {
      let r = post.title.toLowerCase().includes(search.value.toLowerCase());
      post.latestElement.style.display = r ? "" : "none";
    });
  });
});