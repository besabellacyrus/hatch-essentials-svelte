import{_ as n,r as t,a as c,b as a,c as o,d as r,i as e,s as u,e as f,S as i,H as s,f as l,g as h,h as p,q as d,j as v,k as m,l as g,m as $,n as b,o as y,p as k,t as R,u as x,v as P,w as _,x as j,y as w,z as B,A as E,B as q,C,D,E as N,F as T,G as L}from"./client.6711349c.js";import{c as O,r as S,q as z}from"./svelte-apollo.es.eac3a761.js";import{P as A,T as F,D as G}from"./TransitionWrapper.b4ed1ab1.js";function H(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var c,r=a(n);if(t){var e=a(this).constructor;c=Reflect.construct(r,arguments,e)}else c=r.apply(this,arguments);return o(this,c)}}function W(n,t,c){var a=n.slice();return a[4]=t[c],a[6]=c,a}function I(n){var t,c=n[0].data.hatch_PageBy.head_tags.headTags+"";return{c:function(){this.h()},l:function(n){this.h()},h:function(){t=new s(c,null)},m:function(n,c){t.m(n,c)},p:function(n,a){1&a&&c!==(c=n[0].data.hatch_PageBy.head_tags.headTags+"")&&t.p(c)},d:function(n){n&&t.d()}}}function J(n){return{c:w,l:w,m:w,p:w,i:w,o:w,d:w}}function K(n){var t,c,a,o,r=[Q,M],e=[];function u(n,t){return n[3].data?0:1}return t=u(n),c=e[t]=r[t](n),{c:function(){c.c(),a=l()},l:function(n){c.l(n),a=l()},m:function(n,c){e[t].m(n,c),b(n,a,c),o=!0},p:function(n,o){var f=t;(t=u(n))===f?e[t].p(n,o):(B(),x(e[f],1,1,(function(){e[f]=null})),E(),(c=e[t])||(c=e[t]=r[t](n)).c(),R(c,1),c.m(a.parentNode,a))},i:function(n){o||(R(c),o=!0)},o:function(n){x(c),o=!1},d:function(n){e[t].d(n),n&&v(a)}}}function M(n){var t,c;return{c:function(){t=q("p"),c=C("ERROR!!")},l:function(n){t=D(n,"P",{});var a=N(t);c=T(a,"ERROR!!"),a.forEach(v)},m:function(n,a){b(n,t,a),$(t,c)},p:w,i:w,o:w,d:function(n){n&&v(t)}}}function Q(n){for(var t,c,a=n[3].data.hatch_PageBy.page.fc,o=[],r=0;r<a.length;r+=1)o[r]=U(W(n,a,r));var e=function(n){return x(o[n],1,1,(function(){o[n]=null}))};return{c:function(){for(var n=0;n<o.length;n+=1)o[n].c();t=l()},l:function(n){for(var c=0;c<o.length;c+=1)o[c].l(n);t=l()},m:function(n,a){for(var r=0;r<o.length;r+=1)o[r].m(n,a);b(n,t,a),c=!0},p:function(n,c){if(2&c){var r;for(a=n[3].data.hatch_PageBy.page.fc,r=0;r<a.length;r+=1){var u=W(n,a,r);o[r]?(o[r].p(u,c),R(o[r],1)):(o[r]=U(u),o[r].c(),R(o[r],1),o[r].m(t.parentNode,t))}for(B(),r=a.length;r<o.length;r+=1)e(r);E()}},i:function(n){if(!c){for(var t=0;t<a.length;t+=1)R(o[t]);c=!0}},o:function(n){o=o.filter(Boolean);for(var t=0;t<o.length;t+=1)x(o[t]);c=!1},d:function(n){L(o,n),n&&v(t)}}}function U(n){var t,c=new G({props:{content:n[4].content,bgColor:n[4].backgroundColor}});return{c:function(){p(c.$$.fragment)},l:function(n){g(c.$$.fragment,n)},m:function(n,a){y(c,n,a),t=!0},p:function(n,t){var a={};2&t&&(a.content=n[4].content),2&t&&(a.bgColor=n[4].backgroundColor),c.$set(a)},i:function(n){t||(R(c.$$.fragment,n),t=!0)},o:function(n){x(c.$$.fragment,n),t=!1},d:function(n){P(c,n)}}}function V(n){var t,c;return{c:function(){t=q("p"),c=C("Loading...")},l:function(n){t=D(n,"P",{});var a=N(t);c=T(a,"Loading..."),a.forEach(v)},m:function(n,a){b(n,t,a),$(t,c)},p:w,i:w,o:w,d:function(n){n&&v(t)}}}function X(n){var t,c,a,o={ctx:n,current:null,token:null,pending:V,then:K,catch:J,value:3,blocks:[,,,]};return j(c=n[1],o),{c:function(){t=l(),o.block.c()},l:function(n){t=l(),o.block.l(n)},m:function(n,c){b(n,t,c),o.block.m(n,o.anchor=c),o.mount=function(){return t.parentNode},o.anchor=t,a=!0},p:function(t,a){if(n=t,o.ctx=n,2&a&&c!==(c=n[1])&&j(c,o));else{var r=n.slice();r[3]=o.resolved,o.block.p(r,a)}},i:function(n){a||(R(o.block),a=!0)},o:function(n){for(var t=0;t<3;t+=1){var c=o.blocks[t];x(c)}a=!1},d:function(n){n&&v(t),o.block.d(n),o.token=null,o=null}}}function Y(n){var t,c,a,o=n[0]&&I(n),r=new F({props:{$$slots:{default:[X]},$$scope:{ctx:n}}});return{c:function(){o&&o.c(),t=l(),c=h(),p(r.$$.fragment)},l:function(n){var a=d('[data-svelte="svelte-1ytvjjl"]',document.head);o&&o.l(a),t=l(),a.forEach(v),c=m(n),g(r.$$.fragment,n)},m:function(n,e){o&&o.m(document.head,null),$(document.head,t),b(n,c,e),y(r,n,e),a=!0},p:function(n,c){var a=k(c,1)[0];n[0]?o?o.p(n,a):((o=I(n)).c(),o.m(t.parentNode,t)):o&&(o.d(1),o=null);var e={};130&a&&(e.$$scope={dirty:a,ctx:n}),r.$set(e)},i:function(n){a||(R(r.$$.fragment,n),a=!0)},o:function(n){x(r.$$.fragment,n),a=!1},d:function(n){o&&o.d(n),v(t),n&&v(c),P(r,n)}}}function Z(){return nn.apply(this,arguments)}function nn(){return(nn=n(t.mark((function n(){return t.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.query({query:A,variables:{slug:"home"}});case 2:return n.t0=n.sent,n.abrupt("return",{cache:n.t0});case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function tn(n,t,c){var a,o=t.cache;S(O,A,o.data);var r=z(O,{query:A,variables:{slug:"home"}});return _(n,r,(function(n){return c(1,a=n)})),n.$set=function(n){"cache"in n&&c(0,o=n.cache)},[o,a,r]}var cn=function(n){c(a,i);var t=H(a);function a(n){var c;return r(this,a),c=t.call(this),e(f(c),n,tn,Y,u,{cache:0}),c}return a}();export default cn;export{Z as preload};
