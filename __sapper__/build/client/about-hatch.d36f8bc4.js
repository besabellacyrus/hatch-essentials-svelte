import{S as t,i as a,s as e,H as n,e as o,a as c,c as l,q as s,d as r,b as u,f as h,g as f,h as i,m as d,t as p,j as g,k as m,l as $,n as b,o as k,p as v,r as y,u as x,v as P,w as E,x as R,y as _,C as q,z as w}from"./client.392fa01f.js";import{c as B,r as C,q as j}from"./svelte-apollo.es.b72f3381.js";import{P as N,T,D}from"./TransitionWrapper.f433338a.js";function L(t,a,e){const n=t.slice();return n[4]=a[e],n[6]=e,n}function O(t){let a,e=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){a=new n(e,null)},m(t,e){a.m(t,e)},p(t,n){1&n&&e!==(e=t[0].data.hatch_PageBy.head_tags.headTags+"")&&a.p(e)},d(t){t&&a.d()}}}function z(t){return{c:k,l:k,m:k,p:k,i:k,o:k,d:k}}function H(t){let a,e,n,c;const l=[S,I],s=[];function u(t,a){return t[3].data?0:1}return a=u(t),e=s[a]=l[a](t),{c(){e.c(),n=o()},l(t){e.l(t),n=o()},m(t,e){s[a].m(t,e),i(t,n,e),c=!0},p(t,o){let c=a;a=u(t),a===c?s[a].p(t,o):(v(),g(s[c],1,1,()=>{s[c]=null}),y(),e=s[a],e||(e=s[a]=l[a](t),e.c()),p(e,1),e.m(n.parentNode,n))},i(t){c||(p(e),c=!0)},o(t){g(e),c=!1},d(t){s[a].d(t),t&&r(n)}}}function I(t){let a,e;return{c(){a=x("p"),e=P("ERROR!!")},l(t){a=E(t,"P",{});var n=R(a);e=_(n,"ERROR!!"),n.forEach(r)},m(t,n){i(t,a,n),f(a,e)},p:k,i:k,o:k,d(t){t&&r(a)}}}function S(t){let a,e,n=t[3].data.hatch_PageBy.page.fc,c=[];for(let a=0;a<n.length;a+=1)c[a]=V(L(t,n,a));const l=t=>g(c[t],1,1,()=>{c[t]=null});return{c(){for(let t=0;t<c.length;t+=1)c[t].c();a=o()},l(t){for(let a=0;a<c.length;a+=1)c[a].l(t);a=o()},m(t,n){for(let a=0;a<c.length;a+=1)c[a].m(t,n);i(t,a,n),e=!0},p(t,e){if(2&e){let o;for(n=t[3].data.hatch_PageBy.page.fc,o=0;o<n.length;o+=1){const l=L(t,n,o);c[o]?(c[o].p(l,e),p(c[o],1)):(c[o]=V(l),c[o].c(),p(c[o],1),c[o].m(a.parentNode,a))}for(v(),o=n.length;o<c.length;o+=1)l(o);y()}},i(t){if(!e){for(let t=0;t<n.length;t+=1)p(c[t]);e=!0}},o(t){c=c.filter(Boolean);for(let t=0;t<c.length;t+=1)g(c[t]);e=!1},d(t){w(c,t),t&&r(a)}}}function V(t){let a;const e=new D({props:{content:t[4].content,bgColor:t[4].backgroundColor}});return{c(){l(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,n){d(e,t,n),a=!0},p(t,a){const n={};2&a&&(n.content=t[4].content),2&a&&(n.bgColor=t[4].backgroundColor),e.$set(n)},i(t){a||(p(e.$$.fragment,t),a=!0)},o(t){g(e.$$.fragment,t),a=!1},d(t){m(e,t)}}}function W(t){let a,e,n;return{c(){a=x("div"),e=x("p"),n=P("Loading..."),this.h()},l(t){a=E(t,"DIV",{class:!0});var o=R(a);e=E(o,"P",{});var c=R(e);n=_(c,"Loading..."),c.forEach(r),o.forEach(r),this.h()},h(){q(a,"class","loader")},m(t,o){i(t,a,o),f(a,e),f(e,n)},p:k,i:k,o:k,d(t){t&&r(a)}}}function A(t){let a,e,n,c={ctx:t,current:null,token:null,pending:W,then:H,catch:z,value:3,blocks:[,,,]};return b(e=t[1],c),{c(){a=o(),c.block.c()},l(t){a=o(),c.block.l(t)},m(t,e){i(t,a,e),c.block.m(t,c.anchor=e),c.mount=()=>a.parentNode,c.anchor=a,n=!0},p(a,n){if(t=a,c.ctx=t,2&n&&e!==(e=t[1])&&b(e,c));else{const a=t.slice();a[3]=c.resolved,c.block.p(a,n)}},i(t){n||(p(c.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const a=c.blocks[t];g(a)}n=!1},d(t){t&&r(a),c.block.d(t),c.token=null,c=null}}}function F(t){let a,e,n,$=t[0]&&O(t);const b=new T({props:{$$slots:{default:[A]},$$scope:{ctx:t}}});return{c(){$&&$.c(),a=o(),e=c(),l(b.$$.fragment)},l(t){const n=s('[data-svelte="svelte-1ilccn"]',document.head);$&&$.l(n),a=o(),n.forEach(r),e=u(t),h(b.$$.fragment,t)},m(t,o){$&&$.m(document.head,null),f(document.head,a),i(t,e,o),d(b,t,o),n=!0},p(t,[e]){t[0]?$?$.p(t,e):($=O(t),$.c(),$.m(a.parentNode,a)):$&&($.d(1),$=null);const n={};130&e&&(n.$$scope={dirty:e,ctx:t}),b.$set(n)},i(t){n||(p(b.$$.fragment,t),n=!0)},o(t){g(b.$$.fragment,t),n=!1},d(t){$&&$.d(t),r(a),t&&r(e),m(b,t)}}}async function G(){return{cache:await B.query({query:N,variables:{slug:"about-hatch"}})}}function J(t,a,e){let n,{cache:o}=a;C(B,N,o.data);const c=j(B,{query:N,variables:{slug:"about-hatch"}});return $(t,c,t=>e(1,n=t)),t.$set=t=>{"cache"in t&&e(0,o=t.cache)},[o,n,c]}export default class extends t{constructor(t){super(),a(this,t,J,F,e,{cache:0})}}export{G as preload};
