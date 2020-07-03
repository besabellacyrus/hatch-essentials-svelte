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
	: ``}<script src="${"https://f.convertkit.com/ckjs/ck.5.js"}"></script>`, "")}

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
		cache: await client.query({ query: PAGE, variables: { slug: slug$1 } }),
		slug: slug$1
	};
}

const Essential_oils_101 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $pages;
	let { cache } = $$props;
	let { slug } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);

	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const pages = svelteApollo.query(client, { query: PAGE, variables: { slug } });

	$pages = get_store_value(pages);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
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
	code: ".become-a-member-wrapper.svelte-1vdhjgm.svelte-1vdhjgm{margin:2rem 0 2rem}.become-a-member.svelte-1vdhjgm.svelte-1vdhjgm{display:grid;grid-template-columns:1fr 1fr;grid-gap:1.5rem}@media screen and (max-width: 552px){.become-a-member.svelte-1vdhjgm.svelte-1vdhjgm{display:flex;flex-direction:column-reverse;grid-template-columns:initial}}@media screen and (min-width: 768px) and (max-width: 1024px){.become-a-member.svelte-1vdhjgm .member-forms.svelte-1vdhjgm{padding-left:2rem}}@media screen and (max-width: 768px){.become-a-member.svelte-1vdhjgm .member-forms.svelte-1vdhjgm{display:initial;grid-template-columns:initial;height:40rem}}@media screen and (max-width: 768px){.become-a-member.svelte-1vdhjgm .member-forms form.svelte-1vdhjgm{padding:2rem}}.become-a-member.svelte-1vdhjgm form.svelte-1vdhjgm{display:grid;grid-template-rows:1fr;grid-gap:1rem;width:100%}.become-a-member.svelte-1vdhjgm form input.svelte-1vdhjgm,.become-a-member.svelte-1vdhjgm form textarea.svelte-1vdhjgm{width:100% !important}.become-a-member.svelte-1vdhjgm form .upper.svelte-1vdhjgm{display:grid;grid-gap:1rem}.become-a-member.svelte-1vdhjgm form .upper input.svelte-1vdhjgm{height:4rem}.become-a-member.svelte-1vdhjgm form .lower.svelte-1vdhjgm{display:grid;grid-gap:1rem;justify-items:right}.become-a-member.svelte-1vdhjgm form .lower textarea.svelte-1vdhjgm{width:100%}.become-a-member.svelte-1vdhjgm form button.svelte-1vdhjgm:hover{color:#5d5d5d}.become-a-member.svelte-1vdhjgm .become-a-member-content.svelte-1vdhjgm{display:flex}@media screen and (max-width: 768px){.become-a-member.svelte-1vdhjgm .become-a-member-content.svelte-1vdhjgm{text-align:center}}.become-a-member.svelte-1vdhjgm .become-a-member-content p.svelte-1vdhjgm{padding:0 1rem 1rem}.become-a-member.svelte-1vdhjgm input.svelte-1vdhjgm,.become-a-member.svelte-1vdhjgm textarea.svelte-1vdhjgm{border:1px solid #959595 !important;padding-left:1rem}.become-a-member.svelte-1vdhjgm textarea.svelte-1vdhjgm{padding-top:0.5rem}.become-a-member.svelte-1vdhjgm .svelte-1vdhjgm::-webkit-input-placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-1vdhjgm .svelte-1vdhjgm::-moz-placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-1vdhjgm .svelte-1vdhjgm:-ms-input-placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-1vdhjgm .svelte-1vdhjgm::-ms-input-placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-1vdhjgm .svelte-1vdhjgm::placeholder{color:#959595 !important;opacity:1}.become-a-member.svelte-1vdhjgm .svelte-1vdhjgm:-ms-input-placeholder{color:#959595 !important}.become-a-member.svelte-1vdhjgm .svelte-1vdhjgm::-ms-input-placeholder{color:#959595 !important}",
	map: "{\"version\":3,\"file\":\"BecomeMember.svelte\",\"sources\":[\"BecomeMember.svelte\"],\"sourcesContent\":[\"<script>\\n  import { subscriber } from \\\"../../store/member.js\\\";\\n  let sent = false;\\n\\n  async function handleSubmit(event) {\\n    if (!sent) {\\n      let formData = new FormData();\\n      formData.append(\\\"your-name\\\", event.target.name.value);\\n      formData.append(\\\"your-email\\\", event.target.email.value);\\n      formData.append(\\\"your-message\\\", event.target.message.value);\\n\\n      const res = await fetch(\\n        \\\"http://hatchessentials.com/wp-api/wp-json/contact-form-7/v1/contact-forms/89/feedback\\\",\\n        {\\n          method: \\\"POST\\\",\\n          body: formData\\n        }\\n      ).then(e => {\\n        if (e.statusText === \\\"OK\\\") {\\n          sent = true;\\n          $subscriber.name = \\\"\\\";\\n          $subscriber.email = \\\"\\\";\\n          $subscriber.message = \\\"\\\";\\n        }\\n      });\\n    }\\n  }\\n</script>\\n\\n<style lang=\\\"scss\\\">.become-a-member-wrapper {\\n  margin: 2rem 0 2rem; }\\n\\n.become-a-member {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr;\\n  grid-gap: 1.5rem; }\\n  @media screen and (max-width: 552px) {\\n    .become-a-member {\\n      display: flex;\\n      flex-direction: column-reverse;\\n      grid-template-columns: initial; } }\\n  @media screen and (min-width: 768px) and (max-width: 1024px) {\\n    .become-a-member .member-forms {\\n      padding-left: 2rem; } }\\n  @media screen and (max-width: 768px) {\\n    .become-a-member .member-forms {\\n      display: initial;\\n      grid-template-columns: initial;\\n      height: 40rem; } }\\n  @media screen and (max-width: 768px) {\\n    .become-a-member .member-forms form {\\n      padding: 2rem; } }\\n  .become-a-member h3 {\\n    padding: 0 1rem; }\\n  .become-a-member h2 {\\n    max-width: initial; }\\n  .become-a-member form {\\n    display: grid;\\n    grid-template-rows: 1fr;\\n    grid-gap: 1rem;\\n    width: 100%; }\\n    .become-a-member form input,\\n    .become-a-member form textarea {\\n      width: 100% !important; }\\n    .become-a-member form .upper {\\n      display: grid;\\n      grid-gap: 1rem; }\\n      .become-a-member form .upper input {\\n        height: 4rem; }\\n    .become-a-member form .lower {\\n      display: grid;\\n      grid-gap: 1rem;\\n      justify-items: right; }\\n      .become-a-member form .lower textarea {\\n        width: 100%; }\\n    .become-a-member form button:hover {\\n      color: #5d5d5d; }\\n  .become-a-member .become-a-member-content {\\n    display: flex;\\n    /*justify-content: center;*/\\n    /*align-items: center;*/\\n    /*height: 26rem;*/ }\\n    @media screen and (max-width: 768px) {\\n      .become-a-member .become-a-member-content {\\n        text-align: center; }\\n        .become-a-member .become-a-member-content h3 {\\n          margin: 0 auto; } }\\n    .become-a-member .become-a-member-content h2 {\\n      white-space: initial;\\n      line-height: 1.3;\\n      padding: 0 1rem 1rem; }\\n    .become-a-member .become-a-member-content p {\\n      padding: 0 1rem 1rem; }\\n  .become-a-member input,\\n  .become-a-member textarea {\\n    /*color: #959595 !important;*/\\n    border: 1px solid #959595 !important;\\n    padding-left: 1rem; }\\n  .become-a-member textarea {\\n    /*color: #959595 !important;*/\\n    padding-top: 0.5rem; }\\n  .become-a-member ::-webkit-input-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member ::-moz-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member :-ms-input-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member ::-ms-input-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member ::placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .become-a-member :-ms-input-placeholder {\\n    /* Internet Explorer 10-11 */\\n    color: #959595 !important; }\\n  .become-a-member ::-ms-input-placeholder {\\n    /* Microsoft Edge */\\n    color: #959595 !important; }\\n/*# sourceMappingURL=src/components/page_elements/BecomeMember.svelte.map */</style>\\n\\n<div class=\\\"become-a-member-wrapper\\\">\\n  <div class=\\\"container mx-auto text-center\\\">\\n    <h3 class=\\\"mx-auto\\\">I WANT TO DO THIS NOW</h3>\\n    <h2 class=\\\"mx-auto\\\">BECOME A MEMBER OF HATCH ESSENTIALS</h2>\\n  </div>\\n  <div class=\\\"container mx-auto mt-5\\\">\\n    <div class=\\\"become-a-member\\\">\\n      <div class=\\\"member-forms\\\">\\n        <img\\n          src=\\\"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/BECOME-A-MEMBER.png\\\"\\n          alt=\\\"hatchessentials become a member\\\" />\\n      </div>\\n      <div class=\\\"become-a-member-content\\\">\\n        <div class=\\\"px-5\\\">\\n          <p>\\n            Our community is a safe and loving place for you to get the best\\n            “oil-ducation”. Once you become a member, you’ll get access to my\\n            exclusive, member’s only group. This is where you can get weekly\\n            classes, diffuser recipes, DIY projects, and also an opportunity to\\n            join our mentorship groups, connect with like-minded individuals and\\n            so much more!\\n            <br />\\n            As a free gift when you get started with me, you also get a\\n            reference app and a DIY kit* that can help you get those oily DIY\\n            projects started easily. Yey for FREE stuff!\\n            <br />\\n            <small>\\n              *DIY kit is only for Philippine based members, if you are an\\n              international, email me and I will let you know what is the new\\n              free offer.\\n            </small>\\n          </p>\\n          <form on:submit|preventDefault={handleSubmit}>\\n            <div class=\\\"upper\\\">\\n              <input\\n                type=\\\"text\\\"\\n                id=\\\"name\\\"\\n                name=\\\"name\\\"\\n                bind:value={$subscriber.name}\\n                placeholder=\\\"Your Name Here\\\" />\\n              <input\\n                type=\\\"email\\\"\\n                id=\\\"email\\\"\\n                name=\\\"email\\\"\\n                bind:value={$subscriber.email}\\n                placeholder=\\\"Your Email Here\\\" />\\n            </div>\\n            <div class=\\\"lower mb-10\\\">\\n              <textarea\\n                name=\\\"message\\\"\\n                id=\\\"message\\\"\\n                cols=\\\"30\\\"\\n                rows=\\\"10\\\"\\n                bind:value={$subscriber.message}\\n                placeholder=\\\"Message\\\" />\\n              <button>\\n                <em>Submit</em>\\n              </button>\\n            </div>\\n          </form>\\n          {#if sent}\\n            <p>Thank you!</p>\\n          {/if}\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const BecomeMember = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $subscriber = get_store_value(subscriber);

	$$result.css.add(css);

	return `<div class="${"become-a-member-wrapper svelte-1vdhjgm"}"><div class="${"container mx-auto text-center"}"><h3 class="${"mx-auto"}">I WANT TO DO THIS NOW</h3>
    <h2 class="${"mx-auto"}">BECOME A MEMBER OF HATCH ESSENTIALS</h2></div>
  <div class="${"container mx-auto mt-5"}"><div class="${"become-a-member svelte-1vdhjgm"}"><div class="${"member-forms svelte-1vdhjgm"}"><img src="${"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/BECOME-A-MEMBER.png"}" alt="${"hatchessentials become a member"}" class="${"svelte-1vdhjgm"}"></div>
      <div class="${"become-a-member-content svelte-1vdhjgm"}"><div class="${"px-5 svelte-1vdhjgm"}"><p class="${"svelte-1vdhjgm"}">Our community is a safe and loving place for you to get the best
            “oil-ducation”. Once you become a member, you’ll get access to my
            exclusive, member’s only group. This is where you can get weekly
            classes, diffuser recipes, DIY projects, and also an opportunity to
            join our mentorship groups, connect with like-minded individuals and
            so much more!
            <br class="${"svelte-1vdhjgm"}">
            As a free gift when you get started with me, you also get a
            reference app and a DIY kit* that can help you get those oily DIY
            projects started easily. Yey for FREE stuff!
            <br class="${"svelte-1vdhjgm"}">
            <small class="${"svelte-1vdhjgm"}">*DIY kit is only for Philippine based members, if you are an
              international, email me and I will let you know what is the new
              free offer.
            </small></p>
          <form class="${"svelte-1vdhjgm"}"><div class="${"upper svelte-1vdhjgm"}"><input type="${"text"}" id="${"name"}" name="${"name"}" placeholder="${"Your Name Here"}" class="${"svelte-1vdhjgm"}"${add_attribute("value", $subscriber.name, 1)}>
              <input type="${"email"}" id="${"email"}" name="${"email"}" placeholder="${"Your Email Here"}" class="${"svelte-1vdhjgm"}"${add_attribute("value", $subscriber.email, 1)}></div>
            <div class="${"lower mb-10 svelte-1vdhjgm"}"><textarea name="${"message"}" id="${"message"}" cols="${"30"}" rows="${"10"}" placeholder="${"Message"}" class="${"svelte-1vdhjgm"}">${$subscriber.message || ""}</textarea>
              <button class="${"svelte-1vdhjgm"}"><em class="${"svelte-1vdhjgm"}">Submit</em></button></div></form>
          ${ ``}</div></div></div></div></div>`;
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
	let { slug } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);

	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const pages = svelteApollo.query(client, { query: PAGE, variables: { slug } });

	$pages = get_store_value(pages);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
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
	})}

