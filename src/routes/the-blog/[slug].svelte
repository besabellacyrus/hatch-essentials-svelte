<script context="module">
	import client from "../../lib/apollo";
  import { POST } from "../../queries/post";

  export async function preload({ params }) { 
  	let slug = params.slug; 

    return {
      cache: await client.query({
        query: POST,
        variables: { slug }
      }),
      slug
    };
  }
</script>

<script>
	import { restore, query } from "svelte-apollo";
  // import DynamicBlock from "../components/page_elements/DynamicBlock.svelte";

  export let slug;
  export let cache;
  
  console.log({ slug })


  restore(client, POST, cache.data); 
  // setClient(client); 

  // const post = query(client, {
  //   query: POST,
  //   variables: { slug }
  // }); 
</script>

<svelte:head>
  <title>{ slug }</title>
</svelte:head>

<section class="container mx-auto">
  <div class="spacer"></div>
	<div class="mt-5">
     {#await cache}
      <div class="loader">
        <p>Loading...</p>
      </div>
    {:then data}
      {#if data.data}
        <h1 class="text-center">{ data.data.post.title }</h1>
        {@html data.data.post.content }
      {:else}
        <p>ERROR!!</p>
      {/if}
    {/await}  
  </div>
  <div class="spacer"></div>
</section>