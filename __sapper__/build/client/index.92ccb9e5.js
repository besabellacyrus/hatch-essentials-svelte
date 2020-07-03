import{S as t,i as e,s as n,r as o,e as c,b as l,d as s,f as a,j as r,l as u,v as h,u as i,y as d,z as f,k as g,a as p,g as m,A as $,H as b,c as k,q as v,h as x,m as y,t as E,n as R,o as C,p as I,w as P,x as q}from"./client.8f8c1231.js";import{s as w,c as B,r as N,q as _}from"./svelte-apollo.es.8486759d.js";import{P as j,D as O}from"./DynamicBlock.45b437c2.js";import{T}from"./TransitionWrapper.df98d70c.js";const U=w`
  query MyQuery {
    posts {
      nodes {
        slug
        date
        databaseId
        content
        title
        status
        featuredImage {
          title
          sourceUrl
        }
        categories {
          nodes {
            id
            slug
          }
        }
        dateGmt
      }
    }
  }  
`;function D(t,e,n){const o=t.slice();return o[2]=e[n],o[4]=n,o}function L(t){return{c:h,l:h,m:h,p:h,d:h}}function z(t){let e;let n=function(t,e){return t[0]?H:A}(t)(t);return{c(){n.c(),e=i()},l(t){n.l(t),e=i()},m(t,o){n.m(t,o),u(t,e,o)},p(t,e){n.p(t,e)},d(t){n.d(t),t&&a(e)}}}function A(t){let e,n;return{c(){e=c("p"),n=d("ERROR!!")},l(t){e=l(t,"P",{});var o=s(e);n=f(o,"ERROR!!"),o.forEach(a)},m(t,o){u(t,e,o),g(e,n)},p:h,d(t){t&&a(e)}}}function H(t){let e,n=t[0],o=[];for(let e=0;e<n.length;e+=1)o[e]=G(D(t,n,e));return{c(){e=c("div");for(let t=0;t<o.length;t+=1)o[t].c();this.h()},l(t){e=l(t,"DIV",{class:!0});var n=s(e);for(let t=0;t<o.length;t+=1)o[t].l(n);n.forEach(a),this.h()},h(){r(e,"class","blog-posts")},m(t,n){u(t,e,n);for(let t=0;t<o.length;t+=1)o[t].m(e,null)},p(t,c){if(2&c){let l;for(n=t[0],l=0;l<n.length;l+=1){const s=D(t,n,l);o[l]?o[l].p(s,c):(o[l]=G(s),o[l].c(),o[l].m(e,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=n.length}},d(t){t&&a(e),$(o,t)}}}function G(t){let e,n,o,i,$,b,k,v,x=t[2].title+"",y=t[2].featuredImage&&t[2].featuredImage.sourceUrl&&function(t){let e,n;return{c(){e=c("img"),this.h()},l(t){e=l(t,"IMG",{src:!0,alt:!0}),this.h()},h(){e.src!==(n=t[2].featuredImage.sourceUrl)&&r(e,"src",n),r(e,"alt","")},m(t,n){u(t,e,n)},p:h,d(t){t&&a(e)}}}(t),E=t[2].categories.nodes.length>0&&"uncategorized"!==t[2].categories.nodes[0].slug&&function(t){let e,n=(o=t[2].categories.nodes[0].slug).charAt(0).toUpperCase()+o.slice(1)+"";var o;let i;return{c(){e=c("h4"),i=d(n),this.h()},l(t){e=l(t,"H4",{class:!0});var o=s(e);i=f(o,n),o.forEach(a),this.h()},h(){r(e,"class","text-center mx-auto")},m(t,n){u(t,e,n),g(e,i)},p:h,d(t){t&&a(e)}}}(t);return{c(){e=c("div"),n=c("a"),y&&y.c(),o=p(),i=c("h1"),$=d(x),b=p(),E&&E.c(),v=p(),this.h()},l(t){e=l(t,"DIV",{class:!0});var c=s(e);n=l(c,"A",{href:!0});var r=s(n);y&&y.l(r),o=m(r),i=l(r,"H1",{class:!0});var u=s(i);$=f(u,x),u.forEach(a),b=m(r),E&&E.l(r),r.forEach(a),v=m(c),c.forEach(a),this.h()},h(){r(i,"class","text-center"),r(n,"href",k="the-blog/"+t[2].slug),r(e,"class","post")},m(t,c){u(t,e,c),g(e,n),y&&y.m(n,null),g(n,o),g(n,i),g(i,$),g(n,b),E&&E.m(n,null),g(e,v)},p(t,e){t[2].featuredImage&&t[2].featuredImage.sourceUrl&&y.p(t,e),t[2].categories.nodes.length>0&&"uncategorized"!==t[2].categories.nodes[0].slug&&E.p(t,e)},d(t){t&&a(e),y&&y.d(),E&&E.d()}}}function M(t){let e,n;return{c(){e=c("p"),n=d("Loading...")},l(t){e=l(t,"P",{});var o=s(e);n=f(o,"Loading..."),o.forEach(a)},m(t,o){u(t,e,o),g(e,n)},p:h,d(t){t&&a(e)}}}function S(t){let e,n,i={ctx:t,current:null,token:null,pending:M,then:z,catch:L,value:0};return o(n=t[1],i),{c(){e=c("section"),i.block.c(),this.h()},l(t){e=l(t,"SECTION",{class:!0});var n=s(e);i.block.l(n),n.forEach(a),this.h()},h(){r(e,"class","container mx-auto")},m(t,n){u(t,e,n),i.block.m(e,i.anchor=null),i.mount=()=>e,i.anchor=null},p(e,[n]){{const o=(t=e).slice();o[0]=i.resolved,i.block.p(o,n)}},i:h,o:h,d(t){t&&a(e),i.block.d(),i.token=null,i=null}}}function V(t,e,n){let{posts:o}=e;const c=o.data.posts.nodes;return t.$set=t=>{"posts"in t&&n(0,o=t.posts)},[o,c]}class Q extends t{constructor(t){super(),e(this,t,V,S,n,{posts:0})}}function W(t,e,n){const o=t.slice();return o[6]=e[n],o[8]=n,o}function F(t){let e,n=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){e=new b(n,null)},m(t,n){e.m(t,n)},p(t,o){1&o&&n!==(n=t[0].data.hatch_PageBy.head_tags.headTags+"")&&e.p(n)},d(t){t&&e.d()}}}function J(t){return{c:h,l:h,m:h,p:h,i:h,o:h,d:h}}function K(t){let e,n,o,c;const l=[Y,X],s=[];function r(t,e){return t[5].data?0:1}return e=r(t),n=s[e]=l[e](t),{c(){n.c(),o=i()},l(t){n.l(t),o=i()},m(t,n){s[e].m(t,n),u(t,o,n),c=!0},p(t,c){let a=e;e=r(t),e===a?s[e].p(t,c):(P(),R(s[a],1,1,()=>{s[a]=null}),q(),n=s[e],n||(n=s[e]=l[e](t),n.c()),E(n,1),n.m(o.parentNode,o))},i(t){c||(E(n),c=!0)},o(t){R(n),c=!1},d(t){s[e].d(t),t&&a(o)}}}function X(t){let e,n;return{c(){e=c("p"),n=d("ERROR!!")},l(t){e=l(t,"P",{});var o=s(e);n=f(o,"ERROR!!"),o.forEach(a)},m(t,o){u(t,e,o),g(e,n)},p:h,i:h,o:h,d(t){t&&a(e)}}}function Y(t){let e,n,o=t[5].data.hatch_PageBy.page.fc,c=[];for(let e=0;e<o.length;e+=1)c[e]=Z(W(t,o,e));const l=t=>R(c[t],1,1,()=>{c[t]=null});return{c(){for(let t=0;t<c.length;t+=1)c[t].c();e=i()},l(t){for(let e=0;e<c.length;e+=1)c[e].l(t);e=i()},m(t,o){for(let e=0;e<c.length;e+=1)c[e].m(t,o);u(t,e,o),n=!0},p(t,n){if(1&n){let s;for(o=t[5].data.hatch_PageBy.page.fc,s=0;s<o.length;s+=1){const l=W(t,o,s);c[s]?(c[s].p(l,n),E(c[s],1)):(c[s]=Z(l),c[s].c(),E(c[s],1),c[s].m(e.parentNode,e))}for(P(),s=o.length;s<c.length;s+=1)l(s);q()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)E(c[t]);n=!0}},o(t){c=c.filter(Boolean);for(let t=0;t<c.length;t+=1)R(c[t]);n=!1},d(t){$(c,t),t&&a(e)}}}function Z(t){let e;const n=new O({props:{content:t[6].content,bgColor:t[6].backgroundColor}});return{c(){k(n.$$.fragment)},l(t){x(n.$$.fragment,t)},m(t,o){y(n,t,o),e=!0},p(t,e){const o={};1&e&&(o.content=t[6].content),1&e&&(o.bgColor=t[6].backgroundColor),n.$set(o)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){R(n.$$.fragment,t),e=!1},d(t){C(n,t)}}}function tt(t){let e,n;return{c(){e=c("p"),n=d("Loading...")},l(t){e=l(t,"P",{});var o=s(e);n=f(o,"Loading..."),o.forEach(a)},m(t,o){u(t,e,o),g(e,n)},p:h,i:h,o:h,d(t){t&&a(e)}}}function et(t){return{c:h,l:h,m:h,p:h,i:h,o:h,d:h}}function nt(t){let e;const n=new Q({props:{posts:t[5]}});return{c(){k(n.$$.fragment)},l(t){x(n.$$.fragment,t)},m(t,o){y(n,t,o),e=!0},p(t,e){const o={};2&e&&(o.posts=t[5]),n.$set(o)},i(t){e||(E(n.$$.fragment,t),e=!0)},o(t){R(n.$$.fragment,t),e=!1},d(t){C(n,t)}}}function ot(t){return{c:h,l:h,m:h,p:h,i:h,o:h,d:h}}function ct(t){let e,n,c,l,s,r={ctx:t,current:null,token:null,pending:tt,then:K,catch:J,value:5,blocks:[,,,]};o(e=t[0],r);let h={ctx:t,current:null,token:null,pending:ot,then:nt,catch:et,value:5,blocks:[,,,]};return o(l=t[1],h),{c(){r.block.c(),n=p(),c=i(),h.block.c()},l(t){r.block.l(t),n=m(t),c=i(),h.block.l(t)},m(t,e){r.block.m(t,r.anchor=e),r.mount=()=>n.parentNode,r.anchor=n,u(t,n,e),u(t,c,e),h.block.m(t,h.anchor=e),h.mount=()=>c.parentNode,h.anchor=c,s=!0},p(n,c){if(t=n,r.ctx=t,1&c&&e!==(e=t[0])&&o(e,r));else{const e=t.slice();e[5]=r.resolved,r.block.p(e,c)}if(h.ctx=t,2&c&&l!==(l=t[1])&&o(l,h));else{const e=t.slice();e[5]=h.resolved,h.block.p(e,c)}},i(t){s||(E(r.block),E(h.block),s=!0)},o(t){for(let t=0;t<3;t+=1){const e=r.blocks[t];R(e)}for(let t=0;t<3;t+=1){const e=h.blocks[t];R(e)}s=!1},d(t){r.block.d(t),r.token=null,r=null,t&&a(n),t&&a(c),h.block.d(t),h.token=null,h=null}}}function lt(t){let e,n,o,c=t[0]&&F(t);const l=new T({props:{$$slots:{default:[ct]},$$scope:{ctx:t}}});return{c(){c&&c.c(),e=i(),n=p(),k(l.$$.fragment)},l(t){const o=v('[data-svelte="svelte-1ilccn"]',document.head);c&&c.l(o),e=i(),o.forEach(a),n=m(t),x(l.$$.fragment,t)},m(t,s){c&&c.m(document.head,null),g(document.head,e),u(t,n,s),y(l,t,s),o=!0},p(t,[n]){t[0]?c?c.p(t,n):(c=F(t),c.c(),c.m(e.parentNode,e)):c&&(c.d(1),c=null);const o={};515&n&&(o.$$scope={dirty:n,ctx:t}),l.$set(o)},i(t){o||(E(l.$$.fragment,t),o=!0)},o(t){R(l.$$.fragment,t),o=!1},d(t){c&&c.d(t),a(e),t&&a(n),C(l,t)}}}async function st({params:t}){return{cache:await B.query({query:j,variables:{slug:"the-blog"}}),postsCache:await B.query({query:U}),slug:"the-blog"}}function at(t,e,n){let o,{slug:c}=e,{cache:l}=e,{postsCache:s}=e;N(B,j,l.data),N(B,U,s.data);const a=_(B,{query:U});return I(t,a,t=>n(1,o=t)),t.$set=t=>{"slug"in t&&n(3,c=t.slug),"cache"in t&&n(0,l=t.cache),"postsCache"in t&&n(4,s=t.postsCache)},[l,o,a,c,s]}export default class extends t{constructor(t){super(),e(this,t,at,lt,n,{slug:3,cache:0,postsCache:4})}}export{st as preload};
