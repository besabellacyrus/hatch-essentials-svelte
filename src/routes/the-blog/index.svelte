<script context="module">
  import client from "../../lib/apollo";
  import { PAGE } from "../../queries/page";
  import { POSTS } from "../../queries/posts";
  
  export async function preload({ params }) { 
  	let slug = 'the-blog'; 
    return { 
      cache: await client.query({
        query: PAGE,
        variables: { slug }
      }),
      postsCache: await client.query({
        query: POSTS
      }),
      slug
    };
  }
</script>

<script>
	import { restore, query } from "svelte-apollo";
  import DynamicBlock from "../../components/page_elements/DynamicBlock.svelte";
	import BlogPosts from "../../components/page_elements/BlogPosts.svelte";
  import TransitionWrapper from '../../components/TransitionWrapper.svelte';

	export let slug;
	export let cache;
  export let postsCache;

  restore(client, PAGE, cache.data);   
  restore(client, POSTS, postsCache.data); 

  const posts = query(client, {
    query: POSTS
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
{#await $posts}
  {:then data}
    <BlogPosts posts={data} />
{/await} 
</TransitionWrapper>