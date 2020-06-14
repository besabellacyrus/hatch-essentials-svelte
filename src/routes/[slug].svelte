<script context="module">
  import client from "../lib/apollo";
  import { PAGE } from "../queries/page";
  
  export async function preload({ params }) { 
  	let slug = params.slug; 
    return { 
      cache: await client.query({
        query: PAGE,
        variables: { slug }
      }),
      slug
    };
  }
</script>

<script>
  import { restore, query } from "svelte-apollo";
  import DynamicBlock from "../components/page_elements/DynamicBlock.svelte";

  export let slug;
  export let cache;

  restore(client, PAGE, cache.data); 
  // setClient(client); 

  // const pages = query(client, {
  //   query: PAGE,
  //   variables: { slug }
  // });

</script>

<style>
  @media (min-width: 480px) {
  }
</style>

<svelte:head>
  <title>{ slug }</title>
</svelte:head>
 
{#await cache}
  <p>Loading...</p>
{:then data}
  {#if data.data}
    {#each data.data['hatch_PageBy']['page']['fc'] as page, i}
      <DynamicBlock content={page.content} bgColor={page.backgroundColor} />
    {/each}
  {:else}
    <p>ERROR!!</p>
  {/if}
{/await} 
