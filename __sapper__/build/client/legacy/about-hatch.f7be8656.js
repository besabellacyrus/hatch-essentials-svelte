import{_ as n,r as t,a as c,b as a,c as r,d as o,i as e,s as u,e as f,S as i,H as s,f as l,g as h,h as d,q as p,j as v,k as g,l as m,m as $,n as b,o as y,p as k,t as R,u as x,v as P,w as E,x as _,y as w,z as B,A as q,B as C,C as D,D as j,E as N,F as T,O,G as L}from"./client.4e8d5210.js";import{c as S,r as z,q as A}from"./svelte-apollo.es.6c414822.js";import{P as F,T as G,D as H}from"./TransitionWrapper.fdd68bc1.js";function I(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var c,o=a(n);if(t){var e=a(this).constructor;c=Reflect.construct(o,arguments,e)}else c=o.apply(this,arguments);return r(this,c)}}function V(n,t,c){var a=n.slice();return a[4]=t[c],a[6]=c,a}function W(n){var t,c=n[0].data.hatch_PageBy.head_tags.headTags+"";return{c:function(){this.h()},l:function(n){this.h()},h:function(){t=new s(c,null)},m:function(n,c){t.m(n,c)},p:function(n,a){1&a&&c!==(c=n[0].data.hatch_PageBy.head_tags.headTags+"")&&t.p(c)},d:function(n){n&&t.d()}}}function J(n){return{c:w,l:w,m:w,p:w,i:w,o:w,d:w}}function K(n){var t,c,a,r,o=[Q,M],e=[];function u(n,t){return n[3].data?0:1}return t=u(n),c=e[t]=o[t](n),{c:function(){c.c(),a=l()},l:function(n){c.l(n),a=l()},m:function(n,c){e[t].m(n,c),b(n,a,c),r=!0},p:function(n,r){var f=t;(t=u(n))===f?e[t].p(n,r):(B(),x(e[f],1,1,(function(){e[f]=null})),q(),(c=e[t])||(c=e[t]=o[t](n)).c(),R(c,1),c.m(a.parentNode,a))},i:function(n){r||(R(c),r=!0)},o:function(n){x(c),r=!1},d:function(n){e[t].d(n),n&&v(a)}}}function M(n){var t,c;return{c:function(){t=C("p"),c=D("ERROR!!")},l:function(n){t=j(n,"P",{});var a=N(t);c=T(a,"ERROR!!"),a.forEach(v)},m:function(n,a){b(n,t,a),$(t,c)},p:w,i:w,o:w,d:function(n){n&&v(t)}}}function Q(n){for(var t,c,a=n[3].data.hatch_PageBy.page.fc,r=[],o=0;o<a.length;o+=1)r[o]=U(V(n,a,o));var e=function(n){return x(r[n],1,1,(function(){r[n]=null}))};return{c:function(){for(var n=0;n<r.length;n+=1)r[n].c();t=l()},l:function(n){for(var c=0;c<r.length;c+=1)r[c].l(n);t=l()},m:function(n,a){for(var o=0;o<r.length;o+=1)r[o].m(n,a);b(n,t,a),c=!0},p:function(n,c){if(2&c){var o;for(a=n[3].data.hatch_PageBy.page.fc,o=0;o<a.length;o+=1){var u=V(n,a,o);r[o]?(r[o].p(u,c),R(r[o],1)):(r[o]=U(u),r[o].c(),R(r[o],1),r[o].m(t.parentNode,t))}for(B(),o=a.length;o<r.length;o+=1)e(o);q()}},i:function(n){if(!c){for(var t=0;t<a.length;t+=1)R(r[t]);c=!0}},o:function(n){r=r.filter(Boolean);for(var t=0;t<r.length;t+=1)x(r[t]);c=!1},d:function(n){L(r,n),n&&v(t)}}}function U(n){var t,c=new H({props:{content:n[4].content,bgColor:n[4].backgroundColor}});return{c:function(){d(c.$$.fragment)},l:function(n){m(c.$$.fragment,n)},m:function(n,a){y(c,n,a),t=!0},p:function(n,t){var a={};2&t&&(a.content=n[4].content),2&t&&(a.bgColor=n[4].backgroundColor),c.$set(a)},i:function(n){t||(R(c.$$.fragment,n),t=!0)},o:function(n){x(c.$$.fragment,n),t=!1},d:function(n){P(c,n)}}}function X(n){var t,c,a;return{c:function(){t=C("div"),c=C("p"),a=D("Loading..."),this.h()},l:function(n){t=j(n,"DIV",{class:!0});var r=N(t);c=j(r,"P",{});var o=N(c);a=T(o,"Loading..."),o.forEach(v),r.forEach(v),this.h()},h:function(){O(t,"class","loader")},m:function(n,r){b(n,t,r),$(t,c),$(c,a)},p:w,i:w,o:w,d:function(n){n&&v(t)}}}function Y(n){var t,c,a,r={ctx:n,current:null,token:null,pending:X,then:K,catch:J,value:3,blocks:[,,,]};return _(c=n[1],r),{c:function(){t=l(),r.block.c()},l:function(n){t=l(),r.block.l(n)},m:function(n,c){b(n,t,c),r.block.m(n,r.anchor=c),r.mount=function(){return t.parentNode},r.anchor=t,a=!0},p:function(t,a){if(n=t,r.ctx=n,2&a&&c!==(c=n[1])&&_(c,r));else{var o=n.slice();o[3]=r.resolved,r.block.p(o,a)}},i:function(n){a||(R(r.block),a=!0)},o:function(n){for(var t=0;t<3;t+=1){var c=r.blocks[t];x(c)}a=!1},d:function(n){n&&v(t),r.block.d(n),r.token=null,r=null}}}function Z(n){var t,c,a,r=n[0]&&W(n),o=new G({props:{$$slots:{default:[Y]},$$scope:{ctx:n}}});return{c:function(){r&&r.c(),t=l(),c=h(),d(o.$$.fragment)},l:function(n){var a=p('[data-svelte="svelte-16lg75d"]',document.head);r&&r.l(a),t=l(),a.forEach(v),c=g(n),m(o.$$.fragment,n)},m:function(n,e){r&&r.m(document.head,null),$(document.head,t),b(n,c,e),y(o,n,e),a=!0},p:function(n,c){var a=k(c,1)[0];n[0]?r?r.p(n,a):((r=W(n)).c(),r.m(t.parentNode,t)):r&&(r.d(1),r=null);var e={};130&a&&(e.$$scope={dirty:a,ctx:n}),o.$set(e)},i:function(n){a||(R(o.$$.fragment,n),a=!0)},o:function(n){x(o.$$.fragment,n),a=!1},d:function(n){r&&r.d(n),v(t),n&&v(c),P(o,n)}}}var nn="about-hatch";function tn(){return cn.apply(this,arguments)}function cn(){return(cn=n(t.mark((function n(){return t.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,S.query({query:F,variables:{slug:nn}});case 2:return n.t0=n.sent,n.abrupt("return",{cache:n.t0});case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function an(n,t,c){var a,r=t.cache;z(S,F,r.data);var o=A(S,{query:F,variables:{slug:nn}});return E(n,o,(function(n){return c(1,a=n)})),n.$set=function(n){"cache"in n&&c(0,r=n.cache)},[r,a,o]}var rn=function(n){c(a,i);var t=I(a);function a(n){var c;return o(this,a),c=t.call(this),e(f(c),n,an,Z,u,{cache:0}),c}return a}();export default rn;export{tn as preload};