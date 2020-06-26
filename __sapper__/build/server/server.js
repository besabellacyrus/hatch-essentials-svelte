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
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
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
      title
      head_tags {
        headTags
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

const DynamicBlock = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { content } = $$props;
	let { bgColor } = $$props;
	if ($$props.content === void 0 && $$bindings.content && content !== void 0) $$bindings.content(content);
	if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0) $$bindings.bgColor(bgColor);
	return `<section class="${"he-row"}" style="${"background-color: " + escape(bgColor ? bgColor : "")}">${content}</section>`;
});

/* src/components/TransitionWrapper.svelte generated by Svelte v3.22.3 */

const TransitionWrapper = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let show = true;

	onMount(() => {
		show = false;
	});

	return `${show
	? `<div class="${"loader"}"></div>`
	: `<div>${$$slots.default ? $$slots.default({}) : ``}</div>`}`;
});

/* src/routes/index.svelte generated by Svelte v3.22.3 */
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
	$pages = get_store_value(pages);

	return `${($$result.head += `${cache
	? `${cache.data["hatch_PageBy"]["head_tags"]["headTags"]}`
	: ``}`, "")}

${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `${(function (__value) {
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
		})($pages)}`
	})}`;
});

/* src/routes/essential-oils-101.svelte generated by Svelte v3.22.3 */
let slug$1 = "essential-oils-101";

async function preload$1() {
	return {
		cache: await client.query({ query: PAGE, variables: { slug: slug$1 } })
	};
}

const Essential_oils_101 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $pages;
	let { cache } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);

	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const pages = svelteApollo.query(client, { query: PAGE, variables: { slug: slug$1 } });

	$pages = get_store_value(pages);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	$pages = get_store_value(pages);

	return `${($$result.head += `${cache
	? `${cache.data["hatch_PageBy"]["head_tags"]["headTags"]}`
	: ``}`, "")}

${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `${(function (__value) {
			if (is_promise(__value)) return `
  <div class="${"loader"}"><p>Loading...</p></div>
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
		})($pages)}`
	})}`;
});

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

const subscriber = writable({
	name: "",
	email: "",
	message: ""
});

/* src/components/page_elements/BecomeMember.svelte generated by Svelte v3.22.3 */

const css = {
	code: ".become-a-member-wrapper.svelte-u6unh3.svelte-u6unh3{margin:2rem 0 2rem}.become-a-member.svelte-u6unh3.svelte-u6unh3{display:grid;grid-template-columns:1fr 1fr;grid-gap:1.5rem}@media screen and (max-width: 768px){.become-a-member.svelte-u6unh3.svelte-u6unh3{display:flex;flex-direction:column-reverse;grid-template-columns:initial}}.become-a-member.svelte-u6unh3 .member-forms.svelte-u6unh3{display:flex;align-items:center}@media screen and (max-width: 768px){.become-a-member.svelte-u6unh3 .member-forms.svelte-u6unh3{display:initial;grid-template-columns:initial;height:60rem}}@media screen and (max-width: 768px){.become-a-member.svelte-u6unh3 .member-forms form.svelte-u6unh3{padding:2rem}}.become-a-member.svelte-u6unh3 h3.svelte-u6unh3{padding:0 1rem}.become-a-member.svelte-u6unh3 h2.svelte-u6unh3{max-width:initial}.become-a-member.svelte-u6unh3 form.svelte-u6unh3{display:grid;grid-template-rows:1fr;grid-gap:1rem;width:100%}.become-a-member.svelte-u6unh3 form input.svelte-u6unh3,.become-a-member.svelte-u6unh3 form textarea.svelte-u6unh3{width:100% !important}.become-a-member.svelte-u6unh3 form .upper.svelte-u6unh3{display:grid;grid-gap:1rem}.become-a-member.svelte-u6unh3 form .upper input.svelte-u6unh3{height:4rem}.become-a-member.svelte-u6unh3 form .lower.svelte-u6unh3{display:grid;grid-gap:1rem;justify-items:right}.become-a-member.svelte-u6unh3 form .lower textarea.svelte-u6unh3{width:100%}.become-a-member.svelte-u6unh3 form button.svelte-u6unh3:hover{color:#5d5d5d}.become-a-member.svelte-u6unh3 .become-a-member-content.svelte-u6unh3{display:flex;justify-content:center;align-items:center}@media screen and (max-width: 768px){.become-a-member.svelte-u6unh3 .become-a-member-content.svelte-u6unh3{text-align:center}.become-a-member.svelte-u6unh3 .become-a-member-content h3.svelte-u6unh3{margin:0 auto}}.become-a-member.svelte-u6unh3 .become-a-member-content h2.svelte-u6unh3{white-space:initial;line-height:1.3;padding:0 1rem 1rem}.become-a-member.svelte-u6unh3 .become-a-member-content p.svelte-u6unh3{padding:0 1rem 1rem}.become-a-member.svelte-u6unh3 input.svelte-u6unh3,.become-a-member.svelte-u6unh3 textarea.svelte-u6unh3{border:1px solid #959595 !important;padding-left:1rem}.become-a-member.svelte-u6unh3 textarea.svelte-u6unh3{padding-top:0.5rem}.become-a-member.svelte-u6unh3 .svelte-u6unh3::-webkit-input-placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-u6unh3 .svelte-u6unh3::-moz-placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-u6unh3 .svelte-u6unh3:-ms-input-placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-u6unh3 .svelte-u6unh3::-ms-input-placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-u6unh3 .svelte-u6unh3::placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-u6unh3 .svelte-u6unh3:-ms-input-placeholder{color:#959595 !important}.become-a-member.svelte-u6unh3 .svelte-u6unh3::-ms-input-placeholder{color:#959595 !important}",
	map: "{\"version\":3,\"file\":\"BecomeMember.svelte\",\"sources\":[\"BecomeMember.svelte\"],\"sourcesContent\":[\"<script>\\n  import { subscriber } from \\\"../../store/member.js\\\"\\n  let sent = false;\\n  \\n  async function handleSubmit (event) {\\n    if (!sent) {\\n      let formData = new FormData();\\n      formData.append(\\\"your-name\\\", event.target.name.value);\\n      formData.append(\\\"your-email\\\", event.target.location.value);\\n      formData.append(\\\"your-message\\\", event.target.message.value);\\n      \\n      const res = await fetch('http://hatchessentials.com/wp-api/wp-json/contact-form-7/v1/contact-forms/89/feedback', {\\n        method: 'POST', \\n        body: formData\\n      }).then(e => {\\n        if (e.statusText === 'OK') {\\n          sent = true;\\n          $subscriber.name = '';\\n          $subscriber.email = '';\\n          $subscriber.message = '';\\n        }\\n      })\\n    }\\n  }\\n</script>\\n\\n<style lang=\\\"scss\\\">.become-a-member-wrapper {\\n  margin: 2rem 0 2rem; }\\n\\n.become-a-member {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr;\\n  grid-gap: 1.5rem; }\\n  @media screen and (max-width: 768px) {\\n    .become-a-member {\\n      display: flex;\\n      flex-direction: column-reverse;\\n      grid-template-columns: initial; } }\\n  .become-a-member .member-forms {\\n    display: flex;\\n    align-items: center; }\\n    @media screen and (max-width: 768px) {\\n      .become-a-member .member-forms {\\n        display: initial;\\n        grid-template-columns: initial;\\n        height: 60rem; } }\\n    @media screen and (max-width: 768px) {\\n      .become-a-member .member-forms form {\\n        padding: 2rem; } }\\n  .become-a-member h3 {\\n    padding: 0 1rem; }\\n  .become-a-member h2 {\\n    max-width: initial; }\\n  .become-a-member form {\\n    display: grid;\\n    grid-template-rows: 1fr;\\n    grid-gap: 1rem;\\n    width: 100%; }\\n    .become-a-member form input, .become-a-member form textarea {\\n      width: 100% !important; }\\n    .become-a-member form .upper {\\n      display: grid;\\n      grid-gap: 1rem; }\\n      .become-a-member form .upper input {\\n        height: 4rem; }\\n    .become-a-member form .lower {\\n      display: grid;\\n      grid-gap: 1rem;\\n      justify-items: right; }\\n      .become-a-member form .lower textarea {\\n        width: 100%; }\\n    .become-a-member form button:hover {\\n      color: #5d5d5d; }\\n  .become-a-member .become-a-member-content {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    /*height: 26rem;*/ }\\n    @media screen and (max-width: 768px) {\\n      .become-a-member .become-a-member-content {\\n        text-align: center; }\\n        .become-a-member .become-a-member-content h3 {\\n          margin: 0 auto; } }\\n    .become-a-member .become-a-member-content h2 {\\n      white-space: initial;\\n      line-height: 1.3;\\n      padding: 0 1rem 1rem; }\\n    .become-a-member .become-a-member-content p {\\n      padding: 0 1rem 1rem; }\\n  .become-a-member input, .become-a-member textarea {\\n    /*color: #959595 !important;*/\\n    border: 1px solid #959595 !important;\\n    padding-left: 1rem; }\\n  .become-a-member textarea {\\n    /*color: #959595 !important;*/\\n    padding-top: 0.5rem; }\\n  .become-a-member ::-webkit-input-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member ::-moz-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member :-ms-input-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member ::-ms-input-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member ::placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member :-ms-input-placeholder {\\n    /* Internet Explorer 10-11 */\\n    color: #959595 !important; }\\n  .become-a-member ::-ms-input-placeholder {\\n    /* Microsoft Edge */\\n    color: #959595 !important; }\\n/*# sourceMappingURL=src/components/page_elements/BecomeMember.svelte.map */</style>\\n\\n<div class=\\\"become-a-member-wrapper\\\">\\n\\t<div class=\\\"container mx-auto\\\">\\n\\t\\t<div class=\\\"become-a-member\\\">\\n\\t\\t\\t<div class=\\\"member-forms\\\">\\n\\t\\t\\t\\t<form on:submit|preventDefault=\\\"{handleSubmit}\\\">\\n\\t\\t\\t\\t\\t<div class=\\\"upper\\\">\\n\\t\\t\\t\\t\\t\\t<input type=\\\"text\\\" id=\\\"name\\\" bind:value={$subscriber.name}  placeholder=\\\"Your Name Here\\\">\\n\\t\\t\\t\\t\\t\\t<input type=\\\"email\\\" id=\\\"email\\\" bind:value={$subscriber.email}  placeholder=\\\"Your Email Here\\\">\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div class=\\\"lower\\\">\\n\\t\\t\\t\\t\\t\\t<textarea name=\\\"\\\" id=\\\"message\\\" cols=\\\"30\\\" rows=\\\"10\\\" bind:value={$subscriber.message}  placeholder=\\\"Message\\\"></textarea>\\n\\t\\t\\t\\t\\t\\t<button><em>Submit</em></button>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</form>\\n        {#if sent}\\n          <p>Thank you!</p>\\n        {/if}\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\\"become-a-member-content\\\">\\n\\t\\t\\t\\t<div>\\n\\t\\t\\t\\t\\t<h3>I WANT TO DO THIS NOW</h3>\\n\\t\\t\\t\\t\\t<h2>BECOME A MEMBER <br/> OF HATCH ESSENTIALS</h2>\\n\\t\\t\\t\\t\\t <ul>\\n\\t\\t\\t\\t\\t \\t<li>\\n\\t\\t\\t\\t\\t \\t\\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p>\\n\\t\\t\\t\\t\\t \\t</li>\\n\\t\\t\\t\\t\\t \\t<li>\\n\\t\\t\\t\\t\\t \\t\\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p>\\n\\t\\t\\t\\t\\t \\t</li>\\n\\t\\t\\t\\t\\t \\t<li>\\n\\t\\t\\t\\t\\t \\t\\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p>\\n\\t\\t\\t\\t\\t \\t</li>\\n\\t\\t\\t\\t\\t \\t<li>\\n\\t\\t\\t\\t\\t \\t\\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p>\\n\\t\\t\\t\\t\\t \\t</li>\\n\\t\\t\\t\\t\\t </ul>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\"],\"names\":[],\"mappings\":\"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\"}"
};

const BecomeMember = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $subscriber = get_store_value(subscriber);

	$$result.css.add(css);

	return `<div class="${"become-a-member-wrapper svelte-u6unh3"}"><div class="${"container mx-auto"}"><div class="${"become-a-member svelte-u6unh3"}"><div class="${"member-forms svelte-u6unh3"}"><form class="${"svelte-u6unh3"}"><div class="${"upper svelte-u6unh3"}"><input type="${"text"}" id="${"name"}" placeholder="${"Your Name Here"}" class="${"svelte-u6unh3"}"${add_attribute("value", $subscriber.name, 1)}>
						<input type="${"email"}" id="${"email"}" placeholder="${"Your Email Here"}" class="${"svelte-u6unh3"}"${add_attribute("value", $subscriber.email, 1)}></div>
					<div class="${"lower svelte-u6unh3"}"><textarea name="${""}" id="${"message"}" cols="${"30"}" rows="${"10"}" placeholder="${"Message"}" class="${"svelte-u6unh3"}">${$subscriber.message || ""}</textarea>
						<button class="${"svelte-u6unh3"}"><em class="${"svelte-u6unh3"}">Submit</em></button></div></form>
        ${ ``}</div>
			<div class="${"become-a-member-content svelte-u6unh3"}"><div class="${"svelte-u6unh3"}"><h3 class="${"svelte-u6unh3"}">I WANT TO DO THIS NOW</h3>
					<h2 class="${"svelte-u6unh3"}">BECOME A MEMBER <br class="${"svelte-u6unh3"}"> OF HATCH ESSENTIALS</h2>
					 <ul class="${"svelte-u6unh3"}"><li class="${"svelte-u6unh3"}"><p class="${"svelte-u6unh3"}">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p></li>
					 	<li class="${"svelte-u6unh3"}"><p class="${"svelte-u6unh3"}">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p></li>
					 	<li class="${"svelte-u6unh3"}"><p class="${"svelte-u6unh3"}">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p></li>
					 	<li class="${"svelte-u6unh3"}"><p class="${"svelte-u6unh3"}">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus sequi hic quae dolores magnam iusto rerum rem maiores reprehenderit tempora. Debitis, natus, doloremque.</p></li></ul></div></div></div></div></div>`;
});

/* src/routes/pursue-your-dreams.svelte generated by Svelte v3.22.3 */
let slug$2 = "pursue-your-dreams";

async function preload$2() {
	return {
		cache: await client.query({ query: PAGE, variables: { slug: slug$2 } }),
		slug: slug$2
	};
}

const Pursue_your_dreams = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $pages;
	let { cache } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);

	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const pages = svelteApollo.query(client, { query: PAGE, variables: { slug: slug$2 } });

	$pages = get_store_value(pages);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	$pages = get_store_value(pages);

	return `${($$result.head += `${cache
	? `${cache.data["hatch_PageBy"]["head_tags"]["headTags"]}`
	: ``}`, "")}

