import{S as o,i as s,s as t,u as a,w as e,x as n,d as r,C as c,D as l,h as g,o as i}from"./client.96a4402d.js";import{s as h}from"./svelte-apollo.es.d0846e3a.js";const u=h`
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
`;function d(o){let s;return{c(){s=a("section"),this.h()},l(o){s=e(o,"SECTION",{class:!0,style:!0}),n(s).forEach(r),this.h()},h(){c(s,"class","he-row"),l(s,"background-color",o[1]?o[1]:"")},m(t,a){g(t,s,a),s.innerHTML=o[0]},p(o,[t]){1&t&&(s.innerHTML=o[0]),2&t&&l(s,"background-color",o[1]?o[1]:"")},i:i,o:i,d(o){o&&r(s)}}}function b(o,s,t){let{content:a}=s,{bgColor:e}=s;return o.$set=o=>{"content"in o&&t(0,a=o.content),"bgColor"in o&&t(1,e=o.bgColor)},[a,e]}class p extends o{constructor(o){super(),s(this,o,b,d,t,{content:0,bgColor:1})}}export{p as D,u as P};
