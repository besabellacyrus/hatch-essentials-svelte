import{S as t,i as e,s as a,H as n,u as o,a as c,c as l,q as s,f as r,g as u,h as i,k as d,l as h,m as f,t as g,n as p,o as m,p as $,r as b,v as k,w as v,x as y,e as x,y as P,b as B,d as E,z as R,j as _,A as j}from"./client.b1f3023d.js";import{c as q,r as w,q as C}from"./svelte-apollo.es.ea13ac0e.js";import{P as N,D as T}from"./DynamicBlock.c25447d8.js";import{T as D}from"./TransitionWrapper.83147885.js";function L(t,e,a){const n=t.slice();return n[5]=e[a],n[7]=a,n}function O(t){let e,a=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){e=new n(a,null)},m(t,a){e.m(t,a)},p(t,n){1&n&&a!==(a=t[0].data.hatch_PageBy.head_tags.headTags+"")&&e.p(a)},d(t){t&&e.d()}}}function z(t){return{c:k,l:k,m:k,p:k,i:k,o:k,d:k}}function A(t){let e,a,n,c;const l=[I,H],s=[];function u(t,e){return t[4].data?0:1}return e=u(t),a=s[e]=l[e](t),{c(){a.c(),n=o()},l(t){a.l(t),n=o()},m(t,a){s[e].m(t,a),h(t,n,a),c=!0},p(t,o){let c=e;e=u(t),e===c?s[e].p(t,o):(v(),p(s[c],1,1,()=>{s[c]=null}),y(),a=s[e],a||(a=s[e]=l[e](t),a.c()),g(a,1),a.m(n.parentNode,n))},i(t){c||(g(a),c=!0)},o(t){p(a),c=!1},d(t){s[e].d(t),t&&r(n)}}}function H(t){let e,a;return{c(){e=x("p"),a=P("ERROR!!")},l(t){e=B(t,"P",{});var n=E(e);a=R(n,"ERROR!!"),n.forEach(r)},m(t,n){h(t,e,n),d(e,a)},p:k,i:k,o:k,d(t){t&&r(e)}}}function I(t){let e,a,n=t[4].data.hatch_PageBy.page.fc,c=[];for(let e=0;e<n.length;e+=1)c[e]=S(L(t,n,e));const l=t=>p(c[t],1,1,()=>{c[t]=null});return{c(){for(let t=0;t<c.length;t+=1)c[t].c();e=o()},l(t){for(let e=0;e<c.length;e+=1)c[e].l(t);e=o()},m(t,n){for(let e=0;e<c.length;e+=1)c[e].m(t,n);h(t,e,n),a=!0},p(t,a){if(2&a){let o;for(n=t[4].data.hatch_PageBy.page.fc,o=0;o<n.length;o+=1){const l=L(t,n,o);c[o]?(c[o].p(l,a),g(c[o],1)):(c[o]=S(l),c[o].c(),g(c[o],1),c[o].m(e.parentNode,e))}for(v(),o=n.length;o<c.length;o+=1)l(o);y()}},i(t){if(!a){for(let t=0;t<n.length;t+=1)g(c[t]);a=!0}},o(t){c=c.filter(Boolean);for(let t=0;t<c.length;t+=1)p(c[t]);a=!1},d(t){j(c,t),t&&r(e)}}}function S(t){let e;const a=new T({props:{content:t[5].content,bgColor:t[5].backgroundColor}});return{c(){l(a.$$.fragment)},l(t){i(a.$$.fragment,t)},m(t,n){f(a,t,n),e=!0},p(t,e){const n={};2&e&&(n.content=t[5].content),2&e&&(n.bgColor=t[5].backgroundColor),a.$set(n)},i(t){e||(g(a.$$.fragment,t),e=!0)},o(t){p(a.$$.fragment,t),e=!1},d(t){m(a,t)}}}function V(t){let e,a,n;return{c(){e=x("div"),a=x("p"),n=P("Loading..."),this.h()},l(t){e=B(t,"DIV",{class:!0});var o=E(e);a=B(o,"P",{});var c=E(a);n=R(c,"Loading..."),c.forEach(r),o.forEach(r),this.h()},h(){_(e,"class","loader")},m(t,o){h(t,e,o),d(e,a),d(a,n)},p:k,i:k,o:k,d(t){t&&r(e)}}}function W(t){let e,a,n,c={ctx:t,current:null,token:null,pending:V,then:A,catch:z,value:4,blocks:[,,,]};return b(a=t[1],c),{c(){e=o(),c.block.c()},l(t){e=o(),c.block.l(t)},m(t,a){h(t,e,a),c.block.m(t,c.anchor=a),c.mount=()=>e.parentNode,c.anchor=e,n=!0},p(e,n){if(t=e,c.ctx=t,2&n&&a!==(a=t[1])&&b(a,c));else{const e=t.slice();e[4]=c.resolved,c.block.p(e,n)}},i(t){n||(g(c.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const e=c.blocks[t];p(e)}n=!1},d(t){t&&r(e),c.block.d(t),c.token=null,c=null}}}function F(t){let e,a,n,$=t[0]&&O(t);const b=new D({props:{$$slots:{default:[W]},$$scope:{ctx:t}}});return{c(){$&&$.c(),e=o(),a=c(),l(b.$$.fragment)},l(t){const n=s('[data-svelte="svelte-1ilccn"]',document.head);$&&$.l(n),e=o(),n.forEach(r),a=u(t),i(b.$$.fragment,t)},m(t,o){$&&$.m(document.head,null),d(document.head,e),h(t,a,o),f(b,t,o),n=!0},p(t,[a]){t[0]?$?$.p(t,a):($=O(t),$.c(),$.m(e.parentNode,e)):$&&($.d(1),$=null);const n={};258&a&&(n.$$scope={dirty:a,ctx:t}),b.$set(n)},i(t){n||(g(b.$$.fragment,t),n=!0)},o(t){p(b.$$.fragment,t),n=!1},d(t){$&&$.d(t),r(e),t&&r(a),m(b,t)}}}let G="essential-oils-101";async function J(){return{cache:await q.query({query:N,variables:{slug:G}}),slug:G}}function K(t,e,a){let n,{cache:o}=e,{slug:c}=e;w(q,N,o.data);const l=C(q,{query:N,variables:{slug:c}});return $(t,l,t=>a(1,n=t)),t.$set=t=>{"cache"in t&&a(0,o=t.cache),"slug"in t&&a(3,c=t.slug)},[o,n,l,c]}export default class extends t{constructor(t){super(),e(this,t,K,F,a,{cache:0,slug:3})}}export{J as preload};