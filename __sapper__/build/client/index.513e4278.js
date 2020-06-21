import{S as t,i as e,s as n,n as l,u as o,w as c,x as s,d as a,C as r,h as u,o as h,e as i,v as d,y as f,g as p,a as g,b as m,z as b,H as $,c as k,q as v,f as x,m as E,t as y,j as C,k as R,l as P,p as q,r as w}from"./client.db27c407.js";import{s as I,c as N,r as _,q as B}from"./svelte-apollo.es.fd2770ba.js";import{P as O,T,D as j}from"./TransitionWrapper.acb78eee.js";const L=I`
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
`;function D(t,e,n){const l=t.slice();return l[2]=e[n],l[4]=n,l}function H(t){return{c:h,l:h,m:h,p:h,d:h}}function U(t){let e;let n=function(t,e){return t[0]?G:A}(t)(t);return{c(){n.c(),e=i()},l(t){n.l(t),e=i()},m(t,l){n.m(t,l),u(t,e,l)},p(t,e){n.p(t,e)},d(t){n.d(t),t&&a(e)}}}function A(t){let e,n;return{c(){e=o("p"),n=d("ERROR!!")},l(t){e=c(t,"P",{});var l=s(e);n=f(l,"ERROR!!"),l.forEach(a)},m(t,l){u(t,e,l),p(e,n)},p:h,d(t){t&&a(e)}}}function G(t){let e,n=t[0],l=[];for(let e=0;e<n.length;e+=1)l[e]=M(D(t,n,e));return{c(){e=o("div");for(let t=0;t<l.length;t+=1)l[t].c();this.h()},l(t){e=c(t,"DIV",{class:!0});var n=s(e);for(let t=0;t<l.length;t+=1)l[t].l(n);n.forEach(a),this.h()},h(){r(e,"class","blog-posts")},m(t,n){u(t,e,n);for(let t=0;t<l.length;t+=1)l[t].m(e,null)},p(t,o){if(2&o){let c;for(n=t[0],c=0;c<n.length;c+=1){const s=D(t,n,c);l[c]?l[c].p(s,o):(l[c]=M(s),l[c].c(),l[c].m(e,null))}for(;c<l.length;c+=1)l[c].d(1);l.length=n.length}},d(t){t&&a(e),b(l,t)}}}function M(t){let e,n,l,i,b,$,k,v,x,E,y=t[2].title+"",C=t[2].categories.nodes.length>0&&function(t){let e,n=(l=t[2].categories.nodes[0].slug).charAt(0).toUpperCase()+l.slice(1)+"";var l;let i;return{c(){e=o("h4"),i=d(n),this.h()},l(t){e=c(t,"H4",{class:!0});var l=s(e);i=f(l,n),l.forEach(a),this.h()},h(){r(e,"class","text-center mx-auto")},m(t,n){u(t,e,n),p(e,i)},p:h,d(t){t&&a(e)}}}(t);return{c(){e=o("div"),n=o("a"),l=o("img"),b=g(),$=o("h1"),k=d(y),v=g(),C&&C.c(),E=g(),this.h()},l(t){e=c(t,"DIV",{class:!0});var o=s(e);n=c(o,"A",{href:!0});var r=s(n);l=c(r,"IMG",{src:!0,alt:!0}),b=m(r),$=c(r,"H1",{class:!0});var u=s($);k=f(u,y),u.forEach(a),v=m(r),C&&C.l(r),r.forEach(a),E=m(o),o.forEach(a),this.h()},h(){l.src!==(i=t[2].featuredImage.sourceUrl)&&r(l,"src",i),r(l,"alt",""),r($,"class","text-center"),r(n,"href",x="the-blog/"+t[2].slug),r(e,"class","post")},m(t,o){u(t,e,o),p(e,n),p(n,l),p(n,b),p(n,$),p($,k),p(n,v),C&&C.m(n,null),p(e,E)},p(t,e){t[2].categories.nodes.length>0&&C.p(t,e)},d(t){t&&a(e),C&&C.d()}}}function S(t){let e,n;return{c(){e=o("p"),n=d("Loading...")},l(t){e=c(t,"P",{});var l=s(e);n=f(l,"Loading..."),l.forEach(a)},m(t,l){u(t,e,l),p(e,n)},p:h,d(t){t&&a(e)}}}function V(t){let e,n,i={ctx:t,current:null,token:null,pending:S,then:U,catch:H,value:0};return l(n=t[1],i),{c(){e=o("section"),i.block.c(),this.h()},l(t){e=c(t,"SECTION",{class:!0});var n=s(e);i.block.l(n),n.forEach(a),this.h()},h(){r(e,"class","container mx-auto")},m(t,n){u(t,e,n),i.block.m(e,i.anchor=null),i.mount=()=>e,i.anchor=null},p(e,[n]){{const l=(t=e).slice();l[0]=i.resolved,i.block.p(l,n)}},i:h,o:h,d(t){t&&a(e),i.block.d(),i.token=null,i=null}}}function z(t,e,n){let{posts:l}=e;const o=l.data.posts.nodes;return t.$set=t=>{"posts"in t&&n(0,l=t.posts)},[l,o]}class Q extends t{constructor(t){super(),e(this,t,z,V,n,{posts:0})}}function W(t,e,n){const l=t.slice();return l[6]=e[n],l[8]=n,l}function F(t){let e,n=t[0].data.hatch_PageBy.head_tags.headTags+"";return{c(){this.h()},l(t){this.h()},h(){e=new $(n,null)},m(t,n){e.m(t,n)},p(t,l){1&l&&n!==(n=t[0].data.hatch_PageBy.head_tags.headTags+"")&&e.p(n)},d(t){t&&e.d()}}}function J(t){return{c:h,l:h,m:h,p:h,i:h,o:h,d:h}}function K(t){let e,n,l,o;const c=[Y,X],s=[];function r(t,e){return t[5].data?0:1}return e=r(t),n=s[e]=c[e](t),{c(){n.c(),l=i()},l(t){n.l(t),l=i()},m(t,n){s[e].m(t,n),u(t,l,n),o=!0},p(t,o){let a=e;e=r(t),e===a?s[e].p(t,o):(q(),C(s[a],1,1,()=>{s[a]=null}),w(),n=s[e],n||(n=s[e]=c[e](t),n.c()),y(n,1),n.m(l.parentNode,l))},i(t){o||(y(n),o=!0)},o(t){C(n),o=!1},d(t){s[e].d(t),t&&a(l)}}}function X(t){let e,n;return{c(){e=o("p"),n=d("ERROR!!")},l(t){e=c(t,"P",{});var l=s(e);n=f(l,"ERROR!!"),l.forEach(a)},m(t,l){u(t,e,l),p(e,n)},p:h,i:h,o:h,d(t){t&&a(e)}}}function Y(t){let e,n,l=t[5].data.hatch_PageBy.page.fc,o=[];for(let e=0;e<l.length;e+=1)o[e]=Z(W(t,l,e));const c=t=>C(o[t],1,1,()=>{o[t]=null});return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=i()},l(t){for(let e=0;e<o.length;e+=1)o[e].l(t);e=i()},m(t,l){for(let e=0;e<o.length;e+=1)o[e].m(t,l);u(t,e,l),n=!0},p(t,n){if(1&n){let s;for(l=t[5].data.hatch_PageBy.page.fc,s=0;s<l.length;s+=1){const c=W(t,l,s);o[s]?(o[s].p(c,n),y(o[s],1)):(o[s]=Z(c),o[s].c(),y(o[s],1),o[s].m(e.parentNode,e))}for(q(),s=l.length;s<o.length;s+=1)c(s);w()}},i(t){if(!n){for(let t=0;t<l.length;t+=1)y(o[t]);n=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)C(o[t]);n=!1},d(t){b(o,t),t&&a(e)}}}function Z(t){let e;const n=new j({props:{content:t[6].content,bgColor:t[6].backgroundColor}});return{c(){k(n.$$.fragment)},l(t){x(n.$$.fragment,t)},m(t,l){E(n,t,l),e=!0},p(t,e){const l={};1&e&&(l.content=t[6].content),1&e&&(l.bgColor=t[6].backgroundColor),n.$set(l)},i(t){e||(y(n.$$.fragment,t),e=!0)},o(t){C(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function tt(t){let e,n;return{c(){e=o("p"),n=d("Loading...")},l(t){e=c(t,"P",{});var l=s(e);n=f(l,"Loading..."),l.forEach(a)},m(t,l){u(t,e,l),p(e,n)},p:h,i:h,o:h,d(t){t&&a(e)}}}function et(t){return{c:h,l:h,m:h,p:h,i:h,o:h,d:h}}function nt(t){let e;const n=new Q({props:{posts:t[5]}});return{c(){k(n.$$.fragment)},l(t){x(n.$$.fragment,t)},m(t,l){E(n,t,l),e=!0},p(t,e){const l={};2&e&&(l.posts=t[5]),n.$set(l)},i(t){e||(y(n.$$.fragment,t),e=!0)},o(t){C(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function lt(t){return{c:h,l:h,m:h,p:h,i:h,o:h,d:h}}function ot(t){let e,n,o,c,s,r={ctx:t,current:null,token:null,pending:tt,then:K,catch:J,value:5,blocks:[,,,]};l(e=t[0],r);let h={ctx:t,current:null,token:null,pending:lt,then:nt,catch:et,value:5,blocks:[,,,]};return l(c=t[1],h),{c(){r.block.c(),n=g(),o=i(),h.block.c()},l(t){r.block.l(t),n=m(t),o=i(),h.block.l(t)},m(t,e){r.block.m(t,r.anchor=e),r.mount=()=>n.parentNode,r.anchor=n,u(t,n,e),u(t,o,e),h.block.m(t,h.anchor=e),h.mount=()=>o.parentNode,h.anchor=o,s=!0},p(n,o){if(t=n,r.ctx=t,1&o&&e!==(e=t[0])&&l(e,r));else{const e=t.slice();e[5]=r.resolved,r.block.p(e,o)}if(h.ctx=t,2&o&&c!==(c=t[1])&&l(c,h));else{const e=t.slice();e[5]=h.resolved,h.block.p(e,o)}},i(t){s||(y(r.block),y(h.block),s=!0)},o(t){for(let t=0;t<3;t+=1){const e=r.blocks[t];C(e)}for(let t=0;t<3;t+=1){const e=h.blocks[t];C(e)}s=!1},d(t){r.block.d(t),r.token=null,r=null,t&&a(n),t&&a(o),h.block.d(t),h.token=null,h=null}}}function ct(t){let e,n,l,o=t[0]&&F(t);const c=new T({props:{$$slots:{default:[ot]},$$scope:{ctx:t}}});return{c(){o&&o.c(),e=i(),n=g(),k(c.$$.fragment)},l(t){const l=v('[data-svelte="svelte-c4endp"]',document.head);o&&o.l(l),e=i(),l.forEach(a),n=m(t),x(c.$$.fragment,t)},m(t,s){o&&o.m(document.head,null),p(document.head,e),u(t,n,s),E(c,t,s),l=!0},p(t,[n]){t[0]?o?o.p(t,n):(o=F(t),o.c(),o.m(e.parentNode,e)):o&&(o.d(1),o=null);const l={};515&n&&(l.$$scope={dirty:n,ctx:t}),c.$set(l)},i(t){l||(y(c.$$.fragment,t),l=!0)},o(t){C(c.$$.fragment,t),l=!1},d(t){o&&o.d(t),a(e),t&&a(n),R(c,t)}}}async function st({params:t}){return{cache:await N.query({query:O,variables:{slug:"the-blog"}}),postsCache:await N.query({query:L}),slug:"the-blog"}}function at(t,e,n){let l,{slug:o}=e,{cache:c}=e,{postsCache:s}=e;_(N,O,c.data),_(N,L,s.data);const a=B(N,{query:L});return P(t,a,t=>n(1,l=t)),t.$set=t=>{"slug"in t&&n(3,o=t.slug),"cache"in t&&n(0,c=t.cache),"postsCache"in t&&n(4,s=t.postsCache)},[c,l,a,o,s]}export default class extends t{constructor(t){super(),e(this,t,at,ct,n,{slug:3,cache:0,postsCache:4})}}export{st as preload};