${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `${(function (__value) {
			if (is_promise(__value)) return `
  <div class="${"loader"}"><p>Loading...</p></div>
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
		})($pages)}
  ${validate_component(BecomeMember, "BecomeMember").$$render($$result, {}, {}, {})}`
	})}`;
});

/* src/routes/about-hatch.svelte generated by Svelte v3.22.3 */
let slug$3 = "about-hatch";

async function preload$3() {
	return {
		cache: await client.query({ query: PAGE, variables: { slug: slug$3 } })
	};
}

const About_hatch = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $pages;
	let { cache } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);

	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const pages = svelteApollo.query(client, { query: PAGE, variables: { slug: slug$3 } });

	$pages = get_store_value(pages);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	$pages = get_store_value(pages);

	return `${($$result.head += `${cache
	? `${cache.data["hatch_PageBy"]["head_tags"]["headTags"]}`
	: ``}`, "")}

${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `${(function (__value) {
			if (is_promise(__value)) return `
  <div class="${"loader"}"><p>Loading...</p></div>
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
		})($pages)}`
	})}`;
});

/* src/routes/instagram/index.svelte generated by Svelte v3.22.3 */

function getParams(url) {
	var params = {};
	var parser = document.createElement("a");
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split("&");

	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		params[pair[0]] = decodeURIComponent(pair[1]);
	}

	return params;
}

const Instagram = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let params;

	onMount(() => {
		params = getParams(window.location.href);
		console.log({ params });
	});

	return `<div>instagram ${escape(params)}</div>`;
});

/* src/routes/instagram/[slug].svelte generated by Svelte v3.22.3 */

function preload$4({ params }) {
	let slug = params.slug;
	console.log({ slug });
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return ``;
});

const POSTS = ApolloClient.gql`
  query MyQuery {
    posts {
      nodes {
        slug
        date
        databaseId
        content
        title
        status
        featuredImage {
          title
          sourceUrl
        }
        categories {
          nodes {
            id
            slug
          }
        }
        dateGmt
      }
    }
  }  
`;

/* src/components/page_elements/BlogPosts.svelte generated by Svelte v3.22.3 */

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const BlogPosts = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { posts } = $$props;
	const thePosts = posts.data.posts.nodes;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);

	return `<section class="${"container mx-auto"}">${(function (__value) {
		if (is_promise(__value)) return `
	  <p>Loading...</p>
	`;

		return (function (posts) {
			return `
	  ${posts
			? `<div class="${"blog-posts"}">${each(posts, (post, i) => `<div class="${"post"}"><a${add_attribute("href", `the-blog/` + post.slug, 0)}>${post.featuredImage && post.featuredImage.sourceUrl
				? `<img${add_attribute("src", post.featuredImage.sourceUrl, 0)} alt="${""}">`
				: ``}
			     		<h1 class="${"text-center"}">${escape(post.title)}</h1>
			     		${post.categories.nodes.length > 0
				? `<h4 class="${"text-center mx-auto"}">${escape(capitalize(post.categories.nodes[0].slug))}</h4>`
				: ``}</a>
			  	</div>`)}</div>`
			: `<p>ERROR!!</p>`}
	`;
		})(__value);
	})(thePosts)}</section>`;
});

/* src/routes/the-blog/index.svelte generated by Svelte v3.22.3 */

async function preload$5({ params }) {
	let slug = "the-blog";

	return {
		cache: await client.query({ query: PAGE, variables: { slug } }),
		postsCache: await client.query({ query: POSTS }),
		slug
	};
}

const The_blog = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $posts;
	let { slug } = $$props;
	let { cache } = $$props;
	let { postsCache } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);
	svelteApollo.restore(client, POSTS, postsCache.data);
	const posts = svelteApollo.query(client, { query: POSTS });
	$posts = get_store_value(posts);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	if ($$props.postsCache === void 0 && $$bindings.postsCache && postsCache !== void 0) $$bindings.postsCache(postsCache);
	$posts = get_store_value(posts);

	return `${($$result.head += `${cache
	? `${cache.data["hatch_PageBy"]["head_tags"]["headTags"]}`
	: ``}`, "")}
 
${validate_component(TransitionWrapper, "TransitionWrapper").$$render($$result, {}, {}, {
		default: () => `${(function (__value) {
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
		})(cache)} 
${(function (__value) {
			if (is_promise(__value)) return `
  `;

			return (function (data) {
				return `
    ${validate_component(BlogPosts, "BlogPosts").$$render($$result, { posts: data }, {}, {})}
`;
			})(__value);
		})($posts)}`
	})}`;
});

const POST = ApolloClient.gql`
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
`;

/* src/routes/the-blog/[slug].svelte generated by Svelte v3.22.3 */

async function preload$6({ params }) {
	let slug = params.slug;

	return {
		cache: await client.query({ query: POST, variables: { slug } }),
		slug
	};
}

const U5Bslugu5D$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { slug } = $$props;
	let { cache } = $$props;
	console.log({ slug });
	svelteApollo.restore(client, POST, cache.data);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);

	return `${($$result.head += `${($$result.title = `<title>${escape(slug)}</title>`, "")}`, "")}