${validate_component(BecomeMember, "BecomeMember").$$render($$result, {}, {}, {})}`;
});

/* src/routes/about-hatch.svelte generated by Svelte v3.22.3 */
let slug$3 = "about-hatch";

async function preload$3() {
	return {
		cache: await client.query({ query: PAGE, variables: { slug: slug$3 } }),
		slug: slug$3
	};
}

const About_hatch = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $pages;
	let { cache } = $$props;
	let { slug } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);

	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const pages = svelteApollo.query(client, { query: PAGE, variables: { slug } });

	$pages = get_store_value(pages);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
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
              ${post.categories.nodes.length > 0 && post.categories.nodes[0].slug !== "uncategorized"
				? `<h4 class="${"text-center mx-auto"}">${escape(capitalize(post.categories.nodes[0].slug))}
                </h4>`
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
			if (is_promise(__value)) return ``;

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

const contact = writable({
	first_name: "",
	last_name: "",
  email: "",
  essential_oils: "",
  living_member: "",
	message: ""
});

/* src/components/page_elements/SocialMediaIcons.svelte generated by Svelte v3.22.3 */

const SocialMediaIcons = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<div class="${"w-64 mx-auto flex justify-between mt-5"}"><a href="${"https://www.facebook.com/hatchessentials"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"28"}" height="${"28"}" viewBox="${"0 0 28 28"}"><g id="${"facebook"}" transform="${"translate(-2 -2)"}"><path id="${"Path_1176"}" data-name="${"Path 1176"}" d="${"M27.5,2.5H4.563A2.062,2.062,0,0,0,2.5,4.563V27.5a2,2,0,0,0,2,2h23a2,2,0,0,0,2-2V4.5A2,2,0,0,0,27.5,2.5Z"}" fill="${"#fff"}"></path><path id="${"Path_1177"}" data-name="${"Path 1177"}" d="${"M5,4A1,1,0,0,0,4,5V29a1.987,1.987,0,0,0,.054.446A1.987,1.987,0,0,0,4.5,29.5h23a2,2,0,0,0,2-2V4.5a1.987,1.987,0,0,0-.054-.446A1.987,1.987,0,0,0,29,4Z"}" fill="${"#4386de"}"></path><path id="${"Path_1178"}" data-name="${"Path 1178"}" d="${"M17.5,29.5v-10h-4v-4h4v-5a4,4,0,0,1,4-4h4v4h-3a1,1,0,0,0-1,1v4h4l-.5,4H21.5v10Z"}" fill="${"#fff"}"></path><g id="${"Group_2"}" data-name="${"Group 2"}"><path id="${"Path_1179"}" data-name="${"Path 1179"}" d="${"M15.5,30H4.5A2.5,2.5,0,0,1,2,27.5V9.5a.5.5,0,0,1,1,0v18A1.5,1.5,0,0,0,4.5,29h11a.5.5,0,0,1,0,1Z"}" fill="${"#455a64"}"></path><path id="${"Path_1180"}" data-name="${"Path 1180"}" d="${"M27.5,30h-6a.5.5,0,0,1-.5-.5v-10a.5.5,0,0,1,.5-.5h3.059l.375-3H21.5a.5.5,0,0,1-.5-.5v-4A1.5,1.5,0,0,1,22.5,10H25V7H21.5A3.5,3.5,0,0,0,18,10.5v5a.5.5,0,0,1-.5.5H14v3h3.5a.5.5,0,0,1,.5.5v10a.5.5,0,0,1-1,0V20H13.5a.5.5,0,0,1-.5-.5v-4a.5.5,0,0,1,.5-.5H17V10.5A4.505,4.505,0,0,1,21.5,6h4a.5.5,0,0,1,.5.5v4a.5.5,0,0,1-.5.5h-3a.5.5,0,0,0-.5.5V15h3.5a.5.5,0,0,1,.5.563l-.5,4A.5.5,0,0,1,25,20H22v9h5.5A1.5,1.5,0,0,0,29,27.5V4.5A1.5,1.5,0,0,0,27.5,3H4.5A1.5,1.5,0,0,0,3,4.5v1a.5.5,0,0,1-1,0v-1A2.5,2.5,0,0,1,4.5,2h23A2.5,2.5,0,0,1,30,4.5v23A2.5,2.5,0,0,1,27.5,30Z"}" fill="${"#455a64"}"></path></g><g id="${"Group_8"}" data-name="${"Group 8"}"><g id="${"Group_7"}" data-name="${"Group 7"}"><g id="${"Group_6"}" data-name="${"Group 6"}"><g id="${"Group_5"}" data-name="${"Group 5"}"><g id="${"Group_4"}" data-name="${"Group 4"}"><g id="${"Group_3"}" data-name="${"Group 3"}"><path id="${"Path_1181"}" data-name="${"Path 1181"}" d="${"M3,7.5a.5.5,0,0,1-.5.5h0A.5.5,0,0,1,2,7.5H2A.5.5,0,0,1,2.5,7h0a.5.5,0,0,1,.5.5Z"}" fill="${"#455a64"}"></path></g></g></g></g></g></g></g></svg></a>
  <a href="${"http://m.me/hatchessentials"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"30"}" height="${"30"}" viewBox="${"0 0 30 30"}"><g id="${"Facebook_x2C__messenger"}" transform="${"translate(-1 -1)"}"><path id="${"Path_1166"}" data-name="${"Path 1166"}" d="${"M16,1.5c-8.156,0-14.5,6.094-14.5,14A13.683,13.683,0,0,0,5.867,25.557c.068.067.146.142.244.229a1.155,1.155,0,0,1,.394.825l.1,3.165a.745.745,0,0,0,1.046.659l3.411-1.5a1.128,1.128,0,0,1,.545-.078A15.18,15.18,0,0,0,16,29.5a14.185,14.185,0,0,0,14.5-14C30.5,7.594,24.219,1.5,16,1.5Z"}" fill="${"#fff"}"></path><path id="${"Path_1167"}" data-name="${"Path 1167"}" d="${"M7.648,30.436l3.411-1.5a1.128,1.128,0,0,1,.545-.078A15.214,15.214,0,0,0,16,29.5a14.185,14.185,0,0,0,14.5-14,14.18,14.18,0,0,0-.516-3.766A14.218,14.218,0,0,0,16.5,3C8.344,3,2,9.094,2,17a4.353,4.353,0,0,1-.216,1.278,13.715,13.715,0,0,0,4.083,7.279c.068.067.146.142.244.229a1.155,1.155,0,0,1,.394.825l.1,3.165A.746.746,0,0,0,7.648,30.436Z"}" fill="${"#3e99c4"}"></path><path id="${"Path_1168"}" data-name="${"Path 1168"}" d="${"M7.347,31A1.246,1.246,0,0,1,6.1,29.792l-.1-3.165a.652.652,0,0,0-.227-.467c-.105-.095-.19-.175-.263-.248A14.353,14.353,0,0,1,5.188,5.328a.5.5,0,1,1,.706.709,13.353,13.353,0,0,0,.314,19.155c.073.072.146.141.236.222A1.649,1.649,0,0,1,7.005,26.6l.1,3.165a.239.239,0,0,0,.114.2.237.237,0,0,0,.23.017l3.411-1.5a1.619,1.619,0,0,1,.781-.12.465.465,0,0,1,.11.021A14.744,14.744,0,0,0,16,29c7.851,0,14-5.93,14-13.5C30,7.8,23.981,2,16,2A14.637,14.637,0,0,0,9.593,3.43a.5.5,0,1,1-.434-.9A15.641,15.641,0,0,1,16,1c8.411,0,15,6.369,15,14.5S24.411,30,16,30a15.72,15.72,0,0,1-4.481-.65.592.592,0,0,0-.257.04l-3.412,1.5A1.265,1.265,0,0,1,7.347,31Z"}" fill="${"#455a64"}"></path><g id="${"Group_1"}" data-name="${"Group 1"}"><path id="${"Path_1169"}" data-name="${"Path 1169"}" d="${"M7.348,19.548l4.234-6.708a2.163,2.163,0,0,1,3.124-.576l3.366,2.523a.87.87,0,0,0,1.042,0l4.546-3.447a.684.684,0,0,1,.992.91l-4.23,6.7a2.164,2.164,0,0,1-3.125.577L13.932,17a.869.869,0,0,0-1.042,0L8.34,20.457a.684.684,0,0,1-.992-.909Z"}" fill="${"#fff"}"></path><path id="${"Path_1170"}" data-name="${"Path 1170"}" d="${"M7.928,21.1a1.219,1.219,0,0,1-1.048-.629,1.158,1.158,0,0,1,.046-1.193l4.233-6.707a2.662,2.662,0,0,1,3.846-.709l3.366,2.523a.375.375,0,0,0,.441,0l4.544-3.446a1.216,1.216,0,0,1,1.762.382,1.16,1.16,0,0,1-.045,1.194l-4.23,6.7a2.664,2.664,0,0,1-3.848.71L13.63,17.4a.377.377,0,0,0-.441,0L8.641,20.856A1.176,1.176,0,0,1,7.928,21.1Zm5.486-8.77A1.656,1.656,0,0,0,12,13.106L7.771,19.815a.155.155,0,0,0-.014.176.183.183,0,0,0,.28.068l4.55-3.45a1.389,1.389,0,0,1,1.643,0L17.6,19.128a1.705,1.705,0,0,0,2.4-.443l4.23-6.7a.159.159,0,0,0,.014-.178.182.182,0,0,0-.28-.068l-4.546,3.447a1.388,1.388,0,0,1-1.642.005l-3.368-2.524A1.642,1.642,0,0,0,13.414,12.332Z"}" fill="${"#455a64"}"></path></g><circle id="${"Ellipse_1"}" data-name="${"Ellipse 1"}" cx="${"0.5"}" cy="${"0.5"}" r="${"0.5"}" transform="${"translate(7 3.5)"}" fill="${"#455a64"}"></circle></g></svg></a>
  <a href="${"https://www.instagram.com/hatchessentials/"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" width="${"28"}" height="${"28"}" viewBox="${"0 0 28 28"}"><g id="${"Instagram"}" transform="${"translate(-2 -2)"}"><path id="${"Path_1171"}" data-name="${"Path 1171"}" d="${"M23,29.5H9A6.5,6.5,0,0,1,2.5,23V9A6.5,6.5,0,0,1,9,2.5H23A6.5,6.5,0,0,1,29.5,9V23A6.5,6.5,0,0,1,23,29.5Z"}" fill="${"#dc4c5a"}"></path><path id="${"Path_1172"}" data-name="${"Path 1172"}" d="${"M23,30H9a7.008,7.008,0,0,1-7-7V9A7.008,7.008,0,0,1,9,2H23a7.008,7.008,0,0,1,7,7V23A7.008,7.008,0,0,1,23,30ZM9,3A6.006,6.006,0,0,0,3,9V23a6.006,6.006,0,0,0,6,6H23a6.006,6.006,0,0,0,6-6V9a6.006,6.006,0,0,0-6-6Z"}" fill="${"#455a64"}"></path><path id="${"Path_1173"}" data-name="${"Path 1173"}" d="${"M20,26H12a6.006,6.006,0,0,1-6-6V12a6.006,6.006,0,0,1,6-6h8a6.006,6.006,0,0,1,6,6v8A6.006,6.006,0,0,1,20,26ZM12,8a4,4,0,0,0-4,4v8a4,4,0,0,0,4,4h8a4,4,0,0,0,4-4V12a4,4,0,0,0-4-4Z"}" fill="${"#fff"}"></path><path id="${"Path_1174"}" data-name="${"Path 1174"}" d="${"M21.5,11.75a1.25,1.25,0,1,1,1.25-1.25A1.252,1.252,0,0,1,21.5,11.75Z"}" fill="${"#fff"}"></path><path id="${"Path_1175"}" data-name="${"Path 1175"}" d="${"M16,21a5,5,0,1,1,5-5A5.006,5.006,0,0,1,16,21Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,16,13Z"}" fill="${"#fff"}"></path></g></svg></a></div>`;
});

/* src/routes/contact.svelte generated by Svelte v3.22.3 */

const css$1 = {
	code: ".contact-form.svelte-247n2f.svelte-247n2f{max-width:63rem}.contact-form.svelte-247n2f .svelte-247n2f::-webkit-input-placeholder{color:#5d5d5d !important;opacity:1}.contact-form.svelte-247n2f .svelte-247n2f::-moz-placeholder{color:#5d5d5d !important;opacity:1}.contact-form.svelte-247n2f .svelte-247n2f:-ms-input-placeholder{color:#5d5d5d !important;opacity:1}.contact-form.svelte-247n2f .svelte-247n2f::-ms-input-placeholder{color:#5d5d5d !important;opacity:1}.contact-form.svelte-247n2f .svelte-247n2f::placeholder{color:#5d5d5d !important;opacity:1}.contact-form.svelte-247n2f form.svelte-247n2f{color:#5d5d5d !important;margin-top:5rem}.contact-form.svelte-247n2f input.svelte-247n2f,.contact-form.svelte-247n2f textarea.svelte-247n2f{border:1px solid #5d5d5d !important;width:100%;background-color:transparent;padding-left:1rem}.contact-form.svelte-247n2f label.svelte-247n2f,.contact-form.svelte-247n2f p.svelte-247n2f{font-family:\"PlayFairRegular\"}.contact-checkbox.svelte-247n2f>input.svelte-247n2f{height:initial !important;width:3rem !important}",
	map: "{\"version\":3,\"file\":\"contact.svelte\",\"sources\":[\"contact.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n  import client from \\\"../lib/apollo\\\";\\n  import { PAGE } from \\\"../queries/page\\\";\\n\\n  let slug = \\\"contact\\\";\\n\\n  export async function preload() {\\n    return {\\n      cache: await client.query({\\n        query: PAGE,\\n        variables: { slug }\\n      }),\\n      slug\\n    };\\n  }\\n</script>\\n\\n<script>\\n  import { contact } from \\\"../store/contact.js\\\";\\n  import { restore, query } from \\\"svelte-apollo\\\";\\n  import DynamicBlock from \\\"../components/page_elements/DynamicBlock.svelte\\\";\\n  import TransitionWrapper from \\\"../components/TransitionWrapper.svelte\\\";\\n  import BecomeMember from \\\"../components/page_elements/BecomeMember.svelte\\\";\\n  import SocialMediaIcons from \\\"../components/page_elements/SocialMediaIcons.svelte\\\";\\n\\n  export let cache;\\n  export let slug;\\n\\n  let essential_oil = \\\"no\\\";\\n  let living_member = \\\"no\\\";\\n  let sent = false;\\n\\n  async function handleSubmit(event) {\\n    console.log({ event: essential_oil, living_member });\\n    if (!sent) {\\n      let formData = new FormData();\\n      formData.append(\\\"your-first-name\\\", event.target.first_name.value);\\n      formData.append(\\\"your-last-name\\\", event.target.last_name.value);\\n      formData.append(\\\"your-email\\\", event.target.email.value);\\n      formData.append(\\\"your-living-member\\\", living_member);\\n      formData.append(\\\"your-essential-oil\\\", essential_oil);\\n      formData.append(\\\"your-message\\\", event.target.message.value);\\n      const res = await fetch(\\n        \\\"http://hatchessentials.com/wp-api/wp-json/contact-form-7/v1/contact-forms/106/feedback\\\",\\n        {\\n          method: \\\"POST\\\",\\n          body: formData\\n        }\\n      ).then(e => {\\n        if (e.statusText === \\\"OK\\\") {\\n          sent = true;\\n          $contact.first_name = \\\"\\\";\\n          $contact.last_name = \\\"\\\";\\n          $contact.email = \\\"\\\";\\n          $contact.message = \\\"\\\";\\n        }\\n      });\\n    }\\n  }\\n\\n  restore(client, PAGE, cache.data);\\n  // TODO Uncommenting this part triggers a 500 error.\\n  // setClient(client);\\n\\n  // query a subset of the preloaded (the rest if for Account)\\n  const pages = query(client, {\\n    query: PAGE,\\n    variables: { slug }\\n  });\\n</script>\\n\\n<style lang=\\\"scss\\\">.contact-form {\\n  max-width: 63rem; }\\n  .contact-form ::-webkit-input-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #5d5d5d !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .contact-form ::-moz-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #5d5d5d !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .contact-form :-ms-input-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #5d5d5d !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .contact-form ::-ms-input-placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #5d5d5d !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .contact-form ::placeholder {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #5d5d5d !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  .contact-form form {\\n    color: #5d5d5d !important;\\n    margin-top: 5rem; }\\n  .contact-form input,\\n  .contact-form textarea {\\n    border: 1px solid #5d5d5d !important;\\n    width: 100%;\\n    background-color: transparent;\\n    padding-left: 1rem; }\\n  .contact-form label,\\n  .contact-form p {\\n    font-family: \\\"PlayFairRegular\\\"; }\\n\\n.contact-checkbox > input {\\n  height: initial !important;\\n  width: 3rem !important; }\\n/*# sourceMappingURL=src/routes/contact.svelte.map */</style>\\n\\n<svelte:head>\\n  {#if cache}\\n    {@html cache.data['hatch_PageBy']['head_tags']['headTags']}\\n  {/if}\\n</svelte:head>\\n\\n<TransitionWrapper>\\n  {#await $pages}\\n    <div class=\\\"loader\\\">\\n      <p>Loading...</p>\\n    </div>\\n  {:then data}\\n    {#if data.data}\\n      {#each data.data['hatch_PageBy']['page']['fc'] as page, i}\\n        <DynamicBlock content={page.content} bgColor={page.backgroundColor} />\\n      {/each}\\n    {:else}\\n      <p>ERROR!!</p>\\n    {/if}\\n  {/await}\\n</TransitionWrapper>\\n\\n<div class=\\\"container mx-auto text-center mt-20\\\">\\n  <h1 class=\\\"mx-auto\\\">Hello</h1>\\n  <h3 class=\\\"mx-auto px-5\\\">\\n    Do you still have unanswered questions? I’m here to help.\\n  </h3>\\n  <h3 class=\\\"mx-auto mt-10\\\">Let’s get social</h3>\\n  <SocialMediaIcons />\\n  <div class=\\\"mt-10 text-center px-5\\\">\\n    <h3 class=\\\"mx-auto\\\">\\n      Got some specific questions for me? Leave a message and I’ll get back to\\n      you faster than you can say LAVENDER.\\n    </h3>\\n  </div>\\n</div>\\n<div class=\\\"container mx-auto contact-form\\\">\\n  <form on:submit|preventDefault={handleSubmit} class=\\\"px-5\\\">\\n    <label for=\\\"\\\">Name*</label>\\n    <div class=\\\"flex justify-around mb-5\\\">\\n      <input\\n        class=\\\"mr-5\\\"\\n        type=\\\"text\\\"\\n        name=\\\"first_name\\\"\\n        placeholder=\\\"First Name\\\"\\n        bind:value={$contact.first_name}\\n        required />\\n      <input\\n        type=\\\"text\\\"\\n        name=\\\"last_name\\\"\\n        placeholder=\\\"Last Name\\\"\\n        bind:value={$contact.last_name}\\n        required />\\n    </div>\\n    <label for=\\\"\\\">Email*</label>\\n    <div class=\\\"flex justify-around\\\">\\n      <input\\n        type=\\\"email\\\"\\n        name=\\\"email\\\"\\n        placeholder=\\\"Email\\\"\\n        bind:value={$contact.email}\\n        required />\\n    </div>\\n    <div class=\\\"contact-checkbox\\\">\\n      <p class=\\\"text-left\\\">Are you familiar with essential oils?</p>\\n      <input\\n        type=\\\"radio\\\"\\n        id=\\\"essential-yes\\\"\\n        name=\\\"essential_oil\\\"\\n        bind:group={essential_oil}\\n        value=\\\"yes\\\" />\\n      <label for=\\\"essential-yes\\\">Yes</label>\\n      <br />\\n      <input\\n        type=\\\"radio\\\"\\n        id=\\\"essential-no\\\"\\n        name=\\\"essential_oil\\\"\\n        bind:group={essential_oil}\\n        value=\\\"no\\\" />\\n      <label for=\\\"essential-no\\\">No</label>\\n    </div>\\n    <div class=\\\"contact-checkbox\\\">\\n      <p class=\\\"text-left\\\">Are you a Young Living Member?</p>\\n      <input\\n        type=\\\"radio\\\"\\n        id=\\\"member-yes\\\"\\n        name=\\\"living_member\\\"\\n        bind:group={living_member}\\n        value=\\\"yes\\\" />\\n      <label for=\\\"member-yes\\\">Yes</label>\\n      <br />\\n      <input\\n        type=\\\"radio\\\"\\n        id=\\\"member-no\\\"\\n        name=\\\"living_member\\\"\\n        bind:group={living_member}\\n        value=\\\"no\\\" />\\n      <label for=\\\"member-no\\\">No</label>\\n    </div>\\n    <div class=\\\"message-box\\\">\\n      <p class=\\\"text-left\\\">Message*</p>\\n      <textarea\\n        id=\\\"message\\\"\\n        name=\\\"message\\\"\\n        bind:value={$contact.message}\\n        required />\\n    </div>\\n    <div class=\\\"mt-10 flex align-middle justify-center\\\">\\n      <button>Send It</button>\\n    </div>\\n  </form>\\n  {#if sent}\\n    <p>Thank you!</p>\\n  {/if}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AAuEmB,aAAa,4BAAC,CAAC,AAChC,SAAS,CAAE,KAAK,AAAE,CAAC,AACnB,2BAAa,eAAC,2BAA2B,AAAC,CAAC,AAEzC,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,OAAO,CAAE,CAAC,AACI,CAAC,AACjB,2BAAa,eAAC,kBAAkB,AAAC,CAAC,AAEhC,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,OAAO,CAAE,CAAC,AACI,CAAC,AACjB,2BAAa,eAAC,sBAAsB,AAAC,CAAC,AAEpC,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,OAAO,CAAE,CAAC,AACI,CAAC,AACjB,2BAAa,eAAC,uBAAuB,AAAC,CAAC,AAErC,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,OAAO,CAAE,CAAC,AACI,CAAC,AACjB,2BAAa,eAAC,aAAa,AAAC,CAAC,AAE3B,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,OAAO,CAAE,CAAC,AACI,CAAC,AACjB,2BAAa,CAAC,IAAI,cAAC,CAAC,AAClB,KAAK,CAAE,OAAO,CAAC,UAAU,CACzB,UAAU,CAAE,IAAI,AAAE,CAAC,AACrB,2BAAa,CAAC,mBAAK,CACnB,2BAAa,CAAC,QAAQ,cAAC,CAAC,AACtB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,UAAU,CACpC,KAAK,CAAE,IAAI,CACX,gBAAgB,CAAE,WAAW,CAC7B,YAAY,CAAE,IAAI,AAAE,CAAC,AACvB,2BAAa,CAAC,mBAAK,CACnB,2BAAa,CAAC,CAAC,cAAC,CAAC,AACf,WAAW,CAAE,iBAAiB,AAAE,CAAC,AAErC,+BAAiB,CAAG,KAAK,cAAC,CAAC,AACzB,MAAM,CAAE,OAAO,CAAC,UAAU,CAC1B,KAAK,CAAE,IAAI,CAAC,UAAU,AAAE,CAAC\"}"
};

