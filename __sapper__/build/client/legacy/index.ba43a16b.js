import{_ as n,r as t,a as o,b as r,c,d as a,i as e,s as u,e as f,S as i,f as s,g as l,q as p,h,j as v,k as m,l as d,m as g,n as $,t as b,o as y,p as k,u as R,v as x,w as E,x as w,y as P,z as j,A as q,B,C,D,E as N,F as _,G as L}from"./client.4106c24e.js";import{c as O,r as S,q as T}from"./svelte-apollo.es.dab83407.js";import{P as z,D as A}from"./DynamicBlock.26f61b4d.js";import{T as F}from"./TransitionWrapper.c18f4080.js";function G(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var o,a=r(n);if(t){var e=r(this).constructor;o=Reflect.construct(a,arguments,e)}else o=a.apply(this,arguments);return c(this,o)}}function H(n,t,o){var r=n.slice();return r[4]=t[o],r[6]=o,r}function W(n){return{c:w,l:w,m:w,p:w,i:w,o:w,d:w}}function I(n){var t,o,r,c,a=[K,J],e=[];function u(n,t){return n[3].data?0:1}return t=u(n),o=e[t]=a[t](n),{c:function(){o.c(),r=E()},l:function(n){o.l(n),r=E()},m:function(n,o){e[t].m(n,o),d(n,r,o),c=!0},p:function(n,c){var f=t;(t=u(n))===f?e[t].p(n,c):(P(),y(e[f],1,1,(function(){e[f]=null})),j(),(o=e[t])||(o=e[t]=a[t](n)).c(),b(o,1),o.m(r.parentNode,r))},i:function(n){c||(b(o),c=!0)},o:function(n){y(o),c=!1},d:function(n){e[t].d(n),n&&h(r)}}}function J(n){var t,o;return{c:function(){t=q("p"),o=B("ERROR!!")},l:function(n){t=C(n,"P",{});var r=D(t);o=N(r,"ERROR!!"),r.forEach(h)},m:function(n,r){d(n,t,r),_(t,o)},p:w,i:w,o:w,d:function(n){n&&h(t)}}}function K(n){for(var t,o,r=n[3].data.hatch_PageBy.page.fc,c=[],a=0;a<r.length;a+=1)c[a]=M(H(n,r,a));var e=function(n){return y(c[n],1,1,(function(){c[n]=null}))};return{c:function(){for(var n=0;n<c.length;n+=1)c[n].c();t=E()},l:function(n){for(var o=0;o<c.length;o+=1)c[o].l(n);t=E()},m:function(n,r){for(var a=0;a<c.length;a+=1)c[a].m(n,r);d(n,t,r),o=!0},p:function(n,o){if(1&o){var a;for(r=n[3].data.hatch_PageBy.page.fc,a=0;a<r.length;a+=1){var u=H(n,r,a);c[a]?(c[a].p(u,o),b(c[a],1)):(c[a]=M(u),c[a].c(),b(c[a],1),c[a].m(t.parentNode,t))}for(P(),a=r.length;a<c.length;a+=1)e(a);j()}},i:function(n){if(!o){for(var t=0;t<r.length;t+=1)b(c[t]);o=!0}},o:function(n){c=c.filter(Boolean);for(var t=0;t<c.length;t+=1)y(c[t]);o=!1},d:function(n){L(c,n),n&&h(t)}}}function M(n){var t,o=new A({props:{content:n[4].content,bgColor:n[4].backgroundColor}});return{c:function(){l(o.$$.fragment)},l:function(n){m(o.$$.fragment,n)},m:function(n,r){g(o,n,r),t=!0},p:function(n,t){var r={};1&t&&(r.content=n[4].content),1&t&&(r.bgColor=n[4].backgroundColor),o.$set(r)},i:function(n){t||(b(o.$$.fragment,n),t=!0)},o:function(n){y(o.$$.fragment,n),t=!1},d:function(n){k(o,n)}}}function Q(n){var t,o;return{c:function(){t=q("p"),o=B("Loading...")},l:function(n){t=C(n,"P",{});var r=D(t);o=N(r,"Loading..."),r.forEach(h)},m:function(n,r){d(n,t,r),_(t,o)},p:w,i:w,o:w,d:function(n){n&&h(t)}}}function U(n){var t,o,r,c={ctx:n,current:null,token:null,pending:Q,then:I,catch:W,value:3,blocks:[,,,]};return x(o=n[0],c),{c:function(){t=E(),c.block.c()},l:function(n){t=E(),c.block.l(n)},m:function(n,o){d(n,t,o),c.block.m(n,c.anchor=o),c.mount=function(){return t.parentNode},c.anchor=t,r=!0},p:function(t,r){if(n=t,c.ctx=n,1&r&&o!==(o=n[0])&&x(o,c));else{var a=n.slice();a[3]=c.resolved,c.block.p(a,r)}},i:function(n){r||(b(c.block),r=!0)},o:function(n){for(var t=0;t<3;t+=1){var o=c.blocks[t];y(o)}r=!1},d:function(n){n&&h(t),c.block.d(n),c.token=null,c=null}}}function V(n){var t,o,r=new F({props:{$$slots:{default:[U]},$$scope:{ctx:n}}});return{c:function(){t=s(),l(r.$$.fragment),this.h()},l:function(n){p('[data-svelte="svelte-15tpyws"]',document.head).forEach(h),t=v(n),m(r.$$.fragment,n),this.h()},h:function(){document.title="Hatch Essentials"},m:function(n,c){d(n,t,c),g(r,n,c),o=!0},p:function(n,t){var o=$(t,1)[0],c={};129&o&&(c.$$scope={dirty:o,ctx:n}),r.$set(c)},i:function(n){o||(b(r.$$.fragment,n),o=!0)},o:function(n){y(r.$$.fragment,n),o=!1},d:function(n){n&&h(t),k(r,n)}}}function X(){return Y.apply(this,arguments)}function Y(){return(Y=n(t.mark((function n(){return t.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.query({query:z,variables:{slug:"home"}});case 2:return n.t0=n.sent,n.abrupt("return",{cache:n.t0});case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function Z(n,t,o){var r,c=t.cache;S(O,z,c.data);var a=T(O,{query:z,variables:{slug:"home"}});return R(n,a,(function(n){return o(0,r=n)})),n.$set=function(n){"cache"in n&&o(2,c=n.cache)},[r,a,c]}var nn=function(n){o(r,i);var t=G(r);function r(n){var o;return a(this,r),o=t.call(this),e(f(o),n,Z,V,u,{cache:2}),o}return r}();export default nn;export{X as preload};
