import{S as t,i as e,s as n,H as a,e as o,a as c,c as l,q as r,d as s,b as u,f as d,g as f,h,m as i,t as p,j as m,k as g,l as $,n as b,o as k,p as v,r as y,u as x,v as P,w as j,x as R,y as _,z as q}from"./client.cfbb9acc.js";import{c as w,r as B,q as E}from"./svelte-apollo.es.d08f135b.js";import{P as C,T as N,D as T}from"./TransitionWrapper.e841d362.js";function L(t,e,n){const a=t.slice();return a[4]=e[n],a[6]=n,a}function O(t){let e,n=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){e=new a(n,null)},m(t,n){e.m(t,n)},p(t,a){1&a&&n!==(n=t[0].data.hatch_PageBy.head_tags.headTags+"")&&e.p(n)},d(t){t&&e.d()}}}function z(t){return{c:k,l:k,m:k,p:k,i:k,o:k,d:k}}function D(t){let e,n,a,c;const l=[S,H],r=[];function u(t,e){return t[3].data?0:1}return e=u(t),n=r[e]=l[e](t),{c(){n.c(),a=o()},l(t){n.l(t),a=o()},m(t,n){r[e].m(t,n),h(t,a,n),c=!0},p(t,o){let c=e;e=u(t),e===c?r[e].p(t,o):(v(),m(r[c],1,1,()=>{r[c]=null}),y(),n=r[e],n||(n=r[e]=l[e](t),n.c()),p(n,1),n.m(a.parentNode,a))},i(t){c||(p(n),c=!0)},o(t){m(n),c=!1},d(t){r[e].d(t),t&&s(a)}}}function H(t){let e,n;return{c(){e=x("p"),n=P("ERROR!!")},l(t){e=j(t,"P",{});var a=R(e);n=_(a,"ERROR!!"),a.forEach(s)},m(t,a){h(t,e,a),f(e,n)},p:k,i:k,o:k,d(t){t&&s(e)}}}function S(t){let e,n,a=t[3].data.hatch_PageBy.page.fc,c=[];for(let e=0;e<a.length;e+=1)c[e]=W(L(t,a,e));const l=t=>m(c[t],1,1,()=>{c[t]=null});return{c(){for(let t=0;t<c.length;t+=1)c[t].c();e=o()},l(t){for(let e=0;e<c.length;e+=1)c[e].l(t);e=o()},m(t,a){for(let e=0;e<c.length;e+=1)c[e].m(t,a);h(t,e,a),n=!0},p(t,n){if(2&n){let o;for(a=t[3].data.hatch_PageBy.page.fc,o=0;o<a.length;o+=1){const l=L(t,a,o);c[o]?(c[o].p(l,n),p(c[o],1)):(c[o]=W(l),c[o].c(),p(c[o],1),c[o].m(e.parentNode,e))}for(v(),o=a.length;o<c.length;o+=1)l(o);y()}},i(t){if(!n){for(let t=0;t<a.length;t+=1)p(c[t]);n=!0}},o(t){c=c.filter(Boolean);for(let t=0;t<c.length;t+=1)m(c[t]);n=!1},d(t){q(c,t),t&&s(e)}}}function W(t){let e;const n=new T({props:{content:t[4].content,bgColor:t[4].backgroundColor}});return{c(){l(n.$$.fragment)},l(t){d(n.$$.fragment,t)},m(t,a){i(n,t,a),e=!0},p(t,e){const a={};2&e&&(a.content=t[4].content),2&e&&(a.bgColor=t[4].backgroundColor),n.$set(a)},i(t){e||(p(n.$$.fragment,t),e=!0)},o(t){m(n.$$.fragment,t),e=!1},d(t){g(n,t)}}}function A(t){let e,n;return{c(){e=x("p"),n=P("Loading...")},l(t){e=j(t,"P",{});var a=R(e);n=_(a,"Loading..."),a.forEach(s)},m(t,a){h(t,e,a),f(e,n)},p:k,i:k,o:k,d(t){t&&s(e)}}}function F(t){let e,n,a,c={ctx:t,current:null,token:null,pending:A,then:D,catch:z,value:3,blocks:[,,,]};return b(n=t[1],c),{c(){e=o(),c.block.c()},l(t){e=o(),c.block.l(t)},m(t,n){h(t,e,n),c.block.m(t,c.anchor=n),c.mount=()=>e.parentNode,c.anchor=e,a=!0},p(e,a){if(t=e,c.ctx=t,2&a&&n!==(n=t[1])&&b(n,c));else{const e=t.slice();e[3]=c.resolved,c.block.p(e,a)}},i(t){a||(p(c.block),a=!0)},o(t){for(let t=0;t<3;t+=1){const e=c.blocks[t];m(e)}a=!1},d(t){t&&s(e),c.block.d(t),c.token=null,c=null}}}function G(t){let e,n,a,$=t[0]&&O(t);const b=new N({props:{$$slots:{default:[F]},$$scope:{ctx:t}}});return{c(){$&&$.c(),e=o(),n=c(),l(b.$$.fragment)},l(t){const a=r('[data-svelte="svelte-1ytvjjl"]',document.head);$&&$.l(a),e=o(),a.forEach(s),n=u(t),d(b.$$.fragment,t)},m(t,o){$&&$.m(document.head,null),f(document.head,e),h(t,n,o),i(b,t,o),a=!0},p(t,[n]){t[0]?$?$.p(t,n):($=O(t),$.c(),$.m(e.parentNode,e)):$&&($.d(1),$=null);const a={};130&n&&(a.$$scope={dirty:n,ctx:t}),b.$set(a)},i(t){a||(p(b.$$.fragment,t),a=!0)},o(t){m(b.$$.fragment,t),a=!1},d(t){$&&$.d(t),s(e),t&&s(n),g(b,t)}}}async function I(){return{cache:await w.query({query:C,variables:{slug:"home"}})}}function J(t,e,n){let a,{cache:o}=e;B(w,C,o.data);const c=E(w,{query:C,variables:{slug:"home"}});return $(t,c,t=>n(1,a=t)),t.$set=t=>{"cache"in t&&n(0,o=t.cache)},[o,a,c]}export default class extends t{constructor(t){super(),e(this,t,J,G,n,{cache:0})}}export{I as preload};