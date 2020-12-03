"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Api;
(function (Api) {
    const base = "https://jsonplaceholder.typicode.com";
    function resolve(path) {
        while (path.startsWith("/"))
            path = path.substring(1);
        while (path.endsWith("/"))
            path = path.substring(0, path.length - 1);
        return base + "/" + path;
    }
    function get(input, init) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(typeof input == "string" ? resolve(input) : input, init);
        });
    }
    Api.get = get;
    /**
     * Applies a dataset to an object.
     */
    function applyData(object, data) {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                object[key] = data[key];
            }
        }
    }
    ;
    ;
    class Post {
        constructor(data) {
            this.latestElement = null;
            applyData(this, data);
        }
        static getPosts() {
            return __awaiter(this, void 0, void 0, function* () {
                return get("/posts").then(res => res.json())
                    .then((postsData) => {
                    const posts = postsData.map(post => new Post(post));
                    return posts;
                });
            });
        }
        static getPost(postId) {
            return __awaiter(this, void 0, void 0, function* () {
                return get("/posts/" + postId).then(res => res.json())
                    .then(postData => new Post(postData));
            });
        }
        static getPostComments(postId) {
            return __awaiter(this, void 0, void 0, function* () {
                return get("/posts/" + postId + "/comments").then(res => res.json())
                    .then(postData => new Post(postData));
            });
        }
        getComments() {
            return __awaiter(this, void 0, void 0, function* () { return Post.getPostComments(this.id); });
        }
        createElement() {
            const div = document.createElement("div");
            div.classList.add("post");
            const content = document.createElement("div");
            content.classList.add("postContent");
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
                const posts = document.querySelectorAll("div.post");
                posts.forEach(p => p.toggleAttribute("open", false));
                div.toggleAttribute("open", true);
            });
            div.post = this;
            this.latestElement = div;
            return div;
        }
        createElementSmall() {
            const div = document.createElement("div");
            div.classList.add("postSmall");
            const content = document.createElement("div");
            content.classList.add("postSmallContent");
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
    }
    Api.Post = Post;
    class User {
        constructor(data) {
            applyData(this, data);
        }
        static getUsers() {
            return __awaiter(this, void 0, void 0, function* () {
                return get("/users").then(res => res.json())
                    .then((usersData) => {
                    const users = usersData.map(user => new User(user));
                    this._cacheUsers = users;
                    return users;
                });
            });
        }
        static getUser(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this._cacheUsers) {
                    console.log("Renewing cache...");
                    yield User.getUsers();
                }
                return this._cacheUsers.find(u => u.id == userId);
            });
        }
    }
    Api.User = User;
})(Api || (Api = {}));
