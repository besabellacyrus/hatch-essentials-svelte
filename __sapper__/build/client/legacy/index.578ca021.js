import{_ as n,r as t,a as c,b as o,c as a,d as r,i as e,s as u,e as f,S as i,H as s,f as l,g as h,h as p,q as d,j as v,k as m,l as g,m as $,n as b,o as y,p as k,t as R,u as x,v as P,w as _,x as j,y as w,z as B,A as E,B as q,C,D,E as N,F as T,G as L}from"./client.8738c03a.js";import{c as O,r as S,q as z}from"./svelte-apollo.es.5e159a7f.js";import{P as A,T as F,D as G}from"./TransitionWrapper.c4b3c6b6.js";function H(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var c,r=o(n);if(t){var e=o(this).constructor;c=Reflect.construct(r,arguments,e)}else c=r.apply(this,arguments);return a(this,c)}}function W(n,t,c){var o=n.slice();return o[4]=t[c],o[6]=c,o}function I(n){var t,c=n[0].data.hatch_PageBy.head_tags.headTags+"";return{c:function(){this.h()},l:function(n){this.h()},h:function(){t=new s(c,null)},m:function(n,c){t.m(n,c)},p:function(n,o){1&o&&c!==(c=n[0].data.hatch_PageBy.head_tags.headTags+"")&&t.p(c)},d:function(n){n&&t.d()}}}function J(n){return{c:w,l:w,m:w,p:w,i:w,o:w,d:w}}function K(n){var t,c,o,a,r=[Q,M],e=[];function u(n,t){return n[3].data?0:1}return t=u(n),c=e[t]=r[t](n),{c:function(){c.c(),o=l()},l:function(n){c.l(n),o=l()},m:function(n,c){e[t].m(n,c),b(n,o,c),a=!0},p:function(n,a){var f=t;(t=u(n))===f?e[t].p(n,a):(B(),x(e[f],1,1,(function(){e[f]=null})),E(),(c=e[t])||(c=e[t]=r[t](n)).c(),R(c,1),c.m(o.parentNode,o))},i:function(n){a||(R(c),a=!0)},o:function(n){x(c),a=!1},d:function(n){e[t].d(n),n&&v(o)}}}function M(n){var t,c;return{c:function(){t=q("p"),c=C("ERROR!!")},l:function(n){t=D(n,"P",{});var o=N(t);c=T(o,"ERROR!!"),o.forEach(v)},m:function(n,o){b(n,t,o),$(t,c)},p:w,i:w,o:w,d:function(n){n&&v(t)}}}function Q(n){for(var t,c,o=n[3].data.hatch_PageBy.page.fc,a=[],r=0;r<o.length;r+=1)a[r]=U(W(n,o,r));var e=function(n){return x(a[n],1,1,(function(){a[n]=null}))};return{c:function(){for(var n=0;n<a.length;n+=1)a[n].c();t=l()},l:function(n){for(var c=0;c<a.length;c+=1)a[c].l(n);t=l()},m:function(n,o){for(var r=0;r<a.length;r+=1)a[r].m(n,o);b(n,t,o),c=!0},p:function(n,c){if(2&c){var r;for(o=n[3].data.hatch_PageBy.page.fc,r=0;r<o.length;r+=1){var u=W(n,o,r);a[r]?(a[r].p(u,c),R(a[r],1)):(a[r]=U(u),a[r].c(),R(a[r],1),a[r].m(t.parentNode,t))}for(B(),r=o.length;r<a.length;r+=1)e(r);E()}},i:function(n){if(!c){for(var t=0;t<o.length;t+=1)R(a[t]);c=!0}},o:function(n){a=a.filter(Boolean);for(var t=0;t<a.length;t+=1)x(a[t]);c=!1},d:function(n){L(a,n),n&&v(t)}}}function U(n){var t,c=new G({props:{content:n[4].content,bgColor:n[4].backgroundColor}});return{c:function(){p(c.$$.fragment)},l:function(n){g(c.$$.fragment,n)},m:function(n,o){y(c,n,o),t=!0},p:function(n,t){var o={};2&t&&(o.content=n[4].content),2&t&&(o.bgColor=n[4].backgroundColor),c.$set(o)},i:function(n){t||(R(c.$$.fragment,n),t=!0)},o:function(n){x(c.$$.fragment,n),t=!1},d:function(n){P(c,n)}}}function V(n){var t,c;return{c:function(){t=q("p"),c=C("Loading...")},l:function(n){t=D(n,"P",{});var o=N(t);c=T(o,"Loading..."),o.forEach(v)},m:function(n,o){b(n,t,o),$(t,c)},p:w,i:w,o:w,d:function(n){n&&v(t)}}}function X(n){var t,c,o,a={ctx:n,current:null,token:null,pending:V,then:K,catch:J,value:3,blocks:[,,,]};return j(c=n[1],a),{c:function(){t=l(),a.block.c()},l:function(n){t=l(),a.block.l(n)},m:function(n,c){b(n,t,c),a.block.m(n,a.anchor=c),a.mount=function(){return t.parentNode},a.anchor=t,o=!0},p:function(t,o){if(n=t,a.ctx=n,2&o&&c!==(c=n[1])&&j(c,a));else{var r=n.slice();r[3]=a.resolved,a.block.p(r,o)}},i:function(n){o||(R(a.block),o=!0)},o:function(n){for(var t=0;t<3;t+=1){var c=a.blocks[t];x(c)}o=!1},d:function(n){n&&v(t),a.block.d(n),a.token=null,a=null}}}function Y(n){var t,c,o,a=n[0]&&I(n),r=new F({props:{$$slots:{default:[X]},$$scope:{ctx:n}}});return{c:function(){a&&a.c(),t=l(),c=h(),p(r.$$.fragment)},l:function(n){var o=d('[data-svelte="svelte-1ytvjjl"]',document.head);a&&a.l(o),t=l(),o.forEach(v),c=m(n),g(r.$$.fragment,n)},m:function(n,e){a&&a.m(document.head,null),$(document.head,t),b(n,c,e),y(r,n,e),o=!0},p:function(n,c){var o=k(c,1)[0];n[0]?a?a.p(n,o):((a=I(n)).c(),a.m(t.parentNode,t)):a&&(a.d(1),a=null);var e={};130&o&&(e.$$scope={dirty:o,ctx:n}),r.$set(e)},i:function(n){o||(R(r.$$.fragment,n),o=!0)},o:function(n){x(r.$$.fragment,n),o=!1},d:function(n){a&&a.d(n),v(t),n&&v(c),P(r,n)}}}function Z(){return nn.apply(this,arguments)}function nn(){return(nn=n(t.mark((function n(){return t.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,O.query({query:A,variables:{slug:"home"}});case 2:return n.t0=n.sent,n.abrupt("return",{cache:n.t0});case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function tn(n,t,c){var o,a=t.cache;S(O,A,a.data);var r=z(O,{query:A,variables:{slug:"home"}});return _(n,r,(function(n){return c(1,o=n)})),n.$set=function(n){"cache"in n&&c(0,a=n.cache)},[a,o,r]}var cn=function(n){c(o,i);var t=H(o);function o(n){var c;return r(this,o),c=t.call(this),e(f(c),n,tn,Y,u,{cache:0}),c}return o}();export default cn;export{Z as preload};
