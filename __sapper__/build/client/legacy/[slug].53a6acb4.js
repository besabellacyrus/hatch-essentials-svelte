import{_ as t,r as n,a as c,b as a,c as r,d as s,i as e,s as o,e as u,S as i,v as l,f,A as h,q as p,h as d,j as v,C as m,D as g,N as y,l as E,F as R,n as x,x as b,w as k,B as D,E as I,W as w,X as q}from"./client.707350da.js";import{s as S,_ as V,c as j,r as L}from"./svelte-apollo.es.1450aa37.js";function N(){var t=V(["\n\tquery MyQuery($slug: ID!) {\n  \tpost(id: $slug, idType: SLUG) {\n\t    categories {\n\t      nodes {\n\t        uri\n\t        slug\n\t      }\n\t    }\n\t    date\n\t    slug\n\t    status\n\t    title\n\t    content\n\t  }\n\t}\n"]);return N=function(){return t},t}var O=S(N());function P(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var c,s=a(t);if(n){var e=a(this).constructor;c=Reflect.construct(s,arguments,e)}else c=s.apply(this,arguments);return r(this,c)}}function $(t){return{c:b,l:b,m:b,p:b,d:b}}function C(t){var n;function c(t,n){return t[2].data?_:T}var a=c(t),r=a(t);return{c:function(){r.c(),n=k()},l:function(t){r.l(t),n=k()},m:function(t,c){r.m(t,c),E(t,n,c)},p:function(t,s){a===(a=c(t))&&r?r.p(t,s):(r.d(1),(r=a(t))&&(r.c(),r.m(n.parentNode,n)))},d:function(t){r.d(t),t&&d(n)}}}function T(t){var n,c;return{c:function(){n=h("p"),c=D("ERROR!!")},l:function(t){n=m(t,"P",{});var a=g(n);c=I(a,"ERROR!!"),a.forEach(d)},m:function(t,a){E(t,n,a),R(n,c)},p:b,d:function(t){t&&d(n)}}}function _(t){var n,c,a,r,s=t[2].data.post.title+"",e=t[2].data.post.content+"";return{c:function(){n=h("h1"),c=D(s),a=f(),this.h()},l:function(t){n=m(t,"H1",{class:!0});var r=g(n);c=I(r,s),r.forEach(d),a=v(t),this.h()},h:function(){y(n,"class","text-center"),r=new w(e,null)},m:function(t,s){E(t,n,s),R(n,c),E(t,a,s),r.m(t,s)},p:function(t,n){2&n&&s!==(s=t[2].data.post.title+"")&&q(c,s),2&n&&e!==(e=t[2].data.post.content+"")&&r.p(e)},d:function(t){t&&d(n),t&&d(a),t&&r.d()}}}function A(t){var n,c,a;return{c:function(){n=h("div"),c=h("p"),a=D("Loading..."),this.h()},l:function(t){n=m(t,"DIV",{class:!0});var r=g(n);c=m(r,"P",{});var s=g(c);a=I(s,"Loading..."),s.forEach(d),r.forEach(d),this.h()},h:function(){y(n,"class","loader")},m:function(t,r){E(t,n,r),R(n,c),R(c,a)},p:b,d:function(t){t&&d(n)}}}function B(t){var n,c,a,r,s,e,o,u,i;document.title=n=t[0];var k={ctx:t,current:null,token:null,pending:A,then:C,catch:$,value:2};return l(o=t[1],k),{c:function(){c=f(),a=h("section"),r=h("div"),s=f(),e=h("div"),k.block.c(),u=f(),i=h("div"),this.h()},l:function(t){p('[data-svelte="svelte-y0sc4g"]',document.head).forEach(d),c=v(t),a=m(t,"SECTION",{class:!0});var n=g(a);r=m(n,"DIV",{class:!0}),g(r).forEach(d),s=v(n),e=m(n,"DIV",{class:!0});var o=g(e);k.block.l(o),o.forEach(d),u=v(n),i=m(n,"DIV",{class:!0}),g(i).forEach(d),n.forEach(d),this.h()},h:function(){y(r,"class","spacer"),y(e,"class","mt-5 content-wrapper svelte-1yt5nhi"),y(i,"class","spacer"),y(a,"class","container mx-auto")},m:function(t,n){E(t,c,n),E(t,a,n),R(a,r),R(a,s),R(a,e),k.block.m(e,k.anchor=null),k.mount=function(){return e},k.anchor=null,R(a,u),R(a,i)},p:function(c,a){var r=x(a,1)[0];if(t=c,1&r&&n!==(n=t[0])&&(document.title=n),k.ctx=t,2&r&&o!==(o=t[1])&&l(o,k));else{var s=t.slice();s[2]=k.resolved,k.block.p(s,r)}},i:b,o:b,d:function(t){t&&d(c),t&&d(a),k.block.d(),k.token=null,k=null}}}function F(t){return G.apply(this,arguments)}function G(){return(G=t(n.mark((function t(c){var a,r;return n.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=c.params,r=a.slug,t.next=4,j.query({query:O,variables:{slug:r}});case 4:return t.t0=t.sent,t.t1=r,t.abrupt("return",{cache:t.t0,slug:t.t1});case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function H(t,n,c){var a=n.slug,r=n.cache;return console.log({slug:a}),L(j,O,r.data),t.$set=function(t){"slug"in t&&c(0,a=t.slug),"cache"in t&&c(1,r=t.cache)},[a,r]}var M=function(t){c(a,i);var n=P(a);function a(t){var c;return s(this,a),c=n.call(this),e(u(c),t,H,B,o,{slug:0,cache:1}),c}return a}();export default M;export{F as preload};
