import{S as t,i as s,s as a,n as e,a as c,u as l,q as n,d as o,b as r,w as u,x as i,C as d,h,g as p,o as f,e as m,v as g,y as v,H as E,T as b}from"./client.f1bdbe61.js";import{s as y,c as x,r as k}from"./svelte-apollo.es.e909f808.js";const I=y`
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
`;function R(t){return{c:f,l:f,m:f,p:f,d:f}}function D(t){let s;function a(t,s){return t[2].data?w:q}let e=a(t),c=e(t);return{c(){c.c(),s=m()},l(t){c.l(t),s=m()},m(t,a){c.m(t,a),h(t,s,a)},p(t,l){e===(e=a(t))&&c?c.p(t,l):(c.d(1),c=e(t),c&&(c.c(),c.m(s.parentNode,s)))},d(t){c.d(t),t&&o(s)}}}function q(t){let s,a;return{c(){s=l("p"),a=g("ERROR!!")},l(t){s=u(t,"P",{});var e=i(s);a=v(e,"ERROR!!"),e.forEach(o)},m(t,e){h(t,s,e),p(s,a)},p:f,d(t){t&&o(s)}}}function w(t){let s,a,e,n,f=t[2].data.post.title+"",m=t[2].data.post.content+"";return{c(){s=l("h1"),a=g(f),e=c(),this.h()},l(t){s=u(t,"H1",{class:!0});var c=i(s);a=v(c,f),c.forEach(o),e=r(t),this.h()},h(){d(s,"class","text-center"),n=new E(m,null)},m(t,c){h(t,s,c),p(s,a),h(t,e,c),n.m(t,c)},p(t,s){2&s&&f!==(f=t[2].data.post.title+"")&&b(a,f),2&s&&m!==(m=t[2].data.post.content+"")&&n.p(m)},d(t){t&&o(s),t&&o(e),t&&n.d()}}}function V(t){let s,a,e;return{c(){s=l("div"),a=l("p"),e=g("Loading..."),this.h()},l(t){s=u(t,"DIV",{class:!0});var c=i(s);a=u(c,"P",{});var l=i(a);e=v(l,"Loading..."),l.forEach(o),c.forEach(o),this.h()},h(){d(s,"class","loader")},m(t,c){h(t,s,c),p(s,a),p(a,e)},p:f,d(t){t&&o(s)}}}function L(t){let s,a,m,g,v,E,b,y,x;document.title=s=t[0];let k={ctx:t,current:null,token:null,pending:V,then:D,catch:R,value:2};return e(b=t[1],k),{c(){a=c(),m=l("section"),g=l("div"),v=c(),E=l("div"),k.block.c(),y=c(),x=l("div"),this.h()},l(t){n('[data-svelte="svelte-y0sc4g"]',document.head).forEach(o),a=r(t),m=u(t,"SECTION",{class:!0});var s=i(m);g=u(s,"DIV",{class:!0}),i(g).forEach(o),v=r(s),E=u(s,"DIV",{class:!0});var e=i(E);k.block.l(e),e.forEach(o),y=r(s),x=u(s,"DIV",{class:!0}),i(x).forEach(o),s.forEach(o),this.h()},h(){d(g,"class","spacer"),d(E,"class","mt-5 content-wrapper"),d(x,"class","spacer"),d(m,"class","container mx-auto")},m(t,s){h(t,a,s),h(t,m,s),p(m,g),p(m,v),p(m,E),k.block.m(E,k.anchor=null),k.mount=()=>E,k.anchor=null,p(m,y),p(m,x)},p(a,[c]){if(t=a,1&c&&s!==(s=t[0])&&(document.title=s),k.ctx=t,2&c&&b!==(b=t[1])&&e(b,k));else{const s=t.slice();s[2]=k.resolved,k.block.p(s,c)}},i:f,o:f,d(t){t&&o(a),t&&o(m),k.block.d(),k.token=null,k=null}}}async function O({params:t}){let s=t.slug;return{cache:await x.query({query:I,variables:{slug:s}}),slug:s}}function S(t,s,a){let{slug:e}=s,{cache:c}=s;return console.log({slug:e}),k(x,I,c.data),t.$set=t=>{"slug"in t&&a(0,e=t.slug),"cache"in t&&a(1,c=t.cache)},[e,c]}export default class extends t{constructor(t){super(),s(this,t,S,L,a,{slug:0,cache:1})}}export{O as preload};
