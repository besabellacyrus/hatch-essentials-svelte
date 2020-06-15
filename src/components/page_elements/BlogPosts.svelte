<script>
	export let posts
	const thePosts = posts.data.posts.nodes; 
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
		     		<a href={`the-blog/`+post.slug}>
		     			<img src="{post.featuredImage.sourceUrl}" alt="">
			     		<h1 class="text-center">{post.title}</h1>
			     		<h4 class="text-center mx-auto">Category</h4>
		     		</a>
			  	</div>
		    {/each}
		 	</div>
	  {:else}
	    <p>ERROR!!</p>
	  {/if}
	{/await} 
</section>