<section class="${"container mx-auto"}"><div class="${"spacer"}"></div>
	<div class="${"mt-5 content-wrapper"}">${(function (__value) {
		if (is_promise(__value)) return `
      <div class="${"loader"}"><p>Loading...</p></div>
    `;

		return (function (data) {
			return `
      ${data.data
			? `<h1 class="${"text-center"}">${escape(data.data.post.title)}</h1>
        ${data.data.post.content}`
			: `<p>ERROR!!</p>`}
    `;
		})(__value);
	})(cache)}</div>
  <div class="${"spacer"}"></div></section>`;
});

/* src/components/Nav.svelte generated by Svelte v3.22.3 */

const css$1 = {
	code: "nav.svelte-p60ffa.svelte-p60ffa{font-weight:300}ul.svelte-p60ffa.svelte-p60ffa{margin:0;padding:0;display:grid;grid-template-columns:repeat(6, 1fr);grid-gap:0.1rem}li.svelte-p60ffa.svelte-p60ffa{text-align:center;margin-top:0.4rem}li.svelte-p60ffa svg.svelte-p60ffa{margin:0 auto;width:5rem;height:1rem;position:relative;top:1.2rem}[aria-current].svelte-p60ffa .nav-item.svelte-p60ffa{opacity:1}a.svelte-p60ffa.svelte-p60ffa{text-decoration:none;display:block;transition:all 300ms}a.svelte-p60ffa.svelte-p60ffa:hover{color:rgba(0, 0, 0, 0.7)}nav.svelte-p60ffa.svelte-p60ffa{background-color:#fbf6f4}nav.svelte-p60ffa ul.svelte-p60ffa{font-size:1.3rem;font-weight:bold}@media screen and (max-width: 1024px){nav.svelte-p60ffa ul.svelte-p60ffa{font-size:1rem}}@media screen and (max-width: 768px){nav.svelte-p60ffa ul.svelte-p60ffa{font-size:0.9rem}}.nav-mobile.svelte-p60ffa.svelte-p60ffa{height:8rem}.nav-mobile.svelte-p60ffa svg.svelte-p60ffa{height:3rem}@media screen and (min-width: 598px){.nav-mobile.svelte-p60ffa.svelte-p60ffa{display:none}}.nav-pc.svelte-p60ffa.svelte-p60ffa{height:7rem}@media screen and (max-width: 599px){.nav-pc.svelte-p60ffa.svelte-p60ffa{display:none}}.nav-item.svelte-p60ffa.svelte-p60ffa{opacity:0.6;transition:300ms all;height:3rem;position:relative;top:-0.18rem}@media screen and (max-width: 1024px){.nav-item.svelte-p60ffa.svelte-p60ffa{top:0rem}}.nav-item.svelte-p60ffa.svelte-p60ffa:active{opacity:1}.nav-item.svelte-p60ffa.svelte-p60ffa:hover{opacity:1}.nav-item-1.svelte-p60ffa.svelte-p60ffa{color:#ac335e}.nav-item-2.svelte-p60ffa.svelte-p60ffa{color:#c16995}.nav-item-3.svelte-p60ffa.svelte-p60ffa{color:#e4a73A}.nav-item-4.svelte-p60ffa.svelte-p60ffa{color:#3e99c4}.nav-item-5.svelte-p60ffa.svelte-p60ffa{color:#543c78}.nav-item-6.svelte-p60ffa.svelte-p60ffa{color:#267d75}.main-nav.svelte-p60ffa.svelte-p60ffa{max-width:1900px;margin:0 auto;padding-left:1rem;padding-right:1rem}@media screen and (max-width: 425px){.main-nav.svelte-p60ffa.svelte-p60ffa{padding-left:2rem;padding-right:2rem}}.hatch-nav.svelte-p60ffa.svelte-p60ffa{margin-top:2.34rem}@media screen and (max-width: 768px){img.logo.svelte-p60ffa.svelte-p60ffa{height:4.5rem}}.mobile-nav-wrapper.svelte-p60ffa.svelte-p60ffa{position:fixed;z-index:9999;display:block;width:100%;height:100%;background-color:#fff;padding:0 2rem}.mobile-nav-wrapper.svelte-p60ffa .menus.svelte-p60ffa{display:grid;grid-gap:3rem;margin-top:7rem}.mobile-nav-wrapper.svelte-p60ffa .menus h3.svelte-p60ffa{margin:0 auto;font-size:1.7rem;font-weight:bold}.nav-mobile.svelte-p60ffa.svelte-p60ffa{color:#7d7d7d}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"\\n\\n<style lang=\\\"scss\\\">nav {\\n  font-weight: 300; }\\n\\nul {\\n  margin: 0;\\n  padding: 0;\\n  display: grid;\\n  grid-template-columns: repeat(6, 1fr);\\n  grid-gap: 0.1rem; }\\n\\nli {\\n  text-align: center;\\n  margin-top: 0.4rem; }\\n  li svg {\\n    margin: 0 auto;\\n    width: 5rem;\\n    height: 1rem;\\n    position: relative;\\n    top: 1.2rem; }\\n\\n[aria-current] .nav-item {\\n  opacity: 1; }\\n\\na {\\n  text-decoration: none;\\n  display: block;\\n  transition: all 300ms; }\\n  a:hover {\\n    color: rgba(0, 0, 0, 0.7); }\\n\\nnav {\\n  background-color: #fbf6f4; }\\n  nav ul {\\n    font-size: 1.3rem;\\n    font-weight: bold; }\\n    @media screen and (max-width: 1024px) {\\n      nav ul {\\n        font-size: 1rem; } }\\n    @media screen and (max-width: 768px) {\\n      nav ul {\\n        font-size: 0.9rem; } }\\n\\n.nav-mobile {\\n  height: 8rem; }\\n  .nav-mobile svg {\\n    height: 3rem; }\\n  @media screen and (min-width: 598px) {\\n    .nav-mobile {\\n      display: none; } }\\n\\n.nav-pc {\\n  height: 7rem;\\n  /*margin-top: 1rem;*/ }\\n  @media screen and (max-width: 599px) {\\n    .nav-pc {\\n      display: none; } }\\n\\n.nav-item {\\n  opacity: 0.6;\\n  transition: 300ms all;\\n  height: 3rem;\\n  position: relative;\\n  top: -0.18rem; }\\n  @media screen and (max-width: 1024px) {\\n    .nav-item {\\n      top: 0rem; } }\\n  .nav-item:active {\\n    opacity: 1; }\\n  .nav-item:hover {\\n    opacity: 1; }\\n\\n.nav-item-1 {\\n  color: #ac335e; }\\n\\n.nav-item-2 {\\n  color: #c16995; }\\n\\n.nav-item-3 {\\n  color: #e4a73A; }\\n\\n.nav-item-4 {\\n  color: #3e99c4; }\\n\\n.nav-item-5 {\\n  color: #543c78; }\\n\\n.nav-item-6 {\\n  color: #267d75; }\\n\\n.main-nav {\\n  max-width: 1900px;\\n  margin: 0 auto;\\n  padding-left: 1rem;\\n  padding-right: 1rem; }\\n  @media screen and (max-width: 425px) {\\n    .main-nav {\\n      padding-left: 2rem;\\n      padding-right: 2rem; } }\\n\\n.hatch-nav {\\n  margin-top: 2.34rem; }\\n\\n@media screen and (max-width: 768px) {\\n  img.logo {\\n    height: 4.5rem; } }\\n\\n.mobile-nav-wrapper {\\n  position: fixed;\\n  z-index: 9999;\\n  display: block;\\n  width: 100%;\\n  height: 100%;\\n  background-color: #fff;\\n  padding: 0 2rem; }\\n  .mobile-nav-wrapper .menus {\\n    display: grid;\\n    grid-gap: 3rem;\\n    margin-top: 7rem; }\\n    .mobile-nav-wrapper .menus h3 {\\n      margin: 0 auto;\\n      font-size: 1.7rem;\\n      font-weight: bold; }\\n\\n.nav-mobile {\\n  color: #7d7d7d; }\\n/*# sourceMappingURL=src/components/Nav.svelte.map */</style>\\n\\n<script>\\n  import { fade, fly } from 'svelte/transition'\\n  export let segment;\\n  let open = false;\\n  function handleOpenMenu () {\\n    open = !open;\\n    console.log({ open })\\n  } \\n</script>\\n{#if open}\\n<div transition:fly={{ x: -200 }} class=\\\"mobile-nav-wrapper\\\">\\n  <div class=\\\"nav-mobile flex items-center justify-between\\\">\\n    <div>\\n      <a href=\\\".\\\" transition:fade>\\n        <img class=\\\"logo\\\" src=\\\"/logo.svg\\\" alt=\\\"Hatch Essentials\\\" />\\n      </a>\\n    </div>\\n    <div on:click={handleOpenMenu}>\\n       <svg class=\\\"fill-current\\\"  xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 20 20\\\"> \\n        {#if open }\\n          <path transition:fade d=\\\"M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z\\\"/>\\n        {:else}\\n          <path transition:fade d=\\\"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z\\\" />\\n        {/if}\\n      </svg>\\n    </div>\\n  </div> \\n  <div class=\\\"container mx-auto text-center\\\">\\n    <div class=\\\"menus\\\">\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\".\\\">\\n          <h3>Home</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\"essential-oils-101\\\">\\n          <h3>Essential Oils 101</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\"pursue-your-dreams\\\">\\n          <h3>Pursue Your Dreams</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\"about-hatch\\\">\\n          <h3>About Hatch</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\"the-blog\\\">\\n          <h3>The Blog</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a href=\\\"https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member\\\">\\n          <h3>Begin Now</h3>\\n        </a>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n{/if}\\n<nav class=\\\"main-nav\\\">\\n  <div class=\\\"container mx-auto\\\">\\n    <div class=\\\"nav-mobile flex items-center justify-between\\\">\\n      <div>\\n        {#if !open}\\n        <a href=\\\".\\\" transition:fade >\\n          <img class=\\\"logo\\\" src=\\\"/logo.svg\\\" alt=\\\"Hatch Essentials\\\" />\\n        </a>\\n        {/if}\\n      </div>\\n      <div on:click={handleOpenMenu}>\\n         <svg class=\\\"fill-current\\\"  xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 20 20\\\"> \\n          {#if open }\\n            <path transition:fly={{ x: -100 }} d=\\\"M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z\\\"/>\\n          {:else}\\n            <path transition:fly={{ x: 100 }} d=\\\"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z\\\" />\\n          {/if}\\n        </svg>\\n      </div>\\n    </div> \\n    <div class=\\\"nav-pc flex items-center justify-between\\\">\\n      <div class=\\\"flex items-center\\\">\\n        <a href=\\\".\\\" rel=\\\"prefetch\\\">\\n          <img class=\\\"logo\\\" src=\\\"/logo.svg\\\" alt=\\\"Hatch Eessentials\\\"/>\\n        </a>\\n      </div>\\n      <div>\\n        <ul class=\\\"flex hatch-nav\\\">\\n          <li>\\n            <a href=\\\".\\\"  aria-current={segment === undefined ? 'page' : undefined}>Home\\n            {#if segment === undefined}\\n                  <svg class=\\\"fill-current nav-item nav-item-1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li>\\n            <a\\n              aria-current={segment === 'essential-oils-101' ? 'page' : undefined}\\n              rel=\\\"prefetch\\\"\\n              href=\\\"essential-oils-101\\\">\\n              Essential Oils 101\\n            \\n              {#if segment === 'essential-oils-101'}\\n                  <svg class=\\\"fill-current nav-item nav-item-2\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-2\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li>\\n            <a aria-current={segment === 'pursue-your-dreams' ? 'page' : undefined} rel=\\\"prefetch\\\" href=\\\"pursue-your-dreams\\\" >Pursue Your Dreams\\n            {#if segment === 'pursue-your-dreams'}\\n                  <svg class=\\\"fill-current nav-item nav-item-3\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-3\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li> \\n            <a aria-current={segment === 'about-hatch' ? 'page' : undefined} rel=\\\"prefetch\\\" href=\\\"about-hatch\\\" >About Hatch\\n            {#if segment === 'about-hatch'}\\n                  <svg class=\\\"fill-current nav-item nav-item-4\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-4\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li>\\n            <a aria-current={segment === 'the-blog' ? 'page' : undefined} rel=\\\"prefetch\\\" href=\\\"the-blog\\\" >The Blog\\n             {#if segment === 'the-blog'}\\n                  <svg class=\\\"fill-current nav-item nav-item-5\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-5\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li>\\n            <a aria-current={segment === 'begin-now' ? 'page' : undefined} target=\\\"_blank\\\" href=\\\"https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member\\\" >Begin Now\\n              \\n              {#if segment === 'begin-now'}\\n                  <svg class=\\\"fill-current nav-item nav-item-6\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-6\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n            </a>\\n          </li>\\n        </ul>\\n      </div>\\n    </div>\\n  </div>\\n</nav>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$1);

	return `${ ``}
