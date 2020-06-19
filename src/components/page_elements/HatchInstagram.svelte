<script> 
	import { onMount } from 'svelte'

	
	onMount(() => {
		// var feed = new Instafeed({
	 //    get: 'user',  
	 //    accessToken: 'IGQVJYb2NocXZAZ634hgdf83hjdj2AR2JneEtCWElhVzE1Q001dm9WaVZAXZA1ByNzYzeVRyaHMydm5IbG9oclI0X0U4TVI0bjEtcGdxamFHLXloV2pJTG1MczNDb1dGQnMzLTZAja1p2UVhEVVZAwREc4cHNn',
	 //    target: 'instagramfeed',
	 //    userId: '17841405013225096'
	 //  });
  // 	feed.run();
	}) 
 
</script>
<style></style>

<svelte:head>
  <script src="/js/instafeed.js"></script>
</svelte:head>

<section class="hatch-instagram"> 
  <div class="left-section">
    <div class="hatch-logo">
      <img src="logo.svg" />
    </div>
    <div>
      <p>For daily updates, inspirations and anything about hatch essentials,
      please follow us on instagram.</p>
      <p>Follow us <b>@hatchessentials</b></p>
    </div>
  </div>
  <div class="instagram-items">
  	<div id="instagramfeed"></div> 
    <div>
    	<img src="http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/Pursue-Dreams.jpg" alt="">
    </div>
    <div class="">
    	<img src="http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/Pursue-Dreams.jpg" alt="">
    </div>
    <div class="">
    	<img src="http://hatchessentials.com/wp-api/wp-content/uploads/2020/06/Pursue-Dreams.jpg" alt="">
    </div>
  </div>
</section>