import{_ as n,r as t,a,b as c,c as r,d as o,i as e,s as u,e as i,S as f,H as s,f as l,g as h,h as d,q as p,j as v,k as g,l as m,m as $,n as y,o as b,p as k,t as R,u as x,v as P,w as E,x as _,y as j,z as w,A as B,B as q,C,D,E as N,F as T,O,G as L}from"./client.79d3d475.js";import{c as S,r as z,q as A}from"./svelte-apollo.es.2c0375d6.js";import{P as F,T as G,D as H}from"./TransitionWrapper.b254843a.js";function I(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var a,o=c(n);if(t){var e=c(this).constructor;a=Reflect.construct(o,arguments,e)}else a=o.apply(this,arguments);return r(this,a)}}function V(n,t,a){var c=n.slice();return c[4]=t[a],c[6]=a,c}function W(n){var t,a=n[0].data.hatch_PageBy.head_tags.headTags+"";return{c:function(){this.h()},l:function(n){this.h()},h:function(){t=new s(a,null)},m:function(n,a){t.m(n,a)},p:function(n,c){1&c&&a!==(a=n[0].data.hatch_PageBy.head_tags.headTags+"")&&t.p(a)},d:function(n){n&&t.d()}}}function J(n){return{c:j,l:j,m:j,p:j,i:j,o:j,d:j}}function K(n){var t,a,c,r,o=[Q,M],e=[];function u(n,t){return n[3].data?0:1}return t=u(n),a=e[t]=o[t](n),{c:function(){a.c(),c=l()},l:function(n){a.l(n),c=l()},m:function(n,a){e[t].m(n,a),y(n,c,a),r=!0},p:function(n,r){var i=t;(t=u(n))===i?e[t].p(n,r):(w(),x(e[i],1,1,(function(){e[i]=null})),B(),(a=e[t])||(a=e[t]=o[t](n)).c(),R(a,1),a.m(c.parentNode,c))},i:function(n){r||(R(a),r=!0)},o:function(n){x(a),r=!1},d:function(n){e[t].d(n),n&&v(c)}}}function M(n){var t,a;return{c:function(){t=q("p"),a=C("ERROR!!")},l:function(n){t=D(n,"P",{});var c=N(t);a=T(c,"ERROR!!"),c.forEach(v)},m:function(n,c){y(n,t,c),$(t,a)},p:j,i:j,o:j,d:function(n){n&&v(t)}}}function Q(n){for(var t,a,c=n[3].data.hatch_PageBy.page.fc,r=[],o=0;o<c.length;o+=1)r[o]=U(V(n,c,o));var e=function(n){return x(r[n],1,1,(function(){r[n]=null}))};return{c:function(){for(var n=0;n<r.length;n+=1)r[n].c();t=l()},l:function(n){for(var a=0;a<r.length;a+=1)r[a].l(n);t=l()},m:function(n,c){for(var o=0;o<r.length;o+=1)r[o].m(n,c);y(n,t,c),a=!0},p:function(n,a){if(2&a){var o;for(c=n[3].data.hatch_PageBy.page.fc,o=0;o<c.length;o+=1){var u=V(n,c,o);r[o]?(r[o].p(u,a),R(r[o],1)):(r[o]=U(u),r[o].c(),R(r[o],1),r[o].m(t.parentNode,t))}for(w(),o=c.length;o<r.length;o+=1)e(o);B()}},i:function(n){if(!a){for(var t=0;t<c.length;t+=1)R(r[t]);a=!0}},o:function(n){r=r.filter(Boolean);for(var t=0;t<r.length;t+=1)x(r[t]);a=!1},d:function(n){L(r,n),n&&v(t)}}}function U(n){var t,a=new H({props:{content:n[4].content,bgColor:n[4].backgroundColor}});return{c:function(){d(a.$$.fragment)},l:function(n){m(a.$$.fragment,n)},m:function(n,c){b(a,n,c),t=!0},p:function(n,t){var c={};2&t&&(c.content=n[4].content),2&t&&(c.bgColor=n[4].backgroundColor),a.$set(c)},i:function(n){t||(R(a.$$.fragment,n),t=!0)},o:function(n){x(a.$$.fragment,n),t=!1},d:function(n){P(a,n)}}}function X(n){var t,a,c;return{c:function(){t=q("div"),a=q("p"),c=C("Loading..."),this.h()},l:function(n){t=D(n,"DIV",{class:!0});var r=N(t);a=D(r,"P",{});var o=N(a);c=T(o,"Loading..."),o.forEach(v),r.forEach(v),this.h()},h:function(){O(t,"class","loader")},m:function(n,r){y(n,t,r),$(t,a),$(a,c)},p:j,i:j,o:j,d:function(n){n&&v(t)}}}function Y(n){var t,a,c,r={ctx:n,current:null,token:null,pending:X,then:K,catch:J,value:3,blocks:[,,,]};return _(a=n[1],r),{c:function(){t=l(),r.block.c()},l:function(n){t=l(),r.block.l(n)},m:function(n,a){y(n,t,a),r.block.m(n,r.anchor=a),r.mount=function(){return t.parentNode},r.anchor=t,c=!0},p:function(t,c){if(n=t,r.ctx=n,2&c&&a!==(a=n[1])&&_(a,r));else{var o=n.slice();o[3]=r.resolved,r.block.p(o,c)}},i:function(n){c||(R(r.block),c=!0)},o:function(n){for(var t=0;t<3;t+=1){var a=r.blocks[t];x(a)}c=!1},d:function(n){n&&v(t),r.block.d(n),r.token=null,r=null}}}function Z(n){var t,a,c,r=n[0]&&W(n),o=new G({props:{$$slots:{default:[Y]},$$scope:{ctx:n}}});return{c:function(){r&&r.c(),t=l(),a=h(),d(o.$$.fragment)},l:function(n){var c=p('[data-svelte="svelte-1ytvjjl"]',document.head);r&&r.l(c),t=l(),c.forEach(v),a=g(n),m(o.$$.fragment,n)},m:function(n,e){r&&r.m(document.head,null),$(document.head,t),y(n,a,e),b(o,n,e),c=!0},p:function(n,a){var c=k(a,1)[0];n[0]?r?r.p(n,c):((r=W(n)).c(),r.m(t.parentNode,t)):r&&(r.d(1),r=null);var e={};130&c&&(e.$$scope={dirty:c,ctx:n}),o.$set(e)},i:function(n){c||(R(o.$$.fragment,n),c=!0)},o:function(n){x(o.$$.fragment,n),c=!1},d:function(n){r&&r.d(n),v(t),n&&v(a),P(o,n)}}}var nn="essential-oils-101";function tn(){return an.apply(this,arguments)}function an(){return(an=n(t.mark((function n(){return t.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,S.query({query:F,variables:{slug:nn}});case 2:return n.t0=n.sent,n.abrupt("return",{cache:n.t0});case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function cn(n,t,a){var c,r=t.cache;z(S,F,r.data);var o=A(S,{query:F,variables:{slug:nn}});return E(n,o,(function(n){return a(1,c=n)})),n.$set=function(n){"cache"in n&&a(0,r=n.cache)},[r,c,o]}var rn=function(n){a(c,f);var t=I(c);function c(n){var a;return o(this,c),a=t.call(this),e(i(a),n,cn,Z,u,{cache:0}),a}return c}();export default rn;export{tn as preload};
