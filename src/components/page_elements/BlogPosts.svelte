<script>
  export let posts;
  const thePosts = posts.data.posts.nodes;
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
</script>

<style>

</style>

<section class="container mx-auto">
  {#await thePosts}
    <p>Loading...</p>
  {:then posts}
    {#if posts}
      <div class="blog-posts">
        {#each posts as post, i}
          <div class="post">
            <a href={`the-blog/` + post.slug}>
              {#if post.featuredImage && post.featuredImage.sourceUrl}
                <img src={post.featuredImage.sourceUrl} alt="" />
              {/if}
              <h1 class="text-center">{post.title}</h1>
              {#if post.categories.nodes.length > 0 && post.categories.nodes[0].slug !== 'uncategorized'}
                <h4 class="text-center mx-auto">
                  {capitalize(post.categories.nodes[0].slug)}
                </h4>
              {/if}
            </a>
          </div>
        {/each}
      </div>
    {:else}
      <p>ERROR!!</p>
    {/if}
  {/await}
</section>
