import{a as n,b as t,c as r,d as o,i as c,s as e,e as a,S as s,B as u,D as i,E as f,j as l,O as h,P as g,n as p,p as v,y as b}from"./client.50dacc8c.js";import{s as d,_ as y}from"./svelte-apollo.es.6e6bb1ce.js";function m(){var n=y(["\n  query Hatch_Page($slug: String!) {\n    hatch_PageBy(slug: $slug) {\n      page {\n        fc {\n          ... on Hatch_Page_Page_Fc_Htmlblock {\n            content\n            backgroundColor\n            fieldGroupName\n          }\n        }\n      }\n      title\n      head_tags {\n        headTags\n      }\n    }\n  }\n"]);return m=function(){return n},n}var _=d(m());function P(n){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var c,e=t(n);if(o){var a=t(this).constructor;c=Reflect.construct(e,arguments,a)}else c=e.apply(this,arguments);return r(this,c)}}function C(n){var t;return{c:function(){t=u("section"),this.h()},l:function(n){t=i(n,"SECTION",{class:!0,style:!0}),f(t).forEach(l),this.h()},h:function(){h(t,"class","he-row"),g(t,"background-color",n[1]?n[1]:"")},m:function(r,o){p(r,t,o),t.innerHTML=n[0]},p:function(n,r){var o=v(r,1)[0];1&o&&(t.innerHTML=n[0]),2&o&&g(t,"background-color",n[1]?n[1]:"")},i:b,o:b,d:function(n){n&&l(t)}}}function H(n,t,r){var o=t.content,c=t.bgColor;return n.$set=function(n){"content"in n&&r(0,o=n.content),"bgColor"in n&&r(1,c=n.bgColor)},[o,c]}var R=function(t){n(u,s);var r=P(u);function u(n){var t;return o(this,u),t=r.call(this),c(a(t),n,H,C,e,{content:0,bgColor:1}),t}return u}();export{R as D,_ as P};