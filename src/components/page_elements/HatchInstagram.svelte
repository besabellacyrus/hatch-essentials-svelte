<script>
  import { onMount } from "svelte";
  import SocialMediaIcons from "../page_elements/SocialMediaIcons.svelte";

  // IGQVJVU0FzeFlmQ3RCS3VrbnJiZA3lpQ1p4M0VjcXRvYVBWdHBlQlpHRmROZAkx1ZAmRLVlM5LW9qMVdJdGk3WDNZAZAlpDeVEwbDRrRHJ2dHNiS2dxQ3pTenRJbGhzaGUxel9vcUlPSGRR
  onMount(() => {
    var feed = new Instafeed({
      get: "user",
      accessToken:
        "IGQVJYZAG5Cc3AtT0gyUjM2ZAnNNbG5oU0lsYzE0ZAVczQXF3bVJESXpsMERMMVRUSFNTU1RzRnBrV1R5VEFaR214Q08wR2J2eGdmSnd0aGJHcUxra3JUb2oxMDRsVzZACaG9fYV92X3NB",
      target: "instagramfeed",
      userId: "33443551043",
      limit: 3
    });
    feed.run();
  });
</script>

<style>

</style>

<svelte:head>
  <script src="/js/instafeed.js">

  </script>
</svelte:head>

<section class="hatch-instagram">
  <div class="left-section">
    <div class="hatch-logo">
      <img src="logo.svg" />
    </div>
    <div>
      <p>
        GET BEHIND THE SCENES.
        <br />
        My “AHA” moments on the ‘gram.
      </p>
      <p>
        Follow me
        <b>@hatchessentials</b>
      </p>
      <SocialMediaIcons />
    </div>
  </div>
  <div id="instagramfeed" class="instagram-items" />
</section>
