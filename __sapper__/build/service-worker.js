!function(){"use strict";const t=["client/index.2ee29ee2.js","client/[slug].13c81c60.js","client/[slug].7f408f98.js","client/DynamicBlock.67bc5da0.js","client/index.3c3a1e3a.js","client/index.235ce25d.js","client/[slug].61691015.js","client/client.c77c9caa.js","client/apollo.d95198fa.js"].concat(["service-worker-index.html","favicon.png","fonts/PlayfairDisplay-Black.ttf","fonts/PlayfairDisplay-BlackItalic.ttf","fonts/PlayfairDisplay-Bold.ttf","fonts/PlayfairDisplay-BoldItalic.ttf","fonts/PlayfairDisplay-ExtraBold.ttf","fonts/PlayfairDisplay-ExtraBoldItalic.ttf","fonts/PlayfairDisplay-Italic.ttf","fonts/PlayfairDisplay-Medium.ttf","fonts/PlayfairDisplay-MediumItalic.ttf","fonts/PlayfairDisplay-Regular.ttf","fonts/PlayfairDisplay-SemiBold.ttf","fonts/PlayfairDisplay-SemiBoldItalic.ttf","global.css","img/About-Home.png","img/Photo+Jun+07,+1+33+42+PM.jpg","img/Photo+Jun+13,+9+26+45+AM.jpg","img/Photo+Mar+22,+5+03+43+PM.jpg","img/Photo+May+10,+4+14+16+PM.jpg","img/nav-active.svg","img/nav-hover.svg","img/nav-inactive.svg","index.css","logo-192.png","logo-512.png","logo.svg","manifest.json","successkid.jpg","tailwind.css"]),a=new Set(t);self.addEventListener("install",a=>{a.waitUntil(caches.open("cache1592217862885").then(a=>a.addAll(t)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",t=>{t.waitUntil(caches.keys().then(async t=>{for(const a of t)"cache1592217862885"!==a&&await caches.delete(a);self.clients.claim()}))}),self.addEventListener("fetch",t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const e=new URL(t.request.url);e.protocol.startsWith("http")&&(e.hostname===self.location.hostname&&e.port!==self.location.port||(e.host===self.location.host&&a.has(e.pathname)?t.respondWith(caches.match(t.request)):"only-if-cached"!==t.request.cache&&t.respondWith(caches.open("offline1592217862885").then(async a=>{try{const e=await fetch(t.request);return a.put(t.request,e.clone()),e}catch(e){const s=await a.match(t.request);if(s)return s;throw e}}))))})}();
