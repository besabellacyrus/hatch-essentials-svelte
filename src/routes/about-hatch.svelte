<script context="module">
  import client from "../lib/apollo";
  import { PAGE } from "../queries/page";

  let slug = "about-hatch";

  export async function preload() { 
    return {
      cache: await client.query({
        query: PAGE,
        variables: { slug }
      })
    };
  }
</script>

<script>
  import { restore, query } from "svelte-apollo";
  import DynamicBlock from "../components/page_elements/DynamicBlock.svelte"; 
  import TransitionWrapper from '../components/TransitionWrapper.svelte';
  import BecomeMember from '../components/page_elements/BecomeMember.svelte'
  
  export let cache;
  restore(client, PAGE, cache.data);
  // TODO Uncommenting this part triggers a 500 error.
  // setClient(client);

  // query a subset of the preloaded (the rest if for Account)
  const pages = query(client, {
    query: PAGE,
    variables: { slug }
  });
</script>

<style>  
</style>

<svelte:head> 
{#if cache}
  { @html cache.data['hatch_PageBy']['head_tags']['headTags'] }
{/if}
</svelte:head>

<TransitionWrapper>
{#await $pages}
  <div class="loader">
    <p>Loading...</p>
  </div>
{:then data}
    {#if data.data}
      {#each data.data['hatch_PageBy']['page']['fc'] as page, i}
        <DynamicBlock content={page.content} bgColor={page.backgroundColor} />
      {/each}
    {:else}
      <p>ERROR!!</p>
    {/if}
{/await}
</TransitionWrapper>
