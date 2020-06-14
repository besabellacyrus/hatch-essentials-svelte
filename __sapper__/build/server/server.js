'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var ApolloClient = require('apollo-boost');
var ApolloClient__default = _interopDefault(ApolloClient);
var fetch$1 = _interopDefault(require('node-fetch'));
var svelteApollo = require('svelte-apollo');
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'What is Sapper?',
		slug: 'what-is-sapper',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: 'How to use Sapper',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'Why the name?',
		slug: 'why-the-name',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: 'How is Sapper different from Next.js?',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://vercel.com/'>Vercel</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].svelte</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},

	{
		title: 'How can I get involved?',
		slug: 'how-can-i-get-involved',
		html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get
});

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

function get$1(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$1
});

function noop() { }
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

const PAGE = ApolloClient.gql`
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
`;

var client = new ApolloClient__default({
  uri:
    process.env.SAPPER_APP_GRAPQL || "http://hatchessentials.com/wp-api/graphql",
  fetch: fetch$1,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

/* src/components/page_elements/DynamicBlock.svelte generated by Svelte v3.22.3 */

const css = {
	code: ".he-row.svelte-u2bh1y{max-width:1900px;margin:0 auto}",
	map: "{\"version\":3,\"file\":\"DynamicBlock.svelte\",\"sources\":[\"DynamicBlock.svelte\"],\"sourcesContent\":[\"<script>\\n  export let content;\\n  export let bgColor; \\n</script>\\n<style lang=\\\"scss\\\">.he-row {\\n  max-width: 1900px;\\n  margin: 0 auto; }\\n/*# sourceMappingURL=src/components/page_elements/DynamicBlock.svelte.map */</style>\\n<section class=\\\"he-row\\\" style=\\\"background-color: {bgColor ? bgColor : ''}\\\">\\n  {@html content}\\n</section>\\n\"],\"names\":[],\"mappings\":\"AAImB,OAAO,cAAC,CAAC,AAC1B,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,AAAE,CAAC\"}"
};

const DynamicBlock = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { content } = $$props;
	let { bgColor } = $$props;
	if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
	if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0) $$bindings.bgColor(bgColor);
	$$result.css.add(css);
	return `<section class="${"he-row svelte-u2bh1y"}" style="${"background-color: " + escape(bgColor ? bgColor : "")}">${content}</section>`;
});

/* src/routes/index.svelte generated by Svelte v3.22.3 */

const css$1 = {
	code: "@media(min-width: 480px){}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n  import client from \\\"../lib/apollo\\\";\\n  import { PAGE } from \\\"../queries/page\\\";\\n\\n  let slug = \\\"home\\\";\\n\\n  export async function preload() { \\n    return {\\n      cache: await client.query({\\n        query: PAGE,\\n        variables: { slug }\\n      })\\n    };\\n  }\\n</script>\\n\\n<script>\\n  import { restore, query } from \\\"svelte-apollo\\\";\\n  import DynamicBlock from \\\"../components/page_elements/DynamicBlock.svelte\\\"; \\n\\n  export let cache;\\n  restore(client, PAGE, cache.data);\\n  // TODO Uncommenting this part triggers a 500 error.\\n  // setClient(client);\\n\\n  // query a subset of the preloaded (the rest if for Account)\\n  const pages = query(client, {\\n    query: PAGE,\\n    variables: { slug }\\n  });\\n</script>\\n\\n<style>\\n@media (min-width: 480px) {\\n}\\n\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtBQUNBIiwiZmlsZSI6InNyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIiwic291cmNlc0NvbnRlbnQiOlsiXG5AbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcbn1cbiJdfQ== */</style>\\n\\n<svelte:head>\\n  <title>Hatch Essentials</title>\\n</svelte:head>\\n\\n{#await $pages}\\n  <p>Loading...</p>\\n{:then data}\\n  {#if data.data}\\n    {#each data.data['hatch_PageBy']['page']['fc'] as page, i}\\n      <DynamicBlock content={page.content} bgColor={page.backgroundColor} />\\n    {/each}\\n  {:else}\\n    <p>ERROR!!</p>\\n  {/if}\\n{/await}\\n\"],\"names\":[],\"mappings\":\"AAiCA,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC3B,CAAC\"}"
};

let slug = "home";

async function preload() {
	return {
		cache: await client.query({ query: PAGE, variables: { slug } })
	};
}

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $pages;
	let { cache } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);

	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const pages = svelteApollo.query(client, { query: PAGE, variables: { slug } });

	$pages = get_store_value(pages);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	$$result.css.add(css$1);
	$pages = get_store_value(pages);

	return `${($$result.head += `${($$result.title = `<title>Hatch Essentials</title>`, "")}`, "")}

${(function (__value) {
		if (is_promise(__value)) return `
  <p>Loading...</p>
`;

		return (function (data) {
			return `
  ${data.data
			? `${each(data.data["hatch_PageBy"]["page"]["fc"], (page, i) => `${validate_component(DynamicBlock, "DynamicBlock").$$render(
					$$result,
					{
						content: page.content,
						bgColor: page.backgroundColor
					},
					{},
					{}
				)}`)}`
			: `<p>ERROR!!</p>`}
`;
		})(__value);
	})($pages)}`;
});

/* src/routes/blog/index.svelte generated by Svelte v3.22.3 */

const css$2 = {
	code: "ul.svelte-7c25b2{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport function preload({ params, query }) {\\n\\t\\treturn this.fetch(`blog.json`).then(r => r.json()).then(posts => {\\n\\t\\t\\treturn { posts };\\n\\t\\t});\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let posts;\\n</script>\\n\\n<style>\\nul {\\n\\tmargin: 0 0 1em 0;\\n\\tline-height: 1.5;\\n}\\n\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvYmxvZy9pbmRleC5zdmVsdGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0NBQ0MsaUJBQWlCO0NBQ2pCLGdCQUFnQjtBQUNqQiIsImZpbGUiOiJzcmMvcm91dGVzL2Jsb2cvaW5kZXguc3ZlbHRlIiwic291cmNlc0NvbnRlbnQiOlsiXG51bCB7XG5cdG1hcmdpbjogMCAwIDFlbSAwO1xuXHRsaW5lLWhlaWdodDogMS41O1xufVxuIl19 */</style>\\n\\n<svelte:head>\\n\\t<title>Blog</title>\\n</svelte:head>\\n\\n<h1>Recent posts</h1>\\n\\n<ul>\\n\\t{#each posts as post}\\n\\t\\t<!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n\\t\\t<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>\\n\\t{/each}\\n</ul>\"],\"names\":[],\"mappings\":\"AAaA,EAAE,cAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload$1({ params, query }) {
	return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Blog = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css$2);

	return `${($$result.head += `${($$result.title = `<title>Blog</title>`, "")}`, "")}

<h1>Recent posts</h1>

<ul class="${"svelte-7c25b2"}">${each(posts, post => `
		<li><a rel="${"prefetch"}" href="${"blog/" + escape(post.slug)}">${escape(post.title)}</a></li>`)}</ul>`;
});

/* src/routes/blog/[slug].svelte generated by Svelte v3.22.3 */

const css$3 = {
	code: ".content.svelte-nsonjy h2{font-size:1.4em;font-weight:500}.content.svelte-nsonjy pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0,0,0,0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-nsonjy pre code{background-color:transparent;padding:0}.content.svelte-nsonjy ul{line-height:1.5}.content.svelte-nsonjy li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport async function preload({ params, query }) {\\n\\t\\t// the `slug` parameter is available because\\n\\t\\t// this file is called [slug].svelte\\n\\t\\tconst res = await this.fetch(`blog/${params.slug}.json`);\\n\\t\\tconst data = await res.json();\\n\\n\\t\\tif (res.status === 200) {\\n\\t\\t\\treturn { post: data };\\n\\t\\t} else {\\n\\t\\t\\tthis.error(res.status, data.message);\\n\\t\\t}\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let post;\\n</script>\\n\\n<style>\\n/*\\n\\tBy default, CSS is locally scoped to the component,\\n\\tand any unused styles are dead-code-eliminated.\\n\\tIn this page, Svelte can't know which elements are\\n\\tgoing to appear inside the {{{post.html}}} block,\\n\\tso we have to use the :global(...) modifier to target\\n\\tall elements inside .content\\n*/\\n.content :global(h2) {\\n\\tfont-size: 1.4em;\\n\\tfont-weight: 500;\\n}\\n\\n.content :global(pre) {\\n\\tbackground-color: #f9f9f9;\\n\\tbox-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);\\n\\tpadding: 0.5em;\\n\\tborder-radius: 2px;\\n\\toverflow-x: auto;\\n}\\n\\n.content :global(pre) :global(code) {\\n\\tbackground-color: transparent;\\n\\tpadding: 0;\\n}\\n\\n.content :global(ul) {\\n\\tline-height: 1.5;\\n}\\n\\n.content :global(li) {\\n\\tmargin: 0 0 0.5em 0;\\n}\\n\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvYmxvZy9bc2x1Z10uc3ZlbHRlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7OztDQU9DO0FBQ0Q7Q0FDQyxnQkFBZ0I7Q0FDaEIsZ0JBQWdCO0FBQ2pCOztBQUVBO0NBQ0MseUJBQXlCO0NBQ3pCLDhDQUE4QztDQUM5QyxjQUFjO0NBQ2Qsa0JBQWtCO0NBQ2xCLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDLDZCQUE2QjtDQUM3QixVQUFVO0FBQ1g7O0FBRUE7Q0FDQyxnQkFBZ0I7QUFDakI7O0FBRUE7Q0FDQyxtQkFBbUI7QUFDcEIiLCJmaWxlIjoic3JjL3JvdXRlcy9ibG9nL1tzbHVnXS5zdmVsdGUiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qXG5cdEJ5IGRlZmF1bHQsIENTUyBpcyBsb2NhbGx5IHNjb3BlZCB0byB0aGUgY29tcG9uZW50LFxuXHRhbmQgYW55IHVudXNlZCBzdHlsZXMgYXJlIGRlYWQtY29kZS1lbGltaW5hdGVkLlxuXHRJbiB0aGlzIHBhZ2UsIFN2ZWx0ZSBjYW4ndCBrbm93IHdoaWNoIGVsZW1lbnRzIGFyZVxuXHRnb2luZyB0byBhcHBlYXIgaW5zaWRlIHRoZSB7e3twb3N0Lmh0bWx9fX0gYmxvY2ssXG5cdHNvIHdlIGhhdmUgdG8gdXNlIHRoZSA6Z2xvYmFsKC4uLikgbW9kaWZpZXIgdG8gdGFyZ2V0XG5cdGFsbCBlbGVtZW50cyBpbnNpZGUgLmNvbnRlbnRcbiovXG4uY29udGVudCA6Z2xvYmFsKGgyKSB7XG5cdGZvbnQtc2l6ZTogMS40ZW07XG5cdGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5jb250ZW50IDpnbG9iYWwocHJlKSB7XG5cdGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XG5cdGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggNXB4IHJnYmEoMCwwLDAsMC4wNSk7XG5cdHBhZGRpbmc6IDAuNWVtO1xuXHRib3JkZXItcmFkaXVzOiAycHg7XG5cdG92ZXJmbG93LXg6IGF1dG87XG59XG5cbi5jb250ZW50IDpnbG9iYWwocHJlKSA6Z2xvYmFsKGNvZGUpIHtcblx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdHBhZGRpbmc6IDA7XG59XG5cbi5jb250ZW50IDpnbG9iYWwodWwpIHtcblx0bGluZS1oZWlnaHQ6IDEuNTtcbn1cblxuLmNvbnRlbnQgOmdsb2JhbChsaSkge1xuXHRtYXJnaW46IDAgMCAwLjVlbSAwO1xufVxuIl19 */</style>\\n\\n<svelte:head>\\n\\t<title>{post.title}</title>\\n</svelte:head>\\n\\n<h1>{post.title}</h1>\\n\\n<div class='content'>\\n\\t{@html post.html}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA4BA,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

async function preload$2({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`blog/${params.slug}.json`);

	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { post } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$3);

	return `${($$result.head += `${($$result.title = `<title>${escape(post.title)}</title>`, "")}`, "")}

<h1>${escape(post.title)}</h1>

<div class="${"content svelte-nsonjy"}">${post.html}</div>`;
});

/* src/routes/[slug].svelte generated by Svelte v3.22.3 */

const css$4 = {
	code: "@media(min-width: 480px){}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n  import client from \\\"../lib/apollo\\\";\\n  import { PAGE } from \\\"../queries/page\\\";\\n  \\n  export async function preload({ params }) { \\n  \\tlet slug = params.slug; \\n    return { \\n      cache: await client.query({\\n        query: PAGE,\\n        variables: { slug }\\n      }),\\n      slug\\n    };\\n  }\\n</script>\\n\\n<script>\\n  import { restore, query } from \\\"svelte-apollo\\\";\\n  import DynamicBlock from \\\"../components/page_elements/DynamicBlock.svelte\\\";\\n\\n  export let slug;\\n  export let cache;\\n\\n  restore(client, PAGE, cache.data); \\n  // setClient(client); \\n\\n  // const pages = query(client, {\\n  //   query: PAGE,\\n  //   variables: { slug }\\n  // });\\n\\n</script>\\n\\n<style>\\n@media (min-width: 480px) {\\n}\\n\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvW3NsdWddLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQSIsImZpbGUiOiJzcmMvcm91dGVzL1tzbHVnXS5zdmVsdGUiLCJzb3VyY2VzQ29udGVudCI6WyJcbkBtZWRpYSAobWluLXdpZHRoOiA0ODBweCkge1xufVxuIl19 */</style>\\n\\n<svelte:head>\\n  <title>{ slug }</title>\\n</svelte:head>\\n \\n{#await cache}\\n  <p>Loading...</p>\\n{:then data}\\n  {#if data.data}\\n    {#each data.data['hatch_PageBy']['page']['fc'] as page, i}\\n      <DynamicBlock content={page.content} bgColor={page.backgroundColor} />\\n    {/each}\\n  {:else}\\n    <p>ERROR!!</p>\\n  {/if}\\n{/await} \\n\"],\"names\":[],\"mappings\":\"AAkCA,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC3B,CAAC\"}"
};

async function preload$3({ params }) {
	let slug = params.slug;

	return {
		cache: await client.query({ query: PAGE, variables: { slug } }),
		slug
	};
}

const U5Bslugu5D$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { slug } = $$props;
	let { cache } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	$$result.css.add(css$4);

	return `${($$result.head += `${($$result.title = `<title>${escape(slug)}</title>`, "")}`, "")}
 
${(function (__value) {
		if (is_promise(__value)) return `
  <p>Loading...</p>
`;

		return (function (data) {
			return `
  ${data.data
			? `${each(data.data["hatch_PageBy"]["page"]["fc"], (page, i) => `${validate_component(DynamicBlock, "DynamicBlock").$$render(
					$$result,
					{
						content: page.content,
						bgColor: page.backgroundColor
					},
					{},
					{}
				)}`)}`
			: `<p>ERROR!!</p>`}
`;
		})(__value);
	})(cache)}`;
});

/* src/components/Nav.svelte generated by Svelte v3.22.3 */

