<script context="module">
  import client from "../lib/apollo";
  // import { gql } from "apollo-boost";
  import { PAGE } from "../queries/page";
  let slug = "home";

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
  @media (min-width: 480px) {
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

{#await $pages}
  <p>Loading...</p>
{:then data}
  {#if data.data}
    {#each data.data['hatch_PageBy']['page']['fc'] as page, i}
      <DynamicBlock content={page.content} />
    {/each}
  {:else}
    <p>ERROR!!</p>
  {/if}
{/await}
