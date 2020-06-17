import{a as n,b as t,c,d as o,i as r,s as u,e as a,S as e,A as i,C as s,D as f,h as l,N as h,O as p,l as v,n as d,x as g,P as y,w as m,y as $,o as R,z as b,t as D,M as P,Q as C,R as _,T as H,U as S,V as T,W as k}from"./client.2931f906.js";import{s as x,_ as E}from"./svelte-apollo.es.3fc8a315.js";function N(){var n=E(["\n  query Hatch_Page($slug: String!) {\n    hatch_PageBy(slug: $slug) {\n      page {\n        fc {\n          ... on Hatch_Page_Page_Fc_Htmlblock {\n            content\n            backgroundColor\n            fieldGroupName\n          }\n        }\n      }\n    }\n  }\n"]);return N=function(){return n},n}var I=x(N());function M(n){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var r,u=t(n);if(o){var a=t(this).constructor;r=Reflect.construct(u,arguments,a)}else r=u.apply(this,arguments);return c(this,r)}}function V(n){var t;return{c:function(){t=i("section"),this.h()},l:function(n){t=s(n,"SECTION",{class:!0,style:!0}),f(t).forEach(l),this.h()},h:function(){h(t,"class","he-row"),p(t,"background-color",n[1]?n[1]:"")},m:function(c,o){v(c,t,o),t.innerHTML=n[0]},p:function(n,c){var o=d(c,1)[0];1&o&&(t.innerHTML=n[0]),2&o&&p(t,"background-color",n[1]?n[1]:"")},i:g,o:g,d:function(n){n&&l(t)}}}function j(n,t,c){var o=t.content,r=t.bgColor;return n.$set=function(n){"content"in n&&c(0,o=n.content),"bgColor"in n&&c(1,r=n.bgColor)},[o,r]}var w=function(t){n(i,e);var c=M(i);function i(n){var t;return o(this,i),t=c.call(this),r(a(t),n,j,V,u,{content:0,bgColor:1}),t}return i}(),L=function(n){return{duration:250,delay:250,easing:y,css:function(n){return"opacity: ".concat(n)}}},O=function(n){return{duration:250,delayZero:0,easing:y,css:function(n){return"opacity: ".concat(n)}}};function q(n){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var r,u=t(n);if(o){var a=t(this).constructor;r=Reflect.construct(u,arguments,a)}else r=u.apply(this,arguments);return c(this,r)}}function z(n){var t,c,o,r,u=n[2].default,a=C(u,n,n[1],null);return{c:function(){t=i("div"),a&&a.c()},l:function(n){t=s(n,"DIV",{});var c=f(t);a&&a.l(c),c.forEach(l)},m:function(n,c){v(n,t,c),a&&a.m(t,null),r=!0},p:function(n,t){a&&a.p&&2&t&&a.p(_(u,n,n[1],null),H(u,n[1],t,null))},i:function(n){r||(D(a,n),S((function(){o&&o.end(1),c||(c=T(t,L,{})),c.start()})),r=!0)},o:function(n){R(a,n),c&&c.invalidate(),o=k(t,O,{}),r=!1},d:function(n){n&&l(t),a&&a.d(n),n&&o&&o.end()}}}function A(n){var t;return{c:function(){t=i("div"),this.h()},l:function(n){t=s(n,"DIV",{class:!0}),f(t).forEach(l),this.h()},h:function(){h(t,"class","loader")},m:function(n,c){v(n,t,c)},p:g,i:g,o:g,d:function(n){n&&l(t)}}}function B(n){var t,c,o,r,u=[A,z],a=[];function e(n,t){return n[0]?0:1}return t=e(n),c=a[t]=u[t](n),{c:function(){c.c(),o=m()},l:function(n){c.l(n),o=m()},m:function(n,c){a[t].m(n,c),v(n,o,c),r=!0},p:function(n,r){var i=d(r,1)[0],s=t;(t=e(n))===s?a[t].p(n,i):($(),R(a[s],1,1,(function(){a[s]=null})),b(),(c=a[t])||(c=a[t]=u[t](n)).c(),D(c,1),c.m(o.parentNode,o))},i:function(n){r||(D(c),r=!0)},o:function(n){R(c),r=!1},d:function(n){a[t].d(n),n&&l(o)}}}function F(n,t,c){var o=!0;P((function(){c(0,o=!1)}));var r=t.$$slots,u=void 0===r?{}:r,a=t.$$scope;return n.$set=function(n){"$$scope"in n&&c(1,a=n.$$scope)},[o,a,u]}var G=function(t){n(i,e);var c=q(i);function i(n){var t;return o(this,i),t=c.call(this),r(a(t),n,F,B,u,{}),t}return i}();export{w as D,I as P,G as T};
