import{a as n,b as t,c,d as r,i as o,s as e,e as u,S as a,h as i,w as f,y as s,z as l,j as h,B as p,l as v,m as d,p as g,g as m,x as b,A as k,C as y,f as R,k as $,H as x,_ as E,r as C,q as D,t as P,n as q,o as I,u as B,v as w,D as N,E as O,F as j,G as L}from"./client.2442b113.js";import{s as S,_,c as G,r as H,q as A}from"./svelte-apollo.es.5b088b7d.js";import{P as M,D as T}from"./DynamicBlock.b0cdb4f0.js";function U(){var n=_(["\n  query MyQuery {\n    posts {\n      nodes {\n        slug\n        date\n        databaseId\n        content\n        title\n        status\n        featuredImage {\n          title\n          sourceUrl\n        }\n        categories {\n          nodes {\n            id\n            slug\n          }\n        }\n        dateGmt\n      }\n    }\n  }  \n"]);return U=function(){return n},n}var V=S(U());function z(n){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var o,e=t(n);if(r){var u=t(this).constructor;o=Reflect.construct(e,arguments,u)}else o=e.apply(this,arguments);return c(this,o)}}function F(n,t,c){var r=n.slice();return r[2]=t[c],r[4]=c,r}function Q(n){return{c:g,l:g,m:g,p:g,d:g}}function J(n){var t;var c=function(n,t){return n[0]?W:K}(n)(n);return{c:function(){c.c(),t=m()},l:function(n){c.l(n),t=m()},m:function(n,r){c.m(n,r),v(n,t,r)},p:function(n,t){c.p(n,t)},d:function(n){c.d(n),n&&h(t)}}}function K(n){var t,c;return{c:function(){t=f("p"),c=b("ERROR!!")},l:function(n){t=s(n,"P",{});var r=l(t);c=k(r,"ERROR!!"),r.forEach(h)},m:function(n,r){v(n,t,r),y(t,c)},p:g,d:function(n){n&&h(t)}}}function W(n){for(var t,c=n[0],r=[],o=0;o<c.length;o+=1)r[o]=X(F(n,c,o));return{c:function(){t=f("div");for(var n=0;n<r.length;n+=1)r[n].c();this.h()},l:function(n){t=s(n,"DIV",{class:!0});for(var c=l(t),o=0;o<r.length;o+=1)r[o].l(c);c.forEach(h),this.h()},h:function(){p(t,"class","blog-posts")},m:function(n,c){v(n,t,c);for(var o=0;o<r.length;o+=1)r[o].m(t,null)},p:function(n,o){if(2&o){var e;for(c=n[0],e=0;e<c.length;e+=1){var u=F(n,c,e);r[e]?r[e].p(u,o):(r[e]=X(u),r[e].c(),r[e].m(t,null))}for(;e<r.length;e+=1)r[e].d(1);r.length=c.length}},d:function(n){n&&h(t),x(r,n)}}}function X(n){var t,c,r,o,e,u,a,i,d,m,x,E=n[2].title+"";return{c:function(){t=f("div"),c=f("a"),r=f("img"),e=R(),u=f("h1"),a=b(E),i=R(),d=f("h4"),m=b("Category"),x=R(),this.h()},l:function(n){t=s(n,"DIV",{class:!0});var o=l(t);c=s(o,"A",{href:!0});var f=l(c);r=s(f,"IMG",{src:!0,alt:!0}),e=$(f),u=s(f,"H1",{class:!0});var p=l(u);a=k(p,E),p.forEach(h),i=$(f),d=s(f,"H4",{class:!0});var v=l(d);m=k(v,"Category"),v.forEach(h),f.forEach(h),x=$(o),o.forEach(h),this.h()},h:function(){r.src!==(o=n[2].featuredImage.sourceUrl)&&p(r,"src",o),p(r,"alt",""),p(u,"class","text-center"),p(d,"class","text-center mx-auto"),p(c,"href","the-blog/"+n[2].slug),p(t,"class","post")},m:function(n,o){v(n,t,o),y(t,c),y(c,r),y(c,e),y(c,u),y(u,a),y(c,i),y(c,d),y(d,m),y(t,x)},p:g,d:function(n){n&&h(t)}}}function Y(n){var t,c;return{c:function(){t=f("p"),c=b("Loading...")},l:function(n){t=s(n,"P",{});var r=l(t);c=k(r,"Loading..."),r.forEach(h)},m:function(n,r){v(n,t,r),y(t,c)},p:g,d:function(n){n&&h(t)}}}function Z(n){var t,c={ctx:n,current:null,token:null,pending:Y,then:J,catch:Q,value:0};return i(n[1],c),{c:function(){t=f("section"),c.block.c(),this.h()},l:function(n){t=s(n,"SECTION",{class:!0});var r=l(t);c.block.l(r),r.forEach(h),this.h()},h:function(){p(t,"class","container mx-auto")},m:function(n,r){v(n,t,r),c.block.m(t,c.anchor=null),c.mount=function(){return t},c.anchor=null},p:function(t,r){var o=d(r,1)[0],e=(n=t).slice();e[0]=c.resolved,c.block.p(e,o)},i:g,o:g,d:function(n){n&&h(t),c.block.d(),c.token=null,c=null}}}function nn(n,t,c){var r=t.posts,o=r.data.posts.nodes;return n.$set=function(n){"posts"in n&&c(0,r=n.posts)},[r,o]}var tn=function(t){n(i,a);var c=z(i);function i(n){var t;return r(this,i),t=c.call(this),o(u(t),n,nn,Z,e,{posts:0}),t}return i}();function cn(n){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var o,e=t(n);if(r){var u=t(this).constructor;o=Reflect.construct(e,arguments,u)}else o=e.apply(this,arguments);return c(this,o)}}function rn(n,t,c){var r=n.slice();return r[6]=t[c],r[8]=c,r}function on(n){return{c:g,l:g,m:g,p:g,i:g,o:g,d:g}}function en(n){var t,c,r,o,e=[an,un],u=[];function a(n,t){return n[5].data?0:1}return t=a(n),c=u[t]=e[t](n),{c:function(){c.c(),r=m()},l:function(n){c.l(n),r=m()},m:function(n,c){u[t].m(n,c),v(n,r,c),o=!0},p:function(n,o){var i=t;(t=a(n))===i?u[t].p(n,o):(B(),q(u[i],1,1,(function(){u[i]=null})),w(),(c=u[t])||(c=u[t]=e[t](n)).c(),P(c,1),c.m(r.parentNode,r))},i:function(n){o||(P(c),o=!0)},o:function(n){q(c),o=!1},d:function(n){u[t].d(n),n&&h(r)}}}function un(n){var t,c;return{c:function(){t=f("p"),c=b("ERROR!!")},l:function(n){t=s(n,"P",{});var r=l(t);c=k(r,"ERROR!!"),r.forEach(h)},m:function(n,r){v(n,t,r),y(t,c)},p:g,i:g,o:g,d:function(n){n&&h(t)}}}function an(n){for(var t,c,r=n[5].data.hatch_PageBy.page.fc,o=[],e=0;e<r.length;e+=1)o[e]=fn(rn(n,r,e));var u=function(n){return q(o[n],1,1,(function(){o[n]=null}))};return{c:function(){for(var n=0;n<o.length;n+=1)o[n].c();t=m()},l:function(n){for(var c=0;c<o.length;c+=1)o[c].l(n);t=m()},m:function(n,r){for(var e=0;e<o.length;e+=1)o[e].m(n,r);v(n,t,r),c=!0},p:function(n,c){if(1&c){var e;for(r=n[5].data.hatch_PageBy.page.fc,e=0;e<r.length;e+=1){var a=rn(n,r,e);o[e]?(o[e].p(a,c),P(o[e],1)):(o[e]=fn(a),o[e].c(),P(o[e],1),o[e].m(t.parentNode,t))}for(B(),e=r.length;e<o.length;e+=1)u(e);w()}},i:function(n){if(!c){for(var t=0;t<r.length;t+=1)P(o[t]);c=!0}},o:function(n){o=o.filter(Boolean);for(var t=0;t<o.length;t+=1)q(o[t]);c=!1},d:function(n){x(o,n),n&&h(t)}}}function fn(n){var t,c=new T({props:{content:n[6].content,bgColor:n[6].backgroundColor}});return{c:function(){N(c.$$.fragment)},l:function(n){O(c.$$.fragment,n)},m:function(n,r){j(c,n,r),t=!0},p:function(n,t){var r={};1&t&&(r.content=n[6].content),1&t&&(r.bgColor=n[6].backgroundColor),c.$set(r)},i:function(n){t||(P(c.$$.fragment,n),t=!0)},o:function(n){q(c.$$.fragment,n),t=!1},d:function(n){L(c,n)}}}function sn(n){var t,c;return{c:function(){t=f("p"),c=b("Loading...")},l:function(n){t=s(n,"P",{});var r=l(t);c=k(r,"Loading..."),r.forEach(h)},m:function(n,r){v(n,t,r),y(t,c)},p:g,i:g,o:g,d:function(n){n&&h(t)}}}function ln(n){return{c:g,l:g,m:g,p:g,i:g,o:g,d:g}}function hn(n){var t,c=new tn({props:{posts:n[5]}});return{c:function(){N(c.$$.fragment)},l:function(n){O(c.$$.fragment,n)},m:function(n,r){j(c,n,r),t=!0},p:function(n,t){var r={};2&t&&(r.posts=n[5]),c.$set(r)},i:function(n){t||(P(c.$$.fragment,n),t=!0)},o:function(n){q(c.$$.fragment,n),t=!1},d:function(n){L(c,n)}}}function pn(n){return{c:g,l:g,m:g,p:g,i:g,o:g,d:g}}function vn(n){var t,c,r,o,e,u,a={ctx:n,current:null,token:null,pending:sn,then:en,catch:on,value:5,blocks:[,,,]};i(c=n[0],a);var f={ctx:n,current:null,token:null,pending:pn,then:hn,catch:ln,value:5,blocks:[,,,]};return i(e=n[1],f),{c:function(){t=R(),a.block.c(),r=R(),o=m(),f.block.c(),this.h()},l:function(n){D('[data-svelte="svelte-uplsm"]',document.head).forEach(h),t=$(n),a.block.l(n),r=$(n),o=m(),f.block.l(n),this.h()},h:function(){document.title="The Blog"},m:function(n,c){v(n,t,c),a.block.m(n,a.anchor=c),a.mount=function(){return r.parentNode},a.anchor=r,v(n,r,c),v(n,o,c),f.block.m(n,f.anchor=c),f.mount=function(){return o.parentNode},f.anchor=o,u=!0},p:function(t,r){var o=d(r,1)[0];if(n=t,a.ctx=n,1&o&&c!==(c=n[0])&&i(c,a));else{var u=n.slice();u[5]=a.resolved,a.block.p(u,o)}if(f.ctx=n,2&o&&e!==(e=n[1])&&i(e,f));else{var s=n.slice();s[5]=f.resolved,f.block.p(s,o)}},i:function(n){u||(P(a.block),P(f.block),u=!0)},o:function(n){for(var t=0;t<3;t+=1){var c=a.blocks[t];q(c)}for(var r=0;r<3;r+=1){var o=f.blocks[r];q(o)}u=!1},d:function(n){n&&h(t),a.block.d(n),a.token=null,a=null,n&&h(r),n&&h(o),f.block.d(n),f.token=null,f=null}}}function dn(n){return gn.apply(this,arguments)}function gn(){return(gn=E(C.mark((function n(t){var c;return C.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.params,c="the-blog",n.next=4,G.query({query:M,variables:{slug:c}});case 4:return n.t0=n.sent,n.next=7,G.query({query:V});case 7:return n.t1=n.sent,n.t2=c,n.abrupt("return",{cache:n.t0,postsCache:n.t1,slug:n.t2});case 10:case"end":return n.stop()}}),n)})))).apply(this,arguments)}function mn(n,t,c){var r,o=t.slug,e=t.cache,u=t.postsCache;H(G,M,e.data),H(G,V,u.data);var a=A(G,{query:V});return I(n,a,(function(n){return c(1,r=n)})),n.$set=function(n){"slug"in n&&c(3,o=n.slug),"cache"in n&&c(0,e=n.cache),"postsCache"in n&&c(4,u=n.postsCache)},[e,r,a,o,u]}var bn=function(t){n(i,a);var c=cn(i);function i(n){var t;return r(this,i),t=c.call(this),o(u(t),n,mn,vn,e,{slug:3,cache:0,postsCache:4}),t}return i}();export default bn;export{dn as preload};
