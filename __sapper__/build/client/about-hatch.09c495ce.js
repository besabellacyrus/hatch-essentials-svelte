import{S as t,i as e,s as a,H as n,e as o,a as c,c as l,q as s,d as r,b as u,f as h,g as d,h as i,m as f,t as p,j as g,k as m,l as $,n as b,o as k,p as v,r as y,u as x,v as P,w as E,x as R,y as _,C as q,z as w}from"./client.aada2867.js";import{c as B,r as C,q as j}from"./svelte-apollo.es.b4c77f48.js";import{P as N,T,D}from"./TransitionWrapper.91efe677.js";function L(t,e,a){const n=t.slice();return n[4]=e[a],n[6]=a,n}function O(t){let e,a=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){e=new n(a,null)},m(t,a){e.m(t,a)},p(t,n){1&n&&a!==(a=t[0].data.hatch_PageBy.head_tags.headTags+"")&&e.p(a)},d(t){t&&e.d()}}}function z(t){return{c:k,l:k,m:k,p:k,i:k,o:k,d:k}}function H(t){let e,a,n,c;const l=[S,I],s=[];function u(t,e){return t[3].data?0:1}return e=u(t),a=s[e]=l[e](t),{c(){a.c(),n=o()},l(t){a.l(t),n=o()},m(t,a){s[e].m(t,a),i(t,n,a),c=!0},p(t,o){let c=e;e=u(t),e===c?s[e].p(t,o):(v(),g(s[c],1,1,()=>{s[c]=null}),y(),a=s[e],a||(a=s[e]=l[e](t),a.c()),p(a,1),a.m(n.parentNode,n))},i(t){c||(p(a),c=!0)},o(t){g(a),c=!1},d(t){s[e].d(t),t&&r(n)}}}function I(t){let e,a;return{c(){e=x("p"),a=P("ERROR!!")},l(t){e=E(t,"P",{});var n=R(e);a=_(n,"ERROR!!"),n.forEach(r)},m(t,n){i(t,e,n),d(e,a)},p:k,i:k,o:k,d(t){t&&r(e)}}}function S(t){let e,a,n=t[3].data.hatch_PageBy.page.fc,c=[];for(let e=0;e<n.length;e+=1)c[e]=V(L(t,n,e));const l=t=>g(c[t],1,1,()=>{c[t]=null});return{c(){for(let t=0;t<c.length;t+=1)c[t].c();e=o()},l(t){for(let e=0;e<c.length;e+=1)c[e].l(t);e=o()},m(t,n){for(let e=0;e<c.length;e+=1)c[e].m(t,n);i(t,e,n),a=!0},p(t,a){if(2&a){let o;for(n=t[3].data.hatch_PageBy.page.fc,o=0;o<n.length;o+=1){const l=L(t,n,o);c[o]?(c[o].p(l,a),p(c[o],1)):(c[o]=V(l),c[o].c(),p(c[o],1),c[o].m(e.parentNode,e))}for(v(),o=n.length;o<c.length;o+=1)l(o);y()}},i(t){if(!a){for(let t=0;t<n.length;t+=1)p(c[t]);a=!0}},o(t){c=c.filter(Boolean);for(let t=0;t<c.length;t+=1)g(c[t]);a=!1},d(t){w(c,t),t&&r(e)}}}function V(t){let e;const a=new D({props:{content:t[4].content,bgColor:t[4].backgroundColor}});return{c(){l(a.$$.fragment)},l(t){h(a.$$.fragment,t)},m(t,n){f(a,t,n),e=!0},p(t,e){const n={};2&e&&(n.content=t[4].content),2&e&&(n.bgColor=t[4].backgroundColor),a.$set(n)},i(t){e||(p(a.$$.fragment,t),e=!0)},o(t){g(a.$$.fragment,t),e=!1},d(t){m(a,t)}}}function W(t){let e,a,n;return{c(){e=x("div"),a=x("p"),n=P("Loading..."),this.h()},l(t){e=E(t,"DIV",{class:!0});var o=R(e);a=E(o,"P",{});var c=R(a);n=_(c,"Loading..."),c.forEach(r),o.forEach(r),this.h()},h(){q(e,"class","loader")},m(t,o){i(t,e,o),d(e,a),d(a,n)},p:k,i:k,o:k,d(t){t&&r(e)}}}function A(t){let e,a,n,c={ctx:t,current:null,token:null,pending:W,then:H,catch:z,value:3,blocks:[,,,]};return b(a=t[1],c),{c(){e=o(),c.block.c()},l(t){e=o(),c.block.l(t)},m(t,a){i(t,e,a),c.block.m(t,c.anchor=a),c.mount=()=>e.parentNode,c.anchor=e,n=!0},p(e,n){if(t=e,c.ctx=t,2&n&&a!==(a=t[1])&&b(a,c));else{const e=t.slice();e[3]=c.resolved,c.block.p(e,n)}},i(t){n||(p(c.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const e=c.blocks[t];g(e)}n=!1},d(t){t&&r(e),c.block.d(t),c.token=null,c=null}}}function F(t){let e,a,n,$=t[0]&&O(t);const b=new T({props:{$$slots:{default:[A]},$$scope:{ctx:t}}});return{c(){$&&$.c(),e=o(),a=c(),l(b.$$.fragment)},l(t){const n=s('[data-svelte="svelte-1ilccn"]',document.head);$&&$.l(n),e=o(),n.forEach(r),a=u(t),h(b.$$.fragment,t)},m(t,o){$&&$.m(document.head,null),d(document.head,e),i(t,a,o),f(b,t,o),n=!0},p(t,[a]){t[0]?$?$.p(t,a):($=O(t),$.c(),$.m(e.parentNode,e)):$&&($.d(1),$=null);const n={};130&a&&(n.$$scope={dirty:a,ctx:t}),b.$set(n)},i(t){n||(p(b.$$.fragment,t),n=!0)},o(t){g(b.$$.fragment,t),n=!1},d(t){$&&$.d(t),r(e),t&&r(a),m(b,t)}}}async function G(){return{cache:await B.query({query:N,variables:{slug:"about-hatch"}})}}function J(t,e,a){let n,{cache:o}=e;C(B,N,o.data);const c=j(B,{query:N,variables:{slug:"about-hatch"}});return $(t,c,t=>a(1,n=t)),t.$set=t=>{"cache"in t&&a(0,o=t.cache)},[o,n,c]}export default class extends t{constructor(t){super(),e(this,t,J,F,a,{cache:0})}}export{G as preload};