let slug$4 = "contact";

async function preload$7() {
	return {
		cache: await client.query({ query: PAGE, variables: { slug: slug$4 } }),
		slug: slug$4
	};
}

const Contact = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $contact = get_store_value(contact);
	let $pages;
	let { cache } = $$props;
	let { slug } = $$props;

	svelteApollo.restore(client, PAGE, cache.data);

	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const pages = svelteApollo.query(client, { query: PAGE, variables: { slug } });

	$pages = get_store_value(pages);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
	$$result.css.add(css$1);
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
	})}

<div class="${"container mx-auto text-center mt-20"}"><h1 class="${"mx-auto"}">Hello</h1>
  <h3 class="${"mx-auto px-5"}">Do you still have unanswered questions? I’m here to help.
  </h3>
  <h3 class="${"mx-auto mt-10"}">Let’s get social</h3>
  ${validate_component(SocialMediaIcons, "SocialMediaIcons").$$render($$result, {}, {}, {})}
  <div class="${"mt-10 text-center px-5"}"><h3 class="${"mx-auto"}">Got some specific questions for me? Leave a message and I’ll get back to
      you faster than you can say LAVENDER.
    </h3></div></div>
<div class="${"container mx-auto contact-form svelte-247n2f"}"><form class="${"px-5 svelte-247n2f"}"><label for="${""}" class="${"svelte-247n2f"}">Name*</label>
    <div class="${"flex justify-around mb-5 svelte-247n2f"}"><input class="${"mr-5 svelte-247n2f"}" type="${"text"}" name="${"first_name"}" placeholder="${"First Name"}" required${add_attribute("value", $contact.first_name, 1)}>
      <input type="${"text"}" name="${"last_name"}" placeholder="${"Last Name"}" required class="${"svelte-247n2f"}"${add_attribute("value", $contact.last_name, 1)}></div>
    <label for="${""}" class="${"svelte-247n2f"}">Email*</label>
    <div class="${"flex justify-around svelte-247n2f"}"><input type="${"email"}" name="${"email"}" placeholder="${"Email"}" required class="${"svelte-247n2f"}"${add_attribute("value", $contact.email, 1)}></div>
    <div class="${"contact-checkbox svelte-247n2f"}"><p class="${"text-left svelte-247n2f"}">Are you familiar with essential oils?</p>
      <input type="${"radio"}" id="${"essential-yes"}" name="${"essential_oil"}" value="${"yes"}" class="${"svelte-247n2f"}">
      <label for="${"essential-yes"}" class="${"svelte-247n2f"}">Yes</label>
      <br class="${"svelte-247n2f"}">
      <input type="${"radio"}" id="${"essential-no"}" name="${"essential_oil"}" value="${"no"}" class="${"svelte-247n2f"}">
      <label for="${"essential-no"}" class="${"svelte-247n2f"}">No</label></div>
    <div class="${"contact-checkbox svelte-247n2f"}"><p class="${"text-left svelte-247n2f"}">Are you a Young Living Member?</p>
      <input type="${"radio"}" id="${"member-yes"}" name="${"living_member"}" value="${"yes"}" class="${"svelte-247n2f"}">
      <label for="${"member-yes"}" class="${"svelte-247n2f"}">Yes</label>
      <br class="${"svelte-247n2f"}">
      <input type="${"radio"}" id="${"member-no"}" name="${"living_member"}" value="${"no"}" class="${"svelte-247n2f"}">
      <label for="${"member-no"}" class="${"svelte-247n2f"}">No</label></div>
    <div class="${"message-box svelte-247n2f"}"><p class="${"text-left svelte-247n2f"}">Message*</p>
      <textarea id="${"message"}" name="${"message"}" required class="${"svelte-247n2f"}">${$contact.message || ""}</textarea></div>
    <div class="${"mt-10 flex align-middle justify-center svelte-247n2f"}"><button class="${"svelte-247n2f"}">Send It</button></div></form>
  ${ ``}</div>`;
});

/* src/routes/[slug].svelte generated by Svelte v3.22.3 */

async function preload$8({ params }) {
	let slug = params.slug;

	return {
		cache: await client.query({ query: PAGE, variables: { slug } }),
		slug
	};
}

const U5Bslugu5D$2 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $pages;
	let { cache } = $$props;
	let { slug } = $$props;
	svelteApollo.restore(client, PAGE, cache.data);

	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const pages = svelteApollo.query(client, { query: PAGE, variables: { slug } });

	$pages = get_store_value(pages);
	if ($$props.cache === void 0 && $$bindings.cache && cache !== void 0) $$bindings.cache(cache);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
	$pages = get_store_value(pages);

	return `${($$result.head += `${($$result.title = `<title>Contact</title>`, "")}`, "")}

