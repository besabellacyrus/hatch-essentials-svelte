import{S as t,i as e,s as a,H as n,e as c,a as o,c as l,q as s,d as r,b as u,f as h,g as i,h as d,m as f,t as p,j as g,k as m,l as $,n as b,o as k,p as v,r as y,u as x,v as P,w as E,x as R,y as _,C as q,z as w}from"./client.c7b88ce1.js";import{c as B,r as C,q as j}from"./svelte-apollo.es.6c47998a.js";import{P as N,T,D}from"./TransitionWrapper.9901ee7c.js";function L(t,e,a){const n=t.slice();return n[4]=e[a],n[6]=a,n}function O(t){let e,a=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){e=new n(a,null)},m(t,a){e.m(t,a)},p(t,n){1&n&&a!==(a=t[0].data.hatch_PageBy.head_tags.headTags+"")&&e.p(a)},d(t){t&&e.d()}}}function z(t){return{c:k,l:k,m:k,p:k,i:k,o:k,d:k}}function H(t){let e,a,n,o;const l=[S,I],s=[];function u(t,e){return t[3].data?0:1}return e=u(t),a=s[e]=l[e](t),{c(){a.c(),n=c()},l(t){a.l(t),n=c()},m(t,a){s[e].m(t,a),d(t,n,a),o=!0},p(t,c){let o=e;e=u(t),e===o?s[e].p(t,c):(v(),g(s[o],1,1,()=>{s[o]=null}),y(),a=s[e],a||(a=s[e]=l[e](t),a.c()),p(a,1),a.m(n.parentNode,n))},i(t){o||(p(a),o=!0)},o(t){g(a),o=!1},d(t){s[e].d(t),t&&r(n)}}}function I(t){let e,a;return{c(){e=x("p"),a=P("ERROR!!")},l(t){e=E(t,"P",{});var n=R(e);a=_(n,"ERROR!!"),n.forEach(r)},m(t,n){d(t,e,n),i(e,a)},p:k,i:k,o:k,d(t){t&&r(e)}}}function S(t){let e,a,n=t[3].data.hatch_PageBy.page.fc,o=[];for(let e=0;e<n.length;e+=1)o[e]=V(L(t,n,e));const l=t=>g(o[t],1,1,()=>{o[t]=null});return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=c()},l(t){for(let e=0;e<o.length;e+=1)o[e].l(t);e=c()},m(t,n){for(let e=0;e<o.length;e+=1)o[e].m(t,n);d(t,e,n),a=!0},p(t,a){if(2&a){let c;for(n=t[3].data.hatch_PageBy.page.fc,c=0;c<n.length;c+=1){const l=L(t,n,c);o[c]?(o[c].p(l,a),p(o[c],1)):(o[c]=V(l),o[c].c(),p(o[c],1),o[c].m(e.parentNode,e))}for(v(),c=n.length;c<o.length;c+=1)l(c);y()}},i(t){if(!a){for(let t=0;t<n.length;t+=1)p(o[t]);a=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)g(o[t]);a=!1},d(t){w(o,t),t&&r(e)}}}function V(t){let e;const a=new D({props:{content:t[4].content,bgColor:t[4].backgroundColor}});return{c(){l(a.$$.fragment)},l(t){h(a.$$.fragment,t)},m(t,n){f(a,t,n),e=!0},p(t,e){const n={};2&e&&(n.content=t[4].content),2&e&&(n.bgColor=t[4].backgroundColor),a.$set(n)},i(t){e||(p(a.$$.fragment,t),e=!0)},o(t){g(a.$$.fragment,t),e=!1},d(t){m(a,t)}}}function W(t){let e,a,n;return{c(){e=x("div"),a=x("p"),n=P("Loading..."),this.h()},l(t){e=E(t,"DIV",{class:!0});var c=R(e);a=E(c,"P",{});var o=R(a);n=_(o,"Loading..."),o.forEach(r),c.forEach(r),this.h()},h(){q(e,"class","loader")},m(t,c){d(t,e,c),i(e,a),i(a,n)},p:k,i:k,o:k,d(t){t&&r(e)}}}function A(t){let e,a,n,o={ctx:t,current:null,token:null,pending:W,then:H,catch:z,value:3,blocks:[,,,]};return b(a=t[1],o),{c(){e=c(),o.block.c()},l(t){e=c(),o.block.l(t)},m(t,a){d(t,e,a),o.block.m(t,o.anchor=a),o.mount=()=>e.parentNode,o.anchor=e,n=!0},p(e,n){if(t=e,o.ctx=t,2&n&&a!==(a=t[1])&&b(a,o));else{const e=t.slice();e[3]=o.resolved,o.block.p(e,n)}},i(t){n||(p(o.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const e=o.blocks[t];g(e)}n=!1},d(t){t&&r(e),o.block.d(t),o.token=null,o=null}}}function F(t){let e,a,n,$=t[0]&&O(t);const b=new T({props:{$$slots:{default:[A]},$$scope:{ctx:t}}});return{c(){$&&$.c(),e=c(),a=o(),l(b.$$.fragment)},l(t){const n=s('[data-svelte="svelte-1ilccn"]',document.head);$&&$.l(n),e=c(),n.forEach(r),a=u(t),h(b.$$.fragment,t)},m(t,c){$&&$.m(document.head,null),i(document.head,e),d(t,a,c),f(b,t,c),n=!0},p(t,[a]){t[0]?$?$.p(t,a):($=O(t),$.c(),$.m(e.parentNode,e)):$&&($.d(1),$=null);const n={};130&a&&(n.$$scope={dirty:a,ctx:t}),b.$set(n)},i(t){n||(p(b.$$.fragment,t),n=!0)},o(t){g(b.$$.fragment,t),n=!1},d(t){$&&$.d(t),r(e),t&&r(a),m(b,t)}}}async function G(){return{cache:await B.query({query:N,variables:{slug:"about-hatch"}})}}function J(t,e,a){let n,{cache:c}=e;C(B,N,c.data);const o=j(B,{query:N,variables:{slug:"about-hatch"}});return $(t,o,t=>a(1,n=t)),t.$set=t=>{"cache"in t&&a(0,c=t.cache)},[c,n,o]}export default class extends t{constructor(t){super(),e(this,t,J,F,a,{cache:0})}}export{G as preload};