<nav class="${"main-nav svelte-p60ffa"}"><div class="${"container mx-auto"}"><div class="${"nav-mobile flex items-center justify-between svelte-p60ffa"}"><div>${ `<a href="${"."}" class="${"svelte-p60ffa"}"><img class="${"logo svelte-p60ffa"}" src="${"/logo.svg"}" alt="${"Hatch Essentials"}"></a>`
	}</div>
      <div><svg class="${"fill-current svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}">${ `<path d="${"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"}"></path>`}</svg></div></div> 
    <div class="${"nav-pc flex items-center justify-between svelte-p60ffa"}"><div class="${"flex items-center"}"><a href="${"."}" rel="${"prefetch"}" class="${"svelte-p60ffa"}"><img class="${"logo svelte-p60ffa"}" src="${"/logo.svg"}" alt="${"Hatch Eessentials"}"></a></div>
      <div><ul class="${"flex hatch-nav svelte-p60ffa"}"><li class="${"svelte-p60ffa"}"><a href="${"."}"${add_attribute("aria-current", segment === undefined ? "page" : undefined, 0)} class="${"svelte-p60ffa"}">Home
            ${segment === undefined
	? `<svg class="${"fill-current nav-item nav-item-1 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-1 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-p60ffa"}"><a${add_attribute("aria-current", segment === "essential-oils-101" ? "page" : undefined, 0)} rel="${"prefetch"}" href="${"essential-oils-101"}" class="${"svelte-p60ffa"}">Essential Oils 101
            
              ${segment === "essential-oils-101"
	? `<svg class="${"fill-current nav-item nav-item-2 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-2 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-p60ffa"}"><a${add_attribute("aria-current", segment === "pursue-your-dreams" ? "page" : undefined, 0)} rel="${"prefetch"}" href="${"pursue-your-dreams"}" class="${"svelte-p60ffa"}">Pursue Your Dreams
            ${segment === "pursue-your-dreams"
	? `<svg class="${"fill-current nav-item nav-item-3 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-3 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-p60ffa"}"><a${add_attribute("aria-current", segment === "about-hatch" ? "page" : undefined, 0)} rel="${"prefetch"}" href="${"about-hatch"}" class="${"svelte-p60ffa"}">About Hatch
            ${segment === "about-hatch"
	? `<svg class="${"fill-current nav-item nav-item-4 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-4 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-p60ffa"}"><a${add_attribute("aria-current", segment === "the-blog" ? "page" : undefined, 0)} rel="${"prefetch"}" href="${"the-blog"}" class="${"svelte-p60ffa"}">The Blog
             ${segment === "the-blog"
	? `<svg class="${"fill-current nav-item nav-item-5 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-5 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-p60ffa"}"><a${add_attribute("aria-current", segment === "begin-now" ? "page" : undefined, 0)} target="${"_blank"}" href="${"https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member"}" class="${"svelte-p60ffa"}">Begin Now
              
              ${segment === "begin-now"
	? `<svg class="${"fill-current nav-item nav-item-6 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-6 svelte-p60ffa"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li></ul></div></div></div></nav>`;
});

/* src/components/page_elements/HatchInstagram.svelte generated by Svelte v3.22.3 */

const HatchInstagram = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	onMount(() => {
		var feed = new Instafeed({
				get: "user",
				accessToken: "IGQVJWenlRLWhqbDA4ZA1RRWW9PRGJsdXQyNVktWEpSc2JQZAF9saWVaWVJsUUNfT3hGRlh5YjlOLVV6dEdOZATBoaExMaXVBUmJRSE5SRHQxTEo0aTRtUGFOUnlNSGtBOXpsWnYzbGpR",
				target: "instagramfeed",
				userId: "33443551043",
				limit: 3
			});

		feed.run();
	});

	return `${($$result.head += `<script src="${"/js/instafeed.js"}"></script>`, "")}

<section class="${"hatch-instagram"}"><div class="${"left-section"}"><div class="${"hatch-logo"}"><img src="${"logo.svg"}"></div>
    <div><p>GET BEHIND THE SCENES. <br>
        My “AHA”  moments on the ‘gram. 
      </p>
      <p>Follow me <b>@hatchessentials</b></p></div></div>
  <div id="${"instagramfeed"}" class="${"instagram-items"}"></div></section>`;
});

const subscriber$1 = writable({
	name: "",
	email: ""
});

/* src/components/page_elements/Subscribe.svelte generated by Svelte v3.22.3 */

const Subscribe = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $subscriber = get_store_value(subscriber$1);

	return `<div class="${"subscribe-wrapper"}"><div class="${"container mx-auto"}"><div class="${"subscribe"}"><div><img src="${"/img/image-2.jpg"}" alt="${""}"></div>
      <div class="${"subscribe-content"}"><div><h2>Subscribe</h2>
          <p>Are you ready to start learning about natural health? <br>
            Grab my FREE blueprint to get started now. <br>
            3 WAYS “BEING CRUNCHY” CAN CHANGE YOUR LIFE FOR THE BETTER
          </p>
          <div class="${"subscribe-form"}"><form><input type="${"text"}" id="${"name"}" placeholder="${"Your Name Here"}" required${add_attribute("value", $subscriber.name, 1)}>
              <input type="${"email"}" id="${"email"}" placeholder="${"Your Email Here"}" required${add_attribute("value", $subscriber.email, 1)}>
              <button><em>Download Now</em></button></form>
              ${ ``}</div></div></div></div></div></div>`;
});

/* src/components/Footer.svelte generated by Svelte v3.22.3 */

const Footer = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<div class="${"spacer"}"></div>
${validate_component(Subscribe, "Subscribe").$$render($$result, {}, {}, {})}
<div class="${"spacer"}"></div>
<footer><div class="${"container mx-auto"}"><div><hr></div>
    ${validate_component(HatchInstagram, "HatchInstagram").$$render($$result, {}, {}, {})}</div>
  <div class="${"container mx-auto text-center"}"><span style="${"font-size: 0.7rem; white-space:pre-wrap;"}">Copyright © 2020 Hatch Essentials
    </span></div></footer>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.22.3 */

