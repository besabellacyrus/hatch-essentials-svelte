import{S as s,i as t,s as a,k as c,a as e,r as l,q as n,d as o,b as r,v as u,w as i,y as d,f as h,z as p,n as f,l as m,u as g,x as v,K as E,L as y}from"./client.10fae6c5.js";import{s as k,c as x,r as b}from"./svelte-apollo.es.19ad5e1a.js";const I=k`
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
`;function R(s){return{c:f,l:f,m:f,p:f,d:f}}function D(s){let t;function a(s,t){return s[2].data?L:q}let c=a(s),e=c(s);return{c(){e.c(),t=m()},l(s){e.l(s),t=m()},m(s,a){e.m(s,a),h(s,t,a)},p(s,l){c===(c=a(s))&&e?e.p(s,l):(e.d(1),e=c(s),e&&(e.c(),e.m(t.parentNode,t)))},d(s){e.d(s),s&&o(t)}}}function q(s){let t,a;return{c(){t=l("p"),a=g("ERROR!!")},l(s){t=u(s,"P",{});var c=i(t);a=v(c,"ERROR!!"),c.forEach(o)},m(s,c){h(s,t,c),p(t,a)},p:f,d(s){s&&o(t)}}}function L(s){let t,a,c,n,f=s[2].data.post.title+"",m=s[2].data.post.content+"";return{c(){t=l("h1"),a=g(f),c=e(),this.h()},l(s){t=u(s,"H1",{class:!0});var e=i(t);a=v(e,f),e.forEach(o),c=r(s),this.h()},h(){d(t,"class","text-center"),n=new E(m,null)},m(s,e){h(s,t,e),p(t,a),h(s,c,e),n.m(s,e)},p(s,t){2&t&&f!==(f=s[2].data.post.title+"")&&y(a,f),2&t&&m!==(m=s[2].data.post.content+"")&&n.p(m)},d(s){s&&o(t),s&&o(c),s&&n.d()}}}function V(s){let t,a,c;return{c(){t=l("div"),a=l("p"),c=g("Loading..."),this.h()},l(s){t=u(s,"DIV",{class:!0});var e=i(t);a=u(e,"P",{});var l=i(a);c=v(l,"Loading..."),l.forEach(o),e.forEach(o),this.h()},h(){d(t,"class","loader")},m(s,e){h(s,t,e),p(t,a),p(a,c)},p:f,d(s){s&&o(t)}}}function w(s){let t,a,m,g,v,E,y,k,x;document.title=t=s[0];let b={ctx:s,current:null,token:null,pending:V,then:D,catch:R,value:2};return c(y=s[1],b),{c(){a=e(),m=l("section"),g=l("div"),v=e(),E=l("div"),b.block.c(),k=e(),x=l("div"),this.h()},l(s){n('[data-svelte="svelte-y0sc4g"]',document.head).forEach(o),a=r(s),m=u(s,"SECTION",{class:!0});var t=i(m);g=u(t,"DIV",{class:!0}),i(g).forEach(o),v=r(t),E=u(t,"DIV",{class:!0});var c=i(E);b.block.l(c),c.forEach(o),k=r(t),x=u(t,"DIV",{class:!0}),i(x).forEach(o),t.forEach(o),this.h()},h(){d(g,"class","spacer"),d(E,"class","mt-5"),d(x,"class","spacer"),d(m,"class","container mx-auto")},m(s,t){h(s,a,t),h(s,m,t),p(m,g),p(m,v),p(m,E),b.block.m(E,b.anchor=null),b.mount=()=>E,b.anchor=null,p(m,k),p(m,x)},p(a,[e]){if(s=a,1&e&&t!==(t=s[0])&&(document.title=t),b.ctx=s,2&e&&y!==(y=s[1])&&c(y,b));else{const t=s.slice();t[2]=b.resolved,b.block.p(t,e)}},i:f,o:f,d(s){s&&o(a),s&&o(m),b.block.d(),b.token=null,b=null}}}async function O({params:s}){let t=s.slug;return{cache:await x.query({query:I,variables:{slug:t}}),slug:t}}function S(s,t,a){let{slug:c}=t,{cache:e}=t;return console.log({slug:c}),b(x,I,e.data),s.$set=s=>{"slug"in s&&a(0,c=s.slug),"cache"in s&&a(1,e=s.cache)},[c,e]}export default class extends s{constructor(s){super(),t(this,s,S,w,a,{slug:0,cache:1})}}export{O as preload};
