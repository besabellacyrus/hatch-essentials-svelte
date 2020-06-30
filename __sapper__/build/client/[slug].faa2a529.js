import{S as t,i as s,s as a,n as c,a as e,u as l,q as n,d as o,b as r,w as u,x as i,C as d,h,g as p,o as f,e as m,v as g,y as v,H as E,M as y}from"./client.aada2867.js";import{s as b,c as x,r as k}from"./svelte-apollo.es.b4c77f48.js";const I=b`
	query MyQuery($slug: ID!) {
  	post(id: $slug, idType: SLUG) {
	    categories {
	      nodes {
	        uri
	        slug
	      }
	    }
	    date
	    slug
	    status
	    title
	    content
	  }
	}
`;function R(t){return{c:f,l:f,m:f,p:f,d:f}}function D(t){let s;function a(t,s){return t[2].data?w:q}let c=a(t),e=c(t);return{c(){e.c(),s=m()},l(t){e.l(t),s=m()},m(t,a){e.m(t,a),h(t,s,a)},p(t,l){c===(c=a(t))&&e?e.p(t,l):(e.d(1),e=c(t),e&&(e.c(),e.m(s.parentNode,s)))},d(t){e.d(t),t&&o(s)}}}function q(t){let s,a;return{c(){s=l("p"),a=g("ERROR!!")},l(t){s=u(t,"P",{});var c=i(s);a=v(c,"ERROR!!"),c.forEach(o)},m(t,c){h(t,s,c),p(s,a)},p:f,d(t){t&&o(s)}}}function w(t){let s,a,c,n,f=t[2].data.post.title+"",m=t[2].data.post.content+"";return{c(){s=l("h1"),a=g(f),c=e(),this.h()},l(t){s=u(t,"H1",{class:!0});var e=i(s);a=v(e,f),e.forEach(o),c=r(t),this.h()},h(){d(s,"class","text-center"),n=new E(m,null)},m(t,e){h(t,s,e),p(s,a),h(t,c,e),n.m(t,e)},p(t,s){2&s&&f!==(f=t[2].data.post.title+"")&&y(a,f),2&s&&m!==(m=t[2].data.post.content+"")&&n.p(m)},d(t){t&&o(s),t&&o(c),t&&n.d()}}}function V(t){let s,a,c;return{c(){s=l("div"),a=l("p"),c=g("Loading..."),this.h()},l(t){s=u(t,"DIV",{class:!0});var e=i(s);a=u(e,"P",{});var l=i(a);c=v(l,"Loading..."),l.forEach(o),e.forEach(o),this.h()},h(){d(s,"class","loader")},m(t,e){h(t,s,e),p(s,a),p(a,c)},p:f,d(t){t&&o(s)}}}function L(t){let s,a,m,g,v,E,y,b,x;document.title=s=t[0];let k={ctx:t,current:null,token:null,pending:V,then:D,catch:R,value:2};return c(y=t[1],k),{c(){a=e(),m=l("section"),g=l("div"),v=e(),E=l("div"),k.block.c(),b=e(),x=l("div"),this.h()},l(t){n('[data-svelte="svelte-y0sc4g"]',document.head).forEach(o),a=r(t),m=u(t,"SECTION",{class:!0});var s=i(m);g=u(s,"DIV",{class:!0}),i(g).forEach(o),v=r(s),E=u(s,"DIV",{class:!0});var c=i(E);k.block.l(c),c.forEach(o),b=r(s),x=u(s,"DIV",{class:!0}),i(x).forEach(o),s.forEach(o),this.h()},h(){d(g,"class","spacer"),d(E,"class","mt-5 content-wrapper"),d(x,"class","spacer"),d(m,"class","container mx-auto")},m(t,s){h(t,a,s),h(t,m,s),p(m,g),p(m,v),p(m,E),k.block.m(E,k.anchor=null),k.mount=()=>E,k.anchor=null,p(m,b),p(m,x)},p(a,[e]){if(t=a,1&e&&s!==(s=t[0])&&(document.title=s),k.ctx=t,2&e&&y!==(y=t[1])&&c(y,k));else{const s=t.slice();s[2]=k.resolved,k.block.p(s,e)}},i:f,o:f,d(t){t&&o(a),t&&o(m),k.block.d(),k.token=null,k=null}}}async function O({params:t}){let s=t.slug;return{cache:await x.query({query:I,variables:{slug:s}}),slug:s}}function S(t,s,a){let{slug:c}=s,{cache:e}=s;return console.log({slug:c}),k(x,I,e.data),t.$set=t=>{"slug"in t&&a(0,c=t.slug),"cache"in t&&a(1,e=t.cache)},[c,e]}export default class extends t{constructor(t){super(),s(this,t,S,L,a,{slug:0,cache:1})}}export{O as preload};