${(function (__value) {
		if (is_promise(__value)) return `
  <p>Loading</p>
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

/* src/components/Nav.svelte generated by Svelte v3.22.3 */

const css$2 = {
	code: "nav.svelte-1jcb7su.svelte-1jcb7su{font-weight:300}ul.svelte-1jcb7su.svelte-1jcb7su{margin:0;padding:0;display:grid;grid-template-columns:repeat(6, 1fr);grid-gap:0.1rem}li.svelte-1jcb7su.svelte-1jcb7su{text-align:center;margin-top:0.4rem}li.svelte-1jcb7su svg.svelte-1jcb7su{margin:0 auto;width:5rem;height:1rem;position:relative;top:1.2rem}[aria-current].svelte-1jcb7su .nav-item.svelte-1jcb7su{opacity:1}a.svelte-1jcb7su.svelte-1jcb7su{text-decoration:none;display:block;transition:all 300ms}a.svelte-1jcb7su.svelte-1jcb7su:hover{color:rgba(0, 0, 0, 0.7)}nav.svelte-1jcb7su.svelte-1jcb7su{background-color:#fbf6f4}nav.svelte-1jcb7su ul.svelte-1jcb7su{font-size:1.3rem;font-weight:bold}@media screen and (max-width: 1024px){nav.svelte-1jcb7su ul.svelte-1jcb7su{font-size:1rem}}@media screen and (max-width: 768px){nav.svelte-1jcb7su ul.svelte-1jcb7su{font-size:0.9rem}}.nav-mobile.svelte-1jcb7su.svelte-1jcb7su{height:8rem}.nav-mobile.svelte-1jcb7su svg.svelte-1jcb7su{height:3rem}@media screen and (min-width: 598px){.nav-mobile.svelte-1jcb7su.svelte-1jcb7su{display:none}}.nav-pc.svelte-1jcb7su.svelte-1jcb7su{height:7rem}@media screen and (max-width: 599px){.nav-pc.svelte-1jcb7su.svelte-1jcb7su{display:none}}.nav-item.svelte-1jcb7su.svelte-1jcb7su{opacity:0.6;transition:300ms all;height:3rem;position:relative;top:-0.18rem}@media screen and (max-width: 1024px){.nav-item.svelte-1jcb7su.svelte-1jcb7su{top:0rem}}.nav-item.svelte-1jcb7su.svelte-1jcb7su:active{opacity:1}.nav-item.svelte-1jcb7su.svelte-1jcb7su:hover{opacity:1}.nav-item-1.svelte-1jcb7su.svelte-1jcb7su{color:#ac335e}.nav-item-2.svelte-1jcb7su.svelte-1jcb7su{color:#c16995}.nav-item-3.svelte-1jcb7su.svelte-1jcb7su{color:#e4a73A}.nav-item-4.svelte-1jcb7su.svelte-1jcb7su{color:#3e99c4}.nav-item-5.svelte-1jcb7su.svelte-1jcb7su{color:#543c78}.nav-item-6.svelte-1jcb7su.svelte-1jcb7su{color:#267d75}.main-nav.svelte-1jcb7su.svelte-1jcb7su{max-width:1900px;margin:0 auto;padding-left:1rem;padding-right:1rem}@media screen and (max-width: 425px){.main-nav.svelte-1jcb7su.svelte-1jcb7su{padding-left:2rem;padding-right:2rem}}.hatch-nav.svelte-1jcb7su.svelte-1jcb7su{margin-top:2.34rem}@media screen and (min-width: 600px) and (max-width: 678px){.hatch-nav.svelte-1jcb7su.svelte-1jcb7su{font-size:0.6rem;margin-top:2.8rem}}@media screen and (max-width: 768px){img.logo.svelte-1jcb7su.svelte-1jcb7su{height:4.5rem}}.mobile-nav-wrapper.svelte-1jcb7su.svelte-1jcb7su{position:fixed;z-index:9999;display:block;width:100%;height:100%;background-color:#fff;padding:0 2rem}.mobile-nav-wrapper.svelte-1jcb7su .menus.svelte-1jcb7su{display:grid;grid-gap:3rem;margin-top:7rem}.mobile-nav-wrapper.svelte-1jcb7su .menus h3.svelte-1jcb7su{margin:0 auto;font-size:1.7rem;font-weight:bold}.nav-mobile.svelte-1jcb7su.svelte-1jcb7su{color:#7d7d7d}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"\\n\\n<style lang=\\\"scss\\\">nav {\\n  font-weight: 300; }\\n\\nul {\\n  margin: 0;\\n  padding: 0;\\n  display: grid;\\n  grid-template-columns: repeat(6, 1fr);\\n  grid-gap: 0.1rem; }\\n\\nli {\\n  text-align: center;\\n  margin-top: 0.4rem; }\\n  li svg {\\n    margin: 0 auto;\\n    width: 5rem;\\n    height: 1rem;\\n    position: relative;\\n    top: 1.2rem; }\\n\\n[aria-current] .nav-item {\\n  opacity: 1; }\\n\\na {\\n  text-decoration: none;\\n  display: block;\\n  transition: all 300ms; }\\n  a:hover {\\n    color: rgba(0, 0, 0, 0.7); }\\n\\nnav {\\n  background-color: #fbf6f4; }\\n  nav ul {\\n    font-size: 1.3rem;\\n    font-weight: bold; }\\n    @media screen and (max-width: 1024px) {\\n      nav ul {\\n        font-size: 1rem; } }\\n    @media screen and (max-width: 768px) {\\n      nav ul {\\n        font-size: 0.9rem; } }\\n\\n.nav-mobile {\\n  height: 8rem; }\\n  .nav-mobile svg {\\n    height: 3rem; }\\n  @media screen and (min-width: 598px) {\\n    .nav-mobile {\\n      display: none; } }\\n\\n.nav-pc {\\n  height: 7rem;\\n  /*margin-top: 1rem;*/ }\\n  @media screen and (max-width: 599px) {\\n    .nav-pc {\\n      display: none; } }\\n\\n.nav-item {\\n  opacity: 0.6;\\n  transition: 300ms all;\\n  height: 3rem;\\n  position: relative;\\n  top: -0.18rem; }\\n  @media screen and (max-width: 1024px) {\\n    .nav-item {\\n      top: 0rem; } }\\n  .nav-item:active {\\n    opacity: 1; }\\n  .nav-item:hover {\\n    opacity: 1; }\\n\\n.nav-item-1 {\\n  color: #ac335e; }\\n\\n.nav-item-2 {\\n  color: #c16995; }\\n\\n.nav-item-3 {\\n  color: #e4a73A; }\\n\\n.nav-item-4 {\\n  color: #3e99c4; }\\n\\n.nav-item-5 {\\n  color: #543c78; }\\n\\n.nav-item-6 {\\n  color: #267d75; }\\n\\n.main-nav {\\n  max-width: 1900px;\\n  margin: 0 auto;\\n  padding-left: 1rem;\\n  padding-right: 1rem; }\\n  @media screen and (max-width: 425px) {\\n    .main-nav {\\n      padding-left: 2rem;\\n      padding-right: 2rem; } }\\n\\n.hatch-nav {\\n  margin-top: 2.34rem; }\\n  @media screen and (min-width: 600px) and (max-width: 678px) {\\n    .hatch-nav {\\n      font-size: 0.6rem;\\n      margin-top: 2.8rem; } }\\n\\n@media screen and (max-width: 768px) {\\n  img.logo {\\n    height: 4.5rem; } }\\n\\n.mobile-nav-wrapper {\\n  position: fixed;\\n  z-index: 9999;\\n  display: block;\\n  width: 100%;\\n  height: 100%;\\n  background-color: #fff;\\n  padding: 0 2rem; }\\n  .mobile-nav-wrapper .menus {\\n    display: grid;\\n    grid-gap: 3rem;\\n    margin-top: 7rem; }\\n    .mobile-nav-wrapper .menus h3 {\\n      margin: 0 auto;\\n      font-size: 1.7rem;\\n      font-weight: bold; }\\n\\n.nav-mobile {\\n  color: #7d7d7d; }\\n/*# sourceMappingURL=src/components/Nav.svelte.map */</style>\\n\\n<script>\\n  import { fade, fly } from 'svelte/transition'\\n  export let segment;\\n  let open = false;\\n  function handleOpenMenu () {\\n    open = !open;\\n    console.log({ open })\\n  } \\n</script>\\n{#if open}\\n<div transition:fly={{ x: -200 }} class=\\\"mobile-nav-wrapper\\\">\\n  <div class=\\\"nav-mobile flex items-center justify-between\\\">\\n    <div>\\n      <a href=\\\".\\\" transition:fade>\\n        <img class=\\\"logo\\\" src=\\\"/logo.svg\\\" alt=\\\"Hatch Essentials\\\" />\\n      </a>\\n    </div>\\n    <div on:click={handleOpenMenu}>\\n       <svg class=\\\"fill-current\\\"  xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 20 20\\\"> \\n        {#if open }\\n          <path transition:fade d=\\\"M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z\\\"/>\\n        {:else}\\n          <path transition:fade d=\\\"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z\\\" />\\n        {/if}\\n      </svg>\\n    </div>\\n  </div> \\n  <div class=\\\"container mx-auto text-center\\\">\\n    <div class=\\\"menus\\\">\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\".\\\">\\n          <h3>Home</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\"essential-oils-101\\\">\\n          <h3>Essential Oils 101</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\"pursue-your-dreams\\\">\\n          <h3>Pursue Your Dreams</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\"about-hatch\\\">\\n          <h3>About Hatch</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a on:click={handleOpenMenu} href=\\\"the-blog\\\">\\n          <h3>The Blog</h3>\\n        </a>\\n      </div>\\n      <div>\\n        <a href=\\\"https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member\\\">\\n          <h3>Begin Now</h3>\\n        </a>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n{/if}\\n<nav class=\\\"main-nav\\\">\\n  <div class=\\\"container mx-auto\\\">\\n    <div class=\\\"nav-mobile flex items-center justify-between\\\">\\n      <div>\\n        {#if !open}\\n        <a href=\\\".\\\" transition:fade >\\n          <img class=\\\"logo\\\" src=\\\"/logo.svg\\\" alt=\\\"Hatch Essentials\\\" />\\n        </a>\\n        {/if}\\n      </div>\\n      <div on:click={handleOpenMenu}>\\n         <svg class=\\\"fill-current\\\"  xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 20 20\\\"> \\n          {#if open }\\n            <path transition:fly={{ x: -100 }} d=\\\"M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z\\\"/>\\n          {:else}\\n            <path transition:fly={{ x: 100 }} d=\\\"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z\\\" />\\n          {/if}\\n        </svg>\\n      </div>\\n    </div> \\n    <div class=\\\"nav-pc flex items-center justify-between\\\">\\n      <div class=\\\"flex items-center\\\">\\n        <a href=\\\".\\\" rel=\\\"prefetch\\\">\\n          <img class=\\\"logo\\\" src=\\\"/logo.svg\\\" alt=\\\"Hatch Eessentials\\\"/>\\n        </a>\\n      </div>\\n      <div>\\n        <ul class=\\\"flex hatch-nav\\\">\\n          <li>\\n            <a href=\\\".\\\"  aria-current={segment === undefined ? 'page' : undefined}>Home\\n            {#if segment === undefined}\\n                  <svg class=\\\"fill-current nav-item nav-item-1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li>\\n            <a\\n              aria-current={segment === 'essential-oils-101' ? 'page' : undefined}\\n              rel=\\\"prefetch\\\"\\n              href=\\\"essential-oils-101\\\">\\n              Essential Oils 101\\n            \\n              {#if segment === 'essential-oils-101'}\\n                  <svg class=\\\"fill-current nav-item nav-item-2\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-2\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li>\\n            <a aria-current={segment === 'pursue-your-dreams' ? 'page' : undefined} rel=\\\"prefetch\\\" href=\\\"pursue-your-dreams\\\" >Pursue Your Dreams\\n            {#if segment === 'pursue-your-dreams'}\\n                  <svg class=\\\"fill-current nav-item nav-item-3\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-3\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li> \\n            <a aria-current={segment === 'about-hatch' ? 'page' : undefined} rel=\\\"prefetch\\\" href=\\\"about-hatch\\\" >About Hatch\\n            {#if segment === 'about-hatch'}\\n                  <svg class=\\\"fill-current nav-item nav-item-4\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-4\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li>\\n            <a aria-current={segment === 'the-blog' ? 'page' : undefined} rel=\\\"prefetch\\\" href=\\\"the-blog\\\" >The Blog\\n             {#if segment === 'the-blog'}\\n                  <svg class=\\\"fill-current nav-item nav-item-5\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-5\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n              </a>\\n          </li>\\n          <li>\\n            <a aria-current={segment === 'begin-now' ? 'page' : undefined} target=\\\"_blank\\\" href=\\\"https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member\\\" >Begin Now\\n              \\n              {#if segment === 'begin-now'}\\n                  <svg class=\\\"fill-current nav-item nav-item-6\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"40.195\\\" viewBox=\\\"0 0 68 40.195\\\">\\n                    <path id=\\\"Path_1233\\\" data-name=\\\"Path 1233\\\" d=\\\"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z\\\" transform=\\\"translate(-0.061 -140.268)\\\"/>\\n                  </svg>\\n              {:else}\\n                  <svg class=\\\"fill-current nav-item nav-item-6\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"68\\\" height=\\\"26.292\\\" viewBox=\\\"0 0 68 13.195\\\">\\n                  <path id=\\\"Asset_9\\\" data-name=\\\"Asset 9\\\" d=\\\"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z\\\" transform=\\\"translate(-9.8 -25.1)\\\"/>\\n                </svg>\\n              {/if}\\n            </a>\\n          </li>\\n        </ul>\\n      </div>\\n    </div>\\n  </div>\\n</nav>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$2);

	return `${ ``}
<nav class="${"main-nav svelte-1jcb7su"}"><div class="${"container mx-auto"}"><div class="${"nav-mobile flex items-center justify-between svelte-1jcb7su"}"><div>${ `<a href="${"."}" class="${"svelte-1jcb7su"}"><img class="${"logo svelte-1jcb7su"}" src="${"/logo.svg"}" alt="${"Hatch Essentials"}"></a>`
	}</div>
      <div><svg class="${"fill-current svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}">${ `<path d="${"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"}"></path>`}</svg></div></div> 
    <div class="${"nav-pc flex items-center justify-between svelte-1jcb7su"}"><div class="${"flex items-center"}"><a href="${"."}" rel="${"prefetch"}" class="${"svelte-1jcb7su"}"><img class="${"logo svelte-1jcb7su"}" src="${"/logo.svg"}" alt="${"Hatch Eessentials"}"></a></div>
      <div><ul class="${"flex hatch-nav svelte-1jcb7su"}"><li class="${"svelte-1jcb7su"}"><a href="${"."}"${add_attribute("aria-current", segment === undefined ? "page" : undefined, 0)} class="${"svelte-1jcb7su"}">Home
            ${segment === undefined
	? `<svg class="${"fill-current nav-item nav-item-1 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-1 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-1jcb7su"}"><a${add_attribute("aria-current", segment === "essential-oils-101" ? "page" : undefined, 0)} rel="${"prefetch"}" href="${"essential-oils-101"}" class="${"svelte-1jcb7su"}">Essential Oils 101
            
              ${segment === "essential-oils-101"
	? `<svg class="${"fill-current nav-item nav-item-2 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-2 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-1jcb7su"}"><a${add_attribute("aria-current", segment === "pursue-your-dreams" ? "page" : undefined, 0)} rel="${"prefetch"}" href="${"pursue-your-dreams"}" class="${"svelte-1jcb7su"}">Pursue Your Dreams
            ${segment === "pursue-your-dreams"
	? `<svg class="${"fill-current nav-item nav-item-3 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-3 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-1jcb7su"}"><a${add_attribute("aria-current", segment === "about-hatch" ? "page" : undefined, 0)} rel="${"prefetch"}" href="${"about-hatch"}" class="${"svelte-1jcb7su"}">About Hatch
            ${segment === "about-hatch"
	? `<svg class="${"fill-current nav-item nav-item-4 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-4 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-1jcb7su"}"><a${add_attribute("aria-current", segment === "the-blog" ? "page" : undefined, 0)} rel="${"prefetch"}" href="${"the-blog"}" class="${"svelte-1jcb7su"}">The Blog
             ${segment === "the-blog"
	? `<svg class="${"fill-current nav-item nav-item-5 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-5 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li>
          <li class="${"svelte-1jcb7su"}"><a${add_attribute("aria-current", segment === "begin-now" ? "page" : undefined, 0)} target="${"_blank"}" href="${"https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member"}" class="${"svelte-1jcb7su"}">Begin Now
              
              ${segment === "begin-now"
	? `<svg class="${"fill-current nav-item nav-item-6 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"40.195"}" viewBox="${"0 0 68 40.195"}"><path id="${"Path_1233"}" data-name="${"Path 1233"}" d="${"M67.969,156.383a2.241,2.241,0,0,0-.786-1.707,2.278,2.278,0,0,0-3.2.249l-5.374,6.254-13.543-3.74a1.459,1.459,0,0,0-1.691.815l-6.234,13.16-11.245-15.5a1.4,1.4,0,0,0-1.919-.191l-8.344,6.849L8.8,141.454a1.662,1.662,0,0,0-.937-1.035,1.711,1.711,0,0,0-2.261.852h0A69.535,69.535,0,0,0,.851,157.516c0,.689-.212,1.381-.285,2.09s-.155,1.4-.232,2.09-.114,1.422-.228,2.037a12.578,12.578,0,0,0,0,2.111,59.6,59.6,0,0,0,.46,8.479,41.087,41.087,0,0,0,1.3,6.063h0v.077H65.956a40.537,40.537,0,0,0,1.283-5.048,57.95,57.95,0,0,0,.815-8.516v-7.868a23.977,23.977,0,0,0-.086-2.648Z"}" transform="${"translate(-0.061 -140.268)"}"></path></svg>`
	: `<svg class="${"fill-current nav-item nav-item-6 svelte-1jcb7su"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"68"}" height="${"26.292"}" viewBox="${"0 0 68 13.195"}"><path id="${"Asset_9"}" data-name="${"Asset 9"}" d="${"M77.8,51.392C70.275,36.25,57.84,25.1,43.8,25.1S17.325,36.25,9.8,51.392Z"}" transform="${"translate(-9.8 -25.1)"}"></path></svg>`}</a></li></ul></div></div></div></nav>`;
});

/* src/components/page_elements/HatchInstagram.svelte generated by Svelte v3.22.3 */

const HatchInstagram = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	onMount(() => {
		var feed = new Instafeed({
				get: "user",
				accessToken: "IGQVJYZAG5Cc3AtT0gyUjM2ZAnNNbG5oU0lsYzE0ZAVczQXF3bVJESXpsMERMMVRUSFNTU1RzRnBrV1R5VEFaR214Q08wR2J2eGdmSnd0aGJHcUxra3JUb2oxMDRsVzZACaG9fYV92X3NB",
				target: "instagramfeed",
				userId: "33443551043",
				limit: 3
			});

		feed.run();
	});

	return `${($$result.head += `<script src="${"/js/instafeed.js"}"></script>`, "")}

<section class="${"hatch-instagram"}"><div class="${"left-section"}"><div class="${"hatch-logo"}"><img src="${"logo.svg"}"></div>
    <div><p>GET BEHIND THE SCENES.
        <br>
        My “AHA” moments on the ‘gram.
      </p>
      <p>Follow me
        <b>@hatchessentials</b></p>
      ${validate_component(SocialMediaIcons, "SocialMediaIcons").$$render($$result, {}, {}, {})}</div></div>
  <div id="${"instagramfeed"}" class="${"instagram-items"}"></div></section>`;
});

const subscriber$1 = writable({
	name: "",
	email: ""
});

/* src/components/page_elements/Subscribe.svelte generated by Svelte v3.22.3 */

const Subscribe = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $subscriber = get_store_value(subscriber$1);

	return `<div class="${"subscribe-wrapper"}"><div class="${"container mx-auto"}"><div class="${"subscribe"}"><div class="${"subscribe-image"}"><img src="${"http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/subscribe_new.jpg"}" alt="${""}"></div>
      <div class="${"subscribe-content"}"><div class="${"content"}"><h2>Subscribe</h2>
          <p>Are you ready to start learning about natural health?
            <br>
            Grab my FREE blueprint to get started now.
            <br>
            </p>
          <div><script async data-uid="${"71d5fb048c"}" src="${"https://hatchessentials-naturalhealthblueprint.ck.page/71d5fb048c/index.js"}"></script></div></div></div></div></div></div>`;
});

/* src/components/Footer.svelte generated by Svelte v3.22.3 */

const css$3 = {
	code: ".footer-links.svelte-1kvtrgf{width:100%}",
	map: "{\"version\":3,\"file\":\"Footer.svelte\",\"sources\":[\"Footer.svelte\"],\"sourcesContent\":[\"<script>\\n  import HatchInstagram from \\\"../components/page_elements/HatchInstagram.svelte\\\";\\n  import Subscribe from \\\"../components/page_elements/Subscribe.svelte\\\";\\n</script>\\n\\n<style lang=\\\"scss\\\">.footer-links {\\n  width: 100%; }\\n/*# sourceMappingURL=src/components/Footer.svelte.map */</style>\\n\\n<div class=\\\"spacer\\\" />\\n<Subscribe />\\n<div class=\\\"container mx-auto footer-links-nav\\\">\\n  <div class=\\\"footer-links text-center md:flex md:justify-between\\\">\\n    <span>\\n      <a href=\\\"/essential-oils-101/#faq_section\\\">FAQ</a>\\n    </span>\\n    <span>•</span>\\n    <span>\\n      <a\\n        href=\\\"https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member\\\">\\n        Begin Now\\n      </a>\\n    </span>\\n    <span>•</span>\\n    <span>\\n      <a href=\\\"/contact\\\">Contact</a>\\n    </span>\\n    <span>•</span>\\n    <span>\\n      <a href=\\\"/the-blog\\\">Blog</a>\\n    </span>\\n    <span>•</span>\\n    <span>\\n      <a href=\\\"/privacy-policy\\\">Privacy</a>\\n    </span>\\n  </div>\\n</div>\\n<footer>\\n  <div class=\\\"container mx-auto\\\">\\n    <div>\\n      <hr />\\n    </div>\\n    <HatchInstagram />\\n  </div>\\n  <div class=\\\"container mx-auto text-center mt-2\\\">\\n    <span style=\\\"font-size: 1.2rem; white-space:pre-wrap;\\\">\\n      Copyright © 2020 Hatch Essentials\\n    </span>\\n  </div>\\n</footer>\\n\"],\"names\":[],\"mappings\":\"AAKmB,aAAa,eAAC,CAAC,AAChC,KAAK,CAAE,IAAI,AAAE,CAAC\"}"
};

const Footer = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	$$result.css.add(css$3);

	return `<div class="${"spacer"}"></div>
${validate_component(Subscribe, "Subscribe").$$render($$result, {}, {}, {})}
<div class="${"container mx-auto footer-links-nav"}"><div class="${"footer-links text-center md:flex md:justify-between svelte-1kvtrgf"}"><span><a href="${"/essential-oils-101/#faq_section"}">FAQ</a></span>
    <span>•</span>
    <span><a href="${"https://www.youngliving.com/vo/?fbclid=IwAR04XTDfCKsSlbBwdWnUz881IpMz220ypID2DHWJLjnkMCmzGFoopN4v0wo#/signup/new-start?sponsorid=14065507&enrollerid=14065507&isocountrycode=PH&culture=en-PH&type=member"}">Begin Now
      </a></span>
    <span>•</span>
    <span><a href="${"/contact"}">Contact</a></span>
    <span>•</span>
    <span><a href="${"/the-blog"}">Blog</a></span>
    <span>•</span>
    <span><a href="${"/privacy-policy"}">Privacy</a></span></div></div>
<footer><div class="${"container mx-auto"}"><div><hr></div>
    ${validate_component(HatchInstagram, "HatchInstagram").$$render($$result, {}, {}, {})}</div>
  <div class="${"container mx-auto text-center mt-2"}"><span style="${"font-size: 1.2rem; white-space:pre-wrap;"}">Copyright © 2020 Hatch Essentials
    </span></div></footer>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.22.3 */

const css$4 = {
	code: ".container{max-width:1300px}@font-face{font-family:PlayFairBold;src:url(\"/fonts/PlayfairDisplay-Bold.ttf\");font-display:swap}@font-face{font-family:PlayFairRegular;src:url(\"/fonts/PlayfairDisplay-Regular.ttf\");font-display:swap}@font-face{font-family:MontserratLight;src:url(\"/fonts/Montserrat-Light.ttf\");font-display:swap}@font-face{font-family:MontserratRegular;src:url(\"/fonts/Montserrat-Regular.ttf\");font-display:swap}:root{font-size:62.5%}:root body{margin:0;font-size:1.6rem}body{background-color:#f5f5f5;-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-family:'MontserratRegular', sans-serif;font-weight:400;font-style:normal;font-size:1.4rem;text-transform:none;color:#5d5d5d}p{font-family:'MontserratLight', sans-serif;font-weight:light;font-weight:400;font-style:normal;padding:1rem;line-height:1.8em;color:#5d5d5d}@media screen and (max-width: 425px){p{text-align:center}}h1,h2{line-height:1em;padding:1rem}h1{font-size:4.8rem;font-family:'PlayFairBold', serif;color:#ac335e;font-style:normal;letter-spacing:0.04em}@media only screen and (max-width: 640px){h1{font-size:3rem;letter-spacing:.05em;line-height:1.2em;white-space:pre-wrap}}h2{color:#ac335e;font-family:'PlayFairBold', serif;font-weight:bold;font-style:normal;font-size:4rem;max-width:60%}@media screen and (max-width: 640px){h2{font-size:3rem;max-width:100%;white-space:pre-wrap}}h3{color:#c16995;max-width:60%;font-family:'MontserratRegular', sans-serif;font-weight:300;font-size:2.2rem}@media screen and (max-width: 640px){h3{font-size:2rem;max-width:100%;white-space:pre-wrap}}main{min-height:800px}.module{font-size:1.1rem}.hatch-content{display:flex;justify-content:center;align-items:center;padding:1rem}.hatch-content h1{position:relative;margin-bottom:1.5rem;padding-bottom:3rem}@media screen and (max-width: 425px){.hatch-content h1{text-align:center}}.hatch-content h1:after{content:\"\";border-bottom:3px solid #3e99c4;position:absolute;bottom:0;height:1rem;width:2rem;left:1rem}@media screen and (max-width: 425px){.hatch-content h1:after{left:50%;transform:translate(-50%, -50%)}}.he-row *:not(h1):not(h2):not(h3){word-wrap:break-word}.he-row{height:100%;position:relative}.he-row img{margin:0 auto}.spacer{height:15rem}@media screen and (max-width: 768px){.spacer{height:8rem}}@media screen and (max-width: 425px){.spacer{height:1rem}}.container{max-width:1300px}@media screen and (max-width: 640px){.he-row .container{padding-top:17px !important;padding-left:17px;padding-right:17px}}*{box-sizing:border-box;text-decoration:none;list-style:none;outline:none}html,body{margin:0;padding:0}h5{padding:1rem;font-weight:700}.hatch-left-image-big img{position:relative;z-index:9}.hatch-right-image-big img{position:relative;z-index:9}.blue-bg-square-left{box-shadow:-14px 22px 0px -2px #96bdf2}.blue-bg-square-right{box-shadow:19px 22px 0px -2px #96bdf2}.pink-bg-square-left{box-shadow:-14px 22px 0px -2px #d9a7c0}.pink-bg-square-right{box-shadow:19px 22px 0px -2px #d9a7c0}.yellow-bg-square-left{box-shadow:-14px 22px 0px -2px #efc881}.yellow-bg-square-right{box-shadow:19px 22px 0px -2px #efc881}.hatch-left-image-big{position:relative;padding:4rem}.hatch-right-image-big.dashed:after{background-color:initial;border:11px dashed #d9a7c0}.hatch-left-image-big.yellow:after{background-color:#efc881 !important}.hatch-right-image-big{position:relative;padding:4rem}.featured-items{height:3rem;display:grid;grid-template-columns:repeat(4, 1fr);grid-gap:1rem;position:relative;height:100%}@media screen and (max-width: 425px){.featured-items{grid-template-columns:repeat(2, 1fr)}}button{font-family:'PlayFairRegular'}.hatch-btn{padding:1rem;display:flex}.hatch-btn button{border:1px solid #efc881;border-radius:9px;padding:0.5rem 1rem;font-size:1.6rem;color:#efc881;transition:all 300ms;width:22rem;height:4rem}.hatch-btn button:hover{background-color:#e4a73a;border:1px solid #e4a73a;color:#fff}@media screen and (max-width: 1024px){.hatch-btn{justify-content:center}.hatch-btn button{font-size:1rem}}@media screen and (max-width: 768px){.hatch-btn button{font-size:2rem}}.featured-item h1{font-size:2rem;font-family:'PlayFairRegular'}.hatch-link{cursor:pointer}.hatch-link h1{transition:all 300ms;color:#e4a73a}.hatch-link:hover h1{color:#ac335e}.footer-links-nav{max-width:40rem;font-family:'PlayFairRegular', serif;padding:4rem 0}.footer-links-nav a{transition:all 300ms}.footer-links-nav a:hover{color:#ac335e}@media screen and (max-width: 425px){footer{text-align:center}}.hatch-instagram{display:grid;grid-template-columns:1fr 1fr;margin-top:1rem}@media screen and (max-width: 425px){.hatch-instagram{grid-template-columns:auto}}.hatch-instagram p{font-family:'PlayFairRegular', serif;font-style:normal;border-right:1px solid #e3e3e3}.hatch-instagram .left-section{display:grid;grid-template-columns:1fr 1fr;grid-gap:1rem}@media screen and (max-width: 425px){.hatch-instagram .left-section{grid-template-columns:auto}}.hatch-instagram .hatch-logo{display:flex;padding:1rem}@media screen and (min-width: 425px){.hatch-instagram .hatch-logo{align-items:flex-start;flex-direction:row-reverse}}@media screen and (max-width: 425px){.hatch-instagram .hatch-logo{justify-content:center}}.hatch-instagram .instagram-items{display:grid;grid-template-columns:1fr 1fr 1fr;padding:1rem;grid-gap:1rem}.hatch-instagram .instagram-items div{padding:0.5rem}.blocks-gallery-grid{display:flex;justify-content:center;align-items:center}.blocks-gallery-grid .blocks-gallery-item{padding:1rem}.has-text-align-center{text-align:center;margin:0 auto}.wp-block-image{display:grid;justify-content:center;font-size:0.7rem;text-align:center}.wp-block-image img{margin:0 auto}.hatch-hr hr{width:1.5rem;margin:0.5rem auto;border-bottom:3px solid #ac335e}.blog-posts{display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:1.5rem}@media screen and (max-width: 425px){.blog-posts{grid-template-columns:auto;padding:3rem}}.blog-posts .post{transition:all 300ms;opacity:0.8}.blog-posts .post:hover{opacity:1}.blog-posts .post h1{font-size:2.5rem}@media screen and (max-width: 425px){.blog-posts .post h1{font-size:2rem}}.blog-posts .post h4{font-size:1.7rem}@media screen and (max-width: 425px){.blog-posts .post h4{font-size:1.4rem}}.blog-posts .post img{width:100%}.subscribe-wrapper{background-color:#a68dcb}.subscribe-wrapper .subscribe{display:grid;grid-template-columns:1fr 1fr;margin:0 auto}.subscribe-wrapper .subscribe .subscribe-image{height:36rem;margin:0 auto}@media screen and (max-width: 768px){.subscribe-wrapper .subscribe{grid-template-rows:0.3fr 1fr;grid-template-columns:initial;padding:2rem}}.subscribe-wrapper p,.subscribe-wrapper h2{color:#fff;padding-left:0;padding-right:0}.subscribe-wrapper h2{padding:0}@media screen and (max-width: 425px){.subscribe-wrapper h2{margin:0 auto;text-align:center}}.subscribe-wrapper img{height:100%}.subscribe-wrapper .subscribe-content{display:grid;justify-content:center;align-items:center}.subscribe-wrapper .subscribe-content .content{padding-left:2rem;padding-right:2rem}.subscribe-wrapper .subscribe-content .subscribe-form form{color:#fff;display:grid;grid-template-columns:1fr 1fr 1fr;grid-gap:1rem;align-items:center;margin-top:4rem}@media screen and (max-width: 768px){.subscribe-wrapper .subscribe-content .subscribe-form form{grid-template-columns:initial;height:18rem}}.subscribe-wrapper .subscribe-content .subscribe-form form input{text-align:center}form button{height:4rem;width:16rem;background-color:#e4a73a;color:#fff;border-radius:7px;font-family:'playFairRegular';transition:all 300ms}@media screen and (max-width: 425px){form button{width:100%}}form button:hover{background-color:transparent;border:1px solid #e4a73a}#sapper ::-webkit-input-placeholder{color:#fff;opacity:1}#sapper ::-moz-placeholder{color:#fff;opacity:1}#sapper :-ms-input-placeholder{color:#fff;opacity:1}#sapper ::-ms-input-placeholder{color:#fff;opacity:1}#sapper ::placeholder{color:#fff;opacity:1}#sapper input{transition:all 300ms;height:3.5rem;width:100%}#sapper textarea,#sapper input{border-radius:6px;background-color:transparent}.content-wrapper{max-width:80rem;margin:0 auto}.become-a-member-wrapper{margin:2rem 0 2rem}.become-a-member{display:grid;grid-template-columns:1fr 1fr;grid-gap:1.5rem}@media screen and (max-width: 768px){.become-a-member{display:flex;flex-direction:column-reverse;grid-template-columns:initial}}@media screen and (min-width: 768px) and (max-width: 1024px){.become-a-member .member-forms{padding-left:2rem}}@media screen and (max-width: 768px){.become-a-member .member-forms{display:initial;grid-template-columns:initial;height:34rem}}@media screen and (max-width: 768px){.become-a-member .member-forms form{padding:2rem}}.become-a-member h3{padding:0 1rem}.become-a-member h2{max-width:initial}.become-a-member form{display:grid;grid-template-rows:1fr;grid-gap:1rem;width:100%}.become-a-member form input,.become-a-member form textarea{width:100% !important}.become-a-member form .upper{display:grid;grid-gap:1rem}.become-a-member form .upper input{height:4rem}.become-a-member form .lower{display:grid;grid-gap:1rem;justify-items:right}.become-a-member form .lower textarea{width:100%}.become-a-member form button:hover{color:#5d5d5d}.become-a-member .become-a-member-content{display:flex}@media screen and (max-width: 768px){.become-a-member .become-a-member-content{text-align:center}.become-a-member .become-a-member-content h3{margin:0 auto}}.become-a-member .become-a-member-content h2{white-space:initial;line-height:1.3;padding:0 1rem 1rem}.become-a-member .become-a-member-content p{padding:0 1rem 1rem}.become-a-member input,.become-a-member textarea{border:1px solid #959595 !important;padding-left:1rem}.become-a-member textarea{padding-top:0.5rem}.become-a-member ::-webkit-input-placeholder{color:#959595 !important;opacity:1}.become-a-member ::-moz-placeholder{color:#959595 !important;opacity:1}.become-a-member :-ms-input-placeholder{color:#959595 !important;opacity:1}.become-a-member ::-ms-input-placeholder{color:#959595 !important;opacity:1}.become-a-member ::placeholder{color:#959595 !important;opacity:1}.become-a-member :-ms-input-placeholder{color:#959595 !important}.become-a-member ::-ms-input-placeholder{color:#959595 !important}.loader{position:fixed;top:0;width:100%;height:100%;z-index:9999;background-color:#fff;transition:background-color .3s ease-out,transform 0s .3s linear;display:block}.parallax{-o-object-fit:contain;object-fit:contain;height:500px;background-attachment:fixed;background-position:center;background-repeat:no-repeat;background-size:cover}@media screen and (max-width: 425px){.pursue-svg{height:21rem}}@media screen and (max-width: 425px){.youcan{width:100%}}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script> \\n  import Nav from \\\"../components/Nav.svelte\\\";\\n  import Footer from \\\"../components/Footer.svelte\\\";\\n\\n  export let segment;\\n</script>\\n\\n<style lang=\\\"scss\\\" global>:global(.container) {\\n  max-width: 1300px; }\\n\\n@font-face {\\n  font-family: PlayFairBold;\\n  src: url(\\\"/fonts/PlayfairDisplay-Bold.ttf\\\");\\n  font-display: swap; }\\n\\n@font-face {\\n  font-family: PlayFairRegular;\\n  src: url(\\\"/fonts/PlayfairDisplay-Regular.ttf\\\");\\n  font-display: swap; }\\n\\n@font-face {\\n  font-family: MontserratLight;\\n  src: url(\\\"/fonts/Montserrat-Light.ttf\\\");\\n  font-display: swap; }\\n\\n@font-face {\\n  font-family: MontserratRegular;\\n  src: url(\\\"/fonts/Montserrat-Regular.ttf\\\");\\n  font-display: swap; }\\n\\n:global(:root) {\\n  font-size: 62.5%; }\\n  :global(:root) :global(body) {\\n    margin: 0;\\n    font-size: 1.6rem; }\\n\\n:global(body) {\\n  background-color: #f5f5f5;\\n  -webkit-font-smoothing: subpixel-antialiased;\\n  -moz-osx-font-smoothing: auto;\\n  font-family: 'MontserratRegular', sans-serif;\\n  font-weight: 400;\\n  font-style: normal;\\n  font-size: 1.4rem;\\n  text-transform: none;\\n  color: #5d5d5d; }\\n\\n:global(p) {\\n  font-family: 'MontserratLight', sans-serif;\\n  font-weight: light;\\n  font-weight: 400;\\n  font-style: normal;\\n  padding: 1rem;\\n  line-height: 1.8em;\\n  color: #5d5d5d; }\\n  @media screen and (max-width: 425px) {\\n    :global(p) {\\n      text-align: center; } }\\n\\n:global(h1), :global(h2) {\\n  line-height: 1em;\\n  padding: 1rem; }\\n\\n:global(h1) {\\n  font-size: 4.8rem;\\n  font-family: 'PlayFairBold', serif;\\n  color: #ac335e;\\n  font-style: normal;\\n  letter-spacing: 0.04em; }\\n  @media only screen and (max-width: 640px) {\\n    :global(h1) {\\n      font-size: 3rem;\\n      letter-spacing: .05em;\\n      line-height: 1.2em;\\n      white-space: pre-wrap; } }\\n\\n:global(h2) {\\n  color: #ac335e;\\n  font-family: 'PlayFairBold', serif;\\n  font-weight: bold;\\n  font-style: normal;\\n  font-size: 4rem;\\n  max-width: 60%; }\\n  @media screen and (max-width: 640px) {\\n    :global(h2) {\\n      font-size: 3rem;\\n      max-width: 100%;\\n      white-space: pre-wrap; } }\\n\\n:global(h3) {\\n  color: #c16995;\\n  max-width: 60%;\\n  font-family: 'MontserratRegular', sans-serif;\\n  font-weight: 300;\\n  font-size: 2.2rem; }\\n  @media screen and (max-width: 640px) {\\n    :global(h3) {\\n      font-size: 2rem;\\n      max-width: 100%;\\n      white-space: pre-wrap; } }\\n\\n:global(main) {\\n  min-height: 800px; }\\n\\n:global(.module) {\\n  font-size: 1.1rem; }\\n\\n:global(.hatch-content) {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  padding: 1rem; }\\n  :global(.hatch-content) :global(h1) {\\n    position: relative;\\n    margin-bottom: 1.5rem;\\n    padding-bottom: 3rem; }\\n    @media screen and (max-width: 425px) {\\n      :global(.hatch-content) :global(h1) {\\n        text-align: center; } }\\n    :global(.hatch-content) :global(h1:after) {\\n      content: \\\"\\\";\\n      border-bottom: 3px solid #3e99c4;\\n      position: absolute;\\n      bottom: 0;\\n      height: 1rem;\\n      width: 2rem;\\n      left: 1rem; }\\n      @media screen and (max-width: 425px) {\\n        :global(.hatch-content) :global(h1:after) {\\n          left: 50%;\\n          transform: translate(-50%, -50%); } }\\n\\n:global(.he-row) :global(*:not(h1):not(h2):not(h3)) {\\n  word-wrap: break-word; }\\n\\n:global(.he-row) {\\n  height: 100%;\\n  position: relative; }\\n  :global(.he-row) :global(img) {\\n    margin: 0 auto; }\\n\\n:global(.spacer) {\\n  height: 15rem; }\\n  @media screen and (max-width: 768px) {\\n    :global(.spacer) {\\n      height: 8rem; } }\\n  @media screen and (max-width: 425px) {\\n    :global(.spacer) {\\n      height: 1rem; } }\\n\\n:global(.container) {\\n  max-width: 1300px; }\\n\\n@media screen and (max-width: 640px) {\\n  :global(.he-row) :global(.container) {\\n    padding-top: 17px !important;\\n    padding-left: 17px;\\n    padding-right: 17px; } }\\n\\n:global(*) {\\n  box-sizing: border-box;\\n  text-decoration: none;\\n  list-style: none;\\n  outline: none; }\\n\\n:global(html), :global(body) {\\n  margin: 0;\\n  padding: 0; }\\n\\n:global(h5) {\\n  padding: 1rem;\\n  font-weight: 700; }\\n\\n:global(.hatch-left-image-big) :global(img) {\\n  position: relative;\\n  z-index: 9; }\\n\\n:global(.hatch-right-image-big) :global(img) {\\n  position: relative;\\n  z-index: 9; }\\n\\n:global(.blue-bg-square-left) {\\n  box-shadow: -14px 22px 0px -2px #96bdf2; }\\n\\n:global(.blue-bg-square-right) {\\n  box-shadow: 19px 22px 0px -2px #96bdf2; }\\n\\n:global(.pink-bg-square-left) {\\n  box-shadow: -14px 22px 0px -2px #d9a7c0; }\\n\\n:global(.pink-bg-square-right) {\\n  box-shadow: 19px 22px 0px -2px #d9a7c0; }\\n\\n:global(.yellow-bg-square-left) {\\n  box-shadow: -14px 22px 0px -2px #efc881; }\\n\\n:global(.yellow-bg-square-right) {\\n  box-shadow: 19px 22px 0px -2px #efc881; }\\n\\n:global(.hatch-left-image-big) {\\n  position: relative;\\n  padding: 4rem; }\\n\\n:global(.hatch-right-image-big.dashed:after) {\\n  background-color: initial;\\n  border: 11px dashed #d9a7c0; }\\n\\n:global(.hatch-left-image-big.yellow:after) {\\n  background-color: #efc881 !important; }\\n\\n:global(.hatch-right-image-big) {\\n  position: relative;\\n  padding: 4rem; }\\n\\n:global(.featured-items) {\\n  height: 3rem;\\n  display: grid;\\n  grid-template-columns: repeat(4, 1fr);\\n  grid-gap: 1rem;\\n  position: relative;\\n  height: 100%; }\\n  @media screen and (max-width: 425px) {\\n    :global(.featured-items) {\\n      grid-template-columns: repeat(2, 1fr); } }\\n\\n:global(button) {\\n  font-family: 'PlayFairRegular'; }\\n\\n:global(.hatch-btn) {\\n  padding: 1rem;\\n  display: flex; }\\n  :global(.hatch-btn) :global(button) {\\n    border: 1px solid #efc881;\\n    border-radius: 9px;\\n    padding: 0.5rem 1rem;\\n    font-size: 1.6rem;\\n    color: #efc881;\\n    transition: all 300ms;\\n    width: 22rem;\\n    height: 4rem; }\\n    :global(.hatch-btn) :global(button:hover) {\\n      background-color: #e4a73a;\\n      border: 1px solid #e4a73a;\\n      color: #fff; }\\n  @media screen and (max-width: 1024px) {\\n    :global(.hatch-btn) {\\n      justify-content: center; }\\n      :global(.hatch-btn) :global(button) {\\n        font-size: 1rem; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.hatch-btn) :global(button) {\\n      font-size: 2rem; } }\\n\\n:global(.featured-item) :global(h1) {\\n  font-size: 2rem;\\n  font-family: 'PlayFairRegular'; }\\n\\n:global(.hatch-link) {\\n  cursor: pointer; }\\n  :global(.hatch-link) :global(h1) {\\n    transition: all 300ms;\\n    color: #e4a73a; }\\n  :global(.hatch-link:hover) :global(h1) {\\n    color: #ac335e; }\\n\\n:global(.footer-links-nav) {\\n  max-width: 40rem;\\n  font-family: 'PlayFairRegular', serif;\\n  padding: 4rem 0; }\\n  :global(.footer-links-nav) :global(a) {\\n    transition: all 300ms; }\\n    :global(.footer-links-nav) :global(a:hover) {\\n      color: #ac335e; }\\n\\n@media screen and (max-width: 425px) {\\n  :global(footer) {\\n    text-align: center; } }\\n\\n:global(.hatch-instagram) {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr;\\n  margin-top: 1rem; }\\n  @media screen and (max-width: 425px) {\\n    :global(.hatch-instagram) {\\n      grid-template-columns: auto; } }\\n  :global(.hatch-instagram) :global(p) {\\n    font-family: 'PlayFairRegular', serif;\\n    font-style: normal;\\n    border-right: 1px solid #e3e3e3; }\\n  :global(.hatch-instagram) :global(.left-section) {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    grid-gap: 1rem; }\\n    @media screen and (max-width: 425px) {\\n      :global(.hatch-instagram) :global(.left-section) {\\n        grid-template-columns: auto; } }\\n  :global(.hatch-instagram) :global(.hatch-logo) {\\n    display: flex;\\n    padding: 1rem; }\\n    @media screen and (min-width: 425px) {\\n      :global(.hatch-instagram) :global(.hatch-logo) {\\n        align-items: flex-start;\\n        flex-direction: row-reverse; } }\\n    @media screen and (max-width: 425px) {\\n      :global(.hatch-instagram) :global(.hatch-logo) {\\n        justify-content: center; } }\\n  :global(.hatch-instagram) :global(.instagram-items) {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr 1fr;\\n    padding: 1rem;\\n    grid-gap: 1rem; }\\n    :global(.hatch-instagram) :global(.instagram-items) :global(div) {\\n      padding: 0.5rem; }\\n\\n:global(.blocks-gallery-grid) {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center; }\\n  :global(.blocks-gallery-grid) :global(.blocks-gallery-item) {\\n    padding: 1rem; }\\n\\n:global(.has-text-align-center) {\\n  text-align: center;\\n  margin: 0 auto; }\\n\\n:global(.wp-block-image) {\\n  display: grid;\\n  justify-content: center;\\n  font-size: 0.7rem;\\n  text-align: center; }\\n  :global(.wp-block-image) :global(img) {\\n    margin: 0 auto; }\\n\\n:global(.hatch-hr) :global(hr) {\\n  width: 1.5rem;\\n  margin: 0.5rem auto;\\n  border-bottom: 3px solid #ac335e; }\\n\\n:global(.blog-posts) {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr 1fr;\\n  grid-gap: 1.5rem; }\\n  @media screen and (max-width: 425px) {\\n    :global(.blog-posts) {\\n      grid-template-columns: auto;\\n      padding: 3rem; } }\\n  :global(.blog-posts) :global(.post) {\\n    transition: all 300ms;\\n    opacity: 0.8; }\\n    :global(.blog-posts) :global(.post:hover) {\\n      opacity: 1; }\\n    :global(.blog-posts) :global(.post) :global(h1) {\\n      font-size: 2.5rem; }\\n      @media screen and (max-width: 425px) {\\n        :global(.blog-posts) :global(.post) :global(h1) {\\n          font-size: 2rem; } }\\n    :global(.blog-posts) :global(.post) :global(h4) {\\n      font-size: 1.7rem; }\\n      @media screen and (max-width: 425px) {\\n        :global(.blog-posts) :global(.post) :global(h4) {\\n          font-size: 1.4rem; } }\\n    :global(.blog-posts) :global(.post) :global(img) {\\n      width: 100%; }\\n\\n:global(.subscribe-wrapper) {\\n  background-color: #a68dcb; }\\n  :global(.subscribe-wrapper) :global(.subscribe) {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    margin: 0 auto; }\\n    :global(.subscribe-wrapper) :global(.subscribe) :global(.subscribe-image) {\\n      height: 36rem;\\n      margin: 0 auto; }\\n    @media screen and (max-width: 768px) {\\n      :global(.subscribe-wrapper) :global(.subscribe) {\\n        grid-template-rows: 0.3fr 1fr;\\n        grid-template-columns: initial;\\n        padding: 2rem; } }\\n  :global(.subscribe-wrapper) :global(p), :global(.subscribe-wrapper) :global(h2) {\\n    color: #fff;\\n    padding-left: 0;\\n    padding-right: 0; }\\n  :global(.subscribe-wrapper) :global(h2) {\\n    padding: 0; }\\n    @media screen and (max-width: 425px) {\\n      :global(.subscribe-wrapper) :global(h2) {\\n        margin: 0 auto;\\n        text-align: center; } }\\n  :global(.subscribe-wrapper) :global(img) {\\n    height: 100%; }\\n  :global(.subscribe-wrapper) :global(.subscribe-content) {\\n    display: grid;\\n    justify-content: center;\\n    align-items: center; }\\n    :global(.subscribe-wrapper) :global(.subscribe-content) :global(.content) {\\n      padding-left: 2rem;\\n      padding-right: 2rem; }\\n    :global(.subscribe-wrapper) :global(.subscribe-content) :global(.subscribe-form) :global(form) {\\n      color: #fff;\\n      display: grid;\\n      grid-template-columns: 1fr 1fr 1fr;\\n      grid-gap: 1rem;\\n      align-items: center;\\n      margin-top: 4rem; }\\n      @media screen and (max-width: 768px) {\\n        :global(.subscribe-wrapper) :global(.subscribe-content) :global(.subscribe-form) :global(form) {\\n          grid-template-columns: initial;\\n          height: 18rem; } }\\n      :global(.subscribe-wrapper) :global(.subscribe-content) :global(.subscribe-form) :global(form) :global(input) {\\n        text-align: center; }\\n\\n:global(form) :global(button) {\\n  height: 4rem;\\n  width: 16rem;\\n  background-color: #e4a73a;\\n  color: #fff;\\n  border-radius: 7px;\\n  font-family: 'playFairRegular';\\n  transition: all 300ms; }\\n  @media screen and (max-width: 425px) {\\n    :global(form) :global(button) {\\n      width: 100%; } }\\n  :global(form) :global(button:hover) {\\n    background-color: transparent;\\n    border: 1px solid #e4a73a; }\\n\\n:global(#sapper) :global(::-webkit-input-placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(::-moz-placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(:-ms-input-placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(::-ms-input-placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(::placeholder) {\\n  /* Chrome, Firefox, Opera, Safari 10.1+ */\\n  color: #fff;\\n  opacity: 1;\\n  /* Firefox */ }\\n\\n:global(#sapper) :global(input) {\\n  transition: all 300ms;\\n  height: 3.5rem;\\n  width: 100%; }\\n\\n:global(#sapper) :global(textarea), :global(#sapper) :global(input) {\\n  border-radius: 6px;\\n  background-color: transparent; }\\n\\n:global(.content-wrapper) {\\n  max-width: 80rem;\\n  margin: 0 auto; }\\n\\n:global(.become-a-member-wrapper) {\\n  margin: 2rem 0 2rem; }\\n\\n:global(.become-a-member) {\\n  display: grid;\\n  grid-template-columns: 1fr 1fr;\\n  grid-gap: 1.5rem; }\\n  @media screen and (max-width: 768px) {\\n    :global(.become-a-member) {\\n      display: flex;\\n      flex-direction: column-reverse;\\n      grid-template-columns: initial; } }\\n  @media screen and (min-width: 768px) and (max-width: 1024px) {\\n    :global(.become-a-member) :global(.member-forms) {\\n      padding-left: 2rem; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.become-a-member) :global(.member-forms) {\\n      display: initial;\\n      grid-template-columns: initial;\\n      height: 34rem; } }\\n  @media screen and (max-width: 768px) {\\n    :global(.become-a-member) :global(.member-forms) :global(form) {\\n      padding: 2rem; } }\\n  :global(.become-a-member) :global(h3) {\\n    padding: 0 1rem; }\\n  :global(.become-a-member) :global(h2) {\\n    max-width: initial; }\\n  :global(.become-a-member) :global(form) {\\n    display: grid;\\n    grid-template-rows: 1fr;\\n    grid-gap: 1rem;\\n    width: 100%; }\\n    :global(.become-a-member) :global(form) :global(input), :global(.become-a-member) :global(form) :global(textarea) {\\n      width: 100% !important; }\\n    :global(.become-a-member) :global(form) :global(.upper) {\\n      display: grid;\\n      grid-gap: 1rem; }\\n      :global(.become-a-member) :global(form) :global(.upper) :global(input) {\\n        height: 4rem; }\\n    :global(.become-a-member) :global(form) :global(.lower) {\\n      display: grid;\\n      grid-gap: 1rem;\\n      justify-items: right; }\\n      :global(.become-a-member) :global(form) :global(.lower) :global(textarea) {\\n        width: 100%; }\\n    :global(.become-a-member) :global(form) :global(button:hover) {\\n      color: #5d5d5d; }\\n  :global(.become-a-member) :global(.become-a-member-content) {\\n    display: flex;\\n    /*justify-content: center;*/\\n    /*align-items: center;*/\\n    /*height: 26rem;*/ }\\n    @media screen and (max-width: 768px) {\\n      :global(.become-a-member) :global(.become-a-member-content) {\\n        text-align: center; }\\n        :global(.become-a-member) :global(.become-a-member-content) :global(h3) {\\n          margin: 0 auto; } }\\n    :global(.become-a-member) :global(.become-a-member-content) :global(h2) {\\n      white-space: initial;\\n      line-height: 1.3;\\n      padding: 0 1rem 1rem; }\\n    :global(.become-a-member) :global(.become-a-member-content) :global(p) {\\n      padding: 0 1rem 1rem; }\\n  :global(.become-a-member) :global(input), :global(.become-a-member) :global(textarea) {\\n    /*color: #959595 !important;*/\\n    border: 1px solid #959595 !important;\\n    padding-left: 1rem; }\\n  :global(.become-a-member) :global(textarea) {\\n    /*color: #959595 !important;*/\\n    padding-top: 0.5rem; }\\n  :global(.become-a-member) :global(::-webkit-input-placeholder) {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  :global(.become-a-member) :global(::-moz-placeholder) {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  :global(.become-a-member) :global(:-ms-input-placeholder) {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  :global(.become-a-member) :global(::-ms-input-placeholder) {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  :global(.become-a-member) :global(::placeholder) {\\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\\n    color: #959595 !important;\\n    opacity: 1;\\n    /* Firefox */ }\\n  :global(.become-a-member) :global(:-ms-input-placeholder) {\\n    /* Internet Explorer 10-11 */\\n    color: #959595 !important; }\\n  :global(.become-a-member) :global(::-ms-input-placeholder) {\\n    /* Microsoft Edge */\\n    color: #959595 !important; }\\n\\n:global(.loader) {\\n  position: fixed;\\n  top: 0;\\n  width: 100%;\\n  height: 100%;\\n  z-index: 9999;\\n  background-color: #fff;\\n  transition: background-color .3s ease-out,transform 0s .3s linear;\\n  display: block; }\\n\\n:global(.parallax) {\\n  -o-object-fit: contain;\\n     object-fit: contain;\\n  /* The image used */\\n  /* Set a specific height */\\n  height: 500px;\\n  /* Create the parallax scrolling effect */\\n  background-attachment: fixed;\\n  background-position: center;\\n  background-repeat: no-repeat;\\n  background-size: cover; }\\n\\n@media screen and (max-width: 425px) {\\n  :global(.pursue-svg) {\\n    height: 21rem; } }\\n\\n@media screen and (max-width: 425px) {\\n  :global(.youcan) {\\n    width: 100%; } }\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvX2xheW91dC5zdmVsdGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUIsRUFBRTs7QUFFckI7RUFDRSx5QkFBeUI7RUFDekIsMkNBQTJDO0VBQzNDLGtCQUFrQixFQUFFOztBQUV0QjtFQUNFLDRCQUE0QjtFQUM1Qiw4Q0FBOEM7RUFDOUMsa0JBQWtCLEVBQUU7O0FBRXRCO0VBQ0UsNEJBQTRCO0VBQzVCLHVDQUF1QztFQUN2QyxrQkFBa0IsRUFBRTs7QUFFdEI7RUFDRSw4QkFBOEI7RUFDOUIseUNBQXlDO0VBQ3pDLGtCQUFrQixFQUFFOztBQUV0QjtFQUNFLGdCQUFnQixFQUFFO0VBQ2xCO0lBQ0UsU0FBUztJQUNULGlCQUFpQixFQUFFOztBQUV2QjtFQUNFLHlCQUF5QjtFQUN6Qiw0Q0FBNEM7RUFDNUMsNkJBQTZCO0VBQzdCLDRDQUE0QztFQUM1QyxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsY0FBYyxFQUFFOztBQUVsQjtFQUNFLDBDQUEwQztFQUMxQyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGNBQWMsRUFBRTtFQUNoQjtJQUNFO01BQ0Usa0JBQWtCLEVBQUUsRUFBRTs7QUFFNUI7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGlCQUFpQjtFQUNqQixrQ0FBa0M7RUFDbEMsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixzQkFBc0IsRUFBRTtFQUN4QjtJQUNFO01BQ0UsZUFBZTtNQUNmLHFCQUFxQjtNQUNyQixrQkFBa0I7TUFDbEIscUJBQXFCLEVBQUUsRUFBRTs7QUFFL0I7RUFDRSxjQUFjO0VBQ2Qsa0NBQWtDO0VBQ2xDLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWMsRUFBRTtFQUNoQjtJQUNFO01BQ0UsZUFBZTtNQUNmLGVBQWU7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a0JBQWtCLEVBQUU7RUFDdEI7SUFDRSw2QkFBNkI7SUFDN0IsbUJBQW1CLEVBQUU7RUFDdkI7SUFDRSx5Q0FBeUM7SUFDekMseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixZQUFZLEVBQUU7RUFDaEI7SUFDRSx5Q0FBeUM7SUFDekMseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixZQUFZLEVBQUU7RUFDaEI7SUFDRSx5Q0FBeUM7SUFDekMseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixZQUFZLEVBQUU7RUFDaEI7SUFDRSx5Q0FBeUM7SUFDekMseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixZQUFZLEVBQUU7RUFDaEI7SUFDRSx5Q0FBeUM7SUFDekMseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixZQUFZLEVBQUU7RUFDaEI7SUFDRSw0QkFBNEI7SUFDNUIseUJBQXlCLEVBQUU7RUFDN0I7SUFDRSxtQkFBbUI7SUFDbkIseUJBQXlCLEVBQUU7O0FBRS9CO0VBQ0UsZUFBZTtFQUNmLE1BQU07RUFDTixXQUFXO0VBQ1gsWUFBWTtFQUNaLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsaUVBQWlFO0VBQ2pFLGNBQWMsRUFBRTs7QUFFbEI7RUFDRSxzQkFBc0I7S0FDbkIsbUJBQW1CO0VBQ3RCLG1CQUFtQjtFQUNuQiwwQkFBMEI7RUFDMUIsYUFBYTtFQUNiLHlDQUF5QztFQUN6Qyw0QkFBNEI7RUFDNUIsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1QixzQkFBc0IsRUFBRTs7QUFFMUI7RUFDRTtJQUNFLGFBQWEsRUFBRSxFQUFFOztBQUVyQjtFQUNFO0lBQ0UsV0FBVyxFQUFFLEVBQUUiLCJmaWxlIjoic3JjL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZSIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xuICBtYXgtd2lkdGg6IDEzMDBweDsgfVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFBsYXlGYWlyQm9sZDtcbiAgc3JjOiB1cmwoXCIvZm9udHMvUGxheWZhaXJEaXNwbGF5LUJvbGQudHRmXCIpO1xuICBmb250LWRpc3BsYXk6IHN3YXA7IH1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBQbGF5RmFpclJlZ3VsYXI7XG4gIHNyYzogdXJsKFwiL2ZvbnRzL1BsYXlmYWlyRGlzcGxheS1SZWd1bGFyLnR0ZlwiKTtcbiAgZm9udC1kaXNwbGF5OiBzd2FwOyB9XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogTW9udHNlcnJhdExpZ2h0O1xuICBzcmM6IHVybChcIi9mb250cy9Nb250c2VycmF0LUxpZ2h0LnR0ZlwiKTtcbiAgZm9udC1kaXNwbGF5OiBzd2FwOyB9XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogTW9udHNlcnJhdFJlZ3VsYXI7XG4gIHNyYzogdXJsKFwiL2ZvbnRzL01vbnRzZXJyYXQtUmVndWxhci50dGZcIik7XG4gIGZvbnQtZGlzcGxheTogc3dhcDsgfVxuXG46cm9vdCB7XG4gIGZvbnQtc2l6ZTogNjIuNSU7IH1cbiAgOnJvb3QgYm9keSB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogMS42cmVtOyB9XG5cbmJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBzdWJwaXhlbC1hbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGF1dG87XG4gIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdFJlZ3VsYXInLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMS40cmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgY29sb3I6ICM1ZDVkNWQ7IH1cblxucCB7XG4gIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdExpZ2h0Jywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IGxpZ2h0O1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjhlbTtcbiAgY29sb3I6ICM1ZDVkNWQ7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICBwIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfSB9XG5cbmgxLCBoMiB7XG4gIGxpbmUtaGVpZ2h0OiAxZW07XG4gIHBhZGRpbmc6IDFyZW07IH1cblxuaDEge1xuICBmb250LXNpemU6IDQuOHJlbTtcbiAgZm9udC1mYW1pbHk6ICdQbGF5RmFpckJvbGQnLCBzZXJpZjtcbiAgY29sb3I6ICNhYzMzNWU7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTsgfVxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IC4wNWVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMmVtO1xuICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwOyB9IH1cblxuaDIge1xuICBjb2xvcjogI2FjMzM1ZTtcbiAgZm9udC1mYW1pbHk6ICdQbGF5RmFpckJvbGQnLCBzZXJpZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiA0cmVtO1xuICBtYXgtd2lkdGg6IDYwJTsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NDBweCkge1xuICAgIGgyIHtcbiAgICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDsgfSB9XG5cbmgzIHtcbiAgY29sb3I6ICNjMTY5OTU7XG4gIG1heC13aWR0aDogNjAlO1xuICBmb250LWZhbWlseTogJ01vbnRzZXJyYXRSZWd1bGFyJywgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgZm9udC1zaXplOiAyLjJyZW07IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjQwcHgpIHtcbiAgICBoMyB7XG4gICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7IH0gfVxuXG5tYWluIHtcbiAgbWluLWhlaWdodDogODAwcHg7IH1cblxuLm1vZHVsZSB7XG4gIGZvbnQtc2l6ZTogMS4xcmVtOyB9XG5cbi5oYXRjaC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDFyZW07IH1cbiAgLmhhdGNoLWNvbnRlbnQgaDEge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG4gICAgcGFkZGluZy1ib3R0b206IDNyZW07IH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAgICAgLmhhdGNoLWNvbnRlbnQgaDEge1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxuICAgIC5oYXRjaC1jb250ZW50IGgxOmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNlOTljNDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGhlaWdodDogMXJlbTtcbiAgICAgIHdpZHRoOiAycmVtO1xuICAgICAgbGVmdDogMXJlbTsgfVxuICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgICAgLmhhdGNoLWNvbnRlbnQgaDE6YWZ0ZXIge1xuICAgICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTsgfSB9XG5cbi5oZS1yb3cgKjpub3QoaDEpOm5vdChoMik6bm90KGgzKSB7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDsgfVxuXG4uaGUtcm93IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cbiAgLmhlLXJvdyBpbWcge1xuICAgIG1hcmdpbjogMCBhdXRvOyB9XG5cbi5zcGFjZXIge1xuICBoZWlnaHQ6IDE1cmVtOyB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgLnNwYWNlciB7XG4gICAgICBoZWlnaHQ6IDhyZW07IH0gfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAgIC5zcGFjZXIge1xuICAgICAgaGVpZ2h0OiAxcmVtOyB9IH1cblxuLmNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogMTMwMHB4OyB9XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG4gIC5oZS1yb3cgLmNvbnRhaW5lciB7XG4gICAgcGFkZGluZy10b3A6IDE3cHggIWltcG9ydGFudDtcbiAgICBwYWRkaW5nLWxlZnQ6IDE3cHg7XG4gICAgcGFkZGluZy1yaWdodDogMTdweDsgfSB9XG5cbioge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7IH1cblxuaHRtbCwgYm9keSB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDsgfVxuXG5oNSB7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7IH1cblxuLmhhdGNoLWxlZnQtaW1hZ2UtYmlnIGltZyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogOTsgfVxuXG4uaGF0Y2gtcmlnaHQtaW1hZ2UtYmlnIGltZyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogOTsgfVxuXG4uYmx1ZS1iZy1zcXVhcmUtbGVmdCB7XG4gIGJveC1zaGFkb3c6IC0xNHB4IDIycHggMHB4IC0ycHggIzk2YmRmMjsgfVxuXG4uYmx1ZS1iZy1zcXVhcmUtcmlnaHQge1xuICBib3gtc2hhZG93OiAxOXB4IDIycHggMHB4IC0ycHggIzk2YmRmMjsgfVxuXG4ucGluay1iZy1zcXVhcmUtbGVmdCB7XG4gIGJveC1zaGFkb3c6IC0xNHB4IDIycHggMHB4IC0ycHggI2Q5YTdjMDsgfVxuXG4ucGluay1iZy1zcXVhcmUtcmlnaHQge1xuICBib3gtc2hhZG93OiAxOXB4IDIycHggMHB4IC0ycHggI2Q5YTdjMDsgfVxuXG4ueWVsbG93LWJnLXNxdWFyZS1sZWZ0IHtcbiAgYm94LXNoYWRvdzogLTE0cHggMjJweCAwcHggLTJweCAjZWZjODgxOyB9XG5cbi55ZWxsb3ctYmctc3F1YXJlLXJpZ2h0IHtcbiAgYm94LXNoYWRvdzogMTlweCAyMnB4IDBweCAtMnB4ICNlZmM4ODE7IH1cblxuLmhhdGNoLWxlZnQtaW1hZ2UtYmlnIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiA0cmVtOyB9XG5cbi5oYXRjaC1yaWdodC1pbWFnZS1iaWcuZGFzaGVkOmFmdGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5pdGlhbDtcbiAgYm9yZGVyOiAxMXB4IGRhc2hlZCAjZDlhN2MwOyB9XG5cbi5oYXRjaC1sZWZ0LWltYWdlLWJpZy55ZWxsb3c6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZjODgxICFpbXBvcnRhbnQ7IH1cblxuLmhhdGNoLXJpZ2h0LWltYWdlLWJpZyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgcGFkZGluZzogNHJlbTsgfVxuXG4uZmVhdHVyZWQtaXRlbXMge1xuICBoZWlnaHQ6IDNyZW07XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XG4gIGdyaWQtZ2FwOiAxcmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogMTAwJTsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAgIC5mZWF0dXJlZC1pdGVtcyB7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpOyB9IH1cblxuYnV0dG9uIHtcbiAgZm9udC1mYW1pbHk6ICdQbGF5RmFpclJlZ3VsYXInOyB9XG5cbi5oYXRjaC1idG4ge1xuICBwYWRkaW5nOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4OyB9XG4gIC5oYXRjaC1idG4gYnV0dG9uIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZWZjODgxO1xuICAgIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICBjb2xvcjogI2VmYzg4MTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMzAwbXM7XG4gICAgd2lkdGg6IDIycmVtO1xuICAgIGhlaWdodDogNHJlbTsgfVxuICAgIC5oYXRjaC1idG4gYnV0dG9uOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlNGE3M2E7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZTRhNzNhO1xuICAgICAgY29sb3I6ICNmZmY7IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgLmhhdGNoLWJ0biB7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxuICAgICAgLmhhdGNoLWJ0biBidXR0b24ge1xuICAgICAgICBmb250LXNpemU6IDFyZW07IH0gfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgIC5oYXRjaC1idG4gYnV0dG9uIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTsgfSB9XG5cbi5mZWF0dXJlZC1pdGVtIGgxIHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBmb250LWZhbWlseTogJ1BsYXlGYWlyUmVndWxhcic7IH1cblxuLmhhdGNoLWxpbmsge1xuICBjdXJzb3I6IHBvaW50ZXI7IH1cbiAgLmhhdGNoLWxpbmsgaDEge1xuICAgIHRyYW5zaXRpb246IGFsbCAzMDBtcztcbiAgICBjb2xvcjogI2U0YTczYTsgfVxuICAuaGF0Y2gtbGluazpob3ZlciBoMSB7XG4gICAgY29sb3I6ICNhYzMzNWU7IH1cblxuLmZvb3Rlci1saW5rcy1uYXYge1xuICBtYXgtd2lkdGg6IDQwcmVtO1xuICBmb250LWZhbWlseTogJ1BsYXlGYWlyUmVndWxhcicsIHNlcmlmO1xuICBwYWRkaW5nOiA0cmVtIDA7IH1cbiAgLmZvb3Rlci1saW5rcy1uYXYgYSB7XG4gICAgdHJhbnNpdGlvbjogYWxsIDMwMG1zOyB9XG4gICAgLmZvb3Rlci1saW5rcy1uYXYgYTpob3ZlciB7XG4gICAgICBjb2xvcjogI2FjMzM1ZTsgfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICBmb290ZXIge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfSB9XG5cbi5oYXRjaC1pbnN0YWdyYW0ge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG4gIG1hcmdpbi10b3A6IDFyZW07IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAuaGF0Y2gtaW5zdGFncmFtIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0bzsgfSB9XG4gIC5oYXRjaC1pbnN0YWdyYW0gcCB7XG4gICAgZm9udC1mYW1pbHk6ICdQbGF5RmFpclJlZ3VsYXInLCBzZXJpZjtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2UzZTNlMzsgfVxuICAuaGF0Y2gtaW5zdGFncmFtIC5sZWZ0LXNlY3Rpb24ge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgIGdyaWQtZ2FwOiAxcmVtOyB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgIC5oYXRjaC1pbnN0YWdyYW0gLmxlZnQtc2VjdGlvbiB7XG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0bzsgfSB9XG4gIC5oYXRjaC1pbnN0YWdyYW0gLmhhdGNoLWxvZ28ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcGFkZGluZzogMXJlbTsgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQyNXB4KSB7XG4gICAgICAuaGF0Y2gtaW5zdGFncmFtIC5oYXRjaC1sb2dvIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTsgfSB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgIC5oYXRjaC1pbnN0YWdyYW0gLmhhdGNoLWxvZ28ge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfSB9XG4gIC5oYXRjaC1pbnN0YWdyYW0gLmluc3RhZ3JhbS1pdGVtcyB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgZ3JpZC1nYXA6IDFyZW07IH1cbiAgICAuaGF0Y2gtaW5zdGFncmFtIC5pbnN0YWdyYW0taXRlbXMgZGl2IHtcbiAgICAgIHBhZGRpbmc6IDAuNXJlbTsgfVxuXG4uYmxvY2tzLWdhbGxlcnktZ3JpZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XG4gIC5ibG9ja3MtZ2FsbGVyeS1ncmlkIC5ibG9ja3MtZ2FsbGVyeS1pdGVtIHtcbiAgICBwYWRkaW5nOiAxcmVtOyB9XG5cbi5oYXMtdGV4dC1hbGlnbi1jZW50ZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMCBhdXRvOyB9XG5cbi53cC1ibG9jay1pbWFnZSB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IDAuN3JlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gIC53cC1ibG9jay1pbWFnZSBpbWcge1xuICAgIG1hcmdpbjogMCBhdXRvOyB9XG5cbi5oYXRjaC1ociBociB7XG4gIHdpZHRoOiAxLjVyZW07XG4gIG1hcmdpbjogMC41cmVtIGF1dG87XG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjYWMzMzVlOyB9XG5cbi5ibG9nLXBvc3RzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcbiAgZ3JpZC1nYXA6IDEuNXJlbTsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAgIC5ibG9nLXBvc3RzIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0bztcbiAgICAgIHBhZGRpbmc6IDNyZW07IH0gfVxuICAuYmxvZy1wb3N0cyAucG9zdCB7XG4gICAgdHJhbnNpdGlvbjogYWxsIDMwMG1zO1xuICAgIG9wYWNpdHk6IDAuODsgfVxuICAgIC5ibG9nLXBvc3RzIC5wb3N0OmhvdmVyIHtcbiAgICAgIG9wYWNpdHk6IDE7IH1cbiAgICAuYmxvZy1wb3N0cyAucG9zdCBoMSB7XG4gICAgICBmb250LXNpemU6IDIuNXJlbTsgfVxuICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgICAgLmJsb2ctcG9zdHMgLnBvc3QgaDEge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMnJlbTsgfSB9XG4gICAgLmJsb2ctcG9zdHMgLnBvc3QgaDQge1xuICAgICAgZm9udC1zaXplOiAxLjdyZW07IH1cbiAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQyNXB4KSB7XG4gICAgICAgIC5ibG9nLXBvc3RzIC5wb3N0IGg0IHtcbiAgICAgICAgICBmb250LXNpemU6IDEuNHJlbTsgfSB9XG4gICAgLmJsb2ctcG9zdHMgLnBvc3QgaW1nIHtcbiAgICAgIHdpZHRoOiAxMDAlOyB9XG5cbi5zdWJzY3JpYmUtd3JhcHBlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNhNjhkY2I7IH1cbiAgLnN1YnNjcmliZS13cmFwcGVyIC5zdWJzY3JpYmUge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgIG1hcmdpbjogMCBhdXRvOyB9XG4gICAgLnN1YnNjcmliZS13cmFwcGVyIC5zdWJzY3JpYmUgLnN1YnNjcmliZS1pbWFnZSB7XG4gICAgICBoZWlnaHQ6IDM2cmVtO1xuICAgICAgbWFyZ2luOiAwIGF1dG87IH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgLnN1YnNjcmliZS13cmFwcGVyIC5zdWJzY3JpYmUge1xuICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDAuM2ZyIDFmcjtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBpbml0aWFsO1xuICAgICAgICBwYWRkaW5nOiAycmVtOyB9IH1cbiAgLnN1YnNjcmliZS13cmFwcGVyIHAsIC5zdWJzY3JpYmUtd3JhcHBlciBoMiB7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgIHBhZGRpbmctcmlnaHQ6IDA7IH1cbiAgLnN1YnNjcmliZS13cmFwcGVyIGgyIHtcbiAgICBwYWRkaW5nOiAwOyB9XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcbiAgICAgIC5zdWJzY3JpYmUtd3JhcHBlciBoMiB7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gfVxuICAuc3Vic2NyaWJlLXdyYXBwZXIgaW1nIHtcbiAgICBoZWlnaHQ6IDEwMCU7IH1cbiAgLnN1YnNjcmliZS13cmFwcGVyIC5zdWJzY3JpYmUtY29udGVudCB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyB9XG4gICAgLnN1YnNjcmliZS13cmFwcGVyIC5zdWJzY3JpYmUtY29udGVudCAuY29udGVudCB7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDJyZW07XG4gICAgICBwYWRkaW5nLXJpZ2h0OiAycmVtOyB9XG4gICAgLnN1YnNjcmliZS13cmFwcGVyIC5zdWJzY3JpYmUtY29udGVudCAuc3Vic2NyaWJlLWZvcm0gZm9ybSB7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xuICAgICAgZ3JpZC1nYXA6IDFyZW07XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgbWFyZ2luLXRvcDogNHJlbTsgfVxuICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgICAgLnN1YnNjcmliZS13cmFwcGVyIC5zdWJzY3JpYmUtY29udGVudCAuc3Vic2NyaWJlLWZvcm0gZm9ybSB7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBpbml0aWFsO1xuICAgICAgICAgIGhlaWdodDogMThyZW07IH0gfVxuICAgICAgLnN1YnNjcmliZS13cmFwcGVyIC5zdWJzY3JpYmUtY29udGVudCAuc3Vic2NyaWJlLWZvcm0gZm9ybSBpbnB1dCB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxuXG5mb3JtIGJ1dHRvbiB7XG4gIGhlaWdodDogNHJlbTtcbiAgd2lkdGg6IDE2cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTRhNzNhO1xuICBjb2xvcjogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xuICBmb250LWZhbWlseTogJ3BsYXlGYWlyUmVndWxhcic7XG4gIHRyYW5zaXRpb246IGFsbCAzMDBtczsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAgIGZvcm0gYnV0dG9uIHtcbiAgICAgIHdpZHRoOiAxMDAlOyB9IH1cbiAgZm9ybSBidXR0b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNlNGE3M2E7IH1cblxuI3NhcHBlciA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAvKiBDaHJvbWUsIEZpcmVmb3gsIE9wZXJhLCBTYWZhcmkgMTAuMSsgKi9cbiAgY29sb3I6ICNmZmY7XG4gIG9wYWNpdHk6IDE7XG4gIC8qIEZpcmVmb3ggKi8gfVxuXG4jc2FwcGVyIDo6LW1vei1wbGFjZWhvbGRlciB7XG4gIC8qIENocm9tZSwgRmlyZWZveCwgT3BlcmEsIFNhZmFyaSAxMC4xKyAqL1xuICBjb2xvcjogI2ZmZjtcbiAgb3BhY2l0eTogMTtcbiAgLyogRmlyZWZveCAqLyB9XG5cbiNzYXBwZXIgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gIC8qIENocm9tZSwgRmlyZWZveCwgT3BlcmEsIFNhZmFyaSAxMC4xKyAqL1xuICBjb2xvcjogI2ZmZjtcbiAgb3BhY2l0eTogMTtcbiAgLyogRmlyZWZveCAqLyB9XG5cbiNzYXBwZXIgOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAvKiBDaHJvbWUsIEZpcmVmb3gsIE9wZXJhLCBTYWZhcmkgMTAuMSsgKi9cbiAgY29sb3I6ICNmZmY7XG4gIG9wYWNpdHk6IDE7XG4gIC8qIEZpcmVmb3ggKi8gfVxuXG4jc2FwcGVyIDo6cGxhY2Vob2xkZXIge1xuICAvKiBDaHJvbWUsIEZpcmVmb3gsIE9wZXJhLCBTYWZhcmkgMTAuMSsgKi9cbiAgY29sb3I6ICNmZmY7XG4gIG9wYWNpdHk6IDE7XG4gIC8qIEZpcmVmb3ggKi8gfVxuXG4jc2FwcGVyIGlucHV0IHtcbiAgdHJhbnNpdGlvbjogYWxsIDMwMG1zO1xuICBoZWlnaHQ6IDMuNXJlbTtcbiAgd2lkdGg6IDEwMCU7IH1cblxuI3NhcHBlciB0ZXh0YXJlYSwgI3NhcHBlciBpbnB1dCB7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cblxuLmNvbnRlbnQtd3JhcHBlciB7XG4gIG1heC13aWR0aDogODByZW07XG4gIG1hcmdpbjogMCBhdXRvOyB9XG5cbi5iZWNvbWUtYS1tZW1iZXItd3JhcHBlciB7XG4gIG1hcmdpbjogMnJlbSAwIDJyZW07IH1cblxuLmJlY29tZS1hLW1lbWJlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgZ3JpZC1nYXA6IDEuNXJlbTsgfVxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgIC5iZWNvbWUtYS1tZW1iZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW4tcmV2ZXJzZTtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogaW5pdGlhbDsgfSB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XG4gICAgLmJlY29tZS1hLW1lbWJlciAubWVtYmVyLWZvcm1zIHtcbiAgICAgIHBhZGRpbmctbGVmdDogMnJlbTsgfSB9XG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgLmJlY29tZS1hLW1lbWJlciAubWVtYmVyLWZvcm1zIHtcbiAgICAgIGRpc3BsYXk6IGluaXRpYWw7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGluaXRpYWw7XG4gICAgICBoZWlnaHQ6IDM0cmVtOyB9IH1cbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAuYmVjb21lLWEtbWVtYmVyIC5tZW1iZXItZm9ybXMgZm9ybSB7XG4gICAgICBwYWRkaW5nOiAycmVtOyB9IH1cbiAgLmJlY29tZS1hLW1lbWJlciBoMyB7XG4gICAgcGFkZGluZzogMCAxcmVtOyB9XG4gIC5iZWNvbWUtYS1tZW1iZXIgaDIge1xuICAgIG1heC13aWR0aDogaW5pdGlhbDsgfVxuICAuYmVjb21lLWEtbWVtYmVyIGZvcm0ge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnI7XG4gICAgZ3JpZC1nYXA6IDFyZW07XG4gICAgd2lkdGg6IDEwMCU7IH1cbiAgICAuYmVjb21lLWEtbWVtYmVyIGZvcm0gaW5wdXQsIC5iZWNvbWUtYS1tZW1iZXIgZm9ybSB0ZXh0YXJlYSB7XG4gICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50OyB9XG4gICAgLmJlY29tZS1hLW1lbWJlciBmb3JtIC51cHBlciB7XG4gICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgZ3JpZC1nYXA6IDFyZW07IH1cbiAgICAgIC5iZWNvbWUtYS1tZW1iZXIgZm9ybSAudXBwZXIgaW5wdXQge1xuICAgICAgICBoZWlnaHQ6IDRyZW07IH1cbiAgICAuYmVjb21lLWEtbWVtYmVyIGZvcm0gLmxvd2VyIHtcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICBncmlkLWdhcDogMXJlbTtcbiAgICAgIGp1c3RpZnktaXRlbXM6IHJpZ2h0OyB9XG4gICAgICAuYmVjb21lLWEtbWVtYmVyIGZvcm0gLmxvd2VyIHRleHRhcmVhIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7IH1cbiAgICAuYmVjb21lLWEtbWVtYmVyIGZvcm0gYnV0dG9uOmhvdmVyIHtcbiAgICAgIGNvbG9yOiAjNWQ1ZDVkOyB9XG4gIC5iZWNvbWUtYS1tZW1iZXIgLmJlY29tZS1hLW1lbWJlci1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC8qanVzdGlmeS1jb250ZW50OiBjZW50ZXI7Ki9cbiAgICAvKmFsaWduLWl0ZW1zOiBjZW50ZXI7Ki9cbiAgICAvKmhlaWdodDogMjZyZW07Ki8gfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAuYmVjb21lLWEtbWVtYmVyIC5iZWNvbWUtYS1tZW1iZXItY29udGVudCB7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxuICAgICAgICAuYmVjb21lLWEtbWVtYmVyIC5iZWNvbWUtYS1tZW1iZXItY29udGVudCBoMyB7XG4gICAgICAgICAgbWFyZ2luOiAwIGF1dG87IH0gfVxuICAgIC5iZWNvbWUtYS1tZW1iZXIgLmJlY29tZS1hLW1lbWJlci1jb250ZW50IGgyIHtcbiAgICAgIHdoaXRlLXNwYWNlOiBpbml0aWFsO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMztcbiAgICAgIHBhZGRpbmc6IDAgMXJlbSAxcmVtOyB9XG4gICAgLmJlY29tZS1hLW1lbWJlciAuYmVjb21lLWEtbWVtYmVyLWNvbnRlbnQgcCB7XG4gICAgICBwYWRkaW5nOiAwIDFyZW0gMXJlbTsgfVxuICAuYmVjb21lLWEtbWVtYmVyIGlucHV0LCAuYmVjb21lLWEtbWVtYmVyIHRleHRhcmVhIHtcbiAgICAvKmNvbG9yOiAjOTU5NTk1ICFpbXBvcnRhbnQ7Ki9cbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTU5NTk1ICFpbXBvcnRhbnQ7XG4gICAgcGFkZGluZy1sZWZ0OiAxcmVtOyB9XG4gIC5iZWNvbWUtYS1tZW1iZXIgdGV4dGFyZWEge1xuICAgIC8qY29sb3I6ICM5NTk1OTUgIWltcG9ydGFudDsqL1xuICAgIHBhZGRpbmctdG9wOiAwLjVyZW07IH1cbiAgLmJlY29tZS1hLW1lbWJlciA6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIC8qIENocm9tZSwgRmlyZWZveCwgT3BlcmEsIFNhZmFyaSAxMC4xKyAqL1xuICAgIGNvbG9yOiAjOTU5NTk1ICFpbXBvcnRhbnQ7XG4gICAgb3BhY2l0eTogMTtcbiAgICAvKiBGaXJlZm94ICovIH1cbiAgLmJlY29tZS1hLW1lbWJlciA6Oi1tb3otcGxhY2Vob2xkZXIge1xuICAgIC8qIENocm9tZSwgRmlyZWZveCwgT3BlcmEsIFNhZmFyaSAxMC4xKyAqL1xuICAgIGNvbG9yOiAjOTU5NTk1ICFpbXBvcnRhbnQ7XG4gICAgb3BhY2l0eTogMTtcbiAgICAvKiBGaXJlZm94ICovIH1cbiAgLmJlY29tZS1hLW1lbWJlciA6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICAvKiBDaHJvbWUsIEZpcmVmb3gsIE9wZXJhLCBTYWZhcmkgMTAuMSsgKi9cbiAgICBjb2xvcjogIzk1OTU5NSAhaW1wb3J0YW50O1xuICAgIG9wYWNpdHk6IDE7XG4gICAgLyogRmlyZWZveCAqLyB9XG4gIC5iZWNvbWUtYS1tZW1iZXIgOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIC8qIENocm9tZSwgRmlyZWZveCwgT3BlcmEsIFNhZmFyaSAxMC4xKyAqL1xuICAgIGNvbG9yOiAjOTU5NTk1ICFpbXBvcnRhbnQ7XG4gICAgb3BhY2l0eTogMTtcbiAgICAvKiBGaXJlZm94ICovIH1cbiAgLmJlY29tZS1hLW1lbWJlciA6OnBsYWNlaG9sZGVyIHtcbiAgICAvKiBDaHJvbWUsIEZpcmVmb3gsIE9wZXJhLCBTYWZhcmkgMTAuMSsgKi9cbiAgICBjb2xvcjogIzk1OTU5NSAhaW1wb3J0YW50O1xuICAgIG9wYWNpdHk6IDE7XG4gICAgLyogRmlyZWZveCAqLyB9XG4gIC5iZWNvbWUtYS1tZW1iZXIgOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTAtMTEgKi9cbiAgICBjb2xvcjogIzk1OTU5NSAhaW1wb3J0YW50OyB9XG4gIC5iZWNvbWUtYS1tZW1iZXIgOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIC8qIE1pY3Jvc29mdCBFZGdlICovXG4gICAgY29sb3I6ICM5NTk1OTUgIWltcG9ydGFudDsgfVxuXG4ubG9hZGVyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHotaW5kZXg6IDk5OTk7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjNzIGVhc2Utb3V0LHRyYW5zZm9ybSAwcyAuM3MgbGluZWFyO1xuICBkaXNwbGF5OiBibG9jazsgfVxuXG4ucGFyYWxsYXgge1xuICAtby1vYmplY3QtZml0OiBjb250YWluO1xuICAgICBvYmplY3QtZml0OiBjb250YWluO1xuICAvKiBUaGUgaW1hZ2UgdXNlZCAqL1xuICAvKiBTZXQgYSBzcGVjaWZpYyBoZWlnaHQgKi9cbiAgaGVpZ2h0OiA1MDBweDtcbiAgLyogQ3JlYXRlIHRoZSBwYXJhbGxheCBzY3JvbGxpbmcgZWZmZWN0ICovXG4gIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsgfVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xuICAucHVyc3VlLXN2ZyB7XG4gICAgaGVpZ2h0OiAyMXJlbTsgfSB9XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQyNXB4KSB7XG4gIC55b3VjYW4ge1xuICAgIHdpZHRoOiAxMDAlOyB9IH1cbi8qIyBzb3VyY2VNYXBwaW5nVVJMPXNyYy9yb3V0ZXMvX2xheW91dC5zdmVsdGUubWFwICovIl19 */</style>\\n\\n<Nav {segment} />\\n\\n<main> \\n  <slot></slot> \\n</main>\\n\\n<Footer />\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$4);

	return `${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}

<main>${$$slots.default ? $$slots.default({}) : ``}</main>

${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});

