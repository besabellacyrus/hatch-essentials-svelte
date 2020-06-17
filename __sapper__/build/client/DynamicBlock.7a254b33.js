import{S as o,i as s,s as t,r as a,v as e,w as n,d as r,y as c,D as l,f as i,n as g}from"./client.10fae6c5.js";import{s as u}from"./svelte-apollo.es.19ad5e1a.js";const h=u`
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
`;function f(o){let s;return{c(){s=a("section"),this.h()},l(o){s=e(o,"SECTION",{class:!0,style:!0}),n(s).forEach(r),this.h()},h(){c(s,"class","he-row"),l(s,"background-color",o[1]?o[1]:"")},m(t,a){i(t,s,a),s.innerHTML=o[0]},p(o,[t]){1&t&&(s.innerHTML=o[0]),2&t&&l(s,"background-color",o[1]?o[1]:"")},i:g,o:g,d(o){o&&r(s)}}}function b(o,s,t){let{content:a}=s,{bgColor:e}=s;return o.$set=o=>{"content"in o&&t(0,a=o.content),"bgColor"in o&&t(1,e=o.bgColor)},[a,e]}class d extends o{constructor(o){super(),s(this,o,b,f,t,{content:0,bgColor:1})}}export{d as D,h as P};
