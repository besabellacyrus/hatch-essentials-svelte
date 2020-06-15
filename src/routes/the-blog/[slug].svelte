<script context="module">
	import client from "../../lib/apollo";
  // import { POSTS } from "../../queries/page";

  export async function preload({ params }) { 
  	let slug = params.slug; 
  	return {
  		slug
  	}
    // return {
    //   cache: await client.query({
    //     query: PAGE,
    //     variables: { slug }
    //   })
    // };
  }
</script>

<script>
	export let slug;
	
</script>

<svelte:head>
  <title>{ slug }</title>
</svelte:head>

<section>
	hello
</section>