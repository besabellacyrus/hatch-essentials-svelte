import{S as s,i as t,s as n,r as o,v as a,w as e,d as c,C as l,D as r,f as i,n as u,l as d,o as h,g as p,p as g,t as f,B as m,E as $,F as b,G as y,H as C,I as v,J as H}from"./client.1c3438f6.js";import{s as P}from"./svelte-apollo.es.9473eba3.js";const _=P`
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
`;function E(s){let t;return{c(){t=o("section"),this.h()},l(s){t=a(s,"SECTION",{class:!0,style:!0}),e(t).forEach(c),this.h()},h(){l(t,"class","he-row"),r(t,"background-color",s[1]?s[1]:"")},m(n,o){i(n,t,o),t.innerHTML=s[0]},p(s,[n]){1&n&&(t.innerHTML=s[0]),2&n&&r(t,"background-color",s[1]?s[1]:"")},i:u,o:u,d(s){s&&c(t)}}}function I(s,t,n){let{content:o}=t,{bgColor:a}=t;return s.$set=s=>{"content"in s&&n(0,o=s.content),"bgColor"in s&&n(1,a=s.bgColor)},[o,a]}class k extends s{constructor(s){super(),t(this,s,I,E,n,{content:0,bgColor:1})}}function D(s){return Math.sin(s*Math.PI/2)}const M=s=>({duration:250,delay:250,easing:D,css:s=>"opacity: "+s}),T=s=>({duration:250,delayZero:0,easing:D,css:s=>"opacity: "+s});function x(s){let t,n,l,r;const u=s[2].default,d=$(u,s,s[1],null);return{c(){t=o("div"),d&&d.c()},l(s){t=a(s,"DIV",{});var n=e(t);d&&d.l(n),n.forEach(c)},m(s,n){i(s,t,n),d&&d.m(t,null),r=!0},p(s,t){d&&d.p&&2&t&&d.p(b(u,s,s[1],null),y(u,s[1],t,null))},i(s){r||(f(d,s),C(()=>{l&&l.end(1),n||(n=v(t,M,{})),n.start()}),r=!0)},o(s){p(d,s),n&&n.invalidate(),l=H(t,T,{}),r=!1},d(s){s&&c(t),d&&d.d(s),s&&l&&l.end()}}}function N(s){let t;return{c(){t=o("div"),this.h()},l(s){t=a(s,"DIV",{class:!0}),e(t).forEach(c),this.h()},h(){l(t,"class","loader")},m(s,n){i(s,t,n)},p:u,i:u,o:u,d(s){s&&c(t)}}}function S(s){let t,n,o,a;const e=[N,x],l=[];function r(s,t){return s[0]?0:1}return t=r(s),n=l[t]=e[t](s),{c(){n.c(),o=d()},l(s){n.l(s),o=d()},m(s,n){l[t].m(s,n),i(s,o,n),a=!0},p(s,[a]){let c=t;t=r(s),t===c?l[t].p(s,a):(h(),p(l[c],1,1,()=>{l[c]=null}),g(),n=l[t],n||(n=l[t]=e[t](s),n.c()),f(n,1),n.m(o.parentNode,o))},i(s){a||(f(n),a=!0)},o(s){p(n),a=!1},d(s){l[t].d(s),s&&c(o)}}}function j(s,t,n){let o=!0;m(()=>{n(0,o=!1)});let{$$slots:a={},$$scope:e}=t;return s.$set=s=>{"$$scope"in s&&n(1,e=s.$$scope)},[o,e,a]}class w extends s{constructor(s){super(),t(this,s,j,S,n,{})}}export{k as D,_ as P,w as T};
