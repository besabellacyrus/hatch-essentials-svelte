import{S as t,i as a,s as e,H as n,u as c,a as o,c as l,q as s,f as r,g as u,h,k as i,l as d,m as f,t as p,n as m,o as g,p as $,r as b,v as k,w as v,x as y,e as x,y as P,b as B,d as E,z as R,j as _,A as j}from"./client.cb7a31c2.js";import{c as q,r as w,q as C}from"./svelte-apollo.es.635a209c.js";import{P as N,D as T}from"./DynamicBlock.1732e21a.js";import{T as D}from"./TransitionWrapper.d4325c9e.js";function L(t,a,e){const n=t.slice();return n[4]=a[e],n[6]=e,n}function O(t){let a,e=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){a=new n(e,null)},m(t,e){a.m(t,e)},p(t,n){1&n&&e!==(e=t[0].data.hatch_PageBy.head_tags.headTags+"")&&a.p(e)},d(t){t&&a.d()}}}function z(t){return{c:k,l:k,m:k,p:k,i:k,o:k,d:k}}function A(t){let a,e,n,o;const l=[I,H],s=[];function u(t,a){return t[3].data?0:1}return a=u(t),e=s[a]=l[a](t),{c(){e.c(),n=c()},l(t){e.l(t),n=c()},m(t,e){s[a].m(t,e),d(t,n,e),o=!0},p(t,c){let o=a;a=u(t),a===o?s[a].p(t,c):(v(),m(s[o],1,1,()=>{s[o]=null}),y(),e=s[a],e||(e=s[a]=l[a](t),e.c()),p(e,1),e.m(n.parentNode,n))},i(t){o||(p(e),o=!0)},o(t){m(e),o=!1},d(t){s[a].d(t),t&&r(n)}}}function H(t){let a,e;return{c(){a=x("p"),e=P("ERROR!!")},l(t){a=B(t,"P",{});var n=E(a);e=R(n,"ERROR!!"),n.forEach(r)},m(t,n){d(t,a,n),i(a,e)},p:k,i:k,o:k,d(t){t&&r(a)}}}function I(t){let a,e,n=t[3].data.hatch_PageBy.page.fc,o=[];for(let a=0;a<n.length;a+=1)o[a]=S(L(t,n,a));const l=t=>m(o[t],1,1,()=>{o[t]=null});return{c(){for(let t=0;t<o.length;t+=1)o[t].c();a=c()},l(t){for(let a=0;a<o.length;a+=1)o[a].l(t);a=c()},m(t,n){for(let a=0;a<o.length;a+=1)o[a].m(t,n);d(t,a,n),e=!0},p(t,e){if(2&e){let c;for(n=t[3].data.hatch_PageBy.page.fc,c=0;c<n.length;c+=1){const l=L(t,n,c);o[c]?(o[c].p(l,e),p(o[c],1)):(o[c]=S(l),o[c].c(),p(o[c],1),o[c].m(a.parentNode,a))}for(v(),c=n.length;c<o.length;c+=1)l(c);y()}},i(t){if(!e){for(let t=0;t<n.length;t+=1)p(o[t]);e=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)m(o[t]);e=!1},d(t){j(o,t),t&&r(a)}}}function S(t){let a;const e=new T({props:{content:t[4].content,bgColor:t[4].backgroundColor}});return{c(){l(e.$$.fragment)},l(t){h(e.$$.fragment,t)},m(t,n){f(e,t,n),a=!0},p(t,a){const n={};2&a&&(n.content=t[4].content),2&a&&(n.bgColor=t[4].backgroundColor),e.$set(n)},i(t){a||(p(e.$$.fragment,t),a=!0)},o(t){m(e.$$.fragment,t),a=!1},d(t){g(e,t)}}}function V(t){let a,e,n;return{c(){a=x("div"),e=x("p"),n=P("Loading..."),this.h()},l(t){a=B(t,"DIV",{class:!0});var c=E(a);e=B(c,"P",{});var o=E(e);n=R(o,"Loading..."),o.forEach(r),c.forEach(r),this.h()},h(){_(a,"class","loader")},m(t,c){d(t,a,c),i(a,e),i(e,n)},p:k,i:k,o:k,d(t){t&&r(a)}}}function W(t){let a,e,n,o={ctx:t,current:null,token:null,pending:V,then:A,catch:z,value:3,blocks:[,,,]};return b(e=t[1],o),{c(){a=c(),o.block.c()},l(t){a=c(),o.block.l(t)},m(t,e){d(t,a,e),o.block.m(t,o.anchor=e),o.mount=()=>a.parentNode,o.anchor=a,n=!0},p(a,n){if(t=a,o.ctx=t,2&n&&e!==(e=t[1])&&b(e,o));else{const a=t.slice();a[3]=o.resolved,o.block.p(a,n)}},i(t){n||(p(o.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const a=o.blocks[t];m(a)}n=!1},d(t){t&&r(a),o.block.d(t),o.token=null,o=null}}}function F(t){let a,e,n,$=t[0]&&O(t);const b=new D({props:{$$slots:{default:[W]},$$scope:{ctx:t}}});return{c(){$&&$.c(),a=c(),e=o(),l(b.$$.fragment)},l(t){const n=s('[data-svelte="svelte-1ilccn"]',document.head);$&&$.l(n),a=c(),n.forEach(r),e=u(t),h(b.$$.fragment,t)},m(t,c){$&&$.m(document.head,null),i(document.head,a),d(t,e,c),f(b,t,c),n=!0},p(t,[e]){t[0]?$?$.p(t,e):($=O(t),$.c(),$.m(a.parentNode,a)):$&&($.d(1),$=null);const n={};130&e&&(n.$$scope={dirty:e,ctx:t}),b.$set(n)},i(t){n||(p(b.$$.fragment,t),n=!0)},o(t){m(b.$$.fragment,t),n=!1},d(t){$&&$.d(t),r(a),t&&r(e),g(b,t)}}}async function G(){return{cache:await q.query({query:N,variables:{slug:"about-hatch"}})}}function J(t,a,e){let n,{cache:c}=a;w(q,N,c.data);const o=C(q,{query:N,variables:{slug:"about-hatch"}});return $(t,o,t=>e(1,n=t)),t.$set=t=>{"cache"in t&&e(0,c=t.cache)},[c,n,o]}export default class extends t{constructor(t){super(),a(this,t,J,F,e,{cache:0})}}export{G as preload};
