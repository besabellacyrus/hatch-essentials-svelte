import{_ as n,r as t,a as c,b as o,c as r,d as a,i as e,s as u,e as f,S as i,H as s,f as l,g as h,h as p,q as d,j as v,k as m,l as g,m as $,n as y,o as b,p as k,t as R,u as x,v as P,w as _,x as j,y as w,z as B,A as E,B as q,C,D,E as N,F as T,G as L}from"./client.4e8d5210.js";import{c as O,r as S,q as z}from"./svelte-apollo.es.6c414822.js";import{P as A,T as F,D as G}from"./TransitionWrapper.fdd68bc1.js";function H(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var c,a=o(n);if(t){var e=o(this).constructor;c=Reflect.construct(a,arguments,e)}else c=a.apply(this,arguments);return r(this,c)}}function W(n,t,c){var o=n.slice();return o[4]=t[c],o[6]=c,o}function I(n){var t,c=n[0].data.hatch_PageBy.head_tags.headTags+"";return{c:function(){this.h()},l:function(n){this.h()},h:function(){t=new s(c,null)},m:function(n,c){t.m(n,c)},p:function(n,o){1&o&&c!==(c=n[0].data.hatch_PageBy.head_tags.headTags+"")&&t.p(c)},d:function(n){n&&t.d()}}}function J(n){return{c:w,l:w,m:w,p:w,i:w,o:w,d:w}}function K(n){var t,c,o,r,a=[Q,M],e=[];function u(n,t){return n[3].data?0:1}return t=u(n),c=e[t]=a[t](n),{c:function(){c.c(),o=l()},l:function(n){c.l(n),o=l()},m:function(n,c){e[t].m(n,c),y(n,o,c),r=!0},p:function(n,r){var f=t;(t=u(n))===f?e[t].p(n,r):(B(),x(e[f],1,1,(function(){e[f]=null})),E(),(c=e[t])||(c=e[t]=a[t](n)).c(),R(c,1),c.m(o.parentNode,o))},i:function(n){r||(R(c),r=!0)},o:function(n){x(c),r=!1},d:function(n){e[t].d(n),n&&v(o)}}}function M(n){var t,c;return{c:function(){t=q("p"),c=C("ERROR!!")},l:function(n){t=D(n,"P",{});var o=N(t);c=T(o,"ERROR!!"),o.forEach(v)},m:function(n,o){y(n,t,o),$(t,c)},p:w,i:w,o:w,d:function(n){n&&v(t)}}}function Q(n){for(var t,c,o=n[3].data.hatch_PageBy.page.fc,r=[],a=0;a<o.length;a+=1)r[a]=U(W(n,o,a));var e=function(n){return x(r[n],1,1,(function(){r[n]=null}))};return{c:function(){for(var n=0;n<r.length;n+=1)r[n].c();t=l()},l:function(n){for(var c=0;c<r.length;c+=1)r[c].l(n);t=l()},m:function(n,o){for(var a=0;a<r.length;a+=1)r[a].m(n,o);y(n,t,o),c=!0},p:function(n,c){if(2&c){var a;for(o=n[3].data.hatch_PageBy.page.fc,a=0;a<o.length;a+=1){var u=W(n,o,a);r[a]?(r[a].p(u,c),R(r[a],1)):(r[a]=U(u),r[a].c(),R(r[a],1),r[a].m(t.parentNode,t))}for(B(),a=o.length;a<r.length;a+=1)e(a);E()}},i:function(n){if(!c){for(var t=0;t<o.length;t+=1)R(r[t]);c=!0}},o:function(n){r=r.filter(Boolean);for(var t=0;t<r.length;t+=1)x(r[t]);c=!1},d:function(n){L(r,n),n&&v(t)}}}function U(n){var t,c=new G({props:{content:n[4].content,bgColor:n[4].backgroundColor}});return{c:function(){p(c.$$.fragment)},l:function(n){g(c.$$.fragment,n)},m:function(n,o){b(c,n,o),t=!0},p:function(n,t){var o={};2&t&&(o.content=n[4].content),2&t&&(o.bgColor=n[4].backgroundColor),c.$set(o)},i:function(n){t||(R(c.$$.fragment,n),t=!0)},o:function(n){x(c.$$.fragment,n),t=!1},d:function(n){P(c,n)}}}function V(n){var t,c;return{c:function(){t=q("p"),c=C("Loading...")},l:function(n){t=D(n,"P",{});var o=N(t);c=T(o,"Loading..."),o.forEach(v)},m:function(n,o){y(n,t,o),$(t,c)},p:w,i:w,o:w,d:function(n){n&&v(t)}}}function X(n){var t,c,o,r={ctx:n,current:null,token:null,pending:V,then:K,catch:J,value:3,blocks:[,,,]};return j(c=n[1],r),{c:function(){t=l(),r.block.c()},l:function(n){t=l(),r.block.l(n)},m:function(n,c){y(n,t,c),r.block.m(n,r.anchor=c),r.mount=function(){return t.parentNode},r.anchor=t,o=!0},p:function(t,o){if(n=t,r.ctx=n,2&o&&c!==(c=n[1])&&j(c,r));else{var a=n.slice();a[3]=r.resolved,r.block.p(a,o)}},i:function(n){o||(R(r.block),o=!0)},o:function(n){for(var t=0;t<3;t+=1){var c=r.blocks[t];x(c)}o=!1},d:function(n){n&&v(t),r.block.d(n),r.token=null,r=null}}}function Y(n){var t,c,o,r=n[0]&&I(n),a=new F({props:{$$slots:{default:[X]},$$scope:{ctx:n}}});return{c:function(){r&&r.c(),t=l(),c=h(),p(a.$$.fragment)},l:function(n){var o=d('[data-svelte="svelte-1ytvjjl"]',document.head);r&&r.l(o),t=l(),o.forEach(v),c=m(n),g(a.$$.fragment,n)},m:function(n,e){r&&r.m(document.head,null),$(document.head,t),y(n,c,e),b(a,n,e),o=!0},p:function(n,c){var o=k(c,1)[0];n[0]?r?r.p(n,o):((r=I(n)).c(),r.m(t.parentNode,t)):r&&(r.d(1),r=null);var e={};130&o&&(e.$$scope={dirty:o,ctx:n}),a.$set(e)},i:function(n){o||(R(a.$$.fragment,n),o=!0)},o:function(n){x(a.$$.fragment,n),o=!1},d:function(n){r&&r.d(n),v(t),n&&v(c),P(a,n)}}}function Z(){return nn.apply(this,arguments)}function nn(){return(nn=n(t.mark((function n(){return t.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.query({query:A,variables:{slug:"home"}});case 2:return n.t0=n.sent,n.abrupt("return",{cache:n.t0});case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function tn(n,t,c){var o,r=t.cache;S(O,A,r.data);var a=z(O,{query:A,variables:{slug:"home"}});return _(n,a,(function(n){return c(1,o=n)})),n.$set=function(n){"cache"in n&&c(0,r=n.cache)},[r,o,a]}var cn=function(n){c(o,i);var t=H(o);function o(n){var c;return a(this,o),c=t.call(this),e(f(c),n,tn,Y,u,{cache:0}),c}return o}();export default cn;export{Z as preload};
