import{S as s,i as t,s as o,r as n,v as a,w as e,d as c,C as l,D as r,f as i,n as u,E as d,l as p,o as h,g,p as f,t as m,B as $,F as b,G as y,H as C,I as v,J as H,K as _}from"./client.1d1f07e1.js";import{s as E}from"./svelte-apollo.es.cabef856.js";const P=E`
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
`;function k(s){let t;return{c(){t=n("section"),this.h()},l(s){t=a(s,"SECTION",{class:!0,style:!0}),e(t).forEach(c),this.h()},h(){l(t,"class","he-row"),r(t,"background-color",s[1]?s[1]:"")},m(o,n){i(o,t,n),t.innerHTML=s[0]},p(s,[o]){1&o&&(t.innerHTML=s[0]),2&o&&r(t,"background-color",s[1]?s[1]:"")},i:u,o:u,d(s){s&&c(t)}}}function D(s,t,o){let{content:n}=t,{bgColor:a}=t;return s.$set=s=>{"content"in s&&o(0,n=s.content),"bgColor"in s&&o(1,a=s.bgColor)},[n,a]}class I extends s{constructor(s){super(),t(this,s,D,k,o,{content:0,bgColor:1})}}const T=s=>({duration:250,delay:250,easing:d,css:s=>"opacity: "+s}),x=s=>({duration:250,delayZero:0,easing:d,css:s=>"opacity: "+s});function N(s){let t,o,l,r;const u=s[2].default,d=b(u,s,s[1],null);return{c(){t=n("div"),d&&d.c()},l(s){t=a(s,"DIV",{});var o=e(t);d&&d.l(o),o.forEach(c)},m(s,o){i(s,t,o),d&&d.m(t,null),r=!0},p(s,t){d&&d.p&&2&t&&d.p(y(u,s,s[1],null),C(u,s[1],t,null))},i(s){r||(m(d,s),v(()=>{l&&l.end(1),o||(o=H(t,T,{})),o.start()}),r=!0)},o(s){g(d,s),o&&o.invalidate(),l=_(t,x,{}),r=!1},d(s){s&&c(t),d&&d.d(s),s&&l&&l.end()}}}function S(s){let t;return{c(){t=n("div"),this.h()},l(s){t=a(s,"DIV",{class:!0}),e(t).forEach(c),this.h()},h(){l(t,"class","loader")},m(s,o){i(s,t,o)},p:u,i:u,o:u,d(s){s&&c(t)}}}function j(s){let t,o,n,a;const e=[S,N],l=[];function r(s,t){return s[0]?0:1}return t=r(s),o=l[t]=e[t](s),{c(){o.c(),n=p()},l(s){o.l(s),n=p()},m(s,o){l[t].m(s,o),i(s,n,o),a=!0},p(s,[a]){let c=t;t=r(s),t===c?l[t].p(s,a):(h(),g(l[c],1,1,()=>{l[c]=null}),f(),o=l[t],o||(o=l[t]=e[t](s),o.c()),m(o,1),o.m(n.parentNode,n))},i(s){a||(m(o),a=!0)},o(s){g(o),a=!1},d(s){l[t].d(s),s&&c(n)}}}function w(s,t,o){let n=!0;$(()=>{o(0,n=!1)});let{$$slots:a={},$$scope:e}=t;return s.$set=s=>{"$$scope"in s&&o(1,e=s.$$scope)},[n,e,a]}class B extends s{constructor(s){super(),t(this,s,w,j,o,{})}}export{I as D,P,B as T};
