function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function s(){return Object.create(null)}function r(t){t.forEach(n)}function a(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(e,n,s){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}(n,s))}function i(t,n,s,r){return t[1]&&r?e(s.ctx.slice(),t[1](r(n))):s.ctx}function c(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function h(t){t.parentNode.removeChild(t)}function f(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function d(t){return document.createElement(t)}function p(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function m(t){return document.createTextNode(t)}function g(){return m(" ")}function v(){return m("")}function w(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t){return Array.from(t.childNodes)}function $(t,e,n,s){for(let s=0;s<t.length;s+=1){const r=t[s];if(r.nodeName===e){let e=0;for(;e<r.attributes.length;){const t=r.attributes[e];n[t.name]?e++:r.removeAttribute(t.name)}return t.splice(s,1)[0]}}return s?p(e):d(e)}function b(t,e){for(let n=0;n<t.length;n+=1){const s=t[n];if(3===s.nodeType)return s.data=""+e,t.splice(n,1)[0]}return m(e)}function x(t){return b(t," ")}function E(t,e){e=""+e,t.data!==e&&(t.data=e)}function _(t,e,n,s){t.style.setProperty(e,n,s?"important":"")}function A(t,e=document.body){return Array.from(e.querySelectorAll(t))}let S;function P(t){S=t}function B(){if(!S)throw new Error("Function called outside component initialization");return S}function L(t){B().$$.on_mount.push(t)}const R=[],C=[],j=[],H=[],I=Promise.resolve();let k=!1;function N(t){j.push(t)}let M=!1;const O=new Set;function D(){if(!M){M=!0;do{for(let t=0;t<R.length;t+=1){const e=R[t];P(e),q(e.$$)}for(R.length=0;C.length;)C.pop()();for(let t=0;t<j.length;t+=1){const e=j[t];O.has(e)||(O.add(e),e())}j.length=0}while(R.length);for(;H.length;)H.pop()();k=!1,M=!1,O.clear()}}function q(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}const U=new Set;let V;function Z(){V={r:0,c:[],p:V}}function T(){V.r||r(V.c),V=V.p}function Y(t,e){t&&t.i&&(U.delete(t),t.i(e))}function z(t,e,n,s){if(t&&t.o){if(U.has(t))return;U.add(t),V.c.push(()=>{U.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}function J(t,e){const n=e.token={};function s(t,s,r,a){if(e.token!==n)return;e.resolved=a;let o=e.ctx;void 0!==r&&(o=o.slice(),o[r]=a);const l=t&&(e.current=t)(o);let i=!1;e.block&&(e.blocks?e.blocks.forEach((t,n)=>{n!==s&&t&&(Z(),z(t,1,1,()=>{e.blocks[n]=null}),T())}):e.block.d(1),l.c(),Y(l,1),l.m(e.mount(),e.anchor),i=!0),e.block=l,e.blocks&&(e.blocks[s]=l),i&&D()}if((r=t)&&"object"==typeof r&&"function"==typeof r.then){const n=B();if(t.then(t=>{P(n),s(e.then,1,e.value,t),P(null)},t=>{P(n),s(e.catch,2,e.error,t),P(null)}),e.current!==e.pending)return s(e.pending,0),!0}else{if(e.current!==e.then)return s(e.then,1,e.value,t),!0;e.resolved=t}var r}function G(t,e){const n={},s={},r={$$scope:1};let a=t.length;for(;a--;){const o=t[a],l=e[a];if(l){for(const t in o)t in l||(s[t]=1);for(const t in l)r[t]||(n[t]=l[t],r[t]=1);t[a]=l}else for(const t in o)r[t]=1}for(const t in s)t in n||(n[t]=void 0);return n}function K(t){return"object"==typeof t&&null!==t?t:{}}function F(t){t&&t.c()}function W(t,e){t&&t.l(e)}function X(t,e,s){const{fragment:o,on_mount:l,on_destroy:i,after_update:c}=t.$$;o&&o.m(e,s),N(()=>{const e=l.map(n).filter(a);i?i.push(...e):r(e),t.$$.on_mount=[]}),c.forEach(N)}function Q(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function tt(t,e){-1===t.$$.dirty[0]&&(R.push(t),k||(k=!0,I.then(D)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function et(e,n,a,o,l,i,c=[-1]){const u=S;P(e);const f=n.props||{},d=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:l,bound:s(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:s(),dirty:c};let p=!1;if(d.ctx=a?a(e,f,(t,n,...s)=>{const r=s.length?s[0]:n;return d.ctx&&l(d.ctx[t],d.ctx[t]=r)&&(d.bound[t]&&d.bound[t](r),p&&tt(e,t)),n}):[],d.update(),p=!0,r(d.before_update),d.fragment=!!o&&o(d.ctx),n.target){if(n.hydrate){const t=y(n.target);d.fragment&&d.fragment.l(t),t.forEach(h)}else d.fragment&&d.fragment.c();n.intro&&Y(e.$$.fragment),X(e,n.target,n.anchor),D()}P(u)}class nt{$destroy(){Q(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const st=[];function rt(t,e){return{subscribe:at(t,e).subscribe}}function at(e,n=t){let s;const r=[];function a(t){if(o(e,t)&&(e=t,s)){const t=!st.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),st.push(n,e)}if(t){for(let t=0;t<st.length;t+=2)st[t][0](st[t+1]);st.length=0}}}return{set:a,update:function(t){a(t(e))},subscribe:function(o,l=t){const i=[o,l];return r.push(i),1===r.length&&(s=n(a)||t),o(e),()=>{const t=r.indexOf(i);-1!==t&&r.splice(t,1),0===r.length&&(s(),s=null)}}}}const ot={},lt=()=>({});function it(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Asset_9"),w(n,"data-name","Asset 9"),w(n,"d","M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"),w(n,"transform","translate(-9.8 -25.1)"),w(e,"class","fill-current nav-item nav-item-1 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","26.292"),w(e,"viewBox","0 0 68 13.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function ct(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Path_1233"),w(n,"data-name","Path 1233"),w(n,"d","M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"),w(n,"transform","translate(-0.061 -140.268)"),w(e,"class","fill-current nav-item nav-item-1 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","40.195"),w(e,"viewBox","0 0 68 40.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function ut(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Asset_9"),w(n,"data-name","Asset 9"),w(n,"d","M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"),w(n,"transform","translate(-9.8 -25.1)"),w(e,"class","fill-current nav-item nav-item-2 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","26.292"),w(e,"viewBox","0 0 68 13.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function ht(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Path_1233"),w(n,"data-name","Path 1233"),w(n,"d","M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"),w(n,"transform","translate(-0.061 -140.268)"),w(e,"class","fill-current nav-item nav-item-2 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","40.195"),w(e,"viewBox","0 0 68 40.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function ft(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Asset_9"),w(n,"data-name","Asset 9"),w(n,"d","M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"),w(n,"transform","translate(-9.8 -25.1)"),w(e,"class","fill-current nav-item nav-item-3 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","26.292"),w(e,"viewBox","0 0 68 13.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function dt(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Path_1233"),w(n,"data-name","Path 1233"),w(n,"d","M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"),w(n,"transform","translate(-0.061 -140.268)"),w(e,"class","fill-current nav-item nav-item-3 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","40.195"),w(e,"viewBox","0 0 68 40.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function pt(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Asset_9"),w(n,"data-name","Asset 9"),w(n,"d","M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"),w(n,"transform","translate(-9.8 -25.1)"),w(e,"class","fill-current nav-item nav-item-4 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","26.292"),w(e,"viewBox","0 0 68 13.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function mt(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Path_1233"),w(n,"data-name","Path 1233"),w(n,"d","M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"),w(n,"transform","translate(-0.061 -140.268)"),w(e,"class","fill-current nav-item nav-item-4 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","40.195"),w(e,"viewBox","0 0 68 40.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function gt(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Asset_9"),w(n,"data-name","Asset 9"),w(n,"d","M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"),w(n,"transform","translate(-9.8 -25.1)"),w(e,"class","fill-current nav-item nav-item-5 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","26.292"),w(e,"viewBox","0 0 68 13.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function vt(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Path_1233"),w(n,"data-name","Path 1233"),w(n,"d","M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"),w(n,"transform","translate(-0.061 -140.268)"),w(e,"class","fill-current nav-item nav-item-5 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","40.195"),w(e,"viewBox","0 0 68 40.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function wt(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Asset_9"),w(n,"data-name","Asset 9"),w(n,"d","M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"),w(n,"transform","translate(-9.8 -25.1)"),w(e,"class","fill-current nav-item nav-item-6 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","26.292"),w(e,"viewBox","0 0 68 13.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function yt(t){let e,n;return{c(){e=p("svg"),n=p("path"),this.h()},l(t){e=$(t,"svg",{class:!0,xmlns:!0,width:!0,height:!0,viewBox:!0},1);var s=y(e);n=$(s,"path",{id:!0,"data-name":!0,d:!0,transform:!0},1),y(n).forEach(h),s.forEach(h),this.h()},h(){w(n,"id","Path_1233"),w(n,"data-name","Path 1233"),w(n,"d","M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"),w(n,"transform","translate(-0.061 -140.268)"),w(e,"class","fill-current nav-item nav-item-6 svelte-1eysgpn"),w(e,"xmlns","http://www.w3.org/2000/svg"),w(e,"width","68"),w(e,"height","40.195"),w(e,"viewBox","0 0 68 40.195")},m(t,s){u(t,e,s),c(e,n)},d(t){t&&h(e)}}}function $t(e){let n,s,r,a,o,l,i,f,v,E,_,A,S,P,B,L,R,C,j,H,I,k,N,M,O,D,q,U,V,Z,T,Y,z,J,G,K,F,W,X,Q,tt,et,nt,st,rt,at,ot;function lt(t,e){return void 0===t[0]?ct:it}let $t=lt(e),bt=$t(e);function xt(t,e){return"essential-oils-101"===t[0]?ht:ut}let Et=xt(e),_t=Et(e);function At(t,e){return"pursue-your-dreams"===t[0]?dt:ft}let St=At(e),Pt=St(e);function Bt(t,e){return"about-hatch"===t[0]?mt:pt}let Lt=Bt(e),Rt=Lt(e);function Ct(t,e){return"the-blog"===t[0]?vt:gt}let jt=Ct(e),Ht=jt(e);function It(t,e){return"begin-now"===t[0]?yt:wt}let kt=It(e),Nt=kt(e);return{c(){n=d("nav"),s=d("div"),r=d("div"),a=d("a"),o=d("img"),i=g(),f=p("svg"),v=p("path"),E=g(),_=d("div"),A=d("div"),S=d("a"),P=d("img"),L=g(),R=d("div"),C=d("ul"),j=d("li"),H=d("a"),I=m("Home\n          "),bt.c(),N=g(),M=d("li"),O=d("a"),D=m("Essential Oils 101\n          \n            "),_t.c(),U=g(),V=d("li"),Z=d("a"),T=m("Pursue Your Dreams\n          "),Pt.c(),z=g(),J=d("li"),G=d("a"),K=m("About Hatch\n          "),Rt.c(),W=g(),X=d("li"),Q=d("a"),tt=m("The Blog\n           "),Ht.c(),nt=g(),st=d("li"),rt=d("a"),at=m("Begin Now\n            \n            "),Nt.c(),this.h()},l(t){n=$(t,"NAV",{class:!0});var e=y(n);s=$(e,"DIV",{class:!0});var l=y(s);r=$(l,"DIV",{});var c=y(r);a=$(c,"A",{href:!0,class:!0});var u=y(a);o=$(u,"IMG",{class:!0,src:!0,alt:!0}),u.forEach(h),c.forEach(h),i=x(l),f=$(l,"svg",{class:!0,xmlns:!0,viewBox:!0},1);var d=y(f);v=$(d,"path",{d:!0},1),y(v).forEach(h),d.forEach(h),l.forEach(h),E=x(e),_=$(e,"DIV",{class:!0});var p=y(_);A=$(p,"DIV",{class:!0});var m=y(A);S=$(m,"A",{href:!0,class:!0});var g=y(S);P=$(g,"IMG",{class:!0,src:!0,alt:!0}),g.forEach(h),m.forEach(h),L=x(p),R=$(p,"DIV",{});var w=y(R);C=$(w,"UL",{class:!0});var B=y(C);j=$(B,"LI",{class:!0});var k=y(j);H=$(k,"A",{href:!0,"aria-current":!0,class:!0});var q=y(H);I=b(q,"Home\n          "),bt.l(q),q.forEach(h),k.forEach(h),N=x(B),M=$(B,"LI",{class:!0});var Y=y(M);O=$(Y,"A",{"aria-current":!0,href:!0,class:!0});var F=y(O);D=b(F,"Essential Oils 101\n          \n            "),_t.l(F),F.forEach(h),Y.forEach(h),U=x(B),V=$(B,"LI",{class:!0});var et=y(V);Z=$(et,"A",{"aria-current":!0,href:!0,class:!0});var ot=y(Z);T=b(ot,"Pursue Your Dreams\n          "),Pt.l(ot),ot.forEach(h),et.forEach(h),z=x(B),J=$(B,"LI",{class:!0});var lt=y(J);G=$(lt,"A",{"aria-current":!0,href:!0,class:!0});var it=y(G);K=b(it,"About Hatch\n          "),Rt.l(it),it.forEach(h),lt.forEach(h),W=x(B),X=$(B,"LI",{class:!0});var ct=y(X);Q=$(ct,"A",{"aria-current":!0,href:!0,class:!0});var ut=y(Q);tt=b(ut,"The Blog\n           "),Ht.l(ut),ut.forEach(h),ct.forEach(h),nt=x(B),st=$(B,"LI",{class:!0});var ht=y(st);rt=$(ht,"A",{"aria-current":!0,href:!0,class:!0});var ft=y(rt);at=b(ft,"Begin Now\n            \n            "),Nt.l(ft),ft.forEach(h),ht.forEach(h),B.forEach(h),w.forEach(h),p.forEach(h),e.forEach(h),this.h()},h(){w(o,"class","logo svelte-1eysgpn"),o.src!==(l="/logo.svg")&&w(o,"src","/logo.svg"),w(o,"alt","Hatch Essentials"),w(a,"href","."),w(a,"class","svelte-1eysgpn"),w(v,"d","M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"),w(f,"class","fill-current svelte-1eysgpn"),w(f,"xmlns","http://www.w3.org/2000/svg"),w(f,"viewBox","0 0 24 24"),w(s,"class","nav-mobile flex items-center justify-between svelte-1eysgpn"),w(P,"class","logo svelte-1eysgpn"),P.src!==(B="/logo.svg")&&w(P,"src","/logo.svg"),w(P,"alt","Hatch Eessentials"),w(S,"href","."),w(S,"class","svelte-1eysgpn"),w(A,"class","flex items-center"),w(H,"href","."),w(H,"aria-current",k=void 0===e[0]?"page":void 0),w(H,"class","svelte-1eysgpn"),w(j,"class","svelte-1eysgpn"),w(O,"aria-current",q="essential-oils-101"===e[0]?"page":void 0),w(O,"href","/essential-oils-101"),w(O,"class","svelte-1eysgpn"),w(M,"class","svelte-1eysgpn"),w(Z,"aria-current",Y="pursue-your-dreams"===e[0]?"page":void 0),w(Z,"href","/pursue-your-dreams"),w(Z,"class","svelte-1eysgpn"),w(V,"class","svelte-1eysgpn"),w(G,"aria-current",F="about-hatch"===e[0]?"page":void 0),w(G,"href","/about-hatch"),w(G,"class","svelte-1eysgpn"),w(J,"class","svelte-1eysgpn"),w(Q,"aria-current",et="the-blog"===e[0]?"page":void 0),w(Q,"href","/the-blog"),w(Q,"class","svelte-1eysgpn"),w(X,"class","svelte-1eysgpn"),w(rt,"aria-current",ot="begin-now"===e[0]?"page":void 0),w(rt,"href","/begin-now"),w(rt,"class","svelte-1eysgpn"),w(st,"class","svelte-1eysgpn"),w(C,"class","flex hatch-nav svelte-1eysgpn"),w(_,"class","nav-pc flex items-center justify-between svelte-1eysgpn"),w(n,"class","main-nav svelte-1eysgpn")},m(t,e){u(t,n,e),c(n,s),c(s,r),c(r,a),c(a,o),c(s,i),c(s,f),c(f,v),c(n,E),c(n,_),c(_,A),c(A,S),c(S,P),c(_,L),c(_,R),c(R,C),c(C,j),c(j,H),c(H,I),bt.m(H,null),c(C,N),c(C,M),c(M,O),c(O,D),_t.m(O,null),c(C,U),c(C,V),c(V,Z),c(Z,T),Pt.m(Z,null),c(C,z),c(C,J),c(J,G),c(G,K),Rt.m(G,null),c(C,W),c(C,X),c(X,Q),c(Q,tt),Ht.m(Q,null),c(C,nt),c(C,st),c(st,rt),c(rt,at),Nt.m(rt,null)},p(t,[e]){$t!==($t=lt(t))&&(bt.d(1),bt=$t(t),bt&&(bt.c(),bt.m(H,null))),1&e&&k!==(k=void 0===t[0]?"page":void 0)&&w(H,"aria-current",k),Et!==(Et=xt(t))&&(_t.d(1),_t=Et(t),_t&&(_t.c(),_t.m(O,null))),1&e&&q!==(q="essential-oils-101"===t[0]?"page":void 0)&&w(O,"aria-current",q),St!==(St=At(t))&&(Pt.d(1),Pt=St(t),Pt&&(Pt.c(),Pt.m(Z,null))),1&e&&Y!==(Y="pursue-your-dreams"===t[0]?"page":void 0)&&w(Z,"aria-current",Y),Lt!==(Lt=Bt(t))&&(Rt.d(1),Rt=Lt(t),Rt&&(Rt.c(),Rt.m(G,null))),1&e&&F!==(F="about-hatch"===t[0]?"page":void 0)&&w(G,"aria-current",F),jt!==(jt=Ct(t))&&(Ht.d(1),Ht=jt(t),Ht&&(Ht.c(),Ht.m(Q,null))),1&e&&et!==(et="the-blog"===t[0]?"page":void 0)&&w(Q,"aria-current",et),kt!==(kt=It(t))&&(Nt.d(1),Nt=kt(t),Nt&&(Nt.c(),Nt.m(rt,null))),1&e&&ot!==(ot="begin-now"===t[0]?"page":void 0)&&w(rt,"aria-current",ot)},i:t,o:t,d(t){t&&h(n),bt.d(),_t.d(),Pt.d(),Rt.d(),Ht.d(),Nt.d()}}}function bt(t,e,n){let{segment:s}=e;return t.$set=t=>{"segment"in t&&n(0,s=t.segment)},[s]}class xt extends nt{constructor(t){super(),et(this,t,bt,$t,o,{segment:0})}}function Et(e){let n,s,r,a;return{c(){n=d("footer"),s=d("div"),r=d("p"),a=m("© 2020 Hatch Essentials • Young Living Independent Distributor"),this.h()},l(t){n=$(t,"FOOTER",{});var e=y(n);s=$(e,"DIV",{class:!0});var o=y(s);r=$(o,"P",{style:!0,class:!0});var l=y(r);a=b(l,"© 2020 Hatch Essentials • Young Living Independent Distributor"),l.forEach(h),o.forEach(h),e.forEach(h),this.h()},h(){_(r,"text-align","center"),_(r,"white-space","pre-wrap"),w(r,"class",""),w(s,"class","text-center")},m(t,e){u(t,n,e),c(n,s),c(s,r),c(r,a)},p:t,i:t,o:t,d(t){t&&h(n)}}}class _t extends nt{constructor(t){super(),et(this,t,null,Et,o,{})}}function At(t){let e,n,s,r;const a=new xt({props:{segment:t[0]}}),o=t[2].default,l=function(t,e,n,s){if(t){const r=i(t,e,n,s);return t[0](r)}}(o,t,t[1],null),c=new _t({});return{c(){F(a.$$.fragment),e=g(),n=d("main"),l&&l.c(),s=g(),F(c.$$.fragment)},l(t){W(a.$$.fragment,t),e=x(t),n=$(t,"MAIN",{});var r=y(n);l&&l.l(r),r.forEach(h),s=x(t),W(c.$$.fragment,t)},m(t,o){X(a,t,o),u(t,e,o),u(t,n,o),l&&l.m(n,null),u(t,s,o),X(c,t,o),r=!0},p(t,[e]){const n={};1&e&&(n.segment=t[0]),a.$set(n),l&&l.p&&2&e&&l.p(i(o,t,t[1],null),function(t,e,n,s){if(t[2]&&s){const r=t[2](s(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|r[s];return t}return e.dirty|r}return e.dirty}(o,t[1],e,null))},i(t){r||(Y(a.$$.fragment,t),Y(l,t),Y(c.$$.fragment,t),r=!0)},o(t){z(a.$$.fragment,t),z(l,t),z(c.$$.fragment,t),r=!1},d(t){Q(a,t),t&&h(e),t&&h(n),l&&l.d(t),t&&h(s),Q(c,t)}}}function St(t,e,n){let{segment:s}=e,{$$slots:r={},$$scope:a}=e;return t.$set=t=>{"segment"in t&&n(0,s=t.segment),"$$scope"in t&&n(1,a=t.$$scope)},[s,a,r]}class Pt extends nt{constructor(t){super(),et(this,t,St,At,o,{segment:0})}}function Bt(t){let e,n,s=t[1].stack+"";return{c(){e=d("pre"),n=m(s)},l(t){e=$(t,"PRE",{});var r=y(e);n=b(r,s),r.forEach(h)},m(t,s){u(t,e,s),c(e,n)},p(t,e){2&e&&s!==(s=t[1].stack+"")&&E(n,s)},d(t){t&&h(e)}}}function Lt(e){let n,s,r,a,o,l,i,f,p,_=e[1].message+"";document.title=n=e[0];let S=e[2]&&e[1].stack&&Bt(e);return{c(){s=g(),r=d("h1"),a=m(e[0]),o=g(),l=d("p"),i=m(_),f=g(),S&&S.c(),p=v(),this.h()},l(t){A('[data-svelte="svelte-1o9r2ue"]',document.head).forEach(h),s=x(t),r=$(t,"H1",{class:!0});var n=y(r);a=b(n,e[0]),n.forEach(h),o=x(t),l=$(t,"P",{class:!0});var c=y(l);i=b(c,_),c.forEach(h),f=x(t),S&&S.l(t),p=v(),this.h()},h(){w(r,"class","svelte-1xjwv3d"),w(l,"class","svelte-1xjwv3d")},m(t,e){u(t,s,e),u(t,r,e),c(r,a),u(t,o,e),u(t,l,e),c(l,i),u(t,f,e),S&&S.m(t,e),u(t,p,e)},p(t,[e]){1&e&&n!==(n=t[0])&&(document.title=n),1&e&&E(a,t[0]),2&e&&_!==(_=t[1].message+"")&&E(i,_),t[2]&&t[1].stack?S?S.p(t,e):(S=Bt(t),S.c(),S.m(p.parentNode,p)):S&&(S.d(1),S=null)},i:t,o:t,d(t){t&&h(s),t&&h(r),t&&h(o),t&&h(l),t&&h(f),S&&S.d(t),t&&h(p)}}}function Rt(t,e,n){let{status:s}=e,{error:r}=e;return t.$set=t=>{"status"in t&&n(0,s=t.status),"error"in t&&n(1,r=t.error)},[s,r,!1]}class Ct extends nt{constructor(t){super(),et(this,t,Rt,Lt,o,{status:0,error:1})}}function jt(t){let n,s;const r=[t[4].props];var a=t[4].component;function o(t){let n={};for(let t=0;t<r.length;t+=1)n=e(n,r[t]);return{props:n}}if(a)var l=new a(o());return{c(){l&&F(l.$$.fragment),n=v()},l(t){l&&W(l.$$.fragment,t),n=v()},m(t,e){l&&X(l,t,e),u(t,n,e),s=!0},p(t,e){const s=16&e?G(r,[K(t[4].props)]):{};if(a!==(a=t[4].component)){if(l){Z();const t=l;z(t.$$.fragment,1,0,()=>{Q(t,1)}),T()}a?(F((l=new a(o())).$$.fragment),Y(l.$$.fragment,1),X(l,n.parentNode,n)):l=null}else a&&l.$set(s)},i(t){s||(l&&Y(l.$$.fragment,t),s=!0)},o(t){l&&z(l.$$.fragment,t),s=!1},d(t){t&&h(n),l&&Q(l,t)}}}function Ht(t){let e;const n=new Ct({props:{error:t[0],status:t[1]}});return{c(){F(n.$$.fragment)},l(t){W(n.$$.fragment,t)},m(t,s){X(n,t,s),e=!0},p(t,e){const s={};1&e&&(s.error=t[0]),2&e&&(s.status=t[1]),n.$set(s)},i(t){e||(Y(n.$$.fragment,t),e=!0)},o(t){z(n.$$.fragment,t),e=!1},d(t){Q(n,t)}}}function It(t){let e,n,s,r;const a=[Ht,jt],o=[];function l(t,e){return t[0]?0:1}return e=l(t),n=o[e]=a[e](t),{c(){n.c(),s=v()},l(t){n.l(t),s=v()},m(t,n){o[e].m(t,n),u(t,s,n),r=!0},p(t,r){let i=e;e=l(t),e===i?o[e].p(t,r):(Z(),z(o[i],1,1,()=>{o[i]=null}),T(),n=o[e],n||(n=o[e]=a[e](t),n.c()),Y(n,1),n.m(s.parentNode,s))},i(t){r||(Y(n),r=!0)},o(t){z(n),r=!1},d(t){o[e].d(t),t&&h(s)}}}function kt(t){let n;const s=[{segment:t[2][0]},t[3].props];let r={$$slots:{default:[It]},$$scope:{ctx:t}};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);const a=new Pt({props:r});return{c(){F(a.$$.fragment)},l(t){W(a.$$.fragment,t)},m(t,e){X(a,t,e),n=!0},p(t,[e]){const n=12&e?G(s,[4&e&&{segment:t[2][0]},8&e&&K(t[3].props)]):{};147&e&&(n.$$scope={dirty:e,ctx:t}),a.$set(n)},i(t){n||(Y(a.$$.fragment,t),n=!0)},o(t){z(a.$$.fragment,t),n=!1},d(t){Q(a,t)}}}function Nt(t,e,n){let{stores:s}=e,{error:r}=e,{status:a}=e,{segments:o}=e,{level0:l}=e,{level1:i=null}=e,{notify:c}=e;var u,h,f;return u=c,B().$$.after_update.push(u),h=ot,f=s,B().$$.context.set(h,f),t.$set=t=>{"stores"in t&&n(5,s=t.stores),"error"in t&&n(0,r=t.error),"status"in t&&n(1,a=t.status),"segments"in t&&n(2,o=t.segments),"level0"in t&&n(3,l=t.level0),"level1"in t&&n(4,i=t.level1),"notify"in t&&n(6,c=t.notify)},[r,a,o,l,i,s,c]}class Mt extends nt{constructor(t){super(),et(this,t,Nt,kt,o,{stores:5,error:0,status:1,segments:2,level0:3,level1:4,notify:6})}}const Ot=[/^\/blog\.json$/,/^\/blog\/([^\/]+?)\.json$/],Dt=[{js:()=>import("./index.d752bbf1.js"),css:[]},{js:()=>import("./index.e6d19ac1.js"),css:[]},{js:()=>import("./[slug].e12bc7d3.js"),css:[]},{js:()=>import("./[slug].cc02dcb7.js"),css:[]}],qt=(Ut=decodeURIComponent,[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/blog\/?$/,parts:[{i:1}]},{pattern:/^\/blog\/([^\/]+?)\/?$/,parts:[null,{i:2,params:t=>({slug:Ut(t[1])})}]},{pattern:/^\/([^\/]+?)\/?$/,parts:[{i:3,params:t=>({slug:Ut(t[1])})}]}]);var Ut;const Vt="undefined"!=typeof __SAPPER__&&__SAPPER__;let Zt,Tt,Yt,zt=!1,Jt=[],Gt="{}";const Kt={page:function(t){const e=at(t);let n=!0;return{notify:function(){n=!0,e.update(t=>t)},set:function(t){n=!1,e.set(t)},subscribe:function(t){let s;return e.subscribe(e=>{(void 0===s||n&&e!==s)&&t(s=e)})}}}({}),preloading:at(null),session:at(Vt&&Vt.session)};let Ft,Wt;Kt.session.subscribe(async t=>{if(Ft=t,!zt)return;Wt=!0;const e=ae(new URL(location.href)),n=Tt={},{redirect:s,props:r,branch:a}=await ce(e);n===Tt&&await ie(s,a,r,e.page)});let Xt,Qt=null;let te,ee=1;const ne="undefined"!=typeof history?history:{pushState:(t,e,n)=>{},replaceState:(t,e,n)=>{},scrollRestoration:""},se={};function re(t){const e=Object.create(null);return t.length>0&&t.slice(1).split("&").forEach(t=>{let[,n,s=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(t.replace(/\+/g," ")));"string"==typeof e[n]&&(e[n]=[e[n]]),"object"==typeof e[n]?e[n].push(s):e[n]=s}),e}function ae(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(Vt.baseUrl))return null;let e=t.pathname.slice(Vt.baseUrl.length);if(""===e&&(e="/"),!Ot.some(t=>t.test(e)))for(let n=0;n<qt.length;n+=1){const s=qt[n],r=s.pattern.exec(e);if(r){const n=re(t.search),a=s.parts[s.parts.length-1],o=a.params?a.params(r):{},l={host:location.host,path:e,query:n,params:o};return{href:t.href,route:s,match:r,page:l}}}}function oe(){return{x:pageXOffset,y:pageYOffset}}async function le(t,e,n,s){if(e)te=e;else{const t=oe();se[te]=t,e=te=++ee,se[te]=n?t:{x:0,y:0}}te=e,Zt&&Kt.preloading.set(!0);const r=Qt&&Qt.href===t.href?Qt.promise:ce(t);Qt=null;const a=Tt={},{redirect:o,props:l,branch:i}=await r;if(a===Tt&&(await ie(o,i,l,t.page),document.activeElement&&document.activeElement.blur(),!n)){let t=se[e];if(s){const e=document.getElementById(s.slice(1));e&&(t={x:0,y:e.getBoundingClientRect().top+scrollY})}se[te]=t,t&&scrollTo(t.x,t.y)}}async function ie(t,e,n,s){if(t)return function(t,e={replaceState:!1}){const n=ae(new URL(t,document.baseURI));return n?(ne[e.replaceState?"replaceState":"pushState"]({id:te},"",t),le(n,null).then(()=>{})):(location.href=t,new Promise(t=>{}))}(t.location,{replaceState:!0});if(Kt.page.set(s),Kt.preloading.set(!1),Zt)Zt.$set(n);else{n.stores={page:{subscribe:Kt.page.subscribe},preloading:{subscribe:Kt.preloading.subscribe},session:Kt.session},n.level0={props:await Yt},n.notify=Kt.page.notify;const t=document.querySelector("#sapper-head-start"),e=document.querySelector("#sapper-head-end");if(t&&e){for(;t.nextSibling!==e;)he(t.nextSibling);he(t),he(e)}Zt=new Mt({target:Xt,props:n,hydrate:!0})}Jt=e,Gt=JSON.stringify(s.query),zt=!0,Wt=!1}async function ce(t){const{route:e,page:n}=t,s=n.path.split("/").filter(Boolean);let r=null;const a={error:null,status:200,segments:[s[0]]},o={fetch:(t,e)=>fetch(t,e),redirect:(t,e)=>{if(r&&(r.statusCode!==t||r.location!==e))throw new Error("Conflicting redirects");r={statusCode:t,location:e}},error:(t,e)=>{a.error="string"==typeof e?new Error(e):e,a.status=t}};let l;Yt||(Yt=Vt.preloaded[0]||lt.call(o,{host:n.host,path:n.path,query:n.query,params:{}},Ft));let i=1;try{const r=JSON.stringify(n.query),c=e.pattern.exec(n.path);let u=!1;l=await Promise.all(e.parts.map(async(e,l)=>{const h=s[l];if(function(t,e,n,s){if(s!==Gt)return!0;const r=Jt[t];return!!r&&(e!==r.segment||(!(!r.match||JSON.stringify(r.match.slice(1,t+2))===JSON.stringify(n.slice(1,t+2)))||void 0))}(l,h,c,r)&&(u=!0),a.segments[i]=s[l+1],!e)return{segment:h};const f=i++;if(!Wt&&!u&&Jt[l]&&Jt[l].part===e.i)return Jt[l];u=!1;const{default:d,preload:p}=await function(t){const e="string"==typeof t.css?[]:t.css.map(ue);return e.unshift(t.js()),Promise.all(e).then(t=>t[0])}(Dt[e.i]);let m;return m=zt||!Vt.preloaded[l+1]?p?await p.call(o,{host:n.host,path:n.path,query:n.query,params:e.params?e.params(t.match):{}},Ft):{}:Vt.preloaded[l+1],a["level"+f]={component:d,props:m,segment:h,match:c,part:e.i}}))}catch(t){a.error=t,a.status=500,l=[]}return{redirect:r,props:a,branch:l}}function ue(t){const e="client/"+t;if(!document.querySelector(`link[href="${e}"]`))return new Promise((t,n)=>{const s=document.createElement("link");s.rel="stylesheet",s.href=e,s.onload=()=>t(),s.onerror=n,document.head.appendChild(s)})}function he(t){t.parentNode.removeChild(t)}function fe(t){const e=ae(new URL(t,document.baseURI));if(e)return Qt&&t===Qt.href||function(t,e){Qt={href:t,promise:e}}(t,ce(e)),Qt.promise}let de;function pe(t){clearTimeout(de),de=setTimeout(()=>{me(t)},20)}function me(t){const e=ve(t.target);e&&"prefetch"===e.rel&&fe(e.href)}function ge(t){if(1!==function(t){return null===t.which?t.button:t.which}(t))return;if(t.metaKey||t.ctrlKey||t.shiftKey)return;if(t.defaultPrevented)return;const e=ve(t.target);if(!e)return;if(!e.href)return;const n="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name,s=String(n?e.href.baseVal:e.href);if(s===location.href)return void(location.hash||t.preventDefault());if(e.hasAttribute("download")||"external"===e.getAttribute("rel"))return;if(n?e.target.baseVal:e.target)return;const r=new URL(s);if(r.pathname===location.pathname&&r.search===location.search)return;const a=ae(r);if(a){le(a,null,e.hasAttribute("sapper-noscroll"),r.hash),t.preventDefault(),ne.pushState({id:te},"",r.href)}}function ve(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}function we(t){if(se[te]=oe(),t.state){const e=ae(new URL(location.href));e?le(e,t.state.id):location.href=location.href}else ee=ee+1,function(t){te=t}(ee),ne.replaceState({id:te},"",location.href)}var ye;ye={target:document.querySelector("#sapper")},"scrollRestoration"in ne&&(ne.scrollRestoration="manual"),addEventListener("beforeunload",()=>{ne.scrollRestoration="auto"}),addEventListener("load",()=>{ne.scrollRestoration="manual"}),function(t){Xt=t}(ye.target),addEventListener("click",ge),addEventListener("popstate",we),addEventListener("touchstart",me),addEventListener("mousemove",pe),Promise.resolve().then(()=>{const{hash:t,href:e}=location;ne.replaceState({id:ee},"",e);const n=new URL(location.href);if(Vt.error)return function(t){const{host:e,pathname:n,search:s}=location,{session:r,preloaded:a,status:o,error:l}=Vt;Yt||(Yt=a&&a[0]),ie(null,[],{error:l,status:o,session:r,level0:{props:Yt},level1:{props:{status:o,error:l},component:Ct},segments:a},{host:e,path:n,query:re(s),params:{}})}();const s=ae(n);return s?le(s,ee,!0,t):void 0});export{rt as A,L as B,w as C,_ as D,E,nt as S,g as a,u as b,x as c,h as d,v as e,z as f,l as g,J as h,et as i,Z as j,T as k,d as l,m,t as n,$ as o,y as p,A as q,b as r,o as s,Y as t,c as u,F as v,W as w,X as x,Q as y,f as z};