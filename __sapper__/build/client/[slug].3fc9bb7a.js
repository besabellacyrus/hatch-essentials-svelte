import{S as s,i as t,s as a,k as e,a as c,r as l,q as n,d as o,b as r,v as u,w as i,C as d,f as h,y as p,n as f,l as m,u as g,x as v,K as E,L as b}from"./client.2a16d6b4.js";import{s as y,c as k,r as x}from"./svelte-apollo.es.e829eefb.js";const I=y`
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
`;function R(s){return{c:f,l:f,m:f,p:f,d:f}}function D(s){let t;function a(s,t){return s[2].data?L:q}let e=a(s),c=e(s);return{c(){c.c(),t=m()},l(s){c.l(s),t=m()},m(s,a){c.m(s,a),h(s,t,a)},p(s,l){e===(e=a(s))&&c?c.p(s,l):(c.d(1),c=e(s),c&&(c.c(),c.m(t.parentNode,t)))},d(s){c.d(s),s&&o(t)}}}function q(s){let t,a;return{c(){t=l("p"),a=g("ERROR!!")},l(s){t=u(s,"P",{});var e=i(t);a=v(e,"ERROR!!"),e.forEach(o)},m(s,e){h(s,t,e),p(t,a)},p:f,d(s){s&&o(t)}}}function L(s){let t,a,e,n,f=s[2].data.post.title+"",m=s[2].data.post.content+"";return{c(){t=l("h1"),a=g(f),e=c(),this.h()},l(s){t=u(s,"H1",{class:!0});var c=i(t);a=v(c,f),c.forEach(o),e=r(s),this.h()},h(){d(t,"class","text-center"),n=new E(m,null)},m(s,c){h(s,t,c),p(t,a),h(s,e,c),n.m(s,c)},p(s,t){2&t&&f!==(f=s[2].data.post.title+"")&&b(a,f),2&t&&m!==(m=s[2].data.post.content+"")&&n.p(m)},d(s){s&&o(t),s&&o(e),s&&n.d()}}}function V(s){let t,a,e;return{c(){t=l("div"),a=l("p"),e=g("Loading..."),this.h()},l(s){t=u(s,"DIV",{class:!0});var c=i(t);a=u(c,"P",{});var l=i(a);e=v(l,"Loading..."),l.forEach(o),c.forEach(o),this.h()},h(){d(t,"class","loader")},m(s,c){h(s,t,c),p(t,a),p(a,e)},p:f,d(s){s&&o(t)}}}function w(s){let t,a,m,g,v,E,b,y,k;document.title=t=s[0];let x={ctx:s,current:null,token:null,pending:V,then:D,catch:R,value:2};return e(b=s[1],x),{c(){a=c(),m=l("section"),g=l("div"),v=c(),E=l("div"),x.block.c(),y=c(),k=l("div"),this.h()},l(s){n('[data-svelte="svelte-y0sc4g"]',document.head).forEach(o),a=r(s),m=u(s,"SECTION",{class:!0});var t=i(m);g=u(t,"DIV",{class:!0}),i(g).forEach(o),v=r(t),E=u(t,"DIV",{class:!0});var e=i(E);x.block.l(e),e.forEach(o),y=r(t),k=u(t,"DIV",{class:!0}),i(k).forEach(o),t.forEach(o),this.h()},h(){d(g,"class","spacer"),d(E,"class","mt-5"),d(k,"class","spacer"),d(m,"class","container mx-auto")},m(s,t){h(s,a,t),h(s,m,t),p(m,g),p(m,v),p(m,E),x.block.m(E,x.anchor=null),x.mount=()=>E,x.anchor=null,p(m,y),p(m,k)},p(a,[c]){if(s=a,1&c&&t!==(t=s[0])&&(document.title=t),x.ctx=s,2&c&&b!==(b=s[1])&&e(b,x));else{const t=s.slice();t[2]=x.resolved,x.block.p(t,c)}},i:f,o:f,d(s){s&&o(a),s&&o(m),x.block.d(),x.token=null,x=null}}}async function O({params:s}){let t=s.slug;return{cache:await k.query({query:I,variables:{slug:t}}),slug:t}}function S(s,t,a){let{slug:e}=t,{cache:c}=t;return console.log({slug:e}),x(k,I,c.data),s.$set=s=>{"slug"in s&&a(0,e=s.slug),"cache"in s&&a(1,c=s.cache)},[e,c]}export default class extends s{constructor(s){super(),t(this,s,S,w,a,{slug:0,cache:1})}}export{O as preload};
