import{S as t,i as e,s as a,H as n,e as c,a as o,c as s,q as r,b as l,d as h,f as i,g as u,h as f,j as d,k as m,l as p,m as g,t as $,n as k,o as b,p as v,r as y,u as j,v as x,w as P,x as R,y as B,z as E,A as _}from"./client.cb7a31c2.js";import{c as q,r as w,q as C}from"./svelte-apollo.es.635a209c.js";import{P as T,D as N}from"./DynamicBlock.1732e21a.js";import{T as D}from"./TransitionWrapper.d4325c9e.js";function L(t,e,a){const n=t.slice();return n[4]=e[a],n[6]=a,n}function O(t){let e,a=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){e=new n(a,null)},m(t,a){e.m(t,a)},p(t,n){1&n&&a!==(a=t[0].data.hatch_PageBy.head_tags.headTags+"")&&e.p(a)},d(t){t&&e.d()}}}function S(t){return{c:x,l:x,m:x,p:x,i:x,o:x,d:x}}function z(t){let e,a,n,c;const o=[H,A],s=[];function r(t,e){return t[3].data?0:1}return e=r(t),a=s[e]=o[e](t),{c(){a.c(),n=j()},l(t){a.l(t),n=j()},m(t,a){s[e].m(t,a),p(t,n,a),c=!0},p(t,c){let l=e;e=r(t),e===l?s[e].p(t,c):(P(),k(s[l],1,1,()=>{s[l]=null}),R(),a=s[e],a||(a=s[e]=o[e](t),a.c()),$(a,1),a.m(n.parentNode,n))},i(t){c||($(a),c=!0)},o(t){k(a),c=!1},d(t){s[e].d(t),t&&i(n)}}}function A(t){let e,a;return{c(){e=c("p"),a=B("ERROR!!")},l(t){e=l(t,"P",{});var n=h(e);a=E(n,"ERROR!!"),n.forEach(i)},m(t,n){p(t,e,n),m(e,a)},p:x,i:x,o:x,d(t){t&&i(e)}}}function H(t){let e,a,n=t[3].data.hatch_PageBy.page.fc,c=[];for(let e=0;e<n.length;e+=1)c[e]=I(L(t,n,e));const o=t=>k(c[t],1,1,()=>{c[t]=null});return{c(){for(let t=0;t<c.length;t+=1)c[t].c();e=j()},l(t){for(let e=0;e<c.length;e+=1)c[e].l(t);e=j()},m(t,n){for(let e=0;e<c.length;e+=1)c[e].m(t,n);p(t,e,n),a=!0},p(t,a){if(2&a){let s;for(n=t[3].data.hatch_PageBy.page.fc,s=0;s<n.length;s+=1){const o=L(t,n,s);c[s]?(c[s].p(o,a),$(c[s],1)):(c[s]=I(o),c[s].c(),$(c[s],1),c[s].m(e.parentNode,e))}for(P(),s=n.length;s<c.length;s+=1)o(s);R()}},i(t){if(!a){for(let t=0;t<n.length;t+=1)$(c[t]);a=!0}},o(t){c=c.filter(Boolean);for(let t=0;t<c.length;t+=1)k(c[t]);a=!1},d(t){_(c,t),t&&i(e)}}}function I(t){let e;const a=new N({props:{content:t[4].content,bgColor:t[4].backgroundColor}});return{c(){s(a.$$.fragment)},l(t){f(a.$$.fragment,t)},m(t,n){g(a,t,n),e=!0},p(t,e){const n={};2&e&&(n.content=t[4].content),2&e&&(n.bgColor=t[4].backgroundColor),a.$set(n)},i(t){e||($(a.$$.fragment,t),e=!0)},o(t){k(a.$$.fragment,t),e=!1},d(t){b(a,t)}}}function W(t){let e,a;return{c(){e=c("p"),a=B("Loading...")},l(t){e=l(t,"P",{});var n=h(e);a=E(n,"Loading..."),n.forEach(i)},m(t,n){p(t,e,n),m(e,a)},p:x,i:x,o:x,d(t){t&&i(e)}}}function F(t){let e,a,n,c={ctx:t,current:null,token:null,pending:W,then:z,catch:S,value:3,blocks:[,,,]};return y(a=t[1],c),{c(){e=j(),c.block.c()},l(t){e=j(),c.block.l(t)},m(t,a){p(t,e,a),c.block.m(t,c.anchor=a),c.mount=()=>e.parentNode,c.anchor=e,n=!0},p(e,n){if(t=e,c.ctx=t,2&n&&a!==(a=t[1])&&y(a,c));else{const e=t.slice();e[3]=c.resolved,c.block.p(e,n)}},i(t){n||($(c.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const e=c.blocks[t];k(e)}n=!1},d(t){t&&i(e),c.block.d(t),c.token=null,c=null}}}function G(t){let e,a,n,v,y=t[0]&&O(t);const j=new D({props:{$$slots:{default:[F]},$$scope:{ctx:t}}});return{c(){y&&y.c(),e=c("script"),n=o(),s(j.$$.fragment),this.h()},l(t){const a=r('[data-svelte="svelte-1csix27"]',document.head);y&&y.l(a),e=l(a,"SCRIPT",{src:!0}),h(e).forEach(i),a.forEach(i),n=u(t),f(j.$$.fragment,t),this.h()},h(){e.src!==(a="https://f.convertkit.com/ckjs/ck.5.js")&&d(e,"src","https://f.convertkit.com/ckjs/ck.5.js")},m(t,a){y&&y.m(document.head,null),m(document.head,e),p(t,n,a),g(j,t,a),v=!0},p(t,[a]){t[0]?y?y.p(t,a):(y=O(t),y.c(),y.m(e.parentNode,e)):y&&(y.d(1),y=null);const n={};130&a&&(n.$$scope={dirty:a,ctx:t}),j.$set(n)},i(t){v||($(j.$$.fragment,t),v=!0)},o(t){k(j.$$.fragment,t),v=!1},d(t){y&&y.d(t),i(e),t&&i(n),b(j,t)}}}async function J(){return{cache:await q.query({query:T,variables:{slug:"home"}})}}function K(t,e,a){let n,{cache:c}=e;w(q,T,c.data);const o=C(q,{query:T,variables:{slug:"home"}});return v(t,o,t=>a(1,n=t)),t.$set=t=>{"cache"in t&&a(0,c=t.cache)},[c,n,o]}export default class extends t{constructor(t){super(),e(this,t,K,G,a,{cache:0})}}export{J as preload};