/* src/routes/_error.svelte generated by Svelte v3.22.3 */

const css$5 = {
	code: "h1.svelte-1xjwv3d,p.svelte-1xjwv3d{margin:0 auto}h1.svelte-1xjwv3d{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-1xjwv3d{margin:1em auto}@media(min-width: 480px){h1.svelte-1xjwv3d{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = undefined === 'development';\\n</script>\\n\\n<style>\\nh1, p {\\n\\tmargin: 0 auto;\\n}\\n\\nh1 {\\n\\tfont-size: 2.8em;\\n\\tfont-weight: 700;\\n\\tmargin: 0 0 0.5em 0;\\n}\\n\\np {\\n\\tmargin: 1em auto;\\n}\\n\\n@media (min-width: 480px) {\\n\\th1 {\\n\\t\\tfont-size: 4em;\\n\\t}\\n}\\n\\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7O0FBRUE7Q0FDQyxnQkFBZ0I7Q0FDaEIsZ0JBQWdCO0NBQ2hCLG1CQUFtQjtBQUNwQjs7QUFFQTtDQUNDLGdCQUFnQjtBQUNqQjs7QUFFQTtDQUNDO0VBQ0MsY0FBYztDQUNmO0FBQ0QiLCJmaWxlIjoic3JjL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlIiwic291cmNlc0NvbnRlbnQiOlsiXG5oMSwgcCB7XG5cdG1hcmdpbjogMCBhdXRvO1xufVxuXG5oMSB7XG5cdGZvbnQtc2l6ZTogMi44ZW07XG5cdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdG1hcmdpbjogMCAwIDAuNWVtIDA7XG59XG5cbnAge1xuXHRtYXJnaW46IDFlbSBhdXRvO1xufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcblx0aDEge1xuXHRcdGZvbnQtc2l6ZTogNGVtO1xuXHR9XG59XG4iXX0= */</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<div class=\\\"container mx-auto\\\">\\n\\t<div class=\\\"text-center\\\">\\n\\t\\t<h1>{status}</h1>\\n\\t\\t<p>{error.message}</p>\\n\\t</div>\\n</div>\\n\\n<!-- {#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if} -->\\n\"],\"names\":[],\"mappings\":\"AAQA,iBAAE,CAAE,CAAC,eAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,eAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,eAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$5);

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
		},

		{
			// contact.svelte
			pattern: /^\/contact\/?$/,
			parts: [
				{ name: "contact", file: "contact.svelte", component: Contact, preload: preload$7 }
			]
		},

		{
			// [slug].svelte
			pattern: /^\/([^\/]+?)\/?$/,
			parts: [
				{ name: "$slug", file: "[slug].svelte", component: U5Bslugu5D$2, preload: preload$8, params: match => ({ slug: d(match[1]) }) }
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
