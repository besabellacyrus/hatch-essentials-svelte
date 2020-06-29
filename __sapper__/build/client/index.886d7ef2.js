import{S as t,i as e,s as n,n as l,u as c,w as o,x as s,d as a,C as r,h as u,o as h,e as i,v as d,y as f,g as p,a as g,b as m,z as b,H as $,c as k,q as v,f as x,m as E,t as y,j as C,k as R,l as I,p as P,r as q}from"./client.cfbb9acc.js";import{s as w,c as N,r as _,q as B}from"./svelte-apollo.es.d08f135b.js";import{P as O,T,D as U}from"./TransitionWrapper.e841d362.js";const j=w`
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
`;function L(t,e,n){const l=t.slice();return l[2]=e[n],l[4]=n,l}function D(t){return{c:h,l:h,m:h,p:h,d:h}}function H(t){let e;let n=function(t,e){return t[0]?G:A}(t)(t);return{c(){n.c(),e=i()},l(t){n.l(t),e=i()},m(t,l){n.m(t,l),u(t,e,l)},p(t,e){n.p(t,e)},d(t){n.d(t),t&&a(e)}}}function A(t){let e,n;return{c(){e=c("p"),n=d("ERROR!!")},l(t){e=o(t,"P",{});var l=s(e);n=f(l,"ERROR!!"),l.forEach(a)},m(t,l){u(t,e,l),p(e,n)},p:h,d(t){t&&a(e)}}}function G(t){let e,n=t[0],l=[];for(let e=0;e<n.length;e+=1)l[e]=M(L(t,n,e));return{c(){e=c("div");for(let t=0;t<l.length;t+=1)l[t].c();this.h()},l(t){e=o(t,"DIV",{class:!0});var n=s(e);for(let t=0;t<l.length;t+=1)l[t].l(n);n.forEach(a),this.h()},h(){r(e,"class","blog-posts")},m(t,n){u(t,e,n);for(let t=0;t<l.length;t+=1)l[t].m(e,null)},p(t,c){if(2&c){let o;for(n=t[0],o=0;o<n.length;o+=1){const s=L(t,n,o);l[o]?l[o].p(s,c):(l[o]=M(s),l[o].c(),l[o].m(e,null))}for(;o<l.length;o+=1)l[o].d(1);l.length=n.length}},d(t){t&&a(e),b(l,t)}}}function M(t){let e,n,l,i,b,$,k,v,x=t[2].title+"",E=t[2].featuredImage&&t[2].featuredImage.sourceUrl&&function(t){let e,n;return{c(){e=c("img"),this.h()},l(t){e=o(t,"IMG",{src:!0,alt:!0}),this.h()},h(){e.src!==(n=t[2].featuredImage.sourceUrl)&&r(e,"src",n),r(e,"alt","")},m(t,n){u(t,e,n)},p:h,d(t){t&&a(e)}}}(t),y=t[2].categories.nodes.length>0&&function(t){let e,n=(l=t[2].categories.nodes[0].slug).charAt(0).toUpperCase()+l.slice(1)+"";var l;let i;return{c(){e=c("h4"),i=d(n),this.h()},l(t){e=o(t,"H4",{class:!0});var l=s(e);i=f(l,n),l.forEach(a),this.h()},h(){r(e,"class","text-center mx-auto")},m(t,n){u(t,e,n),p(e,i)},p:h,d(t){t&&a(e)}}}(t);return{c(){e=c("div"),n=c("a"),E&&E.c(),l=g(),i=c("h1"),b=d(x),$=g(),y&&y.c(),v=g(),this.h()},l(t){e=o(t,"DIV",{class:!0});var c=s(e);n=o(c,"A",{href:!0});var r=s(n);E&&E.l(r),l=m(r),i=o(r,"H1",{class:!0});var u=s(i);b=f(u,x),u.forEach(a),$=m(r),y&&y.l(r),r.forEach(a),v=m(c),c.forEach(a),this.h()},h(){r(i,"class","text-center"),r(n,"href",k="the-blog/"+t[2].slug),r(e,"class","post")},m(t,c){u(t,e,c),p(e,n),E&&E.m(n,null),p(n,l),p(n,i),p(i,b),p(n,$),y&&y.m(n,null),p(e,v)},p(t,e){t[2].featuredImage&&t[2].featuredImage.sourceUrl&&E.p(t,e),t[2].categories.nodes.length>0&&y.p(t,e)},d(t){t&&a(e),E&&E.d(),y&&y.d()}}}function S(t){let e,n;return{c(){e=c("p"),n=d("Loading...")},l(t){e=o(t,"P",{});var l=s(e);n=f(l,"Loading..."),l.forEach(a)},m(t,l){u(t,e,l),p(e,n)},p:h,d(t){t&&a(e)}}}function V(t){let e,n,i={ctx:t,current:null,token:null,pending:S,then:H,catch:D,value:0};return l(n=t[1],i),{c(){e=c("section"),i.block.c(),this.h()},l(t){e=o(t,"SECTION",{class:!0});var n=s(e);i.block.l(n),n.forEach(a),this.h()},h(){r(e,"class","container mx-auto")},m(t,n){u(t,e,n),i.block.m(e,i.anchor=null),i.mount=()=>e,i.anchor=null},p(e,[n]){{const l=(t=e).slice();l[0]=i.resolved,i.block.p(l,n)}},i:h,o:h,d(t){t&&a(e),i.block.d(),i.token=null,i=null}}}function z(t,e,n){let{posts:l}=e;const c=l.data.posts.nodes;return t.$set=t=>{"posts"in t&&n(0,l=t.posts)},[l,c]}class Q extends t{constructor(t){super(),e(this,t,z,V,n,{posts:0})}}function W(t,e,n){const l=t.slice();return l[6]=e[n],l[8]=n,l}function F(t){let e,n=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){e=new $(n,null)},m(t,n){e.m(t,n)},p(t,l){1&l&&n!==(n=t[0].data.hatch_PageBy.head_tags.headTags+"")&&e.p(n)},d(t){t&&e.d()}}}function J(t){return{c:h,l:h,m:h,p:h,i:h,o:h,d:h}}function K(t){let e,n,l,c;const o=[Y,X],s=[];function r(t,e){return t[5].data?0:1}return e=r(t),n=s[e]=o[e](t),{c(){n.c(),l=i()},l(t){n.l(t),l=i()},m(t,n){s[e].m(t,n),u(t,l,n),c=!0},p(t,c){let a=e;e=r(t),e===a?s[e].p(t,c):(P(),C(s[a],1,1,()=>{s[a]=null}),q(),n=s[e],n||(n=s[e]=o[e](t),n.c()),y(n,1),n.m(l.parentNode,l))},i(t){c||(y(n),c=!0)},o(t){C(n),c=!1},d(t){s[e].d(t),t&&a(l)}}}function X(t){let e,n;return{c(){e=c("p"),n=d("ERROR!!")},l(t){e=o(t,"P",{});var l=s(e);n=f(l,"ERROR!!"),l.forEach(a)},m(t,l){u(t,e,l),p(e,n)},p:h,i:h,o:h,d(t){t&&a(e)}}}function Y(t){let e,n,l=t[5].data.hatch_PageBy.page.fc,c=[];for(let e=0;e<l.length;e+=1)c[e]=Z(W(t,l,e));const o=t=>C(c[t],1,1,()=>{c[t]=null});return{c(){for(let t=0;t<c.length;t+=1)c[t].c();e=i()},l(t){for(let e=0;e<c.length;e+=1)c[e].l(t);e=i()},m(t,l){for(let e=0;e<c.length;e+=1)c[e].m(t,l);u(t,e,l),n=!0},p(t,n){if(1&n){let s;for(l=t[5].data.hatch_PageBy.page.fc,s=0;s<l.length;s+=1){const o=W(t,l,s);c[s]?(c[s].p(o,n),y(c[s],1)):(c[s]=Z(o),c[s].c(),y(c[s],1),c[s].m(e.parentNode,e))}for(P(),s=l.length;s<c.length;s+=1)o(s);q()}},i(t){if(!n){for(let t=0;t<l.length;t+=1)y(c[t]);n=!0}},o(t){c=c.filter(Boolean);for(let t=0;t<c.length;t+=1)C(c[t]);n=!1},d(t){b(c,t),t&&a(e)}}}function Z(t){let e;const n=new U({props:{content:t[6].content,bgColor:t[6].backgroundColor}});return{c(){k(n.$$.fragment)},l(t){x(n.$$.fragment,t)},m(t,l){E(n,t,l),e=!0},p(t,e){const l={};1&e&&(l.content=t[6].content),1&e&&(l.bgColor=t[6].backgroundColor),n.$set(l)},i(t){e||(y(n.$$.fragment,t),e=!0)},o(t){C(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function tt(t){let e,n;return{c(){e=c("p"),n=d("Loading...")},l(t){e=o(t,"P",{});var l=s(e);n=f(l,"Loading..."),l.forEach(a)},m(t,l){u(t,e,l),p(e,n)},p:h,i:h,o:h,d(t){t&&a(e)}}}function et(t){return{c:h,l:h,m:h,p:h,i:h,o:h,d:h}}function nt(t){let e;const n=new Q({props:{posts:t[5]}});return{c(){k(n.$$.fragment)},l(t){x(n.$$.fragment,t)},m(t,l){E(n,t,l),e=!0},p(t,e){const l={};2&e&&(l.posts=t[5]),n.$set(l)},i(t){e||(y(n.$$.fragment,t),e=!0)},o(t){C(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function lt(t){return{c:h,l:h,m:h,p:h,i:h,o:h,d:h}}function ct(t){let e,n,c,o,s,r={ctx:t,current:null,token:null,pending:tt,then:K,catch:J,value:5,blocks:[,,,]};l(e=t[0],r);let h={ctx:t,current:null,token:null,pending:lt,then:nt,catch:et,value:5,blocks:[,,,]};return l(o=t[1],h),{c(){r.block.c(),n=g(),c=i(),h.block.c()},l(t){r.block.l(t),n=m(t),c=i(),h.block.l(t)},m(t,e){r.block.m(t,r.anchor=e),r.mount=()=>n.parentNode,r.anchor=n,u(t,n,e),u(t,c,e),h.block.m(t,h.anchor=e),h.mount=()=>c.parentNode,h.anchor=c,s=!0},p(n,c){if(t=n,r.ctx=t,1&c&&e!==(e=t[0])&&l(e,r));else{const e=t.slice();e[5]=r.resolved,r.block.p(e,c)}if(h.ctx=t,2&c&&o!==(o=t[1])&&l(o,h));else{const e=t.slice();e[5]=h.resolved,h.block.p(e,c)}},i(t){s||(y(r.block),y(h.block),s=!0)},o(t){for(let t=0;t<3;t+=1){const e=r.blocks[t];C(e)}for(let t=0;t<3;t+=1){const e=h.blocks[t];C(e)}s=!1},d(t){r.block.d(t),r.token=null,r=null,t&&a(n),t&&a(c),h.block.d(t),h.token=null,h=null}}}function ot(t){let e,n,l,c=t[0]&&F(t);const o=new T({props:{$$slots:{default:[ct]},$$scope:{ctx:t}}});return{c(){c&&c.c(),e=i(),n=g(),k(o.$$.fragment)},l(t){const l=v('[data-svelte="svelte-1ilccn"]',document.head);c&&c.l(l),e=i(),l.forEach(a),n=m(t),x(o.$$.fragment,t)},m(t,s){c&&c.m(document.head,null),p(document.head,e),u(t,n,s),E(o,t,s),l=!0},p(t,[n]){t[0]?c?c.p(t,n):(c=F(t),c.c(),c.m(e.parentNode,e)):c&&(c.d(1),c=null);const l={};515&n&&(l.$$scope={dirty:n,ctx:t}),o.$set(l)},i(t){l||(y(o.$$.fragment,t),l=!0)},o(t){C(o.$$.fragment,t),l=!1},d(t){c&&c.d(t),a(e),t&&a(n),R(o,t)}}}async function st({params:t}){return{cache:await N.query({query:O,variables:{slug:"the-blog"}}),postsCache:await N.query({query:j}),slug:"the-blog"}}function at(t,e,n){let l,{slug:c}=e,{cache:o}=e,{postsCache:s}=e;_(N,O,o.data),_(N,j,s.data);const a=B(N,{query:j});return I(t,a,t=>n(1,l=t)),t.$set=t=>{"slug"in t&&n(3,c=t.slug),"cache"in t&&n(0,o=t.cache),"postsCache"in t&&n(4,s=t.postsCache)},[o,l,a,c,s]}export default class extends t{constructor(t){super(),e(this,t,at,ot,n,{slug:3,cache:0,postsCache:4})}}export{st as preload};
