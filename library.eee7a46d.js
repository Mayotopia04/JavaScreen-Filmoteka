var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},d=e.parcelRequired7c6;null==d&&((d=function(e){if(e in t)return t[e].exports;if(e in n){var d=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,d.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=d);var r=d("bgmcq");const o=document.querySelector("#watched-library-btn"),l=document.getElementById("qd-library-btn");o.addEventListener("click",(async e=>{await r.default.render("watchedMovies"),o.classList.add("selected-button"),l.classList.remove("selected-button")})),l.onclick=async function(e){await r.default.render("queuedMovies"),l.classList.add("selected-button"),o.classList.remove("selected-button")};
//# sourceMappingURL=library.eee7a46d.js.map
