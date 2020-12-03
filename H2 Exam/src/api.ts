namespace Api {
  const base = "https://jsonplaceholder.typicode.com";
  function resolve(path: string) {
    while (path.startsWith("/")) path = path.substring(1);
    while (path.endsWith("/")) path = path.substring(0, path.length - 1);
    return base + "/" + path;
  }

  export async function get(input: RequestInfo, init?: RequestInit): Promise<Response> {
    return fetch(typeof input == "string" ? resolve(input) : input, init);
  }

  /**
   * Applies a dataset to an object.
   */
  function applyData(object: any, data: any) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        object[key] = data[key];
      }
    }
  };

  interface HTMLPostElement extends HTMLDivElement {
    post: Post;
  };

  export class Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    constructor(data: Partial<Post>) {
      applyData(this, data);
    }

    static async getPosts() {
      return get("/posts").then(res => res.json())
      .then((postsData: Partial<Post>[]) => {
        const posts = postsData.map(post => new Post(post));
        return posts;
      });
    }
    
    static async getPost(postId: number) {
      return get("/posts/" + postId).then(res => res.json())
      .then(postData => new Post(postData));
    }
    
    static async getPostComments(postId: number) {
      return get("/posts/" + postId + "/comments").then(res => res.json())
      .then(postData => new Post(postData));
    }

    async getComments() { return Post.getPostComments(this.id) }

    public createElement() {
      const div = document.createElement("div") as HTMLPostElement;
      div.classList.add("post");

      const content = document.createElement("div");
      content.classList.add("postContent")
      const title = document.createElement("h3");
      title.innerText = this.title;
      
      const desc = document.createElement("p");
      desc.innerText = this.body;

      const credits = document.createElement("div");
      credits.classList.add("postCredits");
      User.getUser(this.userId).then(user => {
        const p = document.createElement("p");
        const author = document.createElement("a");

        author.innerText = user.name;
        author.classList.add("postAuthor");
        author.href = "/profile.html?id=" + user.id;

        p.append("Post by ", author);
        credits.appendChild(p);
      });
      
      div.appendChild(title);
      div.appendChild(credits);
      content.appendChild(desc);
      div.appendChild(content);

      div.addEventListener("click", () => {
        const posts = document.querySelectorAll<HTMLPostElement>("div.post");
        posts.forEach(p => p.toggleAttribute("open", false));
        div.toggleAttribute("open", true);
      });

      div.post = this;
      this.latestElement = div;
      return div;
    }
    
    public createElementSmall(): HTMLPostElement {
      const div = document.createElement("div") as HTMLPostElement;
      div.classList.add("postSmall");

      const content = document.createElement("div");
      content.classList.add("postSmallContent")
      const title = document.createElement("h3");
      title.innerText = this.title;
      
      const desc = document.createElement("p");
      desc.innerText = this.body;

      const credits = document.createElement("div");
      credits.classList.add("postSmallCredits");
      User.getUser(this.userId).then(user => {
        const p = document.createElement("p");
        const author = document.createElement("a");

        author.innerText = user.name;
        author.classList.add("postAuthor");
        author.href = "/profile.html?id=" + user.id;

        p.append("Post by ", author);
        credits.appendChild(p);
      });
      
      content.appendChild(title);
      content.appendChild(desc);
      div.appendChild(content);
      div.appendChild(credits);

      div.post = this;
      this.latestElement = div;
      return div;
    }

    latestElement: HTMLPostElement = null;
  }

  export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string
      }
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    }

    constructor(data: Partial<Post>) {
      applyData(this, data);
    }

    public static async getUsers() {
      return get("/users").then(res => res.json())
      .then((usersData: Partial<User>[]) => {
        const users = usersData.map(user => new User(user));
        this._cacheUsers = users;
        return users;
      });
    }
  
    // Caching users on the current page instead of requesting them individually every time, lessening the load on the server.
    private static _cacheUsers: User[];
    public static async getUser(userId: number) {
      if (!this._cacheUsers) {
        console.log("Renewing cache...");        
        await User.getUsers();
      }
      return this._cacheUsers.find(u => u.id == userId);
    }
  }
}