const css$5 = {
	code: "nav.svelte-1eysgpn.svelte-1eysgpn{font-weight:300}ul.svelte-1eysgpn.svelte-1eysgpn{margin:0;padding:0;display:grid;grid-template-columns:repeat(6, 1fr);grid-gap:0.1rem}li.svelte-1eysgpn.svelte-1eysgpn{text-align:center;margin-top:0.4rem}li.svelte-1eysgpn svg.svelte-1eysgpn{margin:0 auto;width:3rem;height:1rem;position:relative;top:1.2rem}[aria-current].svelte-1eysgpn .nav-item.svelte-1eysgpn{opacity:1}a.svelte-1eysgpn.svelte-1eysgpn{text-decoration:none;display:block}nav.svelte-1eysgpn.svelte-1eysgpn{background-color:#fbf6f4}nav.svelte-1eysgpn ul.svelte-1eysgpn{font-size:0.6rem;font-weight:bold}.nav-mobile.svelte-1eysgpn.svelte-1eysgpn{height:5rem}.nav-mobile.svelte-1eysgpn svg.svelte-1eysgpn{height:1.7rem}@media screen and (min-width: 598px){.nav-mobile.svelte-1eysgpn.svelte-1eysgpn{display:none}}.nav-pc.svelte-1eysgpn.svelte-1eysgpn{height:5rem}@media screen and (max-width: 599px){.nav-pc.svelte-1eysgpn.svelte-1eysgpn{display:none}}.nav-item.svelte-1eysgpn.svelte-1eysgpn{opacity:0.6;transition:300ms all;height:2rem;position:relative;top:-0.18rem}.nav-item.svelte-1eysgpn.svelte-1eysgpn:active{opacity:1}.nav-item-1.svelte-1eysgpn.svelte-1eysgpn{color:#ac335e}.nav-item-2.svelte-1eysgpn.svelte-1eysgpn{color:#c16995}.nav-item-3.svelte-1eysgpn.svelte-1eysgpn{color:#e4a73A}.nav-item-4.svelte-1eysgpn.svelte-1eysgpn{color:#3e99c4}.nav-item-5.svelte-1eysgpn.svelte-1eysgpn{color:#543c78}.nav-item-6.svelte-1eysgpn.svelte-1eysgpn{color:#267d75}.main-nav.svelte-1eysgpn.svelte-1eysgpn{max-width:1900px;margin:0 auto;padding-left:1rem;padding-right:1rem}.hatch-nav.svelte-1eysgpn.svelte-1eysgpn{margin-top:2.34rem}@media screen and (max-width: 768px){img.logo.svelte-1eysgpn.svelte-1eysgpn{height:3rem}}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\n  export let segment;\\n</script>\\n\\n<style lang=\\\"scss\\\">nav {\\n  font-weight: 300; }\\n\\nul {\\n  margin: 0;\\n  padding: 0;\\n  display: grid;\\n  grid-template-columns: repeat(6, 1fr);\\n  grid-gap: 0.1rem; }\\n\\nli {\\n  text-align: center;\\n  margin-top: 0.4rem; }\\n  li svg {\\n    margin: 0 auto;\\n    width: 3rem;\\n    height: 1rem;\\n    position: relative;\\n    top: 1.2rem; }\\n\\n[aria-current] .nav-item {\\n  opacity: 1; }\\n\\na {\\n  text-decoration: none;\\n  display: block; }\\n\\nnav {\\n  background-color: #fbf6f4; }\\n  nav ul {\\n    font-size: 0.6rem;\\n    font-weight: bold; }\\n\\n.nav-mobile {\\n  height: 5rem; }\\n  .nav-mobile svg {\\n    height: 1.7rem; }\\n  @media screen and (min-width: 598px) {\\n    .nav-mobile {\\n      display: none; } }\\n\\n.nav-pc {\\n  height: 5rem;\\n  /*margin-top: 1rem;*/ }\\n  @media screen and (max-width: 599px) {\\n    .nav-pc {\\n      display: none; } }\\n\\n.nav-item {\\n  opacity: 0.6;\\n  transition: 300ms all;\\n  height: 2rem;\\n  position: relative;\\n  top: -0.18rem; }\\n  .nav-item:active {\\n    opacity: 1; }\\n\\n.nav-item-1 {\\n  color: #ac335e; }\\n\\n.nav-item-2 {\\n  color: #c16995; }\\n\\n.nav-item-3 {\\n  color: #e4a73A; }\\n\\n.nav-item-4 {\\n  color: #3e99c4; }\\n\\n.nav-item-5 {\\n  color: #543c78; }\\n\\n.nav-item-6 {\\n  color: #267d75; }\\n\\n.main-nav {\\n  max-width: 1900px;\\n  margin: 0 auto;\\n  padding-left: 1rem;\\n  padding-right: 1rem; }\\n\\n.hatch-nav {\\n  margin-top: 2.34rem; }\\n\\n@media screen and (max-width: 768px) {\\n  img.logo {\\n    height: 3rem; } }\\n/*# sourceMappingURL=src/components/Nav.svelte.map */</style>\\n\\n<nav class=\\\"main-nav\\\">\\n  <div class=\\\"nav-mobile flex items-center justify-between\\\">\\n    <div>\\n      <a href=\\\".\\\">\\n        <img class=\\\"logo\\\" src=\\\"/logo.svg\\\" alt=\\\"Hatch Essentials\\\" />\\n      </a>\\n    </div>\\n    <svg\\n      class=\\\"fill-current\\\"\\n      xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n      viewBox=\\\"0 0 24 24\\\">\\n      <path d=\\\"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z\\\" />\\n    </svg>\\n  </div> \\n  <div class=\\\"nav-pc flex items-center justify-between\\\">\\n    <div class=\\\"flex items-center\\\">\\n      <a href=\\\".\\\">\\n        <img class=\\\"logo\\\" src=\\\"/logo.svg\\\" alt=\\\"Hatch Eessentials\\\"/>\\n      </a>\\n    </div>\\n    <div>\\n      <ul class=\\\"flex hatch-nav\\\">\\n        <li>\\n          <a href=\\\".\\\"  aria-current={segment === undefined ? 'page' : undefined}>Home\\n          {#if segment === undefined}\\n                <svg class=\\\"fill-current nav-item nav-item-1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                  <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                </svg>\\n            {:else}\\n                <svg class=\\\"fill-current nav-item nav-item-1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n              </svg>\\n            {/if}\\n            </a>\\n        </li>\\n        <li>\\n          <a\\n            aria-current={segment === 'essential-oils-101' ? 'page' : undefined}\\n            href=\\\"/essential-oils-101\\\">\\n            Essential Oils 101\\n          \\n            {#if segment === 'essential-oils-101'}\\n                <svg class=\\\"fill-current nav-item nav-item-2\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                  <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                </svg>\\n            {:else}\\n                <svg class=\\\"fill-current nav-item nav-item-2\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n              </svg>\\n            {/if}\\n            </a>\\n        </li>\\n        <li>\\n          <a aria-current={segment === 'pursue-your-dreams' ? 'page' : undefined} href=\\\"/pursue-your-dreams\\\" >Pursue Your Dreams\\n          {#if segment === 'pursue-your-dreams'}\\n                <svg class=\\\"fill-current nav-item nav-item-3\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                  <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                </svg>\\n            {:else}\\n                <svg class=\\\"fill-current nav-item nav-item-3\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n              </svg>\\n            {/if}\\n            </a>\\n        </li>\\n        <li> \\n          <a aria-current={segment === 'about-hatch' ? 'page' : undefined} href=\\\"/about-hatch\\\" >About Hatch\\n          {#if segment === 'about-hatch'}\\n                <svg class=\\\"fill-current nav-item nav-item-4\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                  <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                </svg>\\n            {:else}\\n                <svg class=\\\"fill-current nav-item nav-item-4\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n              </svg>\\n            {/if}\\n            </a>\\n        </li>\\n        <li>\\n          <a aria-current={segment === 'the-blog' ? 'page' : undefined} href=\\\"/the-blog\\\" >The Blog\\n           {#if segment === 'the-blog'}\\n                <svg class=\\\"fill-current nav-item nav-item-5\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                  <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                </svg>\\n            {:else}\\n                <svg class=\\\"fill-current nav-item nav-item-5\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n              </svg>\\n            {/if}\\n            </a>\\n        </li>\\n        <li>\\n          <a aria-current={segment === 'begin-now' ? 'page' : undefined} href=\\\"/begin-now\\\" >Begin Now\\n            \\n            {#if segment === 'begin-now'}\\n                <svg class=\\\"fill-current nav-item nav-item-6\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                  <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                </svg>\\n            {:else}\\n                <svg class=\\\"fill-current nav-item nav-item-6\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n              </svg>\\n            {/if}\\n          </a>\\n        </li>\\n      </ul>\\n    </div>\\n  </div>\\n</nav>\\n\"],\"names\":[],\"mappings\":\"AAImB,GAAG,8BAAC,CAAC,AACtB,WAAW,CAAE,GAAG,AAAE,CAAC,AAErB,EAAE,8BAAC,CAAC,AACF,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,QAAQ,CAAE,MAAM,AAAE,CAAC,AAErB,EAAE,8BAAC,CAAC,AACF,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,MAAM,AAAE,CAAC,AACrB,iBAAE,CAAC,GAAG,eAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,MAAM,AAAE,CAAC,AAElB,CAAC,YAAY,gBAAC,CAAC,SAAS,eAAC,CAAC,AACxB,OAAO,CAAE,CAAC,AAAE,CAAC,AAEf,CAAC,8BAAC,CAAC,AACD,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,KAAK,AAAE,CAAC,AAEnB,GAAG,8BAAC,CAAC,AACH,gBAAgB,CAAE,OAAO,AAAE,CAAC,AAC5B,kBAAG,CAAC,EAAE,eAAC,CAAC,AACN,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,AAAE,CAAC,AAExB,WAAW,8BAAC,CAAC,AACX,MAAM,CAAE,IAAI,AAAE,CAAC,AACf,0BAAW,CAAC,GAAG,eAAC,CAAC,AACf,MAAM,CAAE,MAAM,AAAE,CAAC,AACnB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,WAAW,8BAAC,CAAC,AACX,OAAO,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAExB,OAAO,8BAAC,CAAC,AACP,MAAM,CAAE,IAAI,AACU,CAAC,AACvB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,OAAO,8BAAC,CAAC,AACP,OAAO,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAExB,SAAS,8BAAC,CAAC,AACT,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,KAAK,CAAC,GAAG,CACrB,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,QAAQ,AAAE,CAAC,AAChB,uCAAS,OAAO,AAAC,CAAC,AAChB,OAAO,CAAE,CAAC,AAAE,CAAC,AAEjB,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,OAAO,AAAE,CAAC,AAEnB,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,OAAO,AAAE,CAAC,AAEnB,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,OAAO,AAAE,CAAC,AAEnB,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,OAAO,AAAE,CAAC,AAEnB,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,OAAO,AAAE,CAAC,AAEnB,WAAW,8BAAC,CAAC,AACX,KAAK,CAAE,OAAO,AAAE,CAAC,AAEnB,SAAS,8BAAC,CAAC,AACT,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,UAAU,8BAAC,CAAC,AACV,UAAU,CAAE,OAAO,AAAE,CAAC,AAExB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,GAAG,KAAK,8BAAC,CAAC,AACR,MAAM,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$5);

	return `<nav class="${"main-nav svelte-1eysgpn"}"><div class="${"nav-mobile flex items-center justify-between svelte-1eysgpn"}"><div><a href="${"."}" class="${"svelte-1eysgpn"}"><img class="${"logo svelte-1eysgpn"}" src="${"/logo.svg"}" alt="${"Hatch Essentials"}"></a></div>
    <svg class="${"fill-current svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"}"></path></svg></div> 
  <div class="${"nav-pc flex items-center justify-between svelte-1eysgpn"}"><div class="${"flex items-center"}"><a href="${"."}" class="${"svelte-1eysgpn"}"><img class="${"logo svelte-1eysgpn"}" src="${"/logo.svg"}" alt="${"Hatch Eessentials"}"></a></div>
    <div><ul class="${"flex hatch-nav svelte-1eysgpn"}"><li class="${"svelte-1eysgpn"}"><a href="${"."}"${add_attribute("aria-current", segment === undefined ? "page" : undefined, 0)} class="${"svelte-1eysgpn"}">Home
          ${segment === undefined
	? `<svg class="${"fill-current nav-item nav-item-1 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-1 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
        <li class="${"svelte-1eysgpn"}"><a${add_attribute("aria-current", segment === "essential-oils-101" ? "page" : undefined, 0)} href="${"/essential-oils-101"}" class="${"svelte-1eysgpn"}">Essential Oils 101
          
            ${segment === "essential-oils-101"
	? `<svg class="${"fill-current nav-item nav-item-2 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-2 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
        <li class="${"svelte-1eysgpn"}"><a${add_attribute("aria-current", segment === "pursue-your-dreams" ? "page" : undefined, 0)} href="${"/pursue-your-dreams"}" class="${"svelte-1eysgpn"}">Pursue Your Dreams
          ${segment === "pursue-your-dreams"
	? `<svg class="${"fill-current nav-item nav-item-3 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-3 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
        <li class="${"svelte-1eysgpn"}"><a${add_attribute("aria-current", segment === "about-hatch" ? "page" : undefined, 0)} href="${"/about-hatch"}" class="${"svelte-1eysgpn"}">About Hatch
          ${segment === "about-hatch"
	? `<svg class="${"fill-current nav-item nav-item-4 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-4 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
        <li class="${"svelte-1eysgpn"}"><a${add_attribute("aria-current", segment === "the-blog" ? "page" : undefined, 0)} href="${"/the-blog"}" class="${"svelte-1eysgpn"}">The Blog
           ${segment === "the-blog"
	? `<svg class="${"fill-current nav-item nav-item-5 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-5 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
        <li class="${"svelte-1eysgpn"}"><a${add_attribute("aria-current", segment === "begin-now" ? "page" : undefined, 0)} href="${"/begin-now"}" class="${"svelte-1eysgpn"}">Begin Now
            
            ${segment === "begin-now"
	? `<svg class="${"fill-current nav-item nav-item-6 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-6 svelte-1eysgpn"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li></ul></div></div></nav>`;
});

/* src/components/Footer.svelte generated by Svelte v3.22.3 */

const Footer = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<footer><div class="${"text-center"}"><p style="${"text-align:center;white-space:pre-wrap;"}" class="${""}">© 2020 Hatch Essentials • Young Living Independent Distributor
    </p></div></footer>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.22.3 */

const css$6 = {
	code: "@import url(\"https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap\");@font-face{font-family:PlayFairBold;src:url(\"/fonts/PlayfairDisplay-Bold.ttf\")}html{font-size:10px}@media screen and (min-width: 900px){html{font-size:18px}}@media screen and (min-width: 1200px){html{font-size:20px}}body{background-color:#f5f5f5;-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-family:'Montserrat', sans-serif;font-weight:400;font-style:normal;font-size:1.8rem;text-transform:none;color:#959595}p{font-family:'Montserrat', sans-serif;font-weight:light;font-weight:400;font-size:18px;font-style:normal;padding:1rem;color:#959595}h1,h2{line-height:1em;padding:1rem}h1{font-size:60px;font-family:'PlayFairBold', serif;color:#ac335e;font-style:normal;letter-spacing:0.04em}@media only screen and (max-width: 640px){h1{font-size:42px;letter-spacing:.05em;line-height:1.2em}}h2{color:#ac335e;white-space:pre-wrap;font-family:'PlayFairBold', serif;font-weight:bold;font-style:normal;font-size:40px;max-width:60%}@media screen and (max-width: 640px){h2{font-size:30px}}h3{color:#c16995;white-space:pre-wrap;max-width:60%;font-family:'Montserrat', sans-serif;font-weight:300;font-size:25px}@media screen and (max-width: 640px){h3{font-size:20px}}.module{font-size:1.1rem}.hatch-content{display:flex;justify-content:center;align-items:center;padding:1rem}.hatch-content h1{position:relative}.hatch-content h1:after{content:\"\";border-bottom:3px solid #3e99c4;position:absolute;bottom:0;height:1rem;width:2rem;left:1rem}.he-row *:not(h1):not(h2):not(h3){word-wrap:break-word}.spacer{height:5rem}@media screen and (max-width: 640px){.he-row .container{padding-top:17px !important;padding-left:17px;padding-right:17px}}*{box-sizing:border-box}html,body{margin:0;padding:0}.hatch-left-image-big img{position:relative;z-index:9;height:100%;width:100%}.hatch-right-image-big img{position:relative;z-index:9;height:100%;width:100%}.hatch-left-image-big{position:relative;padding:3rem 0rem 3rem 3rem}.hatch-left-image-big:after{content:'';position:absolute;right:20px;top:35px;height:92%;width:95%;background-color:#96bdf2;z-index:1}.hatch-right-image-big{position:relative;padding:3rem 3rem 3rem 0rem}.hatch-right-image-big:after{content:'';position:absolute;left:20px;top:35px;height:92%;width:95%;background-color:#d9a7c0;z-index:1}.featured-items{height:3rem;display:grid;grid-template-columns:repeat(4, 1fr);grid-gap:1rem;position:relative;height:100%}@media screen and (max-width: 425px){.featured-items{grid-template-columns:repeat(2, 1fr)}}.hatch-btn{padding:1rem;display:flex}.hatch-btn button{border:1px solid #efc881;border-radius:9px;padding:0.5rem 1rem;font-size:0.7rem;color:#efc881;transition:all 300ms}.hatch-btn button:hover{background-color:#e4a73a;border:1px solid #e4a73a;color:#fff}@media screen and (max-width: 1024px){.hatch-btn{justify-content:center}.hatch-btn button{font-size:1rem}}@media screen and (max-width: 768px){.hatch-btn button{font-size:2rem}}.featured-item h1{font-size:1rem}.hatch-link{transition:all 300ms;cursor:pointer}.hatch-link h1{color:#efc881}.hatch-link:hover h1{color:#e4a73a}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n  import Nav from \\\"../components/Nav.svelte\\\";\\n  import Footer from \\\"../components/Footer.svelte\\\";\\n\\n  export let segment;\\n</script>\\n\\n<style lang=\\\"scss\\\" global>@import url(\\\"https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap\\\");\\n@font-face {\\n  font-family: PlayFairBold;\\n  src: url(\\\"/fonts/PlayfairDisplay-Bold.ttf\\\"); }\\n\\n:global(html) {\\n  font-size: 10px; }\\n  @media screen and (min-width: 900px) {\\n    :global(html) {\\n      font-size: 18px; } }\\n  @media screen and (min-width: 1200px) {\\n    :global(html) {\\n      font-size: 20px; } }\\n\\n:global(body) {\\n  background-color: #f5f5f5;\\n  -webkit-font-smoothing: subpixel-antialiased;\\n  -moz-osx-font-smoothing: auto;\\n  font-family: 'Montserrat', sans-serif;\\n  font-weight: 400;\\n  font-style: normal;\\n  font-size: 1.8rem;\\n  text-transform: none;\\n  color: #959595; }\\n\\n:global(p) {\\n  font-family: 'Montserrat', sans-serif;\\n  font-weight: light;\\n  font-weight: 400;\\n  font-size: 18px;\\n  font-style: normal;\\n  padding: 1rem;\\n  color: #959595; }\\n\\n:global(h1), :global(h2) {\\n  line-height: 1em;\\n  padding: 1rem; }\\n\\n:global(h1) {\\n  font-size: 60px;\\n  font-family: 'PlayFairBold', serif;\\n  color: #ac335e;\\n  font-style: normal;\\n  letter-spacing: 0.04em; }\\n  @media only screen and (max-width: 640px) {\\n    :global(h1) {\\n      font-size: 42px;\\n      letter-spacing: .05em;\\n      line-height: 1.2em; } }\\n\\n:global(h2) {\\n  color: #ac335e;\\n  white-space: pre-wrap;\\n  font-family: 'PlayFairBold', serif;\\n  font-weight: bold;\\n  font-style: normal;\\n  font-size: 40px;\\n  max-width: 60%; }\\n  @media screen and (max-width: 640px) {\\n    :global(h2) {\\n      font-size: 30px; } }\\n\\n:global(h3) {\\n  color: #c16995;\\n  white-space: pre-wrap;\\n  max-width: 60%;\\n  font-family: 'Montserrat', sans-serif;\\n  font-weight: 300;\\n  font-size: 25px; }\\n  @media screen and (max-width: 640px) {\\n    :global(h3) {\\n      font-size: 20px; } }\\n\\n:global(.module) {\\n  font-size: 1.1rem; }\\n\\n:global(.hatch-content) {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  padding: 1rem; }\\n  :global(.hatch-content) :global(h1) {\\n    position: relative; }\\n    :global(.hatch-content) :global(h1:after) {\\n      content: \\\"\\\";\\n      border-bottom: 3px solid #3e99c4;\\n      position: absolute;\\n      bottom: 0;\\n      height: 1rem;\\n      width: 2rem;\\n      left: 1rem; }\\n\\n:global(.he-row) :global(*:not(h1):not(h2):not(h3)) {\\n  word-wrap: break-word; }\\n\\n:global(.spacer) {\\n  height: 5rem; }\\n\\n@media screen and (max-width: 640px) {\\n  :global(.he-row) :global(.container) {\\n    padding-top: 17px !important;\\n    padding-left: 17px;\\n    padding-right: 17px; } }\\n\\n:global(*) {\\n  box-sizing: border-box; }\\n\\n:global(html), :global(body) {\\n  margin: 0;\\n  padding: 0; }\\n\\n:global(.hatch-left-image-big) :global(img) {\\n  position: relative;\\n  z-index: 9;\\n  height: 100%;\\n  width: 100%; }\\n\\n:global(.hatch-right-image-big) :global(img) {\\n  position: relative;\\n  z-index: 9;\\n  height: 100%;\\n  width: 100%; }\\n\\n:global(.hatch-left-image-big) {\\n  position: relative;\\n  padding: 3rem 0rem 3rem 3rem; }\\n  :global(.hatch-left-image-big:after) {\\n    content: '';\\n    position: absolute;\\n    right: 20px;\\n    top: 35px;\\n    height: 92%;\\n    width: 95%;\\n    background-color: #96bdf2;\\n    z-index: 1; }\\n\\n:global(.hatch-right-image-big) {\\n  position: relative;\\n  padding: 3rem 3rem 3rem 0rem; }\\n  :global(.hatch-right-image-big:after) {\\n    content: '';\\n    position: absolute;\\n    left: 20px;\\n    top: 35px;\\n    height: 92%;\\n    width: 95%;\\n    background-color: #d9a7c0;\\n    z-index: 1; }\\n\\n:global(.featured-items) {\\n  height: 3rem;\\n  display: grid;\\n  grid-template-columns: repeat(4, 1fr);\\n  grid-gap: 1rem;\\n  position: relative;\\n  height: 100%; }\\n  @media screen and (max-width: 425px) {\\n    :global(.featured-items) {\\n      grid-template-columns: repeat(2, 1fr); } }\\n\\n:global(.hatch-btn) {\\n  padding: 1rem;\\n  display: flex; }\\n  :global(.hatch-btn) :global(button) {\\n    border: 1px solid #efc881;\\n    border-radius: 9px;\\n    padding: 0.5rem 1rem;\\n    font-size: 0.7rem;\\n    color: #efc881;\\n    transition: all 300ms; }\\n    :global(.hatch-btn) :global(button:hover) {\\n      background-color: #e4a73a;\\n      border: 1px solid #e4a73a;\\n      color: #fff; }\\n  @media screen and (max-width: 1024px) {\\n    :global(.hatch-btn) {\\n      justify-content: center; }\\n      :global(.hatch-btn) :global(button) {\\n        font-size: 1rem; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.hatch-btn) :global(button) {\\n      font-size: 2rem; } }\\n\\n:global(.featured-item) :global(h1) {\\n  font-size: 1rem; }\\n\\n:global(.hatch-link) {\\n  transition: all 300ms;\\n  cursor: pointer; }\\n  :global(.hatch-link) :global(h1) {\\n    color: #efc881; }\\n  :global(.hatch-link:hover) :global(h1) {\\n    color: #e4a73a; }\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvX2xheW91dC5zdmVsdGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNEZBQTRGO0FBQzVGO0VBQ0UseUJBQXlCO0VBQ3pCLDJDQUEyQyxFQUFFOztBQUUvQztFQUNFLGVBQWUsRUFBRTtFQUNqQjtJQUNFO01BQ0UsZUFBZSxFQUFFLEVBQUU7RUFDdkI7SUFDRTtNQUNFLGVBQWUsRUFBRSxFQUFFOztBQUV6QjtFQUNFLHlCQUF5QjtFQUN6Qiw0Q0FBNEM7RUFDNUMsNkJBQTZCO0VBQzdCLHFDQUFxQztFQUNyQyxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsY0FBYyxFQUFFOztBQUVsQjtFQUNFLHFDQUFxQztFQUNyQyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGNBQWMsRUFBRTs7QUFFbEI7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWU7RUFDZixrQ0FBa0M7RUFDbEMsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixzQkFBc0IsRUFBRTtFQUN4QjtJQUNFO01BQ0UsZUFBZTtNQUNmLHFCQUFxQjtNQUNyQixrQkFBa0IsRUFBRSxFQUFFOztBQUU1QjtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7RUFDckIsa0NBQWtDO0VBQ2xDLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWMsRUFBRTtFQUNoQjtJQUNFO01BQ0UsZUFBZSxFQUFFLEVBQUU7O0FBRXpCO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixjQUFjO0VBQ2QscUNBQXFDO0VBQ3JDLGdCQUFnQjtFQUNoQixlQUFlLEVBQUU7RUFDakI7SUFDRTtNQUNFLGVBQWUsRUFBRSxFQUFFOztBQUV6QjtFQUNFLGlCQUFpQixFQUFFOztBQUVyQjtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGFBQWEsRUFBRTtFQUNmO0lBQ0Usa0JBQWtCLEVBQUU7SUFDcEI7TUFDRSxXQUFXO01BQ1gsZ0NBQWdDO01BQ2hDLGtCQUFrQjtNQUNsQixTQUFTO01BQ1QsWUFBWTtNQUNaLFdBQVc7TUFDWCxVQUFVLEVBQUU7O0FBRWxCO0VBQ0UscUJBQXFCLEVBQUU7O0FBRXpCO0VBQ0UsWUFBWSxFQUFFOztBQUVoQjtFQUNFO0lBQ0UsNEJBQTRCO0lBQzVCLGtCQUFrQjtJQUNsQixtQkFBbUIsRUFBRSxFQUFFOztBQUUzQjtFQUNFLHNCQUFzQixFQUFFOztBQUUxQjtFQUNFLFNBQVM7RUFDVCxVQUFVLEVBQUU7O0FBRWQ7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFlBQVk7RUFDWixXQUFXLEVBQUU7O0FBRWY7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFlBQVk7RUFDWixXQUFXLEVBQUU7O0FBRWY7RUFDRSxrQkFBa0I7RUFDbEIsNEJBQTRCLEVBQUU7RUFDOUI7SUFDRSxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxTQUFTO0lBQ1QsV0FBVztJQUNYLFVBQVU7SUFDVix5QkFBeUI7SUFDekIsVUFBVSxFQUFFOztBQUVoQjtFQUNFLGtCQUFrQjtFQUNsQiw0QkFBNEIsRUFBRTtFQUM5QjtJQUNFLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFNBQVM7SUFDVCxXQUFXO0lBQ1gsVUFBVTtJQUNWLHlCQUF5QjtJQUN6QixVQUFVLEVBQUU7O0FBRWhCO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixxQ0FBcUM7RUFDckMsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixZQUFZLEVBQUU7RUFDZDtJQUNFO01BQ0UscUNBQXFDLEVBQUUsRUFBRTs7QUFFL0M7RUFDRSxhQUFhO0VBQ2IsYUFBYSxFQUFFO0VBQ2Y7SUFDRSx5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLG9CQUFvQjtJQUNwQixpQkFBaUI7SUFDakIsY0FBYztJQUNkLHFCQUFxQixFQUFFO0lBQ3ZCO01BQ0UseUJBQXlCO01BQ3pCLHlCQUF5QjtNQUN6QixXQUFXLEVBQUU7RUFDakI7SUFDRTtNQUNFLHVCQUF1QixFQUFFO01BQ3pCO1FBQ0UsZUFBZSxFQUFFLEVBQUU7RUFDekI7SUFDRTtNQUNFLGVBQWUsRUFBRSxFQUFFOztBQUV6QjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSxxQkFBcUI7RUFDckIsZUFBZSxFQUFFO0VBQ2pCO0lBQ0UsY0FBYyxFQUFFO0VBQ2xCO0lBQ0UsY0FBYyxFQUFFIiwiZmlsZSI6InNyYy9yb3V0ZXMvX2xheW91dC5zdmVsdGUiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IHVybChcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TW9udHNlcnJhdDp3Z2h0QDMwMDs0MDAmZGlzcGxheT1zd2FwXCIpO1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBQbGF5RmFpckJvbGQ7XG4gIHNyYzogdXJsKFwiL2ZvbnRzL1BsYXlmYWlyRGlzcGxheS1Cb2xkLnR0ZlwiKTsgfVxuXG5odG1sIHtcbiAgZm9udC1zaXplOiAxMHB4OyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDkwMHB4KSB7XG4gICAgaHRtbCB7XG4gICAgICBmb250LXNpemU6IDE4cHg7IH0gfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMjAwcHgpIHtcbiAgICBodG1sIHtcbiAgICAgIGZvbnQtc2l6ZTogMjBweDsgfSB9XG5cbmJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBzdWJwaXhlbC1hbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGF1dG87XG4gIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCcsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAxLjhyZW07XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBjb2xvcjogIzk1OTU5NTsgfVxuXG5wIHtcbiAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0Jywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IGxpZ2h0O1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgcGFkZGluZzogMXJlbTtcbiAgY29sb3I6ICM5NTk1OTU7IH1cblxuaDEsIGgyIHtcbiAgbGluZS1oZWlnaHQ6IDFlbTtcbiAgcGFkZGluZzogMXJlbTsgfVxuXG5oMSB7XG4gIGZvbnQtc2l6ZTogNjBweDtcbiAgZm9udC1mYW1pbHk6ICdQbGF5RmFpckJvbGQnLCBzZXJpZjtcbiAgY29sb3I6ICNhYzMzNWU7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTsgfVxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiA0MnB4O1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IC4wNWVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMmVtOyB9IH1cblxuaDIge1xuICBjb2xvcjogI2FjMzM1ZTtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICBmb250LWZhbWlseTogJ1BsYXlGYWlyQm9sZCcsIHNlcmlmO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDQwcHg7XG4gIG1heC13aWR0aDogNjAlOyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgaDIge1xuICAgICAgZm9udC1zaXplOiAzMHB4OyB9IH1cblxuaDMge1xuICBjb2xvcjogI2MxNjk5NTtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICBtYXgtd2lkdGg6IDYwJTtcbiAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0Jywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgZm9udC1zaXplOiAyNXB4OyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgaDMge1xuICAgICAgZm9udC1zaXplOiAyMHB4OyB9IH1cblxuLm1vZHVsZSB7XG4gIGZvbnQtc2l6ZTogMS4xcmVtOyB9XG5cbi5oYXRjaC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDFyZW07IH1cbiAgLmhhdGNoLWNvbnRlbnQgaDEge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuICAgIC5oYXRjaC1jb250ZW50IGgxOmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNlOTljNDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGhlaWdodDogMXJlbTtcbiAgICAgIHdpZHRoOiAycmVtO1xuICAgICAgbGVmdDogMXJlbTsgfVxuXG4uaGUtcm93ICo6bm90KGgxKTpub3QoaDIpOm5vdChoMykge1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7IH1cblxuLnNwYWNlciB7XG4gIGhlaWdodDogNXJlbTsgfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NDBweCkge1xuICAuaGUtcm93IC5jb250YWluZXIge1xuICAgIHBhZGRpbmctdG9wOiAxN3B4ICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZy1sZWZ0OiAxN3B4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDE3cHg7IH0gfVxuXG4qIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxuXG5odG1sLCBib2R5IHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwOyB9XG5cbi5oYXRjaC1sZWZ0LWltYWdlLWJpZyBpbWcge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDk7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7IH1cblxuLmhhdGNoLXJpZ2h0LWltYWdlLWJpZyBpbWcge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDk7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7IH1cblxuLmhhdGNoLWxlZnQtaW1hZ2UtYmlnIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAzcmVtIDByZW0gM3JlbSAzcmVtOyB9XG4gIC5oYXRjaC1sZWZ0LWltYWdlLWJpZzphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAyMHB4O1xuICAgIHRvcDogMzVweDtcbiAgICBoZWlnaHQ6IDkyJTtcbiAgICB3aWR0aDogOTUlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM5NmJkZjI7XG4gICAgei1pbmRleDogMTsgfVxuXG4uaGF0Y2gtcmlnaHQtaW1hZ2UtYmlnIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAzcmVtIDNyZW0gM3JlbSAwcmVtOyB9XG4gIC5oYXRjaC1yaWdodC1pbWFnZS1iaWc6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAyMHB4O1xuICAgIHRvcDogMzVweDtcbiAgICBoZWlnaHQ6IDkyJTtcbiAgICB3aWR0aDogOTUlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkOWE3YzA7XG4gICAgei1pbmRleDogMTsgfVxuXG4uZmVhdHVyZWQtaXRlbXMge1xuICBoZWlnaHQ6IDNyZW07XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XG4gIGdyaWQtZ2FwOiAxcmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMTAwJTsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAgIC5mZWF0dXJlZC1pdGVtcyB7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpOyB9IH1cblxuLmhhdGNoLWJ0biB7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7IH1cbiAgLmhhdGNoLWJ0biBidXR0b24ge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZmM4ODE7XG4gICAgYm9yZGVyLXJhZGl1czogOXB4O1xuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xuICAgIGZvbnQtc2l6ZTogMC43cmVtO1xuICAgIGNvbG9yOiAjZWZjODgxO1xuICAgIHRyYW5zaXRpb246IGFsbCAzMDBtczsgfVxuICAgIC5oYXRjaC1idG4gYnV0dG9uOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlNGE3M2E7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTRhNzNhO1xuICAgICAgY29sb3I6ICNmZmY7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgLmhhdGNoLWJ0biB7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxuICAgICAgLmhhdGNoLWJ0biBidXR0b24ge1xuICAgICAgICBmb250LXNpemU6IDFyZW07IH0gfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgIC5oYXRjaC1idG4gYnV0dG9uIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTsgfSB9XG5cbi5mZWF0dXJlZC1pdGVtIGgxIHtcbiAgZm9udC1zaXplOiAxcmVtOyB9XG5cbi5oYXRjaC1saW5rIHtcbiAgdHJhbnNpdGlvbjogYWxsIDMwMG1zO1xuICBjdXJzb3I6IHBvaW50ZXI7IH1cbiAgLmhhdGNoLWxpbmsgaDEge1xuICAgIGNvbG9yOiAjZWZjODgxOyB9XG4gIC5oYXRjaC1saW5rOmhvdmVyIGgxIHtcbiAgICBjb2xvcjogI2U0YTczYTsgfVxuLyojIHNvdXJjZU1hcHBpbmdVUkw9c3JjL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZS5tYXAgKi8iXX0= */</style>\\n\\n<Nav {segment} />\\n\\n<main>\\n  <slot></slot>\\n</main>\\n\\n<Footer />\\n\"],\"names\":[],\"mappings\":\"AAO0B,QAAQ,IAAI,+EAA+E,CAAC,CAAC,AACvH,UAAU,AAAC,CAAC,AACV,WAAW,CAAE,YAAY,CACzB,GAAG,CAAE,IAAI,iCAAiC,CAAC,AAAE,CAAC,AAExC,IAAI,AAAE,CAAC,AACb,SAAS,CAAE,IAAI,AAAE,CAAC,AAClB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC5B,IAAI,AAAE,CAAC,AACb,SAAS,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AACxB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC7B,IAAI,AAAE,CAAC,AACb,SAAS,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAElB,IAAI,AAAE,CAAC,AACb,gBAAgB,CAAE,OAAO,CACzB,sBAAsB,CAAE,oBAAoB,CAC5C,uBAAuB,CAAE,IAAI,CAC7B,WAAW,CAAE,YAAY,CAAC,CAAC,UAAU,CACrC,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,MAAM,CACjB,cAAc,CAAE,IAAI,CACpB,KAAK,CAAE,OAAO,AAAE,CAAC,AAEX,CAAC,AAAE,CAAC,AACV,WAAW,CAAE,YAAY,CAAC,CAAC,UAAU,CACrC,WAAW,CAAE,KAAK,CAClB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,OAAO,AAAE,CAAC,AAEX,EAAE,AAAC,CAAU,EAAE,AAAE,CAAC,AACxB,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,IAAI,AAAE,CAAC,AAEV,EAAE,AAAE,CAAC,AACX,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,cAAc,CAAC,CAAC,KAAK,CAClC,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,MAAM,CAClB,cAAc,CAAE,MAAM,AAAE,CAAC,AACzB,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACjC,EAAE,AAAE,CAAC,AACX,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,KAAK,CACrB,WAAW,CAAE,KAAK,AAAE,CAAC,AAAC,CAAC,AAErB,EAAE,AAAE,CAAC,AACX,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,QAAQ,CACrB,WAAW,CAAE,cAAc,CAAC,CAAC,KAAK,CAClC,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,SAAS,CAAE,GAAG,AAAE,CAAC,AACjB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC5B,EAAE,AAAE,CAAC,AACX,SAAS,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAElB,EAAE,AAAE,CAAC,AACX,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,QAAQ,CACrB,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,YAAY,CAAC,CAAC,UAAU,CACrC,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,AAAE,CAAC,AAClB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC5B,EAAE,AAAE,CAAC,AACX,SAAS,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAElB,OAAO,AAAE,CAAC,AAChB,SAAS,CAAE,MAAM,AAAE,CAAC,AAEd,cAAc,AAAE,CAAC,AACvB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,AAAE,CAAC,AACR,cAAc,AAAC,CAAC,AAAQ,EAAE,AAAE,CAAC,AACnC,QAAQ,CAAE,QAAQ,AAAE,CAAC,AACb,cAAc,AAAC,CAAC,AAAQ,QAAQ,AAAE,CAAC,AACzC,OAAO,CAAE,EAAE,CACX,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,IAAI,CAAE,IAAI,AAAE,CAAC,AAEX,OAAO,AAAC,CAAC,AAAQ,yBAAyB,AAAE,CAAC,AACnD,SAAS,CAAE,UAAU,AAAE,CAAC,AAElB,OAAO,AAAE,CAAC,AAChB,MAAM,CAAE,IAAI,AAAE,CAAC,AAEjB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC5B,OAAO,AAAC,CAAC,AAAQ,UAAU,AAAE,CAAC,AACpC,WAAW,CAAE,IAAI,CAAC,UAAU,CAC5B,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAEpB,CAAC,AAAE,CAAC,AACV,UAAU,CAAE,UAAU,AAAE,CAAC,AAEnB,IAAI,AAAC,CAAU,IAAI,AAAE,CAAC,AAC5B,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AAAE,CAAC,AAEP,qBAAqB,AAAC,CAAC,AAAQ,GAAG,AAAE,CAAC,AAC3C,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AAAE,CAAC,AAER,sBAAsB,AAAC,CAAC,AAAQ,GAAG,AAAE,CAAC,AAC5C,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AAAE,CAAC,AAER,qBAAqB,AAAE,CAAC,AAC9B,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,AAAE,CAAC,AACvB,2BAA2B,AAAE,CAAC,AACpC,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,IAAI,CACT,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,GAAG,CACV,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,CAAC,AAAE,CAAC,AAET,sBAAsB,AAAE,CAAC,AAC/B,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,AAAE,CAAC,AACvB,4BAA4B,AAAE,CAAC,AACrC,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,IAAI,CACV,GAAG,CAAE,IAAI,CACT,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,GAAG,CACV,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,CAAC,AAAE,CAAC,AAET,eAAe,AAAE,CAAC,AACxB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,QAAQ,CAAE,IAAI,CACd,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,AAAE,CAAC,AACf,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC5B,eAAe,AAAE,CAAC,AACxB,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,AAAE,CAAC,AAAC,CAAC,AAExC,UAAU,AAAE,CAAC,AACnB,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,AAAE,CAAC,AACR,UAAU,AAAC,CAAC,AAAQ,MAAM,AAAE,CAAC,AACnC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,GAAG,CAAC,KAAK,AAAE,CAAC,AAChB,UAAU,AAAC,CAAC,AAAQ,YAAY,AAAE,CAAC,AACzC,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,AAAE,CAAC,AAClB,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC7B,UAAU,AAAE,CAAC,AACnB,eAAe,CAAE,MAAM,AAAE,CAAC,AAClB,UAAU,AAAC,CAAC,AAAQ,MAAM,AAAE,CAAC,AACnC,SAAS,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAC1B,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC5B,UAAU,AAAC,CAAC,AAAQ,MAAM,AAAE,CAAC,AACnC,SAAS,CAAE,IAAI,AAAE,CAAC,AAAC,CAAC,AAElB,cAAc,AAAC,CAAC,AAAQ,EAAE,AAAE,CAAC,AACnC,SAAS,CAAE,IAAI,AAAE,CAAC,AAEZ,WAAW,AAAE,CAAC,AACpB,UAAU,CAAE,GAAG,CAAC,KAAK,CACrB,MAAM,CAAE,OAAO,AAAE,CAAC,AACV,WAAW,AAAC,CAAC,AAAQ,EAAE,AAAE,CAAC,AAChC,KAAK,CAAE,OAAO,AAAE,CAAC,AACX,iBAAiB,AAAC,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtC,KAAK,CAAE,OAAO,AAAE,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$6);

	return `${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}

<main>${$$slots.default ? $$slots.default({}) : ``}</main>

${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});

/* src/routes/_error.svelte generated by Svelte v3.22.3 */

const css$7 = {
	code: "h1.svelte-1xjwv3d,p.svelte-1xjwv3d{margin:0 auto}h1.svelte-1xjwv3d{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-1xjwv3d{margin:1em auto}@media(min-width: 480px){h1.svelte-1xjwv3d{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = undefined === 'development';\\n</script>\\n\\n<style>\\nh1, p {\\n\\tmargin: 0 auto;\\n}\\n\\nh1 {\\n\\tfont-size: 2.8em;\\n\\tfont-weight: 700;\\n\\tmargin: 0 0 0.5em 0;\\n}\\n\\np {\\n\\tmargin: 1em auto;\\n}\\n\\n@media (min-width: 480px) {\\n\\th1 {\\n\\t\\tfont-size: 4em;\\n\\t}\\n}\\n\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7Q0FDQyxnQkFBZ0I7Q0FDaEIsZ0JBQWdCO0NBQ2hCLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDO0VBQ0MsY0FBYztDQUNmO0FBQ0QiLCJmaWxlIjoic3JjL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlIiwic291cmNlc0NvbnRlbnQiOlsiXG5oMSwgcCB7XG5cdG1hcmdpbjogMCBhdXRvO1xufVxuXG5oMSB7XG5cdGZvbnQtc2l6ZTogMi44ZW07XG5cdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdG1hcmdpbjogMCAwIDAuNWVtIDA7XG59XG5cbnAge1xuXHRtYXJnaW46IDFlbSBhdXRvO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcblx0aDEge1xuXHRcdGZvbnQtc2l6ZTogNGVtO1xuXHR9XG59XG4iXX0= */</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQA,iBAAE,CAAE,CAAC,eAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,eAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$7);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-1xjwv3d"}">${escape(status)}</h1>

<p class="${"svelte-1xjwv3d"}">${escape(error.message)}</p>

${ ``}`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog\.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^\/]+?)\.json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes, preload: preload }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: Blog, preload: preload$1 }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: U5Bslugu5D, preload: preload$2, params: match => ({ slug: d(match[1]) }) }
			]
		},

		{
			// [slug].svelte
			pattern: /^\/([^\/]+?)\/?$/,
			parts: [
				{ name: "$slug", file: "[slug].svelte", component: U5Bslugu5D$1, preload: preload$3, params: match => ({ slug: d(match[1]) }) }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.22.3 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  (assets => () => assets)(JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'max-age=600');

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		const session = session_getter(req, res);

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				if (opts) {
					opts = Object.assign({}, opts);

					const include_cookies = (
						opts.credentials === 'include' ||
						opts.credentials === 'same-origin' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
					);

					if (include_cookies) {
						opts.headers = Object.assign({}, opts.headers);

						const cookies = Object.assign(
							{},
							cookie.parse(req.headers.cookie || ''),
							cookie.parse(opts.headers.cookie || '')
						);

						const set_cookie = res.getHeader('Set-Cookie');
						(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
							const match = /([^=]+)=([^;]+)/.exec(str);
							if (match) cookies[match[1]] = match[2];
						});

						const str = Object.keys(cookies)
							.map(key => `${key}=${cookies[key]}`)
							.join('; ');

						opts.headers.cookie = str;
					}
				}

				return fetch(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && try_serialize(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'max-age=31536000, immutable'
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs.readFileSync(path.join(build_dir, file)))).get(file);

	return (req, res, next) => {
		if (filter(req)) {
			const type = lite.getType(req.path);

			try {
				const file = path.posix.normalize(decodeURIComponent(req.path));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});