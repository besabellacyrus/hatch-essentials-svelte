import{S as o,i as s,s as t,r as e,v as n,w as a,d as r,C as c,D as l,f as i,n as g}from"./client.2a16d6b4.js";import{s as u}from"./svelte-apollo.es.e829eefb.js";const h=u`
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
`;function b(o){let s;return{c(){s=e("section"),this.h()},l(o){s=n(o,"SECTION",{class:!0,style:!0}),a(s).forEach(r),this.h()},h(){c(s,"class","he-row"),l(s,"background-color",o[1]?o[1]:"")},m(t,e){i(t,s,e),s.innerHTML=o[0]},p(o,[t]){1&t&&(s.innerHTML=o[0]),2&t&&l(s,"background-color",o[1]?o[1]:"")},i:g,o:g,d(o){o&&r(s)}}}function f(o,s,t){let{content:e}=s,{bgColor:n}=s;return o.$set=o=>{"content"in o&&t(0,e=o.content),"bgColor"in o&&t(1,n=o.bgColor)},[e,n]}class d extends o{constructor(o){super(),s(this,o,f,b,t,{content:0,bgColor:1})}}export{d as D,h as P};
