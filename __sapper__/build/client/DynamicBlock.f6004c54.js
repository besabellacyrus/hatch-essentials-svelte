import{B as t,C as e,S as n,i as r,s as o,l as u,o as s,p as c,d as i,u as a,D as l,b as f,n as b}from"./client.1ac95081.js";import{s as d,e as h}from"./apollo.d95198fa.js";const g=d`
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
`;var v;var p=function(){};function y(e,n){return r=e,v||(v="function"==typeof Symbol&&Symbol.observable||"@@observable"),r&&r[v]&&r[v]()===r?t(void 0,(function(t){var r=function(t,e){var n,r,o=void 0!==e;return t(o?e:new Promise((function(t,e){n=t,r=e}))),{fulfill:function(e){if(o)return t(Promise.resolve(e));o=!0,n(e)},reject:function(e){if(o)return t(Promise.reject(e));o=!0,r(e)}}}(t,n),o=r.fulfill,u=r.reject,s=e.subscribe({next:function(t){o(t)},error:function(t){u(t)}});return function(){return s.unsubscribe()}})):t(e,p);var r}var m="undefined"!=typeof WeakSet?new WeakSet:new Set;function P(t,n,r){m.add(t),function(t){try{e(t)}catch(e){setTimeout(t,1)}}((function(){m.delete(t)})),t.writeQuery({query:n,data:r})}function S(e,n){var r,o=!1;if(m.has(e))try{r={data:r=e.readQuery(n)||void 0}}catch(t){}var u=e.watchQuery(n),s=y(u,r).subscribe;return{subscribe:t(r,(function(t){o=!0;var e=void 0!==r,n=!1,u=!1;return s((function(r){e&&n&&!u?u=!0:(n||(n=!0),t(r))}))})).subscribe,refetch:function(t){return!o&&h(t,u.variables)?u.result():u.refetch(t)},result:function(){return u.result()},fetchMore:function(t){return u.fetchMore(t)},setOptions:function(t){return u.setOptions(t)},updateQuery:function(t){return u.updateQuery(t)},startPolling:function(t){return u.startPolling(t)},stopPolling:function(){return u.stopPolling()},subscribeToMore:function(t){return u.subscribeToMore(t)}}}function C(t){let e;return{c(){e=u("section"),this.h()},l(t){e=s(t,"SECTION",{class:!0,style:!0}),c(e).forEach(i),this.h()},h(){a(e,"class","he-row svelte-u2bh1y"),l(e,"background-color",t[1]?t[1]:"")},m(n,r){f(n,e,r),e.innerHTML=t[0]},p(t,[n]){1&n&&(e.innerHTML=t[0]),2&n&&l(e,"background-color",t[1]?t[1]:"")},i:b,o:b,d(t){t&&i(e)}}}function k(t,e,n){let{content:r}=e,{bgColor:o}=e;return t.$set=t=>{"content"in t&&n(0,r=t.content),"bgColor"in t&&n(1,o=t.bgColor)},[r,o]}class w extends n{constructor(t){super(),r(this,t,k,C,o,{content:0,bgColor:1})}}export{w as D,g as P,S as q,P as r};
