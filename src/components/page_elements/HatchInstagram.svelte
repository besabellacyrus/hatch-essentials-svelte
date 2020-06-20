<script> 
	import { onMount } from 'svelte'
  // IGQVJVU0FzeFlmQ3RCS3VrbnJiZA3lpQ1p4M0VjcXRvYVBWdHBlQlpHRmROZAkx1ZAmRLVlM5LW9qMVdJdGk3WDNZAZAlpDeVEwbDRrRHJ2dHNiS2dxQ3pTenRJbGhzaGUxel9vcUlPSGRR
	onMount(() => {
		var feed = new Instafeed({
	    get: 'user',
      accessToken: 'IGQVJWenlRLWhqbDA4ZA1RRWW9PRGJsdXQyNVktWEpSc2JQZAF9saWVaWVJsUUNfT3hGRlh5YjlOLVV6dEdOZATBoaExMaXVBUmJRSE5SRHQxTEo0aTRtUGFOUnlNSGtBOXpsWnYzbGpR',
	    target: 'instagramfeed',
	    userId: '33443551043',
      limit: 3
	  });
  	feed.run();
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
  <div id="instagramfeed" class="instagram-items"></div> 
</section> 