!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},a={},n=t.parcelRequired7c6;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in a){var t=a[e];delete a[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},t.parcelRequired7c6=n);var o=n("bpxeT"),i=n("2TvXO"),l=n("b7ONl"),d=n("5FdRf"),c=n("eWHaw");n("4yRRX");var u,s=n("ebqVR");s=n("ebqVR");function f(){var t=document.getElementsByClassName("movie-card"),r=!0,a=!1,n=void 0;try{for(var d,u=t[Symbol.iterator]();!(r=(d=u.next()).done);r=!0){d.value.onclick=function(){var t=e(o)(e(i).mark((function t(r){var a,n,o,d,u,f,v,p,g,h,y,m,_,O,x,I,S,T;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.currentTarget.getAttribute("data-movie-id"),e.next=3,l.default.getMovieDetails(a);case 3:for(n=e.sent,c.default.render(n.data),o=document.getElementById("add-to-watched-btn"),d=document.getElementById("add-to-q-btn"),u=localStorage.getItem("watchedMovies"),f=[],u&&(f=JSON.parse(u)),o.textContent="".concat(s.DETAILS_OPTION.default," TO WATCHED"),v=!0,p=!1,g=void 0,e.prev=12,h=f[Symbol.iterator]();!(v=(y=h.next()).done);v=!0)y.value.id===parseInt(a)&&(o.classList.add("active"),o.textContent="".concat(s.DETAILS_OPTION.remove," FROM WATCHED LIST"));e.next=20;break;case 16:e.prev=16,e.t0=e.catch(12),p=!0,g=e.t0;case 20:e.prev=20,e.prev=21,v||null==h.return||h.return();case 23:if(e.prev=23,!p){e.next=26;break}throw g;case 26:return e.finish(23);case 27:return e.finish(20);case 28:for(m=localStorage.getItem("queuedMovies"),_=[],m&&(_=JSON.parse(m)),d.textContent="".concat(s.DETAILS_OPTION.default," TO QUEUED"),O=!0,x=!1,I=void 0,e.prev=33,S=_[Symbol.iterator]();!(O=(T=S.next()).done);O=!0)T.value.id===parseInt(a)&&(d.classList.add("active"),d.textContent="".concat(s.DETAILS_OPTION.remove," FROM QUEUED LIST"));e.next=41;break;case 37:e.prev=37,e.t1=e.catch(33),x=!0,I=e.t1;case 41:e.prev=41,e.prev=42,O||null==S.return||S.return();case 44:if(e.prev=44,!x){e.next=47;break}throw I;case 47:return e.finish(44);case 48:return e.finish(41);case 49:o.onclick=function(e){var t={id:n.data.id,poster_path:n.data.poster_path,original_title:n.data.original_title,vote_average:n.data.vote_average,genre_ids:n.data.genres.map((function(e){return e.id})),release_date:n.data.release_date},r=0,a=!0,o=!1,i=void 0;try{for(var l,d=f[Symbol.iterator]();!(a=(l=d.next()).done);a=!0){if(l.value.id===t.id)return f.splice(r),void localStorage.setItem("watchedMovies",JSON.stringify(f));r++}}catch(e){o=!0,i=e}finally{try{a||null==d.return||d.return()}finally{if(o)throw i}}f.push(t),e.currentTarget.textContent="".concat(s.DETAILS_OPTION.remove," TO QUEUED"),localStorage.setItem("watchedMovies",JSON.stringify(f))},d.onclick=function(e){var t={id:n.data.id,poster_path:n.data.poster_path,original_title:n.data.original_title,vote_average:n.data.vote_average,genre_ids:n.data.genres.map((function(e){return e.id})),release_date:n.data.release_date},r=0,a=!0,o=!1,i=void 0;try{for(var l,d=_[Symbol.iterator]();!(a=(l=d.next()).done);a=!0){if(l.value.id===t.id)return _.splice(r),void localStorage.setItem("queuedMovies",JSON.stringify(_));r++}}catch(e){o=!0,i=e}finally{try{a||null==d.return||d.return()}finally{if(o)throw i}}_.push(t),localStorage.setItem("queuedMovies",JSON.stringify(_))};case 51:case"end":return e.stop()}}),t,null,[[12,16,20,28],[21,,23,27],[33,37,41,49],[42,,44,48]])})));return function(e){return t.apply(this,arguments)}}()}}catch(e){a=!0,n=e}finally{try{r||null==u.return||u.return()}finally{if(a)throw n}}}document.getElementById("search-button").onclick=(u=e(o)(e(i).mark((function t(r){var a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),a=document.getElementById("search-input"),e.next=4,d.default.render({text:a.value,page:1});case 4:f();case 5:case"end":return e.stop()}}),t)}))),function(e){return u.apply(this,arguments)})}();
//# sourceMappingURL=index.3cc45f62.js.map