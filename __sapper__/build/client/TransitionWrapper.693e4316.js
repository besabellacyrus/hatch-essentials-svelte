import{S as s,i as t,s as o,r as a,v as n,w as e,d as c,C as l,D as r,f as i,n as u,E as d,l as p,o as f,g as h,p as g,t as m,B as $,F as b,G as y,H as C,I as v,J as H,K as _}from"./client.f5a1fde3.js";import{s as E}from"./svelte-apollo.es.49a3fd4f.js";const P=E`
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
    }
  }
`;function k(s){let t;return{c(){t=a("section"),this.h()},l(s){t=n(s,"SECTION",{class:!0,style:!0}),e(t).forEach(c),this.h()},h(){l(t,"class","he-row"),r(t,"background-color",s[1]?s[1]:"")},m(o,a){i(o,t,a),t.innerHTML=s[0]},p(s,[o]){1&o&&(t.innerHTML=s[0]),2&o&&r(t,"background-color",s[1]?s[1]:"")},i:u,o:u,d(s){s&&c(t)}}}function D(s,t,o){let{content:a}=t,{bgColor:n}=t;return s.$set=s=>{"content"in s&&o(0,a=s.content),"bgColor"in s&&o(1,n=s.bgColor)},[a,n]}class I extends s{constructor(s){super(),t(this,s,D,k,o,{content:0,bgColor:1})}}const T=s=>({duration:250,delay:250,easing:d,css:s=>"opacity: "+s}),x=s=>({duration:250,delayZero:0,easing:d,css:s=>"opacity: "+s});function N(s){let t,o,l,r;const u=s[2].default,d=b(u,s,s[1],null);return{c(){t=a("div"),d&&d.c()},l(s){t=n(s,"DIV",{});var o=e(t);d&&d.l(o),o.forEach(c)},m(s,o){i(s,t,o),d&&d.m(t,null),r=!0},p(s,t){d&&d.p&&2&t&&d.p(y(u,s,s[1],null),C(u,s[1],t,null))},i(s){r||(m(d,s),v(()=>{l&&l.end(1),o||(o=H(t,T,{})),o.start()}),r=!0)},o(s){h(d,s),o&&o.invalidate(),l=_(t,x,{}),r=!1},d(s){s&&c(t),d&&d.d(s),s&&l&&l.end()}}}function S(s){let t;return{c(){t=a("div"),this.h()},l(s){t=n(s,"DIV",{class:!0}),e(t).forEach(c),this.h()},h(){l(t,"class","loader")},m(s,o){i(s,t,o)},p:u,i:u,o:u,d(s){s&&c(t)}}}function j(s){let t,o,a,n;const e=[S,N],l=[];function r(s,t){return s[0]?0:1}return t=r(s),o=l[t]=e[t](s),{c(){o.c(),a=p()},l(s){o.l(s),a=p()},m(s,o){l[t].m(s,o),i(s,a,o),n=!0},p(s,[n]){let c=t;t=r(s),t===c?l[t].p(s,n):(f(),h(l[c],1,1,()=>{l[c]=null}),g(),o=l[t],o||(o=l[t]=e[t](s),o.c()),m(o,1),o.m(a.parentNode,a))},i(s){n||(m(o),n=!0)},o(s){h(o),n=!1},d(s){l[t].d(s),s&&c(a)}}}function w(s,t,o){let a=!0;$(()=>{o(0,a=!1)});let{$$slots:n={},$$scope:e}=t;return s.$set=s=>{"$$scope"in s&&o(1,e=s.$$scope)},[a,e,n]}class B extends s{constructor(s){super(),t(this,s,w,j,o,{})}}export{I as D,P,B as T};
