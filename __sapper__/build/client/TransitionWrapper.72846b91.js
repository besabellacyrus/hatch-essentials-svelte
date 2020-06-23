import{S as s,i as t,s as a,u as o,w as e,x as n,d as c,C as l,D as r,h as i,o as u,E as d,e as h,p,j as g,r as f,t as m,B as $,F as b,G as y,I as C,J as _,K as v,L as E}from"./client.59aae2b8.js";import{s as H}from"./svelte-apollo.es.7bc99142.js";const P=H`
  query Hatch_Page($slug: String!) {
    hatch_PageBy(slug: $slug) {
      page {
        fc {
          ... on Hatch_Page_Page_Fc_Htmlblock {
            content
            backgroundColor
            fieldGroupName
          }
        }
      }
      title
      head_tags {
        headTags
      }
    }
  }
`;function T(s){let t;return{c(){t=o("section"),this.h()},l(s){t=e(s,"SECTION",{class:!0,style:!0}),n(t).forEach(c),this.h()},h(){l(t,"class","he-row"),r(t,"background-color",s[1]?s[1]:"")},m(a,o){i(a,t,o),t.innerHTML=s[0]},p(s,[a]){1&a&&(t.innerHTML=s[0]),2&a&&r(t,"background-color",s[1]?s[1]:"")},i:u,o:u,d(s){s&&c(t)}}}function k(s,t,a){let{content:o}=t,{bgColor:e}=t;return s.$set=s=>{"content"in s&&a(0,o=s.content),"bgColor"in s&&a(1,e=s.bgColor)},[o,e]}class x extends s{constructor(s){super(),t(this,s,k,T,a,{content:0,bgColor:1})}}const D=s=>({duration:250,delay:250,easing:d,css:s=>"opacity: "+s}),I=s=>({duration:250,delayZero:0,easing:d,css:s=>"opacity: "+s});function j(s){let t,a,l,r;const u=s[2].default,d=b(u,s,s[1],null);return{c(){t=o("div"),d&&d.c()},l(s){t=e(s,"DIV",{});var a=n(t);d&&d.l(a),a.forEach(c)},m(s,a){i(s,t,a),d&&d.m(t,null),r=!0},p(s,t){d&&d.p&&2&t&&d.p(y(u,s,s[1],null),C(u,s[1],t,null))},i(s){r||(m(d,s),_(()=>{l&&l.end(1),a||(a=v(t,D,{})),a.start()}),r=!0)},o(s){g(d,s),a&&a.invalidate(),l=E(t,I,{}),r=!1},d(s){s&&c(t),d&&d.d(s),s&&l&&l.end()}}}function L(s){let t;return{c(){t=o("div"),this.h()},l(s){t=e(s,"DIV",{class:!0}),n(t).forEach(c),this.h()},h(){l(t,"class","loader")},m(s,a){i(s,t,a)},p:u,i:u,o:u,d(s){s&&c(t)}}}function N(s){let t,a,o,e;const n=[L,j],l=[];function r(s,t){return s[0]?0:1}return t=r(s),a=l[t]=n[t](s),{c(){a.c(),o=h()},l(s){a.l(s),o=h()},m(s,a){l[t].m(s,a),i(s,o,a),e=!0},p(s,[e]){let c=t;t=r(s),t===c?l[t].p(s,e):(p(),g(l[c],1,1,()=>{l[c]=null}),f(),a=l[t],a||(a=l[t]=n[t](s),a.c()),m(a,1),a.m(o.parentNode,o))},i(s){e||(m(a),e=!0)},o(s){g(a),e=!1},d(s){l[t].d(s),s&&c(o)}}}function S(s,t,a){let o=!0;$(()=>{a(0,o=!1)});let{$$slots:e={},$$scope:n}=t;return s.$set=s=>{"$$scope"in s&&a(1,n=s.$$scope)},[o,n,e]}class w extends s{constructor(s){super(),t(this,s,S,N,a,{})}}export{x as D,P,w as T};