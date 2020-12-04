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
addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Api.Post.getPosts()
        .then((posts) => __awaiter(void 0, void 0, void 0, function* () {
        const container = document.getElementById("postsContainer");
        let curLine;
        yield Api.User.getUsers();
        posts.forEach((post, i) => {
            curLine = document.createElement("div");
            curLine.classList.add("postsLine");
            container.appendChild(curLine);
            curLine.appendChild(post.createElement());
        });
        return posts;
    }));
    // Search feature
    const search = document.querySelector("#searchField input");
    search.addEventListener("input", () => {
        posts.forEach(post => {
            let r = post.title.toLowerCase().includes(search.value.toLowerCase());
            post.latestElement.style.display = r ? "" : "none";
        });
    });
}));
