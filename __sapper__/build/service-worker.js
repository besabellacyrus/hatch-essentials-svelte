!function(){"use strict";const t=["client/TransitionWrapper.72846b91.js","client/index.5e1ea6a1.js","client/[slug].155fae18.js","client/index.e6b98592.js","client/essential-oils-101.eb2101ca.js","client/about-hatch.476739c2.js","client/pursue-your-dreams.858c0560.js","client/[slug].3f3a471f.js","client/index.d44ef9d6.js","client/client.59aae2b8.js","client/svelte-apollo.es.7bc99142.js"].concat(["service-worker-index.html","favicon.png","fonts/Montserrat-Light.ttf","fonts/Montserrat-Regular.ttf","fonts/PlayfairDisplay-Black.ttf","fonts/PlayfairDisplay-BlackItalic.ttf","fonts/PlayfairDisplay-Bold.ttf","fonts/PlayfairDisplay-BoldItalic.ttf","fonts/PlayfairDisplay-ExtraBold.ttf","fonts/PlayfairDisplay-ExtraBoldItalic.ttf","fonts/PlayfairDisplay-Italic.ttf","fonts/PlayfairDisplay-Medium.ttf","fonts/PlayfairDisplay-MediumItalic.ttf","fonts/PlayfairDisplay-Regular.ttf","fonts/PlayfairDisplay-SemiBold.ttf","fonts/PlayfairDisplay-SemiBoldItalic.ttf","img/About-Home.png","img/Photo+Jun+07,+1+33+42+PM.jpg","img/Photo+Jun+13,+9+26+45+AM.jpg","img/Photo+Mar+22,+5+03+43+PM.jpg","img/Photo+May+10,+4+14+16+PM.jpg","img/image-2.jpg","img/nav-active.svg","img/nav-hover.svg","img/nav-inactive.svg","index.css","js/instafeed.js","logo-192.png","logo-512.png","logo.svg","manifest.json","successkid.jpg","tailwind.css"]),e=new Set(t);self.addEventListener("install",e=>{e.waitUntil(caches.open("cache1592911479245").then(e=>e.addAll(t)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",t=>{t.waitUntil(caches.keys().then(async t=>{for(const e of t)"cache1592911479245"!==e&&await caches.delete(e);self.clients.claim()}))}),self.addEventListener("fetch",t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const a=new URL(t.request.url);a.protocol.startsWith("http")&&(a.hostname===self.location.hostname&&a.port!==self.location.port||(a.host===self.location.host&&e.has(a.pathname)?t.respondWith(caches.match(t.request)):"only-if-cached"!==t.request.cache&&t.respondWith(caches.open("offline1592911479245").then(async e=>{try{const a=await fetch(t.request);return e.put(t.request,a.clone()),a}catch(a){const s=await e.match(t.request);if(s)return s;throw a}}))))})}();
