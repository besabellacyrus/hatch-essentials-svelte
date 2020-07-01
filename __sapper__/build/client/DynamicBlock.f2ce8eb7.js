import{S as o,i as s,s as t,e,b as a,d as n,f as r,j as c,D as l,l as g,v as i}from"./client.26650230.js";import{s as h}from"./svelte-apollo.es.36ea0e0f.js";const u=h`
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
`;function b(o){let s;return{c(){s=e("section"),this.h()},l(o){s=a(o,"SECTION",{class:!0,style:!0}),n(s).forEach(r),this.h()},h(){c(s,"class","he-row"),l(s,"background-color",o[1]?o[1]:"")},m(t,e){g(t,s,e),s.innerHTML=o[0]},p(o,[t]){1&t&&(s.innerHTML=o[0]),2&t&&l(s,"background-color",o[1]?o[1]:"")},i:i,o:i,d(o){o&&r(s)}}}function d(o,s,t){let{content:e}=s,{bgColor:a}=s;return o.$set=o=>{"content"in o&&t(0,e=o.content),"bgColor"in o&&t(1,a=o.bgColor)},[e,a]}class f extends o{constructor(o){super(),s(this,o,d,b,t,{content:0,bgColor:1})}}export{f as D,u as P};
