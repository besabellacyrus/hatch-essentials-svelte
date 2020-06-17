import{S as t,i as e,s as n,a,c as o,q as c,d as s,b as l,e as r,f as i,m as f,t as u,g as h,h as p,j as d,k as m,l as g,n as $,o as b,p as k,r as v,u as y,v as x,w as E,x as R,y as j,z as q,A as P}from"./client.10fae6c5.js";import{c as w,r as B,q as C}from"./svelte-apollo.es.19ad5e1a.js";import{P as D,D as N}from"./DynamicBlock.7a254b33.js";import{T as O}from"./TransitionWrapper.6517ff4b.js";function L(t,e,n){const a=t.slice();return a[4]=e[n],a[6]=n,a}function T(t){return{c:$,l:$,m:$,p:$,i:$,o:$,d:$}}function _(t){let e,n,a,o;const c=[A,z],l=[];function r(t,e){return t[3].data?0:1}return e=r(t),n=l[e]=c[e](t),{c(){n.c(),a=g()},l(t){n.l(t),a=g()},m(t,n){l[e].m(t,n),i(t,a,n),o=!0},p(t,o){let s=e;e=r(t),e===s?l[e].p(t,o):(b(),h(l[s],1,1,()=>{l[s]=null}),k(),n=l[e],n||(n=l[e]=c[e](t),n.c()),u(n,1),n.m(a.parentNode,a))},i(t){o||(u(n),o=!0)},o(t){h(n),o=!1},d(t){l[e].d(t),t&&s(a)}}}function z(t){let e,n;return{c(){e=v("p"),n=y("ERROR!!")},l(t){e=x(t,"P",{});var a=E(e);n=R(a,"ERROR!!"),a.forEach(s)},m(t,a){i(t,e,a),q(e,n)},p:$,i:$,o:$,d(t){t&&s(e)}}}function A(t){let e,n,a=t[3].data.hatch_PageBy.page.fc,o=[];for(let e=0;e<a.length;e+=1)o[e]=I(L(t,a,e));const c=t=>h(o[t],1,1,()=>{o[t]=null});return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=g()},l(t){for(let e=0;e<o.length;e+=1)o[e].l(t);e=g()},m(t,a){for(let e=0;e<o.length;e+=1)o[e].m(t,a);i(t,e,a),n=!0},p(t,n){if(1&n){let s;for(a=t[3].data.hatch_PageBy.page.fc,s=0;s<a.length;s+=1){const c=L(t,a,s);o[s]?(o[s].p(c,n),u(o[s],1)):(o[s]=I(c),o[s].c(),u(o[s],1),o[s].m(e.parentNode,e))}for(b(),s=a.length;s<o.length;s+=1)c(s);k()}},i(t){if(!n){for(let t=0;t<a.length;t+=1)u(o[t]);n=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)h(o[t]);n=!1},d(t){P(o,t),t&&s(e)}}}function I(t){let e;const n=new N({props:{content:t[4].content,bgColor:t[4].backgroundColor}});return{c(){o(n.$$.fragment)},l(t){r(n.$$.fragment,t)},m(t,a){f(n,t,a),e=!0},p(t,e){const a={};1&e&&(a.content=t[4].content),1&e&&(a.bgColor=t[4].backgroundColor),n.$set(a)},i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){h(n.$$.fragment,t),e=!1},d(t){p(n,t)}}}function S(t){let e,n,a;return{c(){e=v("div"),n=v("p"),a=y("Loading..."),this.h()},l(t){e=x(t,"DIV",{class:!0});var o=E(e);n=x(o,"P",{});var c=E(n);a=R(c,"Loading..."),c.forEach(s),o.forEach(s),this.h()},h(){j(e,"class","loader")},m(t,o){i(t,e,o),q(e,n),q(n,a)},p:$,i:$,o:$,d(t){t&&s(e)}}}function V(t){let e,n,a,o={ctx:t,current:null,token:null,pending:S,then:_,catch:T,value:3,blocks:[,,,]};return m(n=t[0],o),{c(){e=g(),o.block.c()},l(t){e=g(),o.block.l(t)},m(t,n){i(t,e,n),o.block.m(t,o.anchor=n),o.mount=()=>e.parentNode,o.anchor=e,a=!0},p(e,a){if(t=e,o.ctx=t,1&a&&n!==(n=t[0])&&m(n,o));else{const e=t.slice();e[3]=o.resolved,o.block.p(e,a)}},i(t){a||(u(o.block),a=!0)},o(t){for(let t=0;t<3;t+=1){const e=o.blocks[t];h(e)}a=!1},d(t){t&&s(e),o.block.d(t),o.token=null,o=null}}}function W(t){let e,n;const d=new O({props:{$$slots:{default:[V]},$$scope:{ctx:t}}});return{c(){e=a(),o(d.$$.fragment),this.h()},l(t){c('[data-svelte="svelte-1kf0656"]',document.head).forEach(s),e=l(t),r(d.$$.fragment,t),this.h()},h(){document.title="Essential Oils 101"},m(t,a){i(t,e,a),f(d,t,a),n=!0},p(t,[e]){const n={};129&e&&(n.$$scope={dirty:e,ctx:t}),d.$set(n)},i(t){n||(u(d.$$.fragment,t),n=!0)},o(t){h(d.$$.fragment,t),n=!1},d(t){t&&s(e),p(d,t)}}}let F="essential-oils-101";async function G(){return{cache:await w.query({query:D,variables:{slug:F}})}}function H(t,e,n){let a,{cache:o}=e;B(w,D,o.data);const c=C(w,{query:D,variables:{slug:F}});return d(t,c,t=>n(0,a=t)),t.$set=t=>{"cache"in t&&n(2,o=t.cache)},[a,c,o]}export default class extends t{constructor(t){super(),e(this,t,H,W,n,{cache:2})}}export{G as preload};
