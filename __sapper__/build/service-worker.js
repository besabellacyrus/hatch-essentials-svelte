!function(){"use strict";const t=["client/TransitionWrapper.e841d362.js","client/index.3a27815d.js","client/[slug].5af79faa.js","client/about-hatch.8b695393.js","client/index.bec54225.js","client/essential-oils-101.c9a051e5.js","client/pursue-your-dreams.317ea8fa.js","client/[slug].4b75164e.js","client/index.886d7ef2.js","client/client.cfbb9acc.js","client/svelte-apollo.es.d08f135b.js"].concat(["service-worker-index.html","favicon.png","fonts/Montserrat-Light.ttf","fonts/Montserrat-Regular.ttf","fonts/PlayfairDisplay-Black.ttf","fonts/PlayfairDisplay-BlackItalic.ttf","fonts/PlayfairDisplay-Bold.ttf","fonts/PlayfairDisplay-BoldItalic.ttf","fonts/PlayfairDisplay-ExtraBold.ttf","fonts/PlayfairDisplay-ExtraBoldItalic.ttf","fonts/PlayfairDisplay-Italic.ttf","fonts/PlayfairDisplay-Medium.ttf","fonts/PlayfairDisplay-MediumItalic.ttf","fonts/PlayfairDisplay-Regular.ttf","fonts/PlayfairDisplay-SemiBold.ttf","fonts/PlayfairDisplay-SemiBoldItalic.ttf","googleae30e8f40e92b0da.html","img/About-Home.png","img/Photo+Jun+07,+1+33+42+PM.jpg","img/Photo+Jun+13,+9+26+45+AM.jpg","img/Photo+Mar+22,+5+03+43+PM.jpg","img/Photo+May+10,+4+14+16+PM.jpg","img/image-2.jpg","img/natural-blueprint.png","img/nav-active.svg","img/nav-hover.svg","img/nav-inactive.svg","index.css","js/instafeed.js","logo-192.png","logo-512.png","logo.svg","manifest.json","successkid.jpg","tailwind.css"]),e=new Set(t);self.addEventListener("install",e=>{e.waitUntil(caches.open("cache1593438765812").then(e=>e.addAll(t)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",t=>{t.waitUntil(caches.keys().then(async t=>{for(const e of t)"cache1593438765812"!==e&&await caches.delete(e);self.clients.claim()}))}),self.addEventListener("fetch",t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const a=new URL(t.request.url);a.protocol.startsWith("http")&&(a.hostname===self.location.hostname&&a.port!==self.location.port||(a.host===self.location.host&&e.has(a.pathname)?t.respondWith(caches.match(t.request)):"only-if-cached"!==t.request.cache&&t.respondWith(caches.open("offline1593438765812").then(async e=>{try{const a=await fetch(t.request);return e.put(t.request,a.clone()),a}catch(a){const s=await e.match(t.request);if(s)return s;throw a}}))))})}();
