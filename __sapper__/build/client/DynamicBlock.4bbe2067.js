import{S as o,i as s,s as t,l as a,o as n,p as c,d as e,u as r,D as l,b as i,n as g}from"./client.c38dcf2c.js";import{s as u}from"./svelte-apollo.es.a8a52a32.js";const h=u`
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
`;function b(o){let s;return{c(){s=a("section"),this.h()},l(o){s=n(o,"SECTION",{class:!0,style:!0}),c(s).forEach(e),this.h()},h(){r(s,"class","he-row"),l(s,"background-color",o[1]?o[1]:"")},m(t,a){i(t,s,a),s.innerHTML=o[0]},p(o,[t]){1&t&&(s.innerHTML=o[0]),2&t&&l(s,"background-color",o[1]?o[1]:"")},i:g,o:g,d(o){o&&e(s)}}}function p(o,s,t){let{content:a}=s,{bgColor:n}=s;return o.$set=o=>{"content"in o&&t(0,a=o.content),"bgColor"in o&&t(1,n=o.bgColor)},[a,n]}class d extends o{constructor(o){super(),s(this,o,p,b,t,{content:0,bgColor:1})}}export{d as D,h as P};