const css$2 = {
	code: ".container{max-width:1300px}@font-face{font-family:PlayFairBold;src:url(\"/fonts/PlayfairDisplay-Bold.ttf\");font-display:swap}@font-face{font-family:PlayFairRegular;src:url(\"/fonts/PlayfairDisplay-Regular.ttf\");font-display:swap}@font-face{font-family:MontserratLight;src:url(\"/fonts/Montserrat-Light.ttf\");font-display:swap}@font-face{font-family:MontserratRegular;src:url(\"/fonts/Montserrat-Regular.ttf\");font-display:swap}:root{font-size:62.5%}:root body{margin:0;font-size:1.6rem}body{background-color:#f5f5f5;-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-family:'MontserratRegular', sans-serif;font-weight:400;font-style:normal;font-size:1.4rem;text-transform:none;color:#959595}p{font-family:'MontserratLight', sans-serif;font-weight:light;font-weight:400;font-style:normal;padding:1rem;line-height:1.8em;color:#959595}@media screen and (max-width: 425px){p{text-align:center}}h1,h2{line-height:1em;padding:1rem}h1{font-size:4.8rem;font-family:'PlayFairBold', serif;color:#ac335e;font-style:normal;letter-spacing:0.04em}@media only screen and (max-width: 640px){h1{font-size:3rem;letter-spacing:.05em;line-height:1.2em}}h2{color:#ac335e;white-space:pre-wrap;font-family:'PlayFairBold', serif;font-weight:bold;font-style:normal;font-size:4rem;max-width:60%}@media screen and (max-width: 640px){h2{font-size:3rem}}h3{color:#c16995;white-space:pre-wrap;max-width:60%;font-family:'MontserratRegular', sans-serif;font-weight:300;font-size:2.2rem}@media screen and (max-width: 640px){h3{font-size:2rem}}main{min-height:800px}.module{font-size:1.1rem}.hatch-content{display:flex;justify-content:center;align-items:center;padding:1rem}.hatch-content h1{position:relative;margin-bottom:1.5rem;padding-bottom:3rem}@media screen and (max-width: 425px){.hatch-content h1{text-align:center}}.hatch-content h1:after{content:\"\";border-bottom:3px solid #3e99c4;position:absolute;bottom:0;height:1rem;width:2rem;left:1rem}@media screen and (max-width: 425px){.hatch-content h1:after{left:50%;transform:translate(-50%, -50%)}}.he-row *:not(h1):not(h2):not(h3){word-wrap:break-word}.he-row{height:100%;position:relative}.he-row img{margin:0 auto}.spacer{height:15rem}@media screen and (max-width: 425px){.spacer{height:1rem}}.container{max-width:1300px}@media screen and (max-width: 640px){.he-row .container{padding-top:17px !important;padding-left:17px;padding-right:17px}}*{box-sizing:border-box;text-decoration:none;list-style:none;outline:none}html,body{margin:0;padding:0}.hatch-left-image-big img{position:relative;z-index:9;height:100%;width:100%}.hatch-right-image-big img{position:relative;z-index:9;height:100%;width:100%}.hatch-left-image-big{position:relative;padding:3rem 0rem 3rem 3rem}.hatch-left-image-big:after{content:'';position:absolute;right:20px;top:35px;height:92%;width:95%;background-color:#96bdf2;z-index:1}.hatch-right-image-big.dashed:after{background-color:initial;border:11px dashed #d9a7c0}.hatch-left-image-big.yellow:after{background-color:#efc881 !important}.hatch-right-image-big{position:relative;padding:3rem 3rem 3rem 0rem}.hatch-right-image-big:after{content:'';position:absolute;left:20px;top:35px;height:92%;width:95%;background-color:#d9a7c0;z-index:1}.featured-items{height:3rem;display:grid;grid-template-columns:repeat(4, 1fr);grid-gap:1rem;position:relative;height:100%}@media screen and (max-width: 425px){.featured-items{grid-template-columns:repeat(2, 1fr)}}button{font-family:'PlayFairRegular'}.hatch-btn{padding:1rem;display:flex}.hatch-btn button{border:1px solid #efc881;border-radius:9px;padding:0.5rem 1rem;font-size:1.6rem;color:#efc881;transition:all 300ms;width:22rem;height:4rem}.hatch-btn button:hover{background-color:#e4a73a;border:1px solid #e4a73a;color:#fff}@media screen and (max-width: 1024px){.hatch-btn{justify-content:center}.hatch-btn button{font-size:1rem}}@media screen and (max-width: 768px){.hatch-btn button{font-size:2rem}}.featured-item h1{font-size:2rem}.hatch-link{transition:all 300ms;cursor:pointer}.hatch-link h1{color:#efc881}.hatch-link:hover h1{color:#e4a73a}@media screen and (max-width: 425px){footer{text-align:center}}.hatch-instagram{display:grid;grid-template-columns:1fr 1fr;margin-top:1rem}@media screen and (max-width: 425px){.hatch-instagram{grid-template-columns:auto}}.hatch-instagram p{font-family:'PlayFairRegular', serif;font-style:normal;border-right:1px solid #e3e3e3}.hatch-instagram .left-section{display:grid;grid-template-columns:1fr 1fr;grid-gap:1rem}@media screen and (max-width: 425px){.hatch-instagram .left-section{grid-template-columns:auto}}.hatch-instagram .hatch-logo{display:flex;padding:1rem}@media screen and (min-width: 425px){.hatch-instagram .hatch-logo{align-items:flex-start;flex-direction:row-reverse}}@media screen and (max-width: 425px){.hatch-instagram .hatch-logo{justify-content:center}}.hatch-instagram .instagram-items{display:grid;grid-template-columns:1fr 1fr 1fr;padding:1rem;grid-gap:1rem}.hatch-instagram .instagram-items div{padding:0.5rem}.blocks-gallery-grid{display:flex;justify-content:center;align-items:center}.blocks-gallery-grid .blocks-gallery-item{padding:1rem}.has-text-align-center{text-align:center;margin:0 auto}.wp-block-image{display:grid;justify-content:center;font-size:0.7rem;text-align:center}.wp-block-image img{margin:0 auto}.hatch-hr hr{width:1.5rem;margin:0.5rem auto;border-bottom:3px solid #ac335e}.blog-posts{display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:1.5rem}@media screen and (max-width: 425px){.blog-posts{grid-template-columns:auto;padding:3rem}}.blog-posts .post{transition:all 300ms;opacity:0.8}.blog-posts .post:hover{opacity:1}.blog-posts .post h1{font-size:2.5rem}@media screen and (max-width: 425px){.blog-posts .post h1{font-size:2rem}}.blog-posts .post h4{font-size:1.7rem}@media screen and (max-width: 425px){.blog-posts .post h4{font-size:1.4rem}}.blog-posts .post img{width:100%}.subscribe-wrapper{background-color:#a68dcb}.subscribe-wrapper .subscribe{display:grid;grid-template-columns:1fr 1fr;grid-gap:4rem;max-width:112rem;margin:0 auto}@media screen and (max-width: 425px){.subscribe-wrapper .subscribe{grid-template-rows:0.3fr 1fr;grid-template-columns:initial;padding:2rem}}.subscribe-wrapper p,.subscribe-wrapper h2{color:#fff;padding-left:0;padding-right:0}.subscribe-wrapper h2{padding:0}@media screen and (max-width: 425px){.subscribe-wrapper h2{margin:0 auto;text-align:center}}.subscribe-wrapper img{height:100%;width:100%}.subscribe-wrapper .subscribe-content{display:grid;justify-content:center;align-items:center}.subscribe-wrapper .subscribe-content .subscribe-form form{color:#fff;display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:1rem;align-items:center;margin-top:4rem}@media screen and (max-width: 768px){.subscribe-wrapper .subscribe-content .subscribe-form form{grid-template-columns:initial;height:18rem}}.subscribe-wrapper .subscribe-content .subscribe-form form input{text-align:center}form button{height:4rem;width:16rem;background-color:#e4a73a;color:#fff;border-radius:7px;font-family:'playFairRegular';transition:all 300ms}@media screen and (max-width: 425px){form button{width:100%}}form button:hover{background-color:transparent;border:1px solid #e4a73a}#sapper ::-webkit-input-placeholder{color:#fff;opacity:1}#sapper ::-moz-placeholder{color:#fff;opacity:1}#sapper :-ms-input-placeholder{color:#fff;opacity:1}#sapper ::-ms-input-placeholder{color:#fff;opacity:1}#sapper ::placeholder{color:#fff;opacity:1}#sapper :-ms-input-placeholder{color:#fff}#sapper ::-ms-input-placeholder{color:#fff}#sapper input{transition:all 300ms;height:3.5rem;width:100%}#sapper textarea,#sapper input{border-radius:6px;background-color:transparent;border:1px solid #fff}#sapper textarea{width:100%;height:100%}.content-wrapper{max-width:80rem;margin:0 auto}.loader{position:fixed;top:0;width:100%;height:100%;z-index:9999;background-color:#fff;transition:background-color .3s ease-out,transform 0s .3s linear;display:block}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script> \\n  import Nav from \\\"../components/Nav.svelte\\\";\\n  import Footer from \\\"../components/Footer.svelte\\\";\\n\\n  export let segment;\\n</script>\\n\\n<style lang=\\\"scss\\\" global>:global(.container) {\\n  max-width: 1300px; }\\n\\n@font-face {\\n  font-family: PlayFairBold;\\n  src: url(\\\"/fonts/PlayfairDisplay-Bold.ttf\\\");\\n  font-display: swap; }\\n\\n@font-face {\\n  font-family: PlayFairRegular;\\n  src: url(\\\"/fonts/PlayfairDisplay-Regular.ttf\\\");\\n  font-display: swap; }\\n\\n@font-face {\\n  font-family: MontserratLight;\\n  src: url(\\\"/fonts/Montserrat-Light.ttf\\\");\\n  font-display: swap; }\\n\\n@font-face {\\n  font-family: MontserratRegular;\\n  src: url(\\\"/fonts/Montserrat-Regular.ttf\\\");\\n  font-display: swap; }\\n\\n:global(:root) {\\n  font-size: 62.5%; }\\n  :global(:root) :global(body) {\\n    margin: 0;\\n    font-size: 1.6rem; }\\n\\n:global(body) {\\n  background-color: #f5f5f5;\\n  -webkit-font-smoothing: subpixel-antialiased;\\n  -moz-osx-font-smoothing: auto;\\n  font-family: 'MontserratRegular', sans-serif;\\n  font-weight: 400;\\n  font-style: normal;\\n  font-size: 1.4rem;\\n  text-transform: none;\\n  color: #959595; }\\n\\n:global(p) {\\n  font-family: 'MontserratLight', sans-serif;\\n  font-weight: light;\\n  font-weight: 400;\\n  font-style: normal;\\n  padding: 1rem;\\n  line-height: 1.8em;\\n  color: #959595; }\\n  @media screen and (max-width: 425px) {\\n    :global(p) {\\n      text-align: center; } }\\n\\n:global(h1), :global(h2) {\\n  line-height: 1em;\\n  padding: 1rem; }\\n\\n:global(h1) {\\n  font-size: 4.8rem;\\n  font-family: 'PlayFairBold', serif;\\n  color: #ac335e;\\n  font-style: normal;\\n  letter-spacing: 0.04em; }\\n  @media only screen and (max-width: 640px) {\\n    :global(h1) {\\n      font-size: 3rem;\\n      letter-spacing: .05em;\\n      line-height: 1.2em; } }\\n\\n:global(h2) {\\n  color: #ac335e;\\n  white-space: pre-wrap;\\n  font-family: 'PlayFairBold', serif;\\n  font-weight: bold;\\n  font-style: normal;\\n  font-size: 4rem;\\n  max-width: 60%; }\\n  @media screen and (max-width: 640px) {\\n    :global(h2) {\\n      font-size: 3rem; } }\\n\\n:global(h3) {\\n  color: #c16995;\\n  white-space: pre-wrap;\\n  max-width: 60%;\\n  font-family: 'MontserratRegular', sans-serif;\\n  font-weight: 300;\\n  font-size: 2.2rem; }\\n  @media screen and (max-width: 640px) {\\n    :global(h3) {\\n      font-size: 2rem; } }\\n\\n:global(main) {\\n  min-height: 800px; }\\n\\n:global(.module) {\\n  font-size: 1.1rem; }\\n\\n:global(.hatch-content) {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  padding: 1rem; }\\n  :global(.hatch-content) :global(h1) {\\n    position: relative;\\n    margin-bottom: 1.5rem;\\n    padding-bottom: 3rem; }\\n    @media screen and (max-width: 425px) {\\n      :global(.hatch-content) :global(h1) {\\n        text-align: center; } }\\n    :global(.hatch-content) :global(h1:after) {\\n      content: \\\"\\\";\\n      border-bottom: 3px solid #3e99c4;\\n      position: absolute;\\n      bottom: 0;\\n      height: 1rem;\\n      width: 2rem;\\n      left: 1rem; }\\n      @media screen and (max-width: 425px) {\\n        :global(.hatch-content) :global(h1:after) {\\n          left: 50%;\\n          transform: translate(-50%, -50%); } }\\n\\n:global(.he-row) :global(*:not(h1):not(h2):not(h3)) {\\n  word-wrap: break-word; }\\n\\n:global(.he-row) {\\n  height: 100%;\\n  position: relative; }\\n  :global(.he-row) :global(img) {\\n    margin: 0 auto; }\\n\\n:global(.spacer) {\\n  height: 15rem; }\\n  @media screen and (max-width: 425px) {\\n    :global(.spacer) {\\n      height: 1rem; } }\\n\\n:global(.container) {\\n  max-width: 1300px; }\\n\\n@media screen and (max-width: 640px) {\\n  :global(.he-row) :global(.container) {\\n    padding-top: 17px !important;\\n    padding-left: 17px;\\n    padding-right: 17px; } }\\n\\n:global(*) {\\n  box-sizing: border-box;\\n  text-decoration: none;\\n  list-style: none;\\n  outline: none; }\\n\\n:global(html), :global(body) {\\n  margin: 0;\\n  padding: 0; }\\n\\n:global(.hatch-left-image-big) :global(img) {\\n  position: relative;\\n  z-index: 9;\\n  height: 100%;\\n  width: 100%; }\\n\\n:global(.hatch-right-image-big) :global(img) {\\n  position: relative;\\n  z-index: 9;\\n  height: 100%;\\n  width: 100%; }\\n\\n:global(.hatch-left-image-big) {\\n  position: relative;\\n  padding: 3rem 0rem 3rem 3rem; }\\n  :global(.hatch-left-image-big:after) {\\n    content: '';\\n    position: absolute;\\n    right: 20px;\\n    top: 35px;\\n    height: 92%;\\n    width: 95%;\\n    background-color: #96bdf2;\\n    z-index: 1; }\\n\\n:global(.hatch-right-image-big.dashed:after) {\\n  background-color: initial;\\n  border: 11px dashed #d9a7c0; }\\n\\n:global(.hatch-left-image-big.yellow:after) {\\n  background-color: #efc881 !important; }\\n\\n:global(.hatch-right-image-big) {\\n  position: relative;\\n  padding: 3rem 3rem 3rem 0rem; }\\n  :global(.hatch-right-image-big:after) {\\n    content: '';\\n    position: absolute;\\n    left: 20px;\\n    top: 35px;\\n    height: 92%;\\n    width: 95%;\\n    background-color: #d9a7c0;\\n    z-index: 1; }\\n\\n:global(.featured-items) {\\n  height: 3rem;\\n  display: grid;\\n  grid-template-columns: repeat(4, 1fr);\\n  grid-gap: 1rem;\\n  position: relative;\\n  height: 100%; }\\n  @media screen and (max-width: 425px) {\\n    :global(.featured-items) {\\n      grid-template-columns: repeat(2, 1fr); } }\\n\\n:global(button) {\\n  font-family: 'PlayFairRegular'; }\\n\\n:global(.hatch-btn) {\\n  padding: 1rem;\\n  display: flex; }\\n  :global(.hatch-btn) :global(button) {\\n    border: 1px solid #efc881;\\n    border-radius: 9px;\\n    padding: 0.5rem 1rem;\\n    font-size: 1.6rem;\\n    color: #efc881;\\n    transition: all 300ms;\\n    width: 22rem;\\n    height: 4rem; }\\n    :global(.hatch-btn) :global(button:hover) {\\n      background-color: #e4a73a;\\n      border: 1px solid #e4a73a;\\n      color: #fff; }\\n  @media screen and (max-width: 1024px) {\\n    :global(.hatch-btn) {\\n      justify-content: center; }\\n      :global(.hatch-btn) :global(button) {\\n        font-size: 1rem; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.hatch-btn) :global(button) {\\n      font-size: 2rem; } }\\n\\n:global(.featured-item) :global(h1) {\\n  font-size: 2rem; }\\n\\n:global(.hatch-link) {\\n  transition: all 300ms;\\n  cursor: pointer; }\\n  :global(.hatch-link) :global(h1) {\\n    color: #efc881; }\\n  :global(.hatch-link:hover) :global(h1) {\\n    color: #e4a73a; }\\n\\n@media screen and (max-width: 425px) {\\n  :global(footer) {\\n    text-align: center; } }\\n\\n:global(.hatch-instagram) {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr;\\n  margin-top: 1rem; }\\n  @media screen and (max-width: 425px) {\\n    :global(.hatch-instagram) {\\n      grid-template-columns: auto; } }\\n  :global(.hatch-instagram) :global(p) {\\n    font-family: 'PlayFairRegular', serif;\\n    font-style: normal;\\n    border-right: 1px solid #e3e3e3; }\\n  :global(.hatch-instagram) :global(.left-section) {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    grid-gap: 1rem; }\\n    @media screen and (max-width: 425px) {\\n      :global(.hatch-instagram) :global(.left-section) {\\n        grid-template-columns: auto; } }\\n  :global(.hatch-instagram) :global(.hatch-logo) {\\n    display: flex;\\n    padding: 1rem; }\\n    @media screen and (min-width: 425px) {\\n      :global(.hatch-instagram) :global(.hatch-logo) {\\n        align-items: flex-start;\\n        flex-direction: row-reverse; } }\\n    @media screen and (max-width: 425px) {\\n      :global(.hatch-instagram) :global(.hatch-logo) {\\n        justify-content: center; } }\\n  :global(.hatch-instagram) :global(.instagram-items) {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr 1fr;\\n    padding: 1rem;\\n    grid-gap: 1rem; }\\n    :global(.hatch-instagram) :global(.instagram-items) :global(div) {\\n      padding: 0.5rem; }\\n\\n:global(.blocks-gallery-grid) {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center; }\\n  :global(.blocks-gallery-grid) :global(.blocks-gallery-item) {\\n    padding: 1rem; }\\n\\n:global(.has-text-align-center) {\\n  text-align: center;\\n  margin: 0 auto; }\\n\\n:global(.wp-block-image) {\\n  display: grid;\\n  justify-content: center;\\n  font-size: 0.7rem;\\n  text-align: center; }\\n  :global(.wp-block-image) :global(img) {\\n    margin: 0 auto; }\\n\\n:global(.hatch-hr) :global(hr) {\\n  width: 1.5rem;\\n  margin: 0.5rem auto;\\n  border-bottom: 3px solid #ac335e; }\\n\\n:global(.blog-posts) {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr 1fr;\\n  grid-gap: 1.5rem; }\\n  @media screen and (max-width: 425px) {\\n    :global(.blog-posts) {\\n      grid-template-columns: auto;\\n      padding: 3rem; } }\\n  :global(.blog-posts) :global(.post) {\\n    transition: all 300ms;\\n    opacity: 0.8; }\\n    :global(.blog-posts) :global(.post:hover) {\\n      opacity: 1; }\\n    :global(.blog-posts) :global(.post) :global(h1) {\\n      font-size: 2.5rem; }\\n      @media screen and (max-width: 425px) {\\n        :global(.blog-posts) :global(.post) :global(h1) {\\n          font-size: 2rem; } }\\n    :global(.blog-posts) :global(.post) :global(h4) {\\n      font-size: 1.7rem; }\\n      @media screen and (max-width: 425px) {\\n        :global(.blog-posts) :global(.post) :global(h4) {\\n          font-size: 1.4rem; } }\\n    :global(.blog-posts) :global(.post) :global(img) {\\n      width: 100%; }\\n\\n:global(.subscribe-wrapper) {\\n  background-color: #a68dcb; }\\n  :global(.subscribe-wrapper) :global(.subscribe) {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    grid-gap: 4rem;\\n    max-width: 112rem;\\n    margin: 0 auto; }\\n    @media screen and (max-width: 425px) {\\n      :global(.subscribe-wrapper) :global(.subscribe) {\\n        grid-template-rows: 0.3fr 1fr;\\n        grid-template-columns: initial;\\n        padding: 2rem; } }\\n  :global(.subscribe-wrapper) :global(p), :global(.subscribe-wrapper) :global(h2) {\\n    color: #fff;\\n    padding-left: 0;\\n    padding-right: 0; }\\n  :global(.subscribe-wrapper) :global(h2) {\\n    padding: 0; }\\n    @media screen and (max-width: 425px) {\\n      :global(.subscribe-wrapper) :global(h2) {\\n        margin: 0 auto;\\n        text-align: center; } }\\n  :global(.subscribe-wrapper) :global(img) {\\n    height: 100%;\\n    width: 100%; }\\n  :global(.subscribe-wrapper) :global(.subscribe-content) {\\n    display: grid;\\n    justify-content: center;\\n    align-items: center; }\\n    :global(.subscribe-wrapper) :global(.subscribe-content) :global(.subscribe-form) :global(form) {\\n      color: #fff;\\n      display: grid;\\n      grid-template-columns: 1fr 1fr 1fr;\\n      grid-gap: 1rem;\\n      align-items: center;\\n      margin-top: 4rem; }\\n      @media screen and (max-width: 768px) {\\n        :global(.subscribe-wrapper) :global(.subscribe-content) :global(.subscribe-form) :global(form) {\\n          grid-template-columns: initial;\\n          height: 18rem; } }\\n      :global(.subscribe-wrapper) :global(.subscribe-content) :global(.subscribe-form) :global(form) :global(input) {\\n        text-align: center; }\\n\\n:global(form) :global(button) {\\n  height: 4rem;\\n  width: 16rem;\\n  background-color: #e4a73a;\\n  color: #fff;\\n  border-radius: 7px;\\n  font-family: 'playFairRegular';\\n  transition: all 300ms; }\\n  @media screen and (max-width: 425px) {\\n    :global(form) :global(button) {\\n      width: 100%; } }\\n  :global(form) :global(button:hover) {\\n    background-color: transparent;\\n    border: 1px solid #e4a73a; }\\n\\n:global(#sapper) :global(::-webkit-input-placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(::-moz-placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(:-ms-input-placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(::-ms-input-placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(::placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(:-ms-input-placeholder) {\\n  /* Internet Explorer 10-11 */\\n  color: #fff; }\\n\\n:global(#sapper) :global(::-ms-input-placeholder) {\\n  /* Microsoft Edge */\\n  color: #fff; }\\n\\n:global(#sapper) :global(input) {\\n  transition: all 300ms;\\n  height: 3.5rem;\\n  width: 100%; }\\n\\n:global(#sapper) :global(textarea), :global(#sapper) :global(input) {\\n  border-radius: 6px;\\n  background-color: transparent;\\n  border: 1px solid #fff; }\\n\\n:global(#sapper) :global(textarea) {\\n  width: 100%;\\n  height: 100%; }\\n\\n:global(.content-wrapper) {\\n  max-width: 80rem;\\n  margin: 0 auto; }\\n\\n:global(.loader) {\\n  position: fixed;\\n  top: 0;\\n  width: 100%;\\n  height: 100%;\\n  z-index: 9999;\\n  background-color: #fff;\\n  transition: background-color .3s ease-out,transform 0s .3s linear;\\n  display: block; }\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvX2xheW91dC5zdmVsdGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUIsRUFBRTs7QUFFckI7RUFDRSx5QkFBeUI7RUFDekIsMkNBQTJDO0VBQzNDLGtCQUFrQixFQUFFOztBQUV0QjtFQUNFLDRCQUE0QjtFQUM1Qiw4Q0FBOEM7RUFDOUMsa0JBQWtCLEVBQUU7O0FBRXRCO0VBQ0UsNEJBQTRCO0VBQzVCLHVDQUF1QztFQUN2QyxrQkFBa0IsRUFBRTs7QUFFdEI7RUFDRSw4QkFBOEI7RUFDOUIseUNBQXlDO0VBQ3pDLGtCQUFrQixFQUFFOztBQUV0QjtFQUNFLGdCQUFnQixFQUFFO0VBQ2xCO0lBQ0UsU0FBUztJQUNULGlCQUFpQixFQUFFOztBQUV2QjtFQUNFLHlCQUF5QjtFQUN6Qiw0Q0FBNEM7RUFDNUMsNkJBQTZCO0VBQzdCLDRDQUE0QztFQUM1QyxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsY0FBYyxFQUFFOztBQUVsQjtFQUNFLDBDQUEwQztFQUMxQyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGNBQWMsRUFBRTtFQUNoQjtJQUNFO01BQ0Usa0JBQWtCLEVBQUUsRUFBRTs7QUFFNUI7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGlCQUFpQjtFQUNqQixrQ0FBa0M7RUFDbEMsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixzQkFBc0IsRUFBRTtFQUN4QjtJQUNFO01BQ0UsZUFBZTtNQUNmLHFCQUFxQjtNQUNyQixrQkFBa0IsRUFBRSxFQUFFOztBQUU1QjtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7RUFDckIsa0NBQWtDO0VBQ2xDLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWMsRUFBRTtFQUNoQjtJQUNFO01BQ0UsZUFBZSxFQUFFLEVBQUU7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cUI7RUFDckIsY0FBYztFQUNkLFdBQVcsRUFBRTs7QUFFZjtFQUNFLGtCQUFrQjtFQUNsQiw2QkFBNkI7RUFDN0Isc0JBQXNCLEVBQUU7O0FBRTFCO0VBQ0UsV0FBVztFQUNYLFlBQVksRUFBRTs7QUFFaEI7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYyxFQUFFOztBQUVsQjtFQUNFLGVBQWU7RUFDZixNQUFNO0VBQ04sV0FBVztFQUNYLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGlFQUFpRTtFQUNqRSxjQUFjLEVBQUUiLCJmaWxlIjoic3JjL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZSIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xuICBtYXgtd2lkdGg6IDEzMDBweDsgfVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFBsYXlGYWlyQm9sZDtcbiAgc3JjOiB1cmwoXCIvZm9udHMvUGxheWZhaXJEaXNwbGF5LUJvbGQudHRmXCIpO1xuICBmb250LWRpc3BsYXk6IHN3YXA7IH1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBQbGF5RmFpclJlZ3VsYXI7XG4gIHNyYzogdXJsKFwiL2ZvbnRzL1BsYXlmYWlyRGlzcGxheS1SZWd1bGFyLnR0ZlwiKTtcbiAgZm9udC1kaXNwbGF5OiBzd2FwOyB9XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogTW9udHNlcnJhdExpZ2h0O1xuICBzcmM6IHVybChcIi9mb250cy9Nb250c2VycmF0LUxpZ2h0LnR0ZlwiKTtcbiAgZm9udC1kaXNwbGF5OiBzd2FwOyB9XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogTW9udHNlcnJhdFJlZ3VsYXI7XG4gIHNyYzogdXJsKFwiL2ZvbnRzL01vbnRzZXJyYXQtUmVndWxhci50dGZcIik7XG4gIGZvbnQtZGlzcGxheTogc3dhcDsgfVxuXG46cm9vdCB7XG4gIGZvbnQtc2l6ZTogNjIuNSU7IH1cbiAgOnJvb3QgYm9keSB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogMS42cmVtOyB9XG5cbmJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBzdWJwaXhlbC1hbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGF1dG87XG4gIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdFJlZ3VsYXInLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMS40cmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgY29sb3I6ICM5NTk1OTU7IH1cblxucCB7XG4gIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdExpZ2h0Jywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IGxpZ2h0O1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjhlbTtcbiAgY29sb3I6ICM5NTk1OTU7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICBwIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfSB9XG5cbmgxLCBoMiB7XG4gIGxpbmUtaGVpZ2h0OiAxZW07XG4gIHBhZGRpbmc6IDFyZW07IH1cblxuaDEge1xuICBmb250LXNpemU6IDQuOHJlbTtcbiAgZm9udC1mYW1pbHk6ICdQbGF5RmFpckJvbGQnLCBzZXJpZjtcbiAgY29sb3I6ICNhYzMzNWU7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTsgfVxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IC4wNWVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMmVtOyB9IH1cblxuaDIge1xuICBjb2xvcjogI2FjMzM1ZTtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICBmb250LWZhbWlseTogJ1BsYXlGYWlyQm9sZCcsIHNlcmlmO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDRyZW07XG4gIG1heC13aWR0aDogNjAlOyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgaDIge1xuICAgICAgZm9udC1zaXplOiAzcmVtOyB9IH1cblxuaDMge1xuICBjb2xvcjogI2MxNjk5NTtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICBtYXgtd2lkdGg6IDYwJTtcbiAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0UmVndWxhcicsIHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiAzMDA7XG4gIGZvbnQtc2l6ZTogMi4ycmVtOyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgaDMge1xuICAgICAgZm9udC1zaXplOiAycmVtOyB9IH1cblxubWFpbiB7XG4gIG1pbi1oZWlnaHQ6IDgwMHB4OyB9XG5cbi5tb2R1bGUge1xuICBmb250LXNpemU6IDEuMXJlbTsgfVxuXG4uaGF0Y2gtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAxcmVtOyB9XG4gIC5oYXRjaC1jb250ZW50IGgxIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICAgIHBhZGRpbmctYm90dG9tOiAzcmVtOyB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgIC5oYXRjaC1jb250ZW50IGgxIHtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9IH1cbiAgICAuaGF0Y2gtY29udGVudCBoMTphZnRlciB7XG4gICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICMzZTk5YzQ7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3R0b206IDA7XG4gICAgICBoZWlnaHQ6IDFyZW07XG4gICAgICB3aWR0aDogMnJlbTtcbiAgICAgIGxlZnQ6IDFyZW07IH1cbiAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQyNXB4KSB7XG4gICAgICAgIC5oYXRjaC1jb250ZW50IGgxOmFmdGVyIHtcbiAgICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7IH0gfVxuXG4uaGUtcm93ICo6bm90KGgxKTpub3QoaDIpOm5vdChoMykge1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7IH1cblxuLmhlLXJvdyB7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XG4gIC5oZS1yb3cgaW1nIHtcbiAgICBtYXJnaW46IDAgYXV0bzsgfVxuXG4uc3BhY2VyIHtcbiAgaGVpZ2h0OiAxNXJlbTsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAgIC5zcGFjZXIge1xuICAgICAgaGVpZ2h0OiAxcmVtOyB9IH1cblxuLmNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogMTMwMHB4OyB9XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gIC5oZS1yb3cgLmNvbnRhaW5lciB7XG4gICAgcGFkZGluZy10b3A6IDE3cHggIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLWxlZnQ6IDE3cHg7XG4gICAgcGFkZGluZy1yaWdodDogMTdweDsgfSB9XG5cbioge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7IH1cblxuaHRtbCwgYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDsgfVxuXG4uaGF0Y2gtbGVmdC1pbWFnZS1iaWcgaW1nIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiA5O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlOyB9XG5cbi5oYXRjaC1yaWdodC1pbWFnZS1iaWcgaW1nIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiA5O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlOyB9XG5cbi5oYXRjaC1sZWZ0LWltYWdlLWJpZyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZzogM3JlbSAwcmVtIDNyZW0gM3JlbTsgfVxuICAuaGF0Y2gtbGVmdC1pbWFnZS1iaWc6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogMjBweDtcbiAgICB0b3A6IDM1cHg7XG4gICAgaGVpZ2h0OiA5MiU7XG4gICAgd2lkdGg6IDk1JTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTZiZGYyO1xuICAgIHotaW5kZXg6IDE7IH1cblxuLmhhdGNoLXJpZ2h0LWltYWdlLWJpZy5kYXNoZWQ6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBpbml0aWFsO1xuICBib3JkZXI6IDExcHggZGFzaGVkICNkOWE3YzA7IH1cblxuLmhhdGNoLWxlZnQtaW1hZ2UtYmlnLnllbGxvdzphZnRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmM4ODEgIWltcG9ydGFudDsgfVxuXG4uaGF0Y2gtcmlnaHQtaW1hZ2UtYmlnIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAzcmVtIDNyZW0gM3JlbSAwcmVtOyB9XG4gIC5oYXRjaC1yaWdodC1pbWFnZS1iaWc6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAyMHB4O1xuICAgIHRvcDogMzVweDtcbiAgICBoZWlnaHQ6IDkyJTtcbiAgICB3aWR0aDogOTUlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkOWE3YzA7XG4gICAgei1pbmRleDogMTsgfVxuXG4uZmVhdHVyZWQtaXRlbXMge1xuICBoZWlnaHQ6IDNyZW07XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XG4gIGdyaWQtZ2FwOiAxcmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMTAwJTsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAgIC5mZWF0dXJlZC1pdGVtcyB7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpOyB9IH1cblxuYnV0dG9uIHtcbiAgZm9udC1mYW1pbHk6ICdQbGF5RmFpclJlZ3VsYXInOyB9XG5cbi5oYXRjaC1idG4ge1xuICBwYWRkaW5nOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4OyB9XG4gIC5oYXRjaC1idG4gYnV0dG9uIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZWZjODgxO1xuICAgIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICBjb2xvcjogI2VmYzg4MTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXM7XG4gICAgd2lkdGg6IDIycmVtO1xuICAgIGhlaWdodDogNHJlbTsgfVxuICAgIC5oYXRjaC1idG4gYnV0dG9uOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlNGE3M2E7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTRhNzNhO1xuICAgICAgY29sb3I6ICNmZmY7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgLmhhdGNoLWJ0biB7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxuICAgICAgLmhhdGNoLWJ0biBidXR0b24ge1xuICAgICAgICBmb250LXNpemU6IDFyZW07IH0gfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgIC5oYXRjaC1idG4gYnV0dG9uIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTsgfSB9XG5cbi5mZWF0dXJlZC1pdGVtIGgxIHtcbiAgZm9udC1zaXplOiAycmVtOyB9XG5cbi5oYXRjaC1saW5rIHtcbiAgdHJhbnNpdGlvbjogYWxsIDMwMG1zO1xuICBjdXJzb3I6IHBvaW50ZXI7IH1cbiAgLmhhdGNoLWxpbmsgaDEge1xuICAgIGNvbG9yOiAjZWZjODgxOyB9XG4gIC5oYXRjaC1saW5rOmhvdmVyIGgxIHtcbiAgICBjb2xvcjogI2U0YTczYTsgfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICBmb290ZXIge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfSB9XG5cbi5oYXRjaC1pbnN0YWdyYW0ge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG4gIG1hcmdpbi10b3A6IDFyZW07IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAuaGF0Y2gtaW5zdGFncmFtIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0bzsgfSB9XG4gIC5oYXRjaC1pbnN0YWdyYW0gcCB7XG4gICAgZm9udC1mYW1pbHk6ICdQbGF5RmFpclJlZ3VsYXInLCBzZXJpZjtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2UzZTNlMzsgfVxuICAuaGF0Y2gtaW5zdGFncmFtIC5sZWZ0LXNlY3Rpb24ge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgIGdyaWQtZ2FwOiAxcmVtOyB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgIC5oYXRjaC1pbnN0YWdyYW0gLmxlZnQtc2VjdGlvbiB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0bzsgfSB9XG4gIC5oYXRjaC1pbnN0YWdyYW0gLmhhdGNoLWxvZ28ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcGFkZGluZzogMXJlbTsgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQyNXB4KSB7XG4gICAgICAuaGF0Y2gtaW5zdGFncmFtIC5oYXRjaC1sb2dvIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTsgfSB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgIC5oYXRjaC1pbnN0YWdyYW0gLmhhdGNoLWxvZ28ge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfSB9XG4gIC5oYXRjaC1pbnN0YWdyYW0gLmluc3RhZ3JhbS1pdGVtcyB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgZ3JpZC1nYXA6IDFyZW07IH1cbiAgICAuaGF0Y2gtaW5zdGFncmFtIC5pbnN0YWdyYW0taXRlbXMgZGl2IHtcbiAgICAgIHBhZGRpbmc6IDAuNXJlbTsgfVxuXG4uYmxvY2tzLWdhbGxlcnktZ3JpZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XG4gIC5ibG9ja3MtZ2FsbGVyeS1ncmlkIC5ibG9ja3MtZ2FsbGVyeS1pdGVtIHtcbiAgICBwYWRkaW5nOiAxcmVtOyB9XG5cbi5oYXMtdGV4dC1hbGlnbi1jZW50ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMCBhdXRvOyB9XG5cbi53cC1ibG9jay1pbWFnZSB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IDAuN3JlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gIC53cC1ibG9jay1pbWFnZSBpbWcge1xuICAgIG1hcmdpbjogMCBhdXRvOyB9XG5cbi5oYXRjaC1ociBociB7XG4gIHdpZHRoOiAxLjVyZW07XG4gIG1hcmdpbjogMC41cmVtIGF1dG87XG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjYWMzMzVlOyB9XG5cbi5ibG9nLXBvc3RzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcbiAgZ3JpZC1nYXA6IDEuNXJlbTsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAgIC5ibG9nLXBvc3RzIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0bztcbiAgICAgIHBhZGRpbmc6IDNyZW07IH0gfVxuICAuYmxvZy1wb3N0cyAucG9zdCB7XG4gICAgdHJhbnNpdGlvbjogYWxsIDMwMG1zO1xuICAgIG9wYWNpdHk6IDAuODsgfVxuICAgIC5ibG9nLXBvc3RzIC5wb3N0OmhvdmVyIHtcbiAgICAgIG9wYWNpdHk6IDE7IH1cbiAgICAuYmxvZy1wb3N0cyAucG9zdCBoMSB7XG4gICAgICBmb250LXNpemU6IDIuNXJlbTsgfVxuICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgICAgLmJsb2ctcG9zdHMgLnBvc3QgaDEge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMnJlbTsgfSB9XG4gICAgLmJsb2ctcG9zdHMgLnBvc3QgaDQge1xuICAgICAgZm9udC1zaXplOiAxLjdyZW07IH1cbiAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQyNXB4KSB7XG4gICAgICAgIC5ibG9nLXBvc3RzIC5wb3N0IGg0IHtcbiAgICAgICAgICBmb250LXNpemU6IDEuNHJlbTsgfSB9XG4gICAgLmJsb2ctcG9zdHMgLnBvc3QgaW1nIHtcbiAgICAgIHdpZHRoOiAxMDAlOyB9XG5cbi5zdWJzY3JpYmUtd3JhcHBlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNhNjhkY2I7IH1cbiAgLnN1YnNjcmliZS13cmFwcGVyIC5zdWJzY3JpYmUge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgIGdyaWQtZ2FwOiA0cmVtO1xuICAgIG1heC13aWR0aDogMTEycmVtO1xuICAgIG1hcmdpbjogMCBhdXRvOyB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgIC5zdWJzY3JpYmUtd3JhcHBlciAuc3Vic2NyaWJlIHtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAwLjNmciAxZnI7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogaW5pdGlhbDtcbiAgICAgICAgcGFkZGluZzogMnJlbTsgfSB9XG4gIC5zdWJzY3JpYmUtd3JhcHBlciBwLCAuc3Vic2NyaWJlLXdyYXBwZXIgaDIge1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwOyB9XG4gIC5zdWJzY3JpYmUtd3JhcHBlciBoMiB7XG4gICAgcGFkZGluZzogMDsgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQyNXB4KSB7XG4gICAgICAuc3Vic2NyaWJlLXdyYXBwZXIgaDIge1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9IH1cbiAgLnN1YnNjcmliZS13cmFwcGVyIGltZyB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlOyB9XG4gIC5zdWJzY3JpYmUtd3JhcHBlciAuc3Vic2NyaWJlLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxuICAgIC5zdWJzY3JpYmUtd3JhcHBlciAuc3Vic2NyaWJlLWNvbnRlbnQgLnN1YnNjcmliZS1mb3JtIGZvcm0ge1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcbiAgICAgIGdyaWQtZ2FwOiAxcmVtO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi10b3A6IDRyZW07IH1cbiAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAgIC5zdWJzY3JpYmUtd3JhcHBlciAuc3Vic2NyaWJlLWNvbnRlbnQgLnN1YnNjcmliZS1mb3JtIGZvcm0ge1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogaW5pdGlhbDtcbiAgICAgICAgICBoZWlnaHQ6IDE4cmVtOyB9IH1cbiAgICAgIC5zdWJzY3JpYmUtd3JhcHBlciAuc3Vic2NyaWJlLWNvbnRlbnQgLnN1YnNjcmliZS1mb3JtIGZvcm0gaW5wdXQge1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cblxuZm9ybSBidXR0b24ge1xuICBoZWlnaHQ6IDRyZW07XG4gIHdpZHRoOiAxNnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U0YTczYTtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDdweDtcbiAgZm9udC1mYW1pbHk6ICdwbGF5RmFpclJlZ3VsYXInO1xuICB0cmFuc2l0aW9uOiBhbGwgMzAwbXM7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICBmb3JtIGJ1dHRvbiB7XG4gICAgICB3aWR0aDogMTAwJTsgfSB9XG4gIGZvcm0gYnV0dG9uOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZTRhNzNhOyB9XG5cbiNzYXBwZXIgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgLyogQ2hyb21lLCBGaXJlZm94LCBPcGVyYSwgU2FmYXJpIDEwLjErICovXG4gIGNvbG9yOiAjZmZmO1xuICBvcGFjaXR5OiAxO1xuICAvKiBGaXJlZm94ICovIH1cblxuI3NhcHBlciA6Oi1tb3otcGxhY2Vob2xkZXIge1xuICAvKiBDaHJvbWUsIEZpcmVmb3gsIE9wZXJhLCBTYWZhcmkgMTAuMSsgKi9cbiAgY29sb3I6ICNmZmY7XG4gIG9wYWNpdHk6IDE7XG4gIC8qIEZpcmVmb3ggKi8gfVxuXG4jc2FwcGVyIDotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAvKiBDaHJvbWUsIEZpcmVmb3gsIE9wZXJhLCBTYWZhcmkgMTAuMSsgKi9cbiAgY29sb3I6ICNmZmY7XG4gIG9wYWNpdHk6IDE7XG4gIC8qIEZpcmVmb3ggKi8gfVxuXG4jc2FwcGVyIDo6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgLyogQ2hyb21lLCBGaXJlZm94LCBPcGVyYSwgU2FmYXJpIDEwLjErICovXG4gIGNvbG9yOiAjZmZmO1xuICBvcGFjaXR5OiAxO1xuICAvKiBGaXJlZm94ICovIH1cblxuI3NhcHBlciA6OnBsYWNlaG9sZGVyIHtcbiAgLyogQ2hyb21lLCBGaXJlZm94LCBPcGVyYSwgU2FmYXJpIDEwLjErICovXG4gIGNvbG9yOiAjZmZmO1xuICBvcGFjaXR5OiAxO1xuICAvKiBGaXJlZm94ICovIH1cblxuI3NhcHBlciA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTAtMTEgKi9cbiAgY29sb3I6ICNmZmY7IH1cblxuI3NhcHBlciA6Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gIC8qIE1pY3Jvc29mdCBFZGdlICovXG4gIGNvbG9yOiAjZmZmOyB9XG5cbiNzYXBwZXIgaW5wdXQge1xuICB0cmFuc2l0aW9uOiBhbGwgMzAwbXM7XG4gIGhlaWdodDogMy41cmVtO1xuICB3aWR0aDogMTAwJTsgfVxuXG4jc2FwcGVyIHRleHRhcmVhLCAjc2FwcGVyIGlucHV0IHtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2ZmZjsgfVxuXG4jc2FwcGVyIHRleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTsgfVxuXG4uY29udGVudC13cmFwcGVyIHtcbiAgbWF4LXdpZHRoOiA4MHJlbTtcbiAgbWFyZ2luOiAwIGF1dG87IH1cblxuLmxvYWRlciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB6LWluZGV4OiA5OTk5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4zcyBlYXNlLW91dCx0cmFuc2Zvcm0gMHMgLjNzIGxpbmVhcjtcbiAgZGlzcGxheTogYmxvY2s7IH1cbi8qIyBzb3VyY2VNYXBwaW5nVVJMPXNyYy9yb3V0ZXMvX2xheW91dC5zdmVsdGUubWFwICovIl19 */</style>\\n\\n<Nav {segment} />\\n\\n<main> \\n  <slot></slot> \\n</main>\\n\\n<Footer />\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$2);

	return `${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}

<main>${$$slots.default ? $$slots.default({}) : ``}</main>

${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});

/* src/routes/_error.svelte generated by Svelte v3.22.3 */

const css$3 = {
	code: "h1.svelte-1xjwv3d,p.svelte-1xjwv3d{margin:0 auto}h1.svelte-1xjwv3d{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-1xjwv3d{margin:1em auto}@media(min-width: 480px){h1.svelte-1xjwv3d{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = undefined === 'development';\\n</script>\\n\\n<style>\\nh1, p {\\n\\tmargin: 0 auto;\\n}\\n\\nh1 {\\n\\tfont-size: 2.8em;\\n\\tfont-weight: 700;\\n\\tmargin: 0 0 0.5em 0;\\n}\\n\\np {\\n\\tmargin: 1em auto;\\n}\\n\\n@media (min-width: 480px) {\\n\\th1 {\\n\\t\\tfont-size: 4em;\\n\\t}\\n}\\n\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7Q0FDQyxnQkFBZ0I7Q0FDaEIsZ0JBQWdCO0NBQ2hCLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDO0VBQ0MsY0FBYztDQUNmO0FBQ0QiLCJmaWxlIjoic3JjL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlIiwic291cmNlc0NvbnRlbnQiOlsiXG5oMSwgcCB7XG5cdG1hcmdpbjogMCBhdXRvO1xufVxuXG5oMSB7XG5cdGZvbnQtc2l6ZTogMi44ZW07XG5cdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdG1hcmdpbjogMCAwIDAuNWVtIDA7XG59XG5cbnAge1xuXHRtYXJnaW46IDFlbSBhdXRvO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcblx0aDEge1xuXHRcdGZvbnQtc2l6ZTogNGVtO1xuXHR9XG59XG4iXX0= */</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<div class=\\\"container mx-auto\\\">\\n\\t<div class=\\\"text-center\\\">\\n\\t\\t<h1>{status}</h1>\\n\\t\\t<p>{error.message}</p>\\n\\t</div>\\n</div>\\n\\n<!-- {#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if} -->\\n\"],\"names\":[],\"mappings\":\"AAQA,iBAAE,CAAE,CAAC,eAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,eAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$3);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<div class="${"container mx-auto"}"><div class="${"text-center"}"><h1 class="${"svelte-1xjwv3d"}">${escape(status)}</h1>
		<p class="${"svelte-1xjwv3d"}">${escape(error.message)}</p></div></div>

`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		
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
			// essential-oils-101.svelte
			pattern: /^\/essential-oils-101\/?$/,
			parts: [
				{ name: "essential$45oils$45101", file: "essential-oils-101.svelte", component: Essential_oils_101, preload: preload$1 }
			]
		},

		{
			// pursue-your-dreams.svelte
			pattern: /^\/pursue-your-dreams\/?$/,
			parts: [
				{ name: "pursue$45your$45dreams", file: "pursue-your-dreams.svelte", component: Pursue_your_dreams, preload: preload$2 }
			]
		},

		{
			// about-hatch.svelte
			pattern: /^\/about-hatch\/?$/,
			parts: [
				{ name: "about$45hatch", file: "about-hatch.svelte", component: About_hatch, preload: preload$3 }
			]
		},

		{
			// instagram/index.svelte
			pattern: /^\/instagram\/?$/,
			parts: [
				{ name: "instagram", file: "instagram/index.svelte", component: Instagram }
			]
		},

		{
			// instagram/[slug].svelte
			pattern: /^\/instagram\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "instagram_$slug", file: "instagram/[slug].svelte", component: U5Bslugu5D, preload: preload$4, params: match => ({ slug: d(match[1]) }) }
			]
		},

		{
			// the-blog/index.svelte
			pattern: /^\/the-blog\/?$/,
			parts: [
				{ name: "the$45blog", file: "the-blog/index.svelte", component: The_blog, preload: preload$5 }
			]
		},

		{
			// the-blog/[slug].svelte
			pattern: /^\/the-blog\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "the$45blog_$slug", file: "the-blog/[slug].svelte", component: U5Bslugu5D$1, preload: preload$6, params: match => ({ slug: d(match[1]) }) }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

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
