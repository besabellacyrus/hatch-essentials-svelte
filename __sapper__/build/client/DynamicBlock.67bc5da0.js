import{B as t,C as r,S as e,i as n,s as o,l as s,a as c,o as a,p as u,d as i,c as l,u as f,D as b,b as d,v as g,n as h}from"./client.c77c9caa.js";import{s as v,e as p}from"./apollo.d95198fa.js";const y=v`
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
`;var m;var P=function(){};function S(r,e){return n=r,m||(m="function"==typeof Symbol&&Symbol.observable||"@@observable"),n&&n[m]&&n[m]()===n?t(void 0,(function(t){var n=function(t,r){var e,n,o=void 0!==r;return t(o?r:new Promise((function(t,r){e=t,n=r}))),{fulfill:function(r){if(o)return t(Promise.resolve(r));o=!0,e(r)},reject:function(r){if(o)return t(Promise.reject(r));o=!0,n(r)}}}(t,e),o=n.fulfill,s=n.reject,c=r.subscribe({next:function(t){o(t)},error:function(t){s(t)}});return function(){return c.unsubscribe()}})):t(r,P);var n}var C="undefined"!=typeof WeakSet?new WeakSet:new Set;function M(t,e,n){C.add(t),function(t){try{r(t)}catch(r){setTimeout(t,1)}}((function(){C.delete(t)})),t.writeQuery({query:e,data:n})}function T(r,e){var n,o=!1;if(C.has(r))try{n={data:n=r.readQuery(e)||void 0}}catch(t){}var s=r.watchQuery(e),c=S(s,n).subscribe;return{subscribe:t(n,(function(t){o=!0;var r=void 0!==n,e=!1,s=!1;return c((function(n){r&&e&&!s?s=!0:(e||(e=!0),t(n))}))})).subscribe,refetch:function(t){return!o&&p(t,s.variables)?s.result():s.refetch(t)},result:function(){return s.result()},fetchMore:function(t){return s.fetchMore(t)},setOptions:function(t){return s.setOptions(t)},updateQuery:function(t){return s.updateQuery(t)},startPolling:function(t){return s.startPolling(t)},stopPolling:function(){return s.stopPolling()},subscribeToMore:function(t){return s.subscribeToMore(t)}}}function k(t){let r,e,n,o,v,p;return{c(){r=s("section"),e=c(),n=s("section"),o=s("div"),v=s("img"),this.h()},l(t){r=a(t,"SECTION",{class:!0,style:!0}),u(r).forEach(i),e=l(t),n=a(t,"SECTION",{class:!0});var s=u(n);o=a(s,"DIV",{class:!0});var c=u(o);v=a(c,"IMG",{src:!0,alt:!0}),c.forEach(i),s.forEach(i),this.h()},h(){f(r,"class","he-row svelte-u2bh1y"),b(r,"background-color",t[1]?t[1]:""),v.src!==(p="")&&f(v,"src",""),f(v,"alt",""),f(o,"class","blog-post"),f(n,"class","blog-posts")},m(s,c){d(s,r,c),r.innerHTML=t[0],d(s,e,c),d(s,n,c),g(n,o),g(o,v)},p(t,[e]){1&e&&(r.innerHTML=t[0]),2&e&&b(r,"background-color",t[1]?t[1]:"")},i:h,o:h,d(t){t&&i(r),t&&i(e),t&&i(n)}}}function w(t,r,e){let{content:n}=r,{bgColor:o}=r;return t.$set=t=>{"content"in t&&e(0,n=t.content),"bgColor"in t&&e(1,o=t.bgColor)},[n,o]}class _ extends e{constructor(t){super(),n(this,t,w,k,o,{content:0,bgColor:1})}}export{_ as D,y as P,T as q,M as r};
