import{S as t,i as e,s as n,h as a,a as o,e as c,q as l,d as r,c as s,b as u,t as i,f,g as h,n as d,j as g,k as m,l as p,m as b,o as k,p as $,r as v,u as y,v as x,w as E,x as R,y as q,z as P}from"./client.07a32294.js";import{c as w,P as B,r as C,q as j,D as N}from"./DynamicBlock.13ba3cc3.js";function D(t,e,n){const a=t.slice();return a[4]=e[n],a[6]=n,a}function L(t){return{c:d,l:d,m:d,p:d,i:d,o:d,d:d}}function O(t){let e,n,a,o;const l=[z,_],s=[];function h(t,e){return t[3].data?0:1}return e=h(t),n=s[e]=l[e](t),{c(){n.c(),a=c()},l(t){n.l(t),a=c()},m(t,n){s[e].m(t,n),u(t,a,n),o=!0},p(t,o){let c=e;e=h(t),e===c?s[e].p(t,o):(g(),f(s[c],1,1,()=>{s[c]=null}),m(),n=s[e],n||(n=s[e]=l[e](t),n.c()),i(n,1),n.m(a.parentNode,a))},i(t){o||(i(n),o=!0)},o(t){f(n),o=!1},d(t){s[e].d(t),t&&r(a)}}}function _(t){let e,n;return{c(){e=p("p"),n=b("ERROR!!")},l(t){e=k(t,"P",{});var a=$(e);n=v(a,"ERROR!!"),a.forEach(r)},m(t,a){u(t,e,a),y(e,n)},p:d,i:d,o:d,d(t){t&&r(e)}}}function z(t){let e,n,a=t[3].data.hatch_PageBy.page.fc,o=[];for(let e=0;e<a.length;e+=1)o[e]=H(D(t,a,e));const l=t=>f(o[t],1,1,()=>{o[t]=null});return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=c()},l(t){for(let e=0;e<o.length;e+=1)o[e].l(t);e=c()},m(t,a){for(let e=0;e<o.length;e+=1)o[e].m(t,a);u(t,e,a),n=!0},p(t,n){if(1&n){let c;for(a=t[3].data.hatch_PageBy.page.fc,c=0;c<a.length;c+=1){const l=D(t,a,c);o[c]?(o[c].p(l,n),i(o[c],1)):(o[c]=H(l),o[c].c(),i(o[c],1),o[c].m(e.parentNode,e))}for(g(),c=a.length;c<o.length;c+=1)l(c);m()}},i(t){if(!n){for(let t=0;t<a.length;t+=1)i(o[t]);n=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)f(o[t]);n=!1},d(t){P(o,t),t&&r(e)}}}function H(t){let e;const n=new N({props:{content:t[4].content,bgColor:t[4].backgroundColor}});return{c(){x(n.$$.fragment)},l(t){E(n.$$.fragment,t)},m(t,a){R(n,t,a),e=!0},p(t,e){const a={};1&e&&(a.content=t[4].content),1&e&&(a.bgColor=t[4].backgroundColor),n.$set(a)},i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){f(n.$$.fragment,t),e=!1},d(t){q(n,t)}}}function S(t){let e,n;return{c(){e=p("p"),n=b("Loading...")},l(t){e=k(t,"P",{});var a=$(e);n=v(a,"Loading..."),a.forEach(r)},m(t,a){u(t,e,a),y(e,n)},p:d,i:d,o:d,d(t){t&&r(e)}}}function A(t){let e,n,h,d,g={ctx:t,current:null,token:null,pending:S,then:O,catch:L,value:3,blocks:[,,,]};return a(h=t[0],g),{c(){e=o(),n=c(),g.block.c(),this.h()},l(t){l('[data-svelte="svelte-15tpyws"]',document.head).forEach(r),e=s(t),n=c(),g.block.l(t),this.h()},h(){document.title="Hatch Essentials"},m(t,a){u(t,e,a),u(t,n,a),g.block.m(t,g.anchor=a),g.mount=()=>n.parentNode,g.anchor=n,d=!0},p(e,[n]){if(t=e,g.ctx=t,1&n&&h!==(h=t[0])&&a(h,g));else{const e=t.slice();e[3]=g.resolved,g.block.p(e,n)}},i(t){d||(i(g.block),d=!0)},o(t){for(let t=0;t<3;t+=1){const e=g.blocks[t];f(e)}d=!1},d(t){t&&r(e),t&&r(n),g.block.d(t),g.token=null,g=null}}}async function F(){return{cache:await w.query({query:B,variables:{slug:"home"}})}}function G(t,e,n){let a,{cache:o}=e;C(w,B,o.data);const c=j(w,{query:B,variables:{slug:"home"}});return h(t,c,t=>n(0,a=t)),t.$set=t=>{"cache"in t&&n(2,o=t.cache)},[a,c,o]}export default class extends t{constructor(t){super(),e(this,t,G,A,n,{cache:2})}}export{F as preload